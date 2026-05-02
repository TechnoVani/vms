require('dotenv').config();

const app = require('./src/app');
const { connectDB } = require('./src/config/database');
const http = require("http");
const { Server } = require("socket.io");
const { setOffline, getOnlineUsers } = require('./src/models/visitorModel');
const emailService = require('./src/utils/emailService');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const startServer = async () => {
  console.log('🚀 Starting server...');
  
  const dbConnected = await connectDB();
  if (!dbConnected) {
    console.error('❌ Database connection failed. Exiting...');
    process.exit(1);
  }

  // Email setup
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    console.log('📧 Initializing email service...');
    try {
      const emailReady = await emailService.testConnection();
      if (emailReady) {
        console.log('✅ Email service configured and ready');
      } else {
        console.warn('⚠️ Email service not configured properly.');
      }
    } catch (error) {
      console.error('❌ Email service error:', error.message);
    }
  }

  const server = http.createServer(app);

  // ✅ Dynamic CORS for socket.io
  const io = new Server(server, {
    cors: { 
      origin: FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  const connectedSockets = new Map();

  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    socket.on("join", async (ip) => {
      socket.ip = ip;
      connectedSockets.set(socket.id, ip);

      const total = await getOnlineUsers();
      io.emit("onlineUsers", total);
    });

    socket.on("disconnect", async () => {
      if (socket.ip) {
        await setOffline(socket.ip);
        connectedSockets.delete(socket.id);

        const total = await getOnlineUsers();
        io.emit("onlineUsers", total);
      }
    });
  });

  setInterval(async () => {
    const total = await getOnlineUsers();
    io.emit("onlineUsers", total);
  }, 30000);

  // ✅ Use HOST + PORT from env
  server.listen(PORT, HOST, () => {
    console.log(`\n✅ Server running on http://${HOST}:${PORT}`);
    console.log(`🌐 Allowed frontend: ${FRONTEND_URL}`);
    console.log(`📧 Email: ${emailService.isConfigured ? 'Configured ✅' : 'Not configured ⚠️'}`);
    console.log(`\n✨ Ready to accept requests\n`);
  });
};

// Graceful shutdown
const gracefulShutdown = () => {
  console.log('\n🛑 Received shutdown signal');
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

startServer();
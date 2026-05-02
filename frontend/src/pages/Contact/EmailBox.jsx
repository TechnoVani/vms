import React from "react";
import { FaEnvelope } from "react-icons/fa";

const EmailBox = () => {
  return (
    <div className="bg-[#FFEFEF] p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <FaEnvelope />
        </div>
        <h4 className="text-xl font-semibold text-[#0B2C3D]">
          Email
        </h4>
      </div>

      <p className="text-gray-600 mb-2">
        Our support team will get back to you.
      </p>

      {/* CLICK EMAIL → OPEN MAIL APP */}
      <a
        href="mailto:info@viditmediasolutions.com"
        className="font-semibold text-[#0B2C3D] hover:text-red-600 transition cursor-pointer"
      >
        info@viditmediasolutions.com
      </a>
    </div>
  );
};

export default EmailBox;

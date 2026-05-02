import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const SocialBox = () => {
  return (
    <div className="bg-[#ECFFFF] p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h4 className="text-xl font-semibold text-[#0B2C3D] mb-4">
        Follow Us
      </h4>

      <div className="flex gap-4">
        {[
          { icon: <FaFacebookF />, link: "https://www.facebook.com/vmsindiainfinity", color: "hover:text-blue-600" },
          { icon: <FaLinkedinIn />, link: "https://www.linkedin.com", color: "hover:text-blue-700" },
          { icon: <FaInstagram />, link: "https://www.instagram.com/viditmediasolutions/", color: "hover:text-pink-600" },
          { icon: <FaYoutube />, link: "https://www.youtube.com/channel/UCaDBWHhaTzKVzZANKuMjpLA", color: "hover:text-red-600" },
        ].map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow ${item.color} transition`}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialBox;

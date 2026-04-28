import React, { useState } from "react";

function PostCard({ id, userId, title, body }) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="group p-6 bg-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-2 hover:border-pink-300 hover:bg-pink-50">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>

      {/* Body */}
      <div className="mb-6">
        <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
      </div>

      {/* Button */}
      <div className="flex justify-start">
        <button
          onClick={() => setClicked(true)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            clicked
              ? "bg-special-red2 text-white hover:bg-orange-600"
              : "bg-gray-01 text-white hover:bg-gray-700"
          }`}
        >
          {clicked ? "Tombol sudah diklik" : "Silakan Klik"}
        </button>
      </div>
    </div>
  );
}

export default PostCard;

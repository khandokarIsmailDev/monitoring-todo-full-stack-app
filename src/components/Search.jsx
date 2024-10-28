import React from "react";

export default function Search() {
  return (
    <div className="mx-4 flex-1">
      <input
        type="text"
        placeholder="Search here"
        className="w-full max-w-xl rounded-full bg-gray-700 px-4 py-2 text-white focus:outline-none"
      />
    </div>
  );
}

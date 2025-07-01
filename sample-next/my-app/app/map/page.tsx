import React from "react";

export default function DonerMapPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <aside className="w-64 p-4 border-r border-gray-200">
        <h1 className="text-2xl font-bold mb-4">Spot-A-Doner</h1>
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="border px-2 py-1 rounded w-full"
          />
          <button className="p-1 border rounded bg-white hover:bg-gray-100">
            🔍
          </button>
        </div>
        <ul className="space-y-1 text-sm">
          <li>Doner 1</li>
          <li>Doner 2</li>
          <li>Doner 3</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-3xl">
          <h2 className="text-xl font-semibold mb-2 border-b pb-1 border-orange-400">
            Maps-API
          </h2>
          <div className="mt-4 border border-dashed border-gray-400 bg-gray-200 h-64 flex items-center justify-center text-gray-600 italic text-sm">
            Google Maps API script or div
          </div>
        </div>
      </main>
    </div>
  );
}

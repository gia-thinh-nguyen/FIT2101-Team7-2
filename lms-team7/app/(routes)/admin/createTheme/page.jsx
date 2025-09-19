"use client";
import React, { useState } from 'react'

const page = () => {
  const [color, setColor] = useState('#2563eb')

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <section className="w-full max-w-md mt-16 bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-2xl font-extrabold text-blue-800 mb-8 text-center">Change Theme Color</h1>
        <form className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <label htmlFor="themeColor" className="block text-gray-700 font-medium mb-2">
              Pick a Theme Color
            </label>
            <input
              type="color"
              id="themeColor"
              name="themeColor"
              value={color}
              onChange={e => setColor(e.target.value)}
              className="w-16 h-16 border-2 border-gray-300 rounded-full cursor-pointer"
            />
            <span className="mt-2 text-gray-600">Selected: <span style={{ color }}>{color}</span></span>
          </div>
          <button
            type="button"
            disabled
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg opacity-60 cursor-not-allowed transition"
          >
            Save Theme (Demo Only)
          </button>
        </form>
        <div className="mt-8 flex flex-col items-center">
          <span className="mb-2 text-gray-700">Preview:</span>
          <div
            className="w-32 h-10 rounded-lg"
            style={{ backgroundColor: color, border: '1px solid #ccc' }}
          />
        </div>
      </section>
    </main>
  )
}

export default page
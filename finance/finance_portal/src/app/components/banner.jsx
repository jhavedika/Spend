import React from "react";
import Image from "next/image";
function Banner() {
  return (
    <section className="relative w-full bg-gradient-to-br from-blue-100 to-white overflow-hidden flex flex-col items-center justify-center py-12">
      {/* Collage of Floating Images */}
      <div className="relative w-full flex flex-row justify-center items-end gap-8 mb-10" style={{ minHeight: 260 }}>
        <div className="relative w-32 h-32 z-10">
          <img src="img1.png" alt="Image 1" className="rounded-xl shadow-xl w-full h-full object-cover" />
        </div>
        <div className="relative w-40 h-40 z-10 -mb-8">
          <img src="img2.png" alt="Image 2" className="rounded-xl shadow-xl w-full h-full object-cover" />
        </div>
        <div className="relative w-32 h-32 z-10">
          <img src="img3.png" alt="Image 3" className="rounded-xl shadow-xl w-full h-full object-cover" />
        </div>
        <div className="relative w-36 h-36 z-10 -mb-6">
          <img src="img4.png" alt="Image 4" className="rounded-xl shadow-xl w-full h-full object-cover" />
        </div>
        <div className="relative w-40 h-40 z-10">
          <img src="img5.png" alt="Image 5" className="rounded-xl shadow-xl w-full h-full object-cover" />
        </div>
      </div>
      {/* Centered Text Content below collage */}
      <div className="relative z-30 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 drop-shadow-lg mb-4">
          Welcome to Spend Wise
        </h1>
        <p className="text-lg md:text-2xl text-blue-800 font-medium mb-2">
          Your AI-powered financial companion
        </p>
        <p className="text-base md:text-lg text-blue-700 max-w-2xl mb-6">
          Track your budgets, manage your expenses, and get smart advice to grow your savings.
          <br />
          <span className="font-semibold text-yellow-700">Let AI help you spend smarter and save more!</span>
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-3 rounded-full shadow-lg transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
export default Banner;
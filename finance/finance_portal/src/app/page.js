import Image from "next/image";
import Header from "./components/header";
import Hero from "./components/hero";
import Banner from "./components/banner";
export default function Home() {
  return (
    <div>
      <Header/>
      <Banner/>
      <Hero/>
      <footer className="w-full mt-10 bg-blue-800 text-white py-6 flex flex-col items-center">
        <div className="text-lg font-semibold">Spend Wise</div>
        <div className="text-sm mt-1">AI powered financial adviser</div>
        <div className="text-xs mt-2 opacity-70">&copy; {new Date().getFullYear()} Spend Wise. All rights reserved.</div>
      </footer>
    </div>
  );
}

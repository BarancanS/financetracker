import Image from "next/image";
import Navbar from "./components/Navbar";
import Calculation from "./components/Calculation";
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)]">
        <Calculation />
      </div>
    </main>
  );
}

import Image from "next/image";
import Navbar from "./components/Navbar";
import Calculation from "./components/Calculation";
import List from "./components/List";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row">
        <Calculation />
        <List />
      </div>
    </main>
  );
}

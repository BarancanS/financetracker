import Navbar from "./components/Navbar";
import CalculationAndList from "./components/CalculationAndList";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CalculationAndList />
    </main>
  );
}

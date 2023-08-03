import Image from "next/image";
import Card from "./components/Card";

export default function Home() {
  return (
    <main className="flex flex-col gap-5 min-h-screen m-3 md:ml-80">
      <Card />
    </main>
  );
}

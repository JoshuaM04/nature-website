import Image from "next/image";
import Filter from './components/filter';
import Card from './components/card';

export default function Home() {

  return (
    <main className="flex flex-col gap-5 w-full">
      <div className="text-moss flex gap-5">
        <p>12 specimens</p>
        <p>.</p>
        <p>revised aug 2026</p>
      </div>

      <div>
        <h1>What lives beneath the canopy</h1>
        <p>Twelve species of the eastern decidous woodland, described for identification in the field.</p>
      </div>

      <Filter />
      
      <hr className="-ml-5 -mr-5 hairline-200"/>

      <Card />
    </main>
  );
}

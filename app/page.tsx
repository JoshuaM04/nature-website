import Image from "next/image";
import Filter from './components/filter';

export default function Home() {
  return (
    <div className="flex flex-col gap-5 pl-5 pr-5 w-full">
      <main className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-5">
          <ul className="eyebrow flex gap-5">
            <li>12 specimens</li>
            <li>.</li>
            <li>revised aug 2026</li>
          </ul>
          
          <h1 className="page-title">What lives beneath the canopy</h1>
          
          <p className="intro-paragraph">Twelve species of the eastern decidous woodland, described for identification in the field.</p>
        </div>
      </main>

      <Filter />
    </div>
  );
}

// HeroScene.jsx

import herovideo from "/videos/exeter-hero.mp4";

export default function HeroVideoDemo() {
  return (
    <section className="relative h-[100vh] overflow-hidden bg-white">
      <video
        src={herovideo}
        className="block h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h1 className="title font-quattrocento text-4xl md:text-6xl font-bold text-white drop-shadow-xl text-center px-6">
          Exeter Inn in Exeter, NH
        </h1>
      </div>
    </section>
  );
}

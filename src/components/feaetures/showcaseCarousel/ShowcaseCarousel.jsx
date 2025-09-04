import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ---------- Demo data (replace with your own) ----------
const demoRooms = [
  {
    id: "european",
    title: "European",
    cta: "+ EXPLORE MORE",
    image:
      "https://image-tc.galaxy.tf/wipng-58cwt0yp0thya6kspyw8og6t3/untitled-design-2-1_standard.png?crop=0%2C42%2C940%2C705",
  },
  {
    id: "traditional",
    title: "Traditional",
    cta: "EXPLORE MORE",
    image:
      "https://image-tc.galaxy.tf/wijpeg-eg6j5bhuldi3sk50eg0x80ifn/dsc-6542-hdr_standard.jpg?crop=106%2C0%2C1709%2C1282",
  },
  {
    id: "classic",
    title: "Classic",
    cta: "EXPLORE MORE",
    image:
      "https://image-tc.galaxy.tf/wijpeg-8vpvdjppavmvn1k4wiusm3l9q/dsc-6497-hdr_standard.jpg?crop=106%2C0%2C1709%2C1282",
  },
  {
    id: "pine",
    title: "Pine Suite",
    cta: "EXPLORE MORE",
    image:
      "https://image-tc.galaxy.tf/wijpeg-9n8hb8iomc6ps2e65yekniod5/dsc-6452-hdr_standard.jpg?crop=106%2C0%2C1709%2C1282",
  },
];

// ---------- Helper ----------
const mod = (n, m) => ((n % m) + m) % m;

// ---------- Core component ----------
export default function ShowcaseCarousel(props) {
  const {
    items = demoRooms,
    height = 560,
    className = "",
    autoPlayMs = 0, // set to e.g. 5500 to enable autoplay
  } = props || {};

  const [index, setIndex] = useState(0);
  const wrapRef = useRef(null);
  const cardsRef = useRef([]);
  const trackRef = useRef(null);
  const dirRef = useRef(0);
  const allowAutoplayRef = useRef(true);

  const prevIdx = useMemo(
    () => mod(index - 1, items.length),
    [index, items.length]
  );
  const nextIdx = useMemo(
    () => mod(index + 1, items.length),
    [index, items.length]
  );

  function go(dir) {
    dirRef.current = dir; // remember the direction of travel
    setIndex((i) => mod(i + dir, items.length));
  }

  // Position/animate the three visible cards with GSAP
  useGSAP(
    () => {
      const el = wrapRef.current;
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
            // once: true, // <- use this if you only want it to play once
          },
        }
      );

      const tl = gsap.timeline({
        defaults: { duration: 0.7, ease: "power3.out" },
      });

      const center = cardsRef.current[1];
      const left = cardsRef.current[0];
      const right = cardsRef.current[2];
      if (!center || !left || !right) return;

      const dir = dirRef.current || 0; // 1 = next, -1 = prev, 0 = initial mount

      // Stacking: center above both sides
      gsap.set(left, { zIndex: 10 });
      gsap.set(center, { zIndex: 30 });
      gsap.set(right, { zIndex: 10 });

      // Avoid 3D/perspective shenanigans that can create odd stacking contexts
      gsap.set([left, center, right], { force3D: false });

      if (dir === 1) {
        // moving NEXT (slide left): new center should come from the right
        gsap.set(left, { xPercent: -44, scale: 0.9, opacity: 0.8 });
        gsap.set(center, { xPercent: 22, scale: 0.95, opacity: 0.95 });
        gsap.set(right, { xPercent: 44, scale: 0.9, opacity: 0.8 });
      } else if (dir === -1) {
        // moving PREV (slide right): new center should come from the left
        gsap.set(left, { xPercent: -66, scale: 0.9, opacity: 0.8 });
        gsap.set(center, { xPercent: -22, scale: 0.95, opacity: 0.95 });
        gsap.set(right, { xPercent: 22, scale: 0.93, opacity: 0.9 });
      } else {
        // initial mount (no slide yet)
        gsap.set(left, { xPercent: -22, scale: 0.93, opacity: 0.9 });
        gsap.set(center, { xPercent: 0, scale: 1.0, opacity: 1 });
        gsap.set(right, { xPercent: 22, scale: 0.93, opacity: 0.9 });
      }

      // Animate everything into the canonical resting positions
      tl.to(center, { xPercent: 0, scale: 1.0, opacity: 1 }, 0)
        .to(left, { xPercent: -22, scale: 0.93, opacity: 0.9 }, 0)
        .to(right, { xPercent: 22, scale: 0.93, opacity: 0.9 }, 0);

      // subtle parallax
      if (trackRef.current) tl.fromTo(trackRef.current, { y: 6 }, { y: 0 }, 0);

      return () => tl.kill();
    },
    { dependencies: [index], scope: wrapRef }
  );

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Autoplay (optional)
  useEffect(() => {
    if (!autoPlayMs) return;
    const id = setInterval(() => {
      if (allowAutoplayRef.current) go(1);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs]);

  // NOTE: Drag/swipe removed per request

  // Compute visible triplet: [left, center, right]
  const visible = [prevIdx, index, nextIdx].map((i) => items[i]);

  return (
    <div
      ref={wrapRef}
      className={`relative isolate w-full max-w-[1600px] mx-auto my-60 ${className} carousel`}
      style={{ height }}
      aria-roledescription="carousel"
    >
      {/* background track for subtle parallax */}
      <div ref={trackRef} className="absolute inset-0 overflow-visible">
        {/* Card stack */}
        <div className="absolute inset-0 flex items-center justify-center">
          {visible.map((item, i) => (
            <CarouselCard
              key={item.id}
              item={item}
              innerRef={(el) => (cardsRef.current[i] = el)}
              isCenter={i === 1}
              height={height}
            />
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous"
        onClick={() => go(-1)}
        className="group absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-black/40 hover:bg-black/60 h-11 w-11 backdrop-blur-sm text-white z-50"
      >
        <ChevronLeft className="h-6 w-6 pointer-events-none" />
      </button>
      <button
        aria-label="Next"
        onClick={() => go(1)}
        className="group absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-black/40 hover:bg-black/60 h-11 w-11 backdrop-blur-sm text-white z-50"
      >
        <ChevronRight className="h-6 w-6 pointer-events-none" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const diff = i - index;
              dirRef.current = diff === 0 ? 0 : diff > 0 ? 1 : -1;
              setIndex(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-3 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Card ----------
function CarouselCard({ item, isCenter, height, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="absolute aspect-[16/9] w-[78%] max-w-[1080px] origin-center shadow-2xl overflow-hidden"
      style={{ height: Math.min(height - 40, 560) }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover select-none pointer-events-none"
        draggable={false}
      />

      {/* bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-28 w-96 bg-gradient-to-r from-zinc-900 to-transparent" />

      {/* text block */}
      <div className="absolute left-0 right-0 bottom-0 p-6 text-left text-white">
        <div className="max-w-[80%]">
          <h3 className="tracking-wide font-semibold text-xl md:text-2xl drop-shadow-sm">
            {item.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm opacity-90">
            <Plus className="h-4 w-4" />
            <a
              href={item.href || "#"}
              className="underline-offset-4 hover:underline focus:underline"
              onClick={(e) => {
                if (!item.href || item.href === "#") e.preventDefault();
              }}
            >
              {item.cta || "+ EXPLORE MORE"}
            </a>
          </div>
        </div>
      </div>

      {/* side vignette to emulate screenshot's soft crop */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/10 to-transparent" />
    </div>
  );
}

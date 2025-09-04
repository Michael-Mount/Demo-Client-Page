import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

import herovideo from "/videos/exeter-hero.mp4";

export default function Herovideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const heroSplit = new SplitText(".title", { type: "chars, lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
    gsap.set(video, {
      transformOrigin: "right center",
      willChange: "transform",
    });

    gsap.set(overlay, { willChange: "opacity, transform" });

    gsap.from(heroSplit.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 0.25,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120vh",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
      .to(overlay, { opacity: 0, y: -40, ease: "none" }, 0)
      .to(video, { scale: 0.38, ease: "none" }, 0);
  }, sectionRef);

  return (
    <section ref={sectionRef} style={{ position: "relative" }}>
      <video
        ref={videoRef}
        src={herovideo}
        className="block w-full h-[740px] object-cover"
        autoPlay
        muted
        playsInline
      />
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center px-6">
          <h1 className="title font-quattrocento text-4xl md:text-6xl font-bold text-white drop-shadow-xl">
            Exeter Hotel & Spa
          </h1>
        </div>
      </div>
    </section>
  );
}

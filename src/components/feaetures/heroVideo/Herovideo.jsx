// Herovideo.jsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import herovideo from "/videos/exeter-hero.mp4";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Herovideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const leftHeaderRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const leftHeader = leftHeaderRef.current;

    // Optional SplitText intro (requires Club GSAP)
    const heroSplit = new SplitText(".title", { type: "chars, lines" });
    heroSplit.chars.forEach((c) => c.classList.add("text-gradient"));
    gsap.from(heroSplit.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.04,
      delay: 0.15,
    });

    // Anchor the video to the RIGHT so it shrinks away from the left text area
    gsap.set(video, {
      transformOrigin: "right center",
      willChange: "transform",
    });
    gsap.set(overlay, { willChange: "opacity, transform" });
    gsap.set(leftHeader, {
      opacity: 0,
      x: -60,
      willChange: "opacity, transform",
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140vh",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
      // fade out the centered overlay
      .to(overlay, { opacity: 0, y: -40, ease: "none" }, 0)
      // shrink video toward the right edge
      .to(video, { scale: 0.38, ease: "none" }, 0)
      // reveal the LEFT header around 60% into the scroll
      .to(leftHeader, { opacity: 1, x: 0, ease: "none" }, 0.2);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[80vh] overflow-hidden">
      <video
        ref={videoRef}
        src={herovideo}
        className="block h-full w-full object-cover"
        autoPlay
        muted
        playsInline
      />

      {/* Centered overlay that fades out */}
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

      {/* LEFT-side header that fades/slides in */}
      <aside
        ref={leftHeaderRef}
        className="
          absolute inset-y-0 left-6
          hidden md:flex items-center
          max-w-[40vw]
          z-10
        "
      >
        <div className="text-[#8a1619] drop-shadow-xl space-y-3 uppercase">
          <h2 className="font-quattrocento text-3xl md:text-[160px] font-bold">
            Boutique
          </h2>
          <p className="right absolute right-6 self-end md:text-[50px] text-white">
            Done Right.
          </p>
        </div>
      </aside>
    </section>
  );
}

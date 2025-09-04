// HeroScene.jsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import herovideo from "/videos/exeter-hero.mp4";
import bottomImg from "/images/exeter-wide.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const centerOverlayRef = useRef(null);
  const topLeftRef = useRef(null);
  const bottomGridRef = useRef(null);
  const trueRef = useRef(null);
  const perfectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;

    // Reduced motion = end state, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(centerOverlayRef.current, { opacity: 0 });
      gsap.set(videoRef.current, {
        scale: 0.38,
        transformOrigin: "right center",
      });
      gsap.set(
        [
          topLeftRef.current,
          bottomGridRef.current,
          trueRef.current,
          perfectionRef.current,
        ],
        { opacity: 1, y: 0 }
      );
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=140vh",
        scrub: true,
        pin: true,
      },
    });

    // fade away the center title
    tl.to(centerOverlayRef.current, { opacity: 0, y: -30, ease: "none" }, 0);
    // shrink the video toward the RIGHT (simple & reliable)
    tl.to(
      videoRef.current,
      { scale: 0.38, ease: "none", transformOrigin: "right center" },
      0
    );
    // bring in top-left words
    tl.to(topLeftRef.current, { opacity: 1, y: 0, ease: "none" }, 0.25);
    // bring in bottom grid, then its texts
    tl.to(bottomGridRef.current, { opacity: 1, y: 0, ease: "none" }, 0.45)
      .to(trueRef.current, { opacity: 1, y: 0, ease: "none" }, 0.55)
      .to(perfectionRef.current, { opacity: 1, y: 0, ease: "none" }, 0.6);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] overflow-hidden bg-white"
    >
      {/* Video (full-bleed, then scales down toward right) */}
      <video
        ref={videoRef}
        src={herovideo}
        className="absolute inset-0 block h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Center overlay (fades out first) */}
      <div
        ref={centerOverlayRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <h1 className="title font-quattrocento text-4xl md:text-6xl font-bold text-white drop-shadow-xl text-center px-6">
          Exeter Inn in Exeter, NH
        </h1>
      </div>

      {/* TOP-LEFT words */}
      <div
        ref={topLeftRef}
        className="absolute select-none left-[6vw] top-[14vh] max-w-[56vw] opacity-0 translate-y-5"
      >
        <div className="leading-none tracking-[0.08em] text-[#bdb4ab]">
          <span className="block font-light text-[16vw] md:text-[14vw]">
            LOOK
          </span>
          <span className="block mt-[-1vw] text-[2.2vw] min-[320px]:text-base text-[#9b9289]">
            BEYOND LIMITS.
          </span>
        </div>
      </div>

      {/* BOTTOM GRID (image strip left, TRUE right, PERFECTION below) */}
      <div
        ref={bottomGridRef}
        className="
          absolute left-1/2 -translate-x-1/2 bottom-[8vh]
          w-[min(92vw,1280px)]
          grid
          [grid-template-columns:clamp(250px,56vw,880px)_1fr]
          [grid-template-rows:auto_auto]
          gap-x-[2vw] gap-y-[1.5vw]
          items-end
          opacity-0 translate-y-6
        "
      >
        {/* Image strip */}
        <div className="relative col-[1] row-[1] h-[22vh] min-h-[140px] overflow-hidden">
          <img
            src={bottomImg}
            alt=""
            className="w-full h-full object-cover block"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />
        </div>

        {/* TRUE (to the right of strip) */}
        <div
          ref={trueRef}
          className="col-[2] row-[1] self-end opacity-0 translate-y-4"
        >
          <span className="font-quattrocento tracking-[0.06em] text-[#8e857c] text-[6vw] md:text-[5vw] lg:text-[4vw]">
            TRUE
          </span>
        </div>

        {/* PERFECTION. (own line below; spans both columns) */}
        <div
          ref={perfectionRef}
          className="col-[1_/_span_2] row-[2] opacity-0 translate-y-4"
        >
          <span className="font-quattrocento tracking-[0.08em] text-[#8e857c] block text-[8vw] md:text-[7vw] lg:text-[6vw]">
            PERFECTION.
          </span>
        </div>
      </div>
    </section>
  );
}

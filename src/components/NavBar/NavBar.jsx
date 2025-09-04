import { Link } from "react-router-dom";
import Logo from "/images/nav-logo.png";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function NavBar() {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    navTween.fromTo(
      "nav",
      {
        backgroundColor: "transparent",
      },
      {
        backgroundColor: "#272526",
        duration: 1,
        ease: "power1.inOut",
      }
    );
  });

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-50 font-quattrocento">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 py-3">
        {/* Logo */}
        <div className="shrink-0">
          <Link to="/">
            <img
              src={Logo}
              alt="Hotel Logo"
              className="h-12 w-auto md:h-16 transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-8 text-[15px] uppercase tracking-wide text-white">
          {["Stay", "Dine", "Explore", "Events", "About"].map((item) => (
            <li key={item}>
              <Link
                to="/"
                className="relative px-2 py-1 transition-colors duration-300 hover:text-gray-200"
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (optional placeholder) */}
        <button className="md:hidden text-white focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

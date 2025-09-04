import PropTypes from "prop-types";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

export default function ImageTextSplit({
  image,
  alt,
  title,
  text,
  reverse = false,
}) {
  useGSAP(() => {
    const textSplit = new SplitText(".text", { type: "lines" });

    gsap.from(textSplit.lines, {
      scrollTrigger: {
        trigger: ".text",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      delay: 0.25,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "imageTextSplit",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".imgSplit", { y: 150 }, 0)
      .to(".text", { y: -100 }, 0);
  });

  return (
    <section className="imageTextSplit w-full bg-neutral-50 m-12">
      <div
        className={`max-w-[2400px] mx-auto flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={image}
            alt={alt}
            className="imgSplit w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-8 md:p-16">
          <div className="max-w-md text-center md:text-left">
            {title && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {title}
              </h2>
            )}
            <p className="text text-gray-700 leading-relaxed text-2xl">
              {text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

ImageTextSplit.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
};

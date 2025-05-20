// components/Aos.jsx
import { useEffect, Children, cloneElement } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const animations = [
  "fade-up",
  "fade-down",
  "fade-right",
  "fade-left",
  "zoom-in",
  "zoom-out",
  "flip-up",
  "flip-down",
  "flip-left",
  "flip-right",
  "slide-up",
  "slide-down",
];

export default function AosWrapper({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 100,
      easing: "ease-in-out-back",
      once: true,
      mirror: false, // whether elements animate out while scrolling past them
    });
    AOS.refresh();
  }, []);

  return (
    <>
      {Children.map(children, (child, idx) => {
        if (!child || typeof child !== "object") return child;
        const animation = animations[idx % animations.length];
        return cloneElement(child, {
          ...child.props,
          "data-aos": animation,
          "data-aos-delay": idx * 100,        // staggered delays
          "data-aos-duration": 1000 + idx * 100, // slightly varied durations
        });
      })}
    </>
  );
}

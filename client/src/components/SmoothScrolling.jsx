import React from "react";
import { ReactLenis } from "lenis/react";

export const SmoothScrolling = ({ children }) => {

  const options = {
    duration: 1.2,
    // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    direction: "vertical",
    gestureDirection: "vertical",
  };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
};

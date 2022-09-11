import React, { useEffect, useState, useRef } from "react";

function randomColor(currentColor) {
  const COLOR_LIST = ["red", "green", "yellow"];
  const currentIndex = COLOR_LIST.indexOf(currentColor);
  let newIndex = currentIndex;
  while (newIndex === currentIndex) {
    newIndex = Math.trunc(Math.random() * 3);
  }

  return COLOR_LIST[newIndex];
}

function useMagicColor(props) {
  const [color, setColor] = useState("transparent");
  const colorRef = useRef("transparent");

  // Change color every seconds.
  useEffect(() => {
    const colorInterval = setInterval(() => {
      console.log("Changed color: ", colorRef.current);

      const newColor = randomColor(colorRef.current);
      setColor(newColor);

      colorRef.current = newColor;
    }, 1000);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  return color;
}

export default useMagicColor;

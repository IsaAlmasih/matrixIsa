"use client";
import { useEffect, useRef } from "react";

const langs = [
  "010000010111",
  "100100101011",
  "011010110101",
  "110010101010",
  "101111111111",
  "111111100010",
  "010010101011",
  "100100101010",
  "001000000001",
  "110010101110",
  "001010101001",
  "110000000110",
  "011010101001",
  "100110111110",
  "010101010101",
  "110010101110",
  "100000011111",
];

const columnGap = 20;
const characterGap = 20;

export const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let columns = [];
    let animationFrame;
    let lastFrameTime = 0;
    const frameInterval = 100;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.font = "16px monospace";
      context.textBaseline = "top";

      columns = [];
      for (let x = 0; x < window.innerWidth; x += columnGap) {
        const text = langs[Math.floor(Math.random() * langs.length)];
        const initialOffset = Math.floor(Math.random() * text.length);
        const speed = Math.floor(Math.random() * 6) + 3;

        columns.push(
          Array.from(text, (value, index) => ({
            value,
            y: (initialOffset + index + 1) * characterGap,
            speed,
          })),
        );
      }
    };

    const draw = (timestamp) => {
      animationFrame = window.requestAnimationFrame(draw);
      if (timestamp - lastFrameTime < frameInterval) return;

      const elapsed = lastFrameTime ? timestamp - lastFrameTime : frameInterval;
      lastFrameTime = timestamp;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = "#0000FF";
      columns.forEach((column, columnIndex) => {
        column.forEach((character) => {
          character.y =
            character.y > window.innerHeight
              ? 0
              : character.y + (character.speed * elapsed) / frameInterval;
          context.fillText(
            Math.random() < 0.1 ? "0" : character.value,
            columnIndex * columnGap,
            character.y,
          );
        });
      });
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "black",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
};

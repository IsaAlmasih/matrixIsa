import { useRef, useEffect, useState } from "react";
import "./MatrixRainCard.css";
import Link from "next/link";

const MatrixRainCard = ({ name, id, image, link, hasMatrixRain=false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current; 
    if (!hasMatrixRain||!canvas) return
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const fontSize = 10; // Размер символа
    const columns = Math.floor(canvas.width / fontSize); // Количество колонок

    // Создаём массив капель
    const drops = Array.from({ length: columns }, () => ({
      y: -Math.random() * canvas.height, // Начальная позиция строго сверху
      speed: 4 + Math.random() * 5, // Увеличиваем диапазон скоростей для капель
    }));

    const draw = () => {
      // Тёмный фон с лёгкой прозрачностью для размытия
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Зелёные символы
      ctx.fillStyle = "#00FF00";
      ctx.font = `${fontSize}px monospace`;

      // Рисуем каждую каплю
      drops.forEach((drop, index) => {
        const text = String.fromCharCode(0x30a0 + Math.random() * 96); // Случайный символ Юникода

        const x = index * fontSize; // Позиция X
        const y = drop.y;

        ctx.fillText(text, x, y);

        // Обновляем позицию капли
        drop.y += drop.speed;

        // Сбрасываем каплю, если она выходит за нижнюю границу
        if (drop.y > canvas.height) {
          drop.y = -fontSize; // Сбрасываем её строго сверху
          drop.speed = 1 + Math.random() * 7; // Обновляем скорость
        }
      });
    };

    let animationFrame = null;
    let frameTimeout = null;
    let isVisible = false;
    const frameInterval = 50;

    const scheduleDraw = () => {
      if (!isVisible || document.hidden || animationFrame !== null || frameTimeout !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(drawFrame);
    };

    const stop = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      if (frameTimeout !== null) {
        window.clearTimeout(frameTimeout);
        frameTimeout = null;
      }
    };

    const drawFrame = () => {
      animationFrame = null;
      if (!isVisible || document.hidden) return;

      draw();
      frameTimeout = window.setTimeout(() => {
        frameTimeout = null;
        scheduleDraw();
      }, frameInterval);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        scheduleDraw();
      } else {
        stop();
      }
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        scheduleDraw();
      }
    };

    observer.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stop();
    };
  }, [hasMatrixRain]);

  return (
    <div className="matrix-card" key={id}>
      {hasMatrixRain&&<canvas ref={canvasRef} className="matrix-canvas"></canvas>}
      <div className="matrix-content">
        <h2>{name}</h2>
       {link && <a href={link}>Войти</a>}
      </div>
    </div>
  );
};

export default MatrixRainCard;

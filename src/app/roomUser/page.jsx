import "./room-globals.css";
import styles from "../roomUser/styles.module.css";

// .face — глобальный класс, остальное берём из модуля
const F = (name) => `face ${styles[name]}`;

// Шесть граней куба: front/back/right/left/top/bottom
function Box({ base, top }) {
  const faces = ["front", "back", "right", "left", "top", "bottom"];
  return (
    <>
      {faces.map((f) => (
        <div key={f} className={F(`${base}__${f}`)}>
          {f === "top" ? top : null}
        </div>
      ))}
    </>
  );
}

export default function RoomPage() {
  const lights = Array.from({ length: 9 }, (_, i) => (
    <div key={i} className={styles.light} />
  ));

  return (
    <div className={styles.house} id="h">
      <div className={styles["h-lights"]}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={styles["h-light"]} />
        ))}
      </div>
      <div className={styles["h-shadow"]} />

      <div className={styles.alt}>
        <Box base="alt" top={lights} />
      </div>
      <div className={styles.alb}>
        <Box base="alb" />
      </div>
      <div className={styles.arb}>
        <Box base="arb" />
      </div>

      <div className={styles.blt}>
        <Box base="blt" />
      </div>
      <div className={styles.blt2}>
        <Box base="blt2" />
      </div>
      <div className={styles.blb}>
        <Box base="blb" />
      </div>
      <div className={styles.blb2}>
        <Box base="blb2" />
      </div>

      <div className={styles["puerta-c"]}>
        <div className={styles.puerta}>
          <Box base="puerta" />
        </div>
        <div className={styles["puerta-l"]}>
          <Box base="puerta-l" />
        </div>
        <div className={styles["puerta-r"]}>
          <Box base="puerta-r" />
        </div>
        <div className={styles["puerta-t"]}>
          <Box base="puerta-t" />
        </div>
      </div>

      <div className={styles["cuadro-l"]}>
        <Box base="cuadro-l" />
      </div>
      <div className={styles["cuadro-r"]}>
        <Box base="cuadro-r" />
      </div>
      <div className={styles.librero}>
        <Box base="librero" />
      </div>

      <div className={styles.libros}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={styles.libro}>
            <Box base="libro" />
          </div>
        ))}
      </div>

      <div className={styles.fotos}>
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className={styles.foto}>
            <Box base="foto" />
          </div>
        ))}
      </div>

      <div className={styles.cajas}>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className={styles.caja}>
            <Box base="caja" />
          </div>
        ))}
      </div>

      <div className={styles.tv}>
        <Box base="tv" />
      </div>
      <div className={styles["repisa-t"]}>
        <Box base="repisa-t" />
      </div>
      <div className={styles["repisa-b"]}>
        <Box base="repisa-b" />
      </div>
      <div className={styles["bocina-l"]}>
        <Box base="bocina-l" />
      </div>
      <div className={styles["bocina-r"]}>
        <Box base="bocina-r" />
      </div>
      <div className={styles.muro}>
        <Box base="muro" />
      </div>

      <div className={styles["sillon-c"]}>
        <div className={styles["sillon-b"]}>
          <Box base="sillon-b" />
        </div>
        <div className={styles["sillon-t"]}>
          <Box base="sillon-t" />
        </div>
        <div className={styles["sillon-l"]}>
          <Box base="sillon-l" />
        </div>
        <div className={styles["sillon-r"]}>
          <Box base="sillon-r" />
        </div>
      </div>

      <div className={styles["mesa-c"]}>
        <div className={styles.mesa}>
          <Box base="mesa" />
        </div>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={styles["mesa-p"]}>
            <Box base="mesa-p" />
          </div>
        ))}
        <div className={styles["mesa-shadow"]} />
      </div>

      <div className={styles.tablet}>
        <Box base="tablet" />
      </div>
    </div>
  );
}

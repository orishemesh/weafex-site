import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Weafex — The Fifth Element of the Global Economy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(60% 60% at 80% 10%, rgba(37,99,235,0.55), transparent 60%), radial-gradient(50% 60% at 10% 100%, rgba(255,95,95,0.45), transparent 60%), #0A1226",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            opacity: 0.85,
          }}
        >
          Weafex
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 920,
            backgroundImage: "linear-gradient(100deg, #8ab0ff, #ffffff 45%, #ff8d8d)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          The fifth element of the global economy
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          A network for international trade — built from the ground up.
        </div>
      </div>
    ),
    { ...size }
  );
}

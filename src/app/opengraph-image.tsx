import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";

export const alt = "Solomiia Badun – Strength Coach for Women";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#FFF4EE",
        color: "#1E1E1E",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "#FF7A3A",
          display: "flex",
          flex: "0 0 22px",
        }}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px 68px",
        }}
      >
        <div
          style={{
            color: "#FF7A3A",
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Strength Coach for Women
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "serif",
              fontSize: 92,
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            Build Strength.
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "serif",
              fontSize: 92,
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            Move Freely.
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: 26,
            justifyContent: "space-between",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span>{siteConfig.name}</span>
          <span style={{ color: "#6D625B" }}>Wien · Online</span>
        </div>
      </div>
    </div>,
    size,
  );
}

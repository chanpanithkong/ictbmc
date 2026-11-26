import { ImageResponse } from "next/og";

// Note: rendered in English for both locales — Khmer glyphs would need an embedded Khmer font file.
export const alt = "ICT Banteay Meanchey — Your Trusted Technology Partner for Business Growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 85% 0%, #1d4ed8 0%, #0B1120 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="url(#bg)" />
            <path
              d="M13 9.5V6.5M19 9.5V6.5M13 22.5v3M19 22.5v3M9.5 13h-3M9.5 19h-3M22.5 13h3M22.5 19h3"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <rect x="9.5" y="9.5" width="13" height="13" rx="3" fill="none" stroke="#fff" strokeWidth="1.8" />
            <rect x="13.25" y="13.25" width="5.5" height="5.5" rx="1.4" fill="#fff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>ICT</div>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: 4, color: "#22D3EE", marginTop: 6 }}>
              BANTEAY MEANCHEY
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
            Technology That Empowers Your Business.
          </div>
          <div style={{ fontSize: 30, color: "#94a3b8", marginTop: 28 }}>
            Banteay Meanchey, Cambodia · Software · IT Consulting · Business Systems
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

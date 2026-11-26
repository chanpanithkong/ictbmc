import { ImageResponse } from "next/og";

export const alt = "ICT BMC — Your Trusted Technology Partner for Business Growth";
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
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #2563EB, #06B6D4)",
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 700, display: "flex" }}>
            ICT&nbsp;<span style={{ color: "#22D3EE" }}>BMC</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
            Technology That Empowers Your Business.
          </div>
          <div style={{ fontSize: 30, color: "#94a3b8", marginTop: 28 }}>
            Software Development · IT Consulting · Business Systems · IT Support
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

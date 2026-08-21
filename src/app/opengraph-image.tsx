import { ImageResponse } from "next/og";

export const alt = "Promptfolio — The Premium AI Prompt Library";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#08080a",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(212,175,106,0.25), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "#17171a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M8 5V19" stroke="#d4af6a" strokeWidth="1.75" strokeLinecap="round" />
              <path
                d="M8 5H12.4C14.9188 5 17 6.88 17 9.3C17 11.72 14.9188 13.4 12.4 13.4H8"
                stroke="#d4af6a"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="17.5" cy="5.5" r="1.4" fill="#d4af6a" />
            </svg>
          </div>
          <div style={{ color: "#f6f5f2", fontSize: 34, fontWeight: 600 }}>Promptfolio</div>
        </div>
        <div
          style={{
            color: "#f6f5f2",
            fontSize: 58,
            fontWeight: 600,
            letterSpacing: -2,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.1,
          }}
        >
          The Premium AI Prompt Library
        </div>
        <div style={{ color: "#9d9c96", fontSize: 24, marginTop: 24 }}>
          Discover, save, and ship better AI prompts.
        </div>
      </div>
    ),
    { ...size }
  );
}

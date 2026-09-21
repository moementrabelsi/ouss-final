import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = "Oussema Lammouchi — Digital Innovation & Business";
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
          justifyContent: "space-between",
          backgroundColor: "#f4f3ef",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ width: 16, height: 16, backgroundColor: "#ccf23f" }} />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              color: "#57554e",
            }}
          >
            {site.name.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 108,
            lineHeight: 1,
            letterSpacing: -4,
            color: "#0d0d0c",
          }}
        >
          <div style={{ display: "flex" }}>Digital</div>
          <div style={{ display: "flex", paddingLeft: 72 }}>Innovation</div>
          <div style={{ display: "flex" }}>&amp; Business</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            color: "#57554e",
          }}
        >
          <div style={{ display: "flex" }}>AACHEN, GERMANY</div>
          <div style={{ display: "flex" }}>FH AACHEN</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

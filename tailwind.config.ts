import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Locked Weafex brand tokens (source: NOVA-VAULT/01_Brand/visual-identity.md)
        weafex: {
          blue: "#2563EB", // electric-blue — small accents, links
          coral: "#FF5F5F", // vibrant-coral — rare accent + primary CTA
          coralDeep: "#C73838", // AA-contrast coral — text/links on light bg (5.18:1)
          navy: "#111827", // dark-navy — primary text/headings
          grey: "#F3F4F6", // cool-grey
          white: "#FFFFFF",
          paper: "#F4F5F7", // off-white editorial section background
          line: "#E6E8EC", // hairline borders
          muted: "#6B7280", // muted body text
          ink: "#0E1117", // near-black for the rare dark band / footer
          space: "#0A1226",
          spaceDeep: "#060A18",
        },
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        shimmer: "shimmer 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

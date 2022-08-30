module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFE885",
        lightyellow:"#F9C301",
        orange: "#F0912C",
        button_border: "#fed7aa",
        pink: "#FFF7E2",
        sidenav_pink: "#FFF4D4",
        nav_text: "#856702",
        table_head_text: "#78322B",
        line: "#939393",
        search: "#F3EBE1",
        input_color: "#F4EDE3",
        darkyellow: "#F0912C",
        background: "#F5F5F5",
        darkwhite: "#FAFAFA",
        bglightyellow: "#FF8E16",
        bggray: "#C4C4C4",
        bgpink: "#FCEDEA",
        borderpink: "#FEA6A6",
        yellowstar: "#FFBB10",
        managetable: "#8F8F8F",
        submenu: "#F7BF41",
      },
      width: {
        85: "20.4rem",
        42: "10.75rem",
      },
      margin: {
        13: "3.25rem",
        18: "4.87rem",
      },
      height: {
        18: "4.5rem",
        17: "4.25rem",
      },
      padding: {
        21: "5.3rem",
      },
    },
  },
  variants: {
    extend: {
      backgroundcolor: ["checked"],
    },
  },
  plugins: [],
};

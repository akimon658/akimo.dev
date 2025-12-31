export default {
  theme: {
    fontFamily: {
      sans: ["Atkinson Hyperlegible", "sans-serif"],
      mono: ["monospace"],
    },
    extend: {
      colors: {
        "vsc-back": "#1f1f1f",
        "vsc-front": "#d4d4d4",
      },
      content: {
        "open-in-new": "url('/icon/open_in_new_16dp_2563EB.svg')",
        "open-in-new-dark": "url('/icon/open_in_new_16dp_60A5FA.svg')",
        "open-in-new-gray": "url('/icon/open_in_new_16dp_6B7280.svg')",
        "open-in-new-gray-dark": "url('/icon/open_in_new_16dp_9CA3AF.svg')",
      },
      typography: (theme: (s: string) => string) => ({
        DEFAULT: {
          css: {
            "code:not(pre > code)": {
              backgroundColor: theme("colors.gray.100"),
              borderRadius: "0.25rem",
              margin: "0.125rem",
              padding: "0.125rem 0.25rem",
            },
          },
        },
      }),
    },
  },
}

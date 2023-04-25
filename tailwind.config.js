module.exports =[ {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts,js,tsx,jsx}"],
  },
  rippleui: {
		defaultStyle: false,
	},
  theme: {
    extend: {},
    container: {
      center: true,
    }
  },
  plugins: [
    [require("rippleui")]
  ]
}]
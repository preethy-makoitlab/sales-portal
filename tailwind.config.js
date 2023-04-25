module.exports =[ {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts,js}"],
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
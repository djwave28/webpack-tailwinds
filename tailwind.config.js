const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./components/**/*.{php,html,js}",
        "./pages/**/*.{php,html,js}",
        "./views/**/*.{php,html,js}",
        "./index.php",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
        plugin(function({ addComponents }) {
            addComponents({
                ".btn": {
                    padding: ".5rem 1rem !important",
                    borderRadius: ".5rem !important",
                    fontWeight: "600 !important",
                    backgroundColor: "lightblue",
                    cursor: "pointer",
                },
            });
        }),
        plugin(function({ addBase, theme }) {
            addBase({
                h1: { fontSize: theme("fontSize.xl") },
                h2: { fontSize: theme("fontSize.xl") },
                h3: { fontSize: theme("fontSize.lg") },
            });
        }),
    ],
};
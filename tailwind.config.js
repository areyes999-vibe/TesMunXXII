/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./app.js",
        "./data.js",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#1a237e",
                secondary: "#b71c1c",
                accent: "#aeea00",
                "background-light": "#f5f5f5",
                "tesmun-blue": "#141539",
                "surface-dark": "#1c1f4a",
                "menu-hover": "#ffffff",
            },
            fontFamily: {
                display: ["Oswald", "sans-serif"],
                body: ["Montserrat", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.5rem",
            },
            backgroundImage: {
                "hero-pattern":
                    "linear-gradient(to bottom, rgba(19,21,54,0.4), rgba(19,21,54,0.9)), url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            },
        },
    },
    plugins: [],
};

// Tailwind configuration for the project
// This script should be loaded after the Tailwind CDN script

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#007bff",
                "background-light": "#f5f7f8",
                "background-dark": "#0f1923",
            },
            fontFamily: {
                "display": ["Inter"]
            },
            borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
        },
    },
};
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

export default defineConfig(({ command }) => {
    const config = {
        base: command === "build" ? "/cnc-dashboard/" : "/",
        plugins: [react()],
    };

    // GitHub Pages fallback: serve index.html for client routes.
    if (command === "build") {
        config.plugins.push({
            name: "copy-404",
            closeBundle() {
                const indexHtml = resolve(__dirname, "dist/index.html");
                const notFoundHtml = resolve(__dirname, "dist/404.html");
                fs.copyFileSync(indexHtml, notFoundHtml);
            },
        });
    }

    return config;
});

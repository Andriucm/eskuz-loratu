import { fileURLToPath, URL } from "node:url";
import { resolve,dirname } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

export default defineConfig({
	base: "/",
    plugins: [
        VueI18nPlugin({
            include: resolve(
                dirname(fileURLToPath(import.meta.url)),
                "./src/i18n/locales/**"
            ),
        }),
		vue(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Eskuz Loratu",
				short_name: "Eskuz Loratu",
				icons: [
					{
						src: "/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa-maskable-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "/pwa-maskable-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
				start_url: "/",
				display: "standalone",
				background_color: "#FFFFFF",
				theme_color: "#FFFFFF",
				description: "Catalogo Digital para mis Joyas",
			},
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	css: {
		postcss: {
			plugins: [tailwind(), autoprefixer()],
		},
	},
});

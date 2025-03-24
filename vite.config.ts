import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [tailwindcss()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.ts"),
			name: "StragaUI",
			// the proper extensions will be added
			fileName: "straga-ui",
		},

		rollupOptions: {
			output: {
				assetFileNames: "css/[name][extname]", // Without hash
			},
		},
	},
});

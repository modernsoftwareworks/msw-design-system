import { defineConfig } from "vite-plus";

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: ["./test/setup.ts"],
		include: ["packages/*/src/**/*.test.{ts,tsx}", "apps/*/src/**/*.test.{ts,tsx}"],
	},
});

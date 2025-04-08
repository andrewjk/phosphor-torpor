import { defineConfig } from "vitest/config";
import torpor from "@torpor/unplugin/vite";
//import { svelteTesting } from "@testing-library/svelte/vite";

export default defineConfig({
  plugins: [torpor({ hot: false }) /*, svelteTesting()*/],
  test: {
    include: ["./**/*.test.js"],
    setupFiles: ["./tests/__setup__/vitest-setup.js"],
  },
});

import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "React Inspector",
  description:
    "React Inspector allows you to navigate to the source code of the component easily. Launch with Ctrl+Shift+X (Command+Shift+X on Mac).",
  icons: {
    "16": "icon/icon16.png",
    "48": "icon/icon48.png",
    "128": "icon/icon128.png",
  },
  action: {
    default_title:
      "React Inspector: Press Ctrl+Shift+X (Command+Shift+X on Mac)",
  },
  version: "1.2.2",
  content_scripts: [{ js: ["src/content.ts"], matches: ["<all_urls>"] }],
  devtools_page: "src/devtools.html",
  options_page: "src/options.html",
  background: { service_worker: "src/background.ts", type: "module" },
  commands: {
    inspect: {
      suggested_key: { default: "Ctrl+Shift+X", mac: "Command+Shift+X" },
      description: 'Inspect the page using the "React Inspector" extension.',
    },
  },
  permissions: ["activeTab", "contextMenus", "storage"],
});

export default defineConfig({
  server: { port: 54321 },
  plugins: [crx({ manifest })],
  optimizeDeps: {
    entries: ["src/*.html"],
  },
});

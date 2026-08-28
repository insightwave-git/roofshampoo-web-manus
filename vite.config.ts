/* Style reminder: Industrial Eco-Utility — this file only configures the runtime and asset delivery; visual decisions stay in the supplied styles.css. */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function vitePluginStorageProxy(): Plugin {
  return {
    name: "manus-storage-proxy",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/manus-storage", async (req, res) => {
        const key = req.url?.replace(/^\//, "");
        if (!key) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing storage key");
          return;
        }
        const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
        const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;
        if (!forgeBaseUrl || !forgeKey) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Storage proxy not configured");
          return;
        }
        try {
          const forgeUrl = new URL("v1/storage/presign/get", forgeBaseUrl + "/");
          forgeUrl.searchParams.set("path", key);
          const forgeResp = await fetch(forgeUrl, {
            headers: { Authorization: `Bearer ${forgeKey}` },
          });
          if (!forgeResp.ok) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Storage backend error");
            return;
          }
          const { url } = (await forgeResp.json()) as { url: string };
          if (!url) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Empty signed URL");
            return;
          }
          res.writeHead(307, { Location: url, "Cache-Control": "no-store" });
          res.end();
        } catch {
          res.writeHead(502, { "Content-Type": "text/plain" });
          res.end("Storage proxy error");
        }
      });
    },
  };
}

const assetMap: Record<string, string> = {
  "/assets/before-roof.jpg": "/manus-storage/before-roof_180283d4.jpg",
  "/assets/after-roof.jpg": "/manus-storage/after-roof_0bc25c3b.jpg",
  "/assets/shingle-texture.jpg": "/manus-storage/shingle-texture_ef6fad54.jpg",
  "/assets/soft-wash-tech.jpg": "/manus-storage/soft-wash-tech_c105cd47.jpg",
  "/assets/roof-neglected.jpg": "/manus-storage/roof-neglected_87d72b60.jpg",
  "/assets/roof-maintained.jpg": "/manus-storage/roof-maintained_36651cdf.jpg",
  "/assets/roof-black-streaks.jpg": "/manus-storage/roof-black-streaks_11298dd1.jpg",
  "/assets/roof-moss.jpg": "/manus-storage/roof-moss_6cf36e67.jpg",
  "/assets/roof-algae.jpg": "/manus-storage/roof-algae_79556ec9.jpg",
  "/assets/roof-lichen.jpg": "/manus-storage/roof-lichen_4c4a1d7a.jpg",
  "/assets/roof-dirt.jpg": "/manus-storage/roof-dirt_d0d5428c.jpg",
  "/assets/saveyourroof-logo.png": "/manus-storage/saveyourroof-logo_0a1f1d4c.png",
};

function managedAssetBridge(): Plugin {
  return {
    name: "saveyourroof-managed-asset-bridge",
    enforce: "pre",
    transform(code, id) {
      if (!id.split("?")[0].endsWith("/SaveYourRoof.tsx")) return null;
      let transformed = code;
      for (const [source, target] of Object.entries(assetMap)) {
        transformed = transformed.split(source).join(target);
      }
      return transformed === code ? null : { code: transformed, map: null };
    },
  };
}

export default defineConfig({
  root: path.resolve(projectRoot, "client"),
  plugins: [react(), tailwindcss(), vitePluginStorageProxy(), managedAssetBridge(), vitePluginManusRuntime()],
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "client/src"),
    },
  },
  build: {
    outDir: path.resolve(projectRoot, "dist/public"),
    emptyOutDir: true,
  },
});

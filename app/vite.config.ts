import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyEdge from "@netlify/vite-plugin-netlify-edge";
import {vanillaExtractPlugin} from 'styled-vanilla-extract/vite'

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite({
        ssr: { outDir: "netlify/edge-functions/entry.netlify-edge" },
      }),
      tsconfigPaths(),
      vanillaExtractPlugin(),
      netlifyEdge({ functionName: "entry.netlify-edge" }),
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});

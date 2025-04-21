// vite.config.ts
import { defineConfig } from "file:///Users/imagine/project/packages/acrool-react-datepicker/node_modules/vite/dist/node/index.js";
import react from "file:///Users/imagine/project/packages/acrool-react-datepicker/node_modules/@vitejs/plugin-react-swc/index.mjs";
import dts from "file:///Users/imagine/project/packages/acrool-react-datepicker/node_modules/vite-plugin-dts/dist/index.mjs";
import * as path from "node:path";
import { visualizer } from "file:///Users/imagine/project/packages/acrool-react-datepicker/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import eslint from "file:///Users/imagine/project/packages/acrool-react-datepicker/node_modules/vite-plugin-eslint/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/imagine/project/packages/acrool-react-datepicker";
var vite_config_default = defineConfig({
  plugins: [
    eslint(),
    react(),
    dts({
      insertTypesEntry: true
    }),
    visualizer()
  ],
  css: {
    modules: {
      localsConvention: "camelCase",
      scopeBehaviour: "local",
      generateScopedName: "acrool-react-datepicker__[name]__[local]"
    }
  },
  build: {
    sourcemap: process.env.NODE_ENV !== "production",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es"],
      fileName: (format) => `acrool-react-datepicker.${format}.js`
    },
    cssTarget: "chrome61",
    rollupOptions: {
      external: ["react", "react-dom", "dayjs"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "dayjs": "dayjs"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaW1hZ2luZS9wcm9qZWN0L3BhY2thZ2VzL2Fjcm9vbC1yZWFjdC1kYXRlcGlja2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvaW1hZ2luZS9wcm9qZWN0L3BhY2thZ2VzL2Fjcm9vbC1yZWFjdC1kYXRlcGlja2VyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9pbWFnaW5lL3Byb2plY3QvcGFja2FnZXMvYWNyb29sLXJlYWN0LWRhdGVwaWNrZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7dmlzdWFsaXplcn0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcbmltcG9ydCBlc2xpbnQgZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50JztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICBlc2xpbnQoKSxcbiAgICAgICAgcmVhY3QoKSxcbiAgICAgICAgZHRzKHtcbiAgICAgICAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICB2aXN1YWxpemVyKCkgYXMgUGx1Z2luLFxuICAgIF0sXG4gICAgY3NzOiB7XG4gICAgICAgIG1vZHVsZXM6IHtcbiAgICAgICAgICAgIGxvY2Fsc0NvbnZlbnRpb246ICdjYW1lbENhc2UnLFxuICAgICAgICAgICAgc2NvcGVCZWhhdmlvdXI6ICdsb2NhbCcsXG4gICAgICAgICAgICBnZW5lcmF0ZVNjb3BlZE5hbWU6ICdhY3Jvb2wtcmVhY3QtZGF0ZXBpY2tlcl9fW25hbWVdX19bbG9jYWxdJyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgc291cmNlbWFwOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuICAgICAgICBsaWI6IHtcbiAgICAgICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICAgICAgICBmb3JtYXRzOiBbJ2VzJ10sXG4gICAgICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYGFjcm9vbC1yZWFjdC1kYXRlcGlja2VyLiR7Zm9ybWF0fS5qc2AsXG4gICAgICAgIH0sXG4gICAgICAgIGNzc1RhcmdldDogJ2Nocm9tZTYxJyxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ2RheWpzJ10sXG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgICAgICAgICAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RheWpzJzogJ2RheWpzJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVWLFNBQVEsb0JBQW1CO0FBQ2xYLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsWUFBWSxVQUFVO0FBQ3RCLFNBQVEsa0JBQWlCO0FBQ3pCLE9BQU8sWUFBWTtBQUxuQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDQSxrQkFBa0I7QUFBQSxJQUN0QixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsRUFDZjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0QsU0FBUztBQUFBLE1BQ0wsa0JBQWtCO0FBQUEsTUFDbEIsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CO0FBQUEsSUFDeEI7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxXQUFXLFFBQVEsSUFBSSxhQUFhO0FBQUEsSUFDcEMsS0FBSztBQUFBLE1BQ0QsT0FBWSxhQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUM3QyxTQUFTLENBQUMsSUFBSTtBQUFBLE1BQ2QsVUFBVSxDQUFDLFdBQVcsMkJBQTJCO0FBQUEsSUFDckQ7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNYLFVBQVUsQ0FBQyxTQUFTLGFBQWEsT0FBTztBQUFBLE1BQ3hDLFFBQVE7QUFBQSxRQUNKLFNBQVM7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLFNBQVM7QUFBQSxRQUNiO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

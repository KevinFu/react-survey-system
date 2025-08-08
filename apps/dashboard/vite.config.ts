import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => {
  const prod = mode === 'production'

  return {
    plugins: [
      react(),
      viteMockServe({
        mockPath: 'mock',
        logger: true,
      }),
      prod &&
        visualizer({
          open: true,
          filename: 'dist/stats.html',
          gzipSize: true,
          brotliSize: true,
        }),
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          },
          chunkFileNames: (chunkInfo) => {
            const { facadeModuleId } = chunkInfo
            if (facadeModuleId?.includes('survey/stat')) {
              return `surveyStat-[hash].js`
            }
            if (facadeModuleId?.includes('survey/edit')) {
              return `surveyEdit-[hash].js`
            }
            return '[name]-[hash].js'
          },
        },
      },
    },
  }
})

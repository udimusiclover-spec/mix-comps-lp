import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function absoluteOgUrls(siteUrl) {
  return {
    name: 'absolute-og-urls',
    transformIndexHtml(html) {
      if (!siteUrl) {
        return html.replace(/<meta property="og:url" content="__SITE_URL__" \/>\n?/, '')
      }

      const base = siteUrl.replace(/\/$/, '')

      return html
        .replaceAll('content="/og.jpg"', `content="${base}/og.jpg"`)
        .replace('__SITE_URL__', base)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || ''

  return {
    plugins: [react(), tailwindcss(), absoluteOgUrls(siteUrl)],
  }
})

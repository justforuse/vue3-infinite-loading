import path from "node:path";
import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue3 Infinite Loading",
  description: "Doc site for Vue3 Infinite Loading",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // }
      {
        text: 'Guide',
        items: [
          { text: 'Install', link: '/guide/README'},
          { text: 'Start With Hacker News', link: '/guide/start-with-hn'},
          { text: '', link: '/guide/use-with-filter-or-tabs'},
          { text: '', link: '/guide/top-dir-scroll'},
          { text: '', link: '/guide/use-with-el-table'},
          { text: '', link: '/configure-load-msg'},
          { text: '', link: '/configure-plugin-opts'},
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/justforuse/vue3-infinite-loading' }
    ]
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      },
    }
  }
})

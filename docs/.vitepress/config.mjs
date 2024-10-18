import path from "node:path";
import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue3 Infinite Loading",
  description: "Doc site for Vue3 Infinite Loading",
  ignoreDeadLinks: true,
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
          { text: 'Use With Filter/Tabs', link: '/guide/use-with-filter-or-tabs'},
          { text: 'Top Direction Scroll', link: '/guide/top-dir-scroll'},
          { text: 'Use With Element UI', link: '/guide/use-with-el-table'},
          { text: 'Configure Load Messages', link: '/guide/configure-load-msg'},
          // { text: 'Configure Plugin Options', link: '/guide/configure-plugin-opts'},
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
        "@": path.resolve(__dirname, "lib")
      },
    },
    ssr: {
        noExternal: ['element-plus']
    }
  }
})

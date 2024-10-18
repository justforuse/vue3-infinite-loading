import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'esm',
        file: 'lib/index.mjs'
      },
      {
        format: 'umd',
        file: 'lib/index.umd.js',
        name: 'Vue3InfiniteLoading'
      }
    ],
    plugins: [
      vue({
        preprocessStyles: true,
        template: {
          isProduction: true
        }
      }),
      postcss(),
      peerDepsExternal()
    ]
  }
]

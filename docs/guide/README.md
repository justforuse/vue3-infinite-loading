---
previewLink: //jsfiddle.net/PeachScript/a4Lxbf9w/embedded/result/
---
# Guide

## Installation

### NPM

If you are building a large application, we recommend you use the following method:

``` bash
npm install @codog/vue3-infinite-loading
```

## Import

### Component

You can import it as a custom component:

``` vue
<template>
  <infinite-loading></infinite-loading>
</template>

<script setup>
import InfiniteLoading from '@codog/vue3-infinite-loading'
</script>
```

### Plugin API

If you want to configure default options, you can register this plugin through the `use` API of Vue.js:

``` js
// main.js or index.js
import InfiniteLoading from '@codog/vue3-infinite-loading'

Vue.use(InfiniteLoading, { /* options */ });
```

If you use the plugin API, the `InfiniteLoading` component will be registered as a global component.

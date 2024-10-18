<template>
  <header class="hacker-news-header">
    <a target="_blank" href="http://www.ycombinator.com/">
      <img src="https://news.ycombinator.com/y18.svg">
    </a>
    <span>Hacker News</span>
  </header>

  <div class="container">
    <infinite-loading direction="top" @infinite="infiniteHandler"></infinite-loading>
    <div
      class="hacker-news-item"
      v-for="(item, $index) in list"
      :key="$index"
      :data-num="list.length - $index">
      <a target="_blank" :href="item.url" v-text="item.title"></a>
      <p>
        <span v-text="item.points"></span>
        points by
        <a
          target="_blank"
          :href="`https://news.ycombinator.com/user?id=${item.author}`"
          v-text="item.author"></a>
        |
        <a
          target="_blank"
          :href="`https://news.ycombinator.com/item?id=${item.objectID}`"
          v-text="`${item.num_comments} comments`"></a>
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'
// import InfiniteLoading from '@'
import InfiniteLoading from '../../lib'

const page = ref(0)
const list = ref([])
const api = '//hn.algolia.com/api/v1/search_by_date?tags=story';

const infiniteHandler = ($state) => {
  axios.get(api, {
    params: {
      page: page.value,
    },
  }).then(({ data }) => {
    if (data.hits.length) {
      page.value += 1;
      list.value.unshift(...data.hits.reverse());
      $state.loaded();
    } else {
      $state.complete();
    }
  });
}
</script>

<style lang="scss" scoped>

.hacker-news-header {
  /* position: fixed; */
  top: 0;
  left: 0;
  right: 0;
  padding: 4px 20px;
  line-height: 14px;
  background-color: #FF6600;

  img {
    display: inline;
    border: 1px solid #fff;
    vertical-align: middle;
  }

  span {
    font-family: Verdana, Geneva, sans-serif;
    font-size: 14px;
    font-weight: bold;
    vertical-align: middle;
  }
}

.container {
  max-height: 400px;
  overflow: auto;
}

.hacker-news-item {
  $gap: 40px;

  margin: 10px 0;
  padding: 0 10px 0 $gap;
  line-height: 16px;
  font-size: 14px;

  &::before {
    content: attr(data-num) '.';
    float: left;
    margin-left: -$gap;
    width: $gap - 8px;
    color: #888;
    text-align: right;
  }

  > a {
    color: #333;
    text-decoration: none;

    &:hover {
      color: #000;
    }
  }

  p {
    margin: 0;
    font-size: 12px;

    &,
    a {
      color: #888;
    }

    a:not(:hover) {
      text-decoration: none;
    }
  }
}
</style>

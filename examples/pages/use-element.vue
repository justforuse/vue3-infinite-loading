<template>
  <el-table
    :data="list"
    height="624"
    border>
    <el-table-column
      prop="title"
      label="Hacker News Title">
    </el-table-column>
    <el-table-column
      prop="author"
      label="Author"
      width="125">
    </el-table-column>

    <template #append>
      <infinite-loading
        @infinite="infiniteHandler"
        force-use-infinite-wrapper=".el-table__body-wrapper .el-scrollbar__wrap">
      </infinite-loading>
    </template>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
// import InfiniteLoading from '@'
import InfiniteLoading from '../../src'
import { ElTable, ElTableColumn } from 'element-plus'
import 'element-plus/es/components/table/style/css'

const page = ref(0)
const list = ref([])
const api = '//hn.algolia.com/api/v1/search_by_date?tags=story';

const infiniteHandler = ($state) => {
  console.log(111)
  axios.get(api, {
    params: {
      page: page.value,
    },
  }).then(({ data }) => {
    if (data.hits.length) {
      page.value += 1;
      list.value.push(...data.hits);
      $state.loaded();
    } else {
      $state.complete();
    }
  });
}
</script>

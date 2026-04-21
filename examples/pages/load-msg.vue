<template>
  <div class="tab">
    <a
      href="javascript:;"
      :class="{ active: type === 'spinners' }"
      @click="changeType('spinners')"
    >
      spinners
    </a>
    <a
      href="javascript:;"
      :class="{ active: type === 'no-more' }"
      @click="changeType('no-more')"
    >
      no-more
    </a>
    <a
      href="javascript:;"
      :class="{ active: type === 'no-results' }"
      @click="changeType('no-results')"
    >
      no-results
    </a>
    <a
      href="javascript:;"
      :class="{ active: type === 'error' }"
      @click="changeType('error')"
    >
      error
    </a>
  </div>
  <infinite-loading
    ref="infiniteLoadingRef"
    :spinner="spinner"
    @infinite="infiniteHandler"
  />
  <div
    v-show="type === 'spinners'"
    class="spinner-types"
  >
    <h3>Built-in spinner types:</h3>
    <button
      :class="{ active: spinner === 'default' }"
      @click="changeSpinner('default')"
    >
      default
    </button>
    <button
      :class="{ active: spinner === 'spiral' }"
      @click="changeSpinner('spiral')"
    >
      spiral
    </button>
    <button
      :class="{ active: spinner === 'circles' }"
      @click="changeSpinner('circles')"
    >
      circles
    </button>
    <button
      :class="{ active: spinner === 'bubbles' }"
      @click="changeSpinner('bubbles')"
    >
      bubbles
    </button>
    <button
      :class="{ active: spinner === 'waveDots' }"
      @click="changeSpinner('waveDots')"
    >
      waveDots
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InfiniteLoading from '../../lib'

const type = ref('spinners')
const spinner = ref('default')
const infiniteLoadingRef = ref(null)

const infiniteHandler = ($state) => {
  if (type.value === 'error') {
    setTimeout(() => {
      $state.error();
    }, 1000);
  }
}
const changeType = (v) => {
  const stateChanger = infiniteLoadingRef.value.stateChanger

  type.value = v;

  switch (v) {
    case 'spinners':
      stateChanger.reset()
      break;

    case 'no-more':
      stateChanger.reset();
      setTimeout(() => {
        stateChanger.loaded();
        stateChanger.complete();
      }, 1);
      break;

    case 'no-results':
      stateChanger.reset();
      setTimeout(() => {
        stateChanger.complete();
      }, 1);
      break;

    case 'error':
      stateChanger.error();
      break;

    default:
  }
}
const changeSpinner = (v) => {
  spinner.value = v;
}

</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  margin-bottom: 20px;
  font-size: 14px;
  background-color: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

  a {
    flex: 1;
    display: block;
    padding: 0 5px;
    color: #666;
    line-height: 40px;
    text-align: center;
    text-decoration: none;

    &.active {
      color: #4777a5;
      box-shadow: 0 -3px 0 0 #4777a5 inset;
    }
  }
}

.spinner-types {
  /* position: absolute; */
  top: 150px;
  left: 0;
  right: 0;
  padding: 0 12px;

  h3 {
    margin: 0 0 5px 4px;
    font-size: 16px;
    color: #666;
  }

  button {
    margin: 8px 4px;
    min-width: 88px;
    padding: 8px 14px;
    color: #fff;
    font-size: 14px;
    background: linear-gradient(30deg, #3f5b77, #51779b);
    border: 0;
    border-radius: 2px;
    cursor: pointer;
    outline: none;
    transition: 0.2s all;
    overflow: hidden;

    &,
    &:active {
      box-shadow: 0 12px 30px -10px rgba(28, 90, 160, 0.5);
    }

    &:not(:active):not(.active):hover {
      transform: translateY(-1px);
      box-shadow: 0 13px 30px -10px rgba(28, 90, 160, 0.5);
    }

    &.active {
      position: relative;

      &::before {
        content: '\2714';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        color: #51779b;
        font-size: 12px;
        line-height: 10px;
        border: 12px solid transparent;
        border-right-color: #fff;
        border-bottom-color: #fff;
      }
    }
  }
}
</style>

<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/start-with-hn">Start</RouterLink>
    <RouterLink to="/load-msg">LoadMsg</RouterLink>
    <RouterLink to="/use-element">Use Element</RouterLink>
  </nav>
  <main>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  </main>
</template>

<style scoped>
nav {
  display: flex;
  gap: 12px;
}
</style>

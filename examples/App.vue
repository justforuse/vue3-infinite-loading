<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/start-with-hn">Start</RouterLink>
    <RouterLink to="/load-msg">LoadMsg</RouterLink>
    <RouterLink to="/use-element">Use Element</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  display: flex;
  gap: 12px;
}
</style>

<template>
<div class="page-content">
  <Header
    :theme="theme"
    @set-theme="setTheme"
  ></Header>
  <main>
      <HomeContainer></HomeContainer>
      <DetailContainer></DetailContainer>
  </main>
</div>
</template>


<script>
import Header from './components/Header.vue';
import HomeContainer from './components/home/HomeContainer.vue';
import DetailContainer from './components/details/DetailContainer.vue';

export default {
  name: 'App',
  data() { return {
    theme: 'light'
  }},
  components: {
    Header,
    HomeContainer,
    DetailContainer
  },
  methods: {
    setTheme(name) {
      document.documentElement.className = name;
      this.theme = name;
    },
  }
}
</script>


<style>
@import url('/styles/reset.css');

:root,
:root.light {
  --invert-percent: 0%;
  --text-color: hsl(200, 15%, 8%); /* Light Mode Text */
  --background-color: hsl(0, 0%, 98%); /* Light Mode Background */
  --input-color: hsl(0, 0%, 52%); /* Light Mode Input */
  --element-color: hsl(0, 0%, 100%); /* Light Mode Elements */
}
:root.dark {
  --invert-percent: 100%;
  --text-color: hsl(0, 0%, 100%); /* Dark Mode Text */
  --background-color: hsl(207, 26%, 17%);  /* Dark Mode Background */
  --element-color: hsl(209, 23%, 22%); /* Dark Mode Elements */
}


html {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.0625rem;
}

body {
  font-size: 16rem;
  font-weight: 300;
  color: var(--text-color);
  min-height: 100vh;
  background: var(--background-color);
}

main {
  padding: 20rem 60rem;
}

</style>

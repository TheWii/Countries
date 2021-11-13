<template>
<div class="page-content">
  <Header
    :theme="theme"
    @set-theme="setTheme"
  ></Header>
  <main>
      <HomeContainer
        ref="home"
        :activeContainer="activeContainer"
        @open-result="openResult"
      ></HomeContainer>
      <DetailContainer
        ref="details"
        :activeContainer="activeContainer"
        :ctx="resultContext"
        @open-container="openContainer"
      ></DetailContainer>
  </main>
</div>
</template>


<script>
import Header from './components/Header.vue';
import HomeContainer from './components/home/HomeContainer.vue';
import DetailContainer from './components/details/DetailContainer.vue';

export default {
  name: 'App',
  components: {
    Header,
    HomeContainer,
    DetailContainer
  },
  data() { return {
    theme: localStorage.getItem('theme') || 'light',
    activeContainer: 'home',
    resultContext: null
  }
  },
  created() {
    this.setTheme(this.theme);
  },
  methods: {
    setTheme(name) {
      document.documentElement.className = name;
      this.theme = name;
      localStorage.setItem('theme', name);
    },

    openContainer(containerId) {
      console.log(`App -> Opening container: ${containerId}`)
      this.activeContainer = containerId;
    },

    setContext(result) {
      console.log('App -> Setting target.');
      this.resultContext = result;
    },

    openResult(context) {
      this.setContext(context);
      this.openContainer('details');
    }
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
  position: relative;
  font-size: 16rem;
  font-weight: 300;
  color: var(--text-color);
  min-height: 100vh;
  background: var(--background-color);
}

main {
  overflow-x: hidden;
  width: 100%;
}
main > .container {
  padding: 40rem 60rem;
}

</style>

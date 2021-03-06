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
        :ctx="context"
        @open-result="openResult"
      ></HomeContainer>
      <DetailContainer
        ref="details"
        :activeContainer="activeContainer"
        :ctx="context"
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
    context: {
      result: {},
      scroll: {},
    }
  }},
  created() {
    this.setTheme(this.theme);
    window.addEventListener('scroll', () => this.scroll());
  },
  methods: {
    setTheme(name) {
      document.documentElement.className = name;
      this.theme = name;
      localStorage.setItem('theme', name);
    },

    openContainer(containerId) {
      console.log(`App -> Opening container: ${containerId}`);
      this.updateScroll();
      this.activeContainer = containerId;
    },

    setResultContext(result) {
      console.log('App -> Setting target.');
      this.context.result = result;
    },

    openResult(context) {
      this.setResultContext(context);
      this.openContainer('details');
    },

    updateScroll() {
      const id = this.activeContainer;
      if (!id) return;
      const el = document.documentElement;
      const scroll = this.context.scroll;
      scroll[id] = scroll[id] || {};
      scroll[id].offset = el.scrollTop;
      scroll[id].height = el.scrollHeight;
      scroll[id].size = el.clientHeight;
      scroll[id].progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
    },

    scroll() {
      if (!this.activeContainer) return;
      this.updateScroll();
      this.$refs[this.activeContainer].scroll();
    }
  }
}
</script>


<style>

* {
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
}

input {
    background: none;
    outline: none;
    border: none;
}
input::placeholder {
    font-size: inherit;
    color: inherit;
    opacity: 1;
}

ul {
    list-style: none;
}

img {
    display: block;
}
:root,
:root.light {
  --invert-percent: 0%;
  --text-color: hsl(200, 15%, 8%); /* Light Mode Text */
  --text-contrast-color: hsl(0, 0%, 100%); /* Light Mode Text */
  --background-color: hsl(0, 0%, 98%); /* Light Mode Background */
  --input-color: hsl(0, 0%, 52%); /* Light Mode Input */
  --element-color: hsl(0, 0%, 100%); /* Light Mode Elements */
  --element-hover-color: hsl(0, 0%, 95%); /* Light Mode Elements */
  --image-placeholder-color: hsl(0, 0%, 100%); /* Light Mode Elements */
}
:root.dark {
  --invert-percent: 100%;
  --text-color: hsl(0, 0%, 100%); /* Dark Mode Text */
  --text-contrast-color: hsl(200, 15%, 8%); /* Light Mode Text */
  --background-color: hsl(207, 26%, 17%);  /* Dark Mode Background */
  --element-color: hsl(209, 23%, 22%); /* Dark Mode Elements */
  --element-hover-color: hsl(209, 23%, 28%); /* Dark Mode Elements */
  --image-placeholder-color: hsl(209, 23%, 28%); /* Dark Mode Elements */
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
  overflow: hidden;
  width: 100%;
  max-width: 1440rem;
  margin: auto;
}
main > .container {
  padding: 40rem 60rem;
}

@media screen and (max-width: 600px) {
  main > .container {
      padding: 40rem 25rem;
  }
}

</style>

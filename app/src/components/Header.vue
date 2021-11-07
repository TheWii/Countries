<template>
<header>
    <h1>Where in the world?</h1>
    <button @click="switchTheme" title="Switch theme between light and dark mode">
        <img src="../assets/moon.svg" alt="Moon icon">
        <span> Dark Mode </span>
    </button>
</header>
</template>


<script>
export default {
    name: 'Header',
    props: [ 'theme' ],
    methods: {
        switchTheme() {
            if (this.theme === 'dark') {
                this.$emit('set-theme', 'light');
            } else this.$emit('set-theme', 'dark');
        }
    }
}
</script>


<style scoped>

header {
    display: flex;
    justify-content: space-between;
    padding: 20rem 60rem;
    background: var(--element-color);
    box-shadow: 0 0 10rem rgba(0, 0, 0, 0.1);
}

h1 {
    font-weight: 800;
    font-size: 18rem;
}

button {
    font-size: 16rem;
    font-weight: 600;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 8rem;
    cursor: pointer;
}

button > img {
    font-size: 1em;
    width: 1em;
    filter: invert(var(--invert-percent));
}
</style>
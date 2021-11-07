<template>
<form class="search-bar"
  @submit="search"
>
    <button type="submit">
        <img class="search-icon" src="../assets/search.svg" alt="Search icon">
    </button>
    <input type="text"
      :placeholder="placeholder"
      v-model="query"
      @input="typed"
    >
</form>
</template>


<script>
export default {
    name: 'SearchBar',
    props: [ 'placeholder' ],
    data() { return {
        query: ''
    }},
    methods: {
        typed() {
            this.$emit('typed', this.query);
        },
        search(event) { 
            event.preventDefault();
            this.$emit('search', this.query);
         }
    }
}
</script>


<style scoped>

.search-bar {
    display: flex;
    align-items: center;
    gap: 16rem;
    padding: 8rem 24rem;
    border-radius: 4rem;
    background: var(--element-color);
    box-shadow: 2rem 2rem 10rem rgba(0, 0, 0, 0.05);
}

button {
    display: block;
    height: 40rem;
    width: 40rem;
}

.search-icon {
    display: block;
    width: 20rem;
    height: 20rem;
    margin: auto;
    opacity: 0.4;
}
html.dark button > img {
    filter: invert(var(--invert-percent));
    opacity: 1;
}

input::placeholder {
    opacity: 0.75;
}

</style>
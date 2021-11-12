<template>
<form class="search-bar"
  @submit="search"
>
    <button type="submit"
      :class="{ searching }"
    >
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
    props: [ 'placeholder', 'searching' ],
    data() { return {
        query: '',
        timeout: null
    }},
    methods: {
        typed() {
            this.setTimeout();
            this.$emit('typed', this.query);
        },

        setTimeout() {
            if (this.timeout) this.resetTimeout();
            this.timeout = setTimeout(() => {
                this.search();
            }, 400);
        },

        resetTimeout() {
            clearTimeout(this.timeout);
            this.timeout = null;
        },

        search(event) { 
            this.resetTimeout();
            if (event) event.preventDefault();
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
    width: 100%;
    max-width: 400rem;
    padding: 5rem 24rem;
    border-radius: 4rem;
    background: var(--element-color);
    box-shadow: 2rem 2rem 10rem rgba(0, 0, 0, 0.05);
}

button {
    flex-shrink: 0;
    display: block;
    height: 40rem;
    width: 40rem;
    border-radius: 50%;
    border: 2.25rem solid rgba(0, 0, 0, 0);
}

button.searching {
    animation: blink 0.75s infinite;
}

@keyframes blink {
    0% {
        border-color: rgba(0, 0, 0, 0);
    }
    50% {
        border-color: var(--text-color);
    }
    100% {
        border-color: rgba(0, 0, 0, 0);
    }
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
<template>
<div class="results" v-if="results.length">
    <ul>
        <li
          v-for="result in results"
          :key="result.cca2"
        >
            <ResultItem
              :data="result"
              @open="$emit('open-result', result)"
            ></ResultItem>
        </li>
    </ul>
    <div class="load-more" v-if="!complete">
        <button
          @click="$emit('load-more')"
        >
            Load More
        </button>
    </div>
</div>
<div class="results" v-else>
    <span class="message">
        No results were found.
    </span>
</div>
</template>


<script>
import ResultItem from './ResultItem.vue';

export default {
    name: 'SearchResults',
    components: {
        ResultItem
    },
    props: [ 'results', 'complete' ],
    data() { return {
    }},
    methods: {
    }
}
</script>


<style scoped>

.results {
    padding-top: 40rem;
    min-height: 400rem;
}
.results > ul {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, 225rem);
    justify-content: space-between;
    gap: 30rem;
    row-gap: 50rem;
}

.load-more {
    padding-top: 40rem;
    display: flex;
    justify-content: center;
}

.load-more button {
    font-weight: 600;
    padding: 0.75em 1.5em;
    border-radius: 4rem;
    border: 2rem solid var(--text-color);
}
.load-more button:hover,
.load-more button:active {
    color: var(--text-contrast-color);
    background: var(--text-color);
}



.message {
    font-weight: 600;
}

@media screen and (max-width: 600px) {
    .results > ul {
        justify-content: center;
    }
}

</style>
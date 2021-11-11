<template>
<div class="results">
    <ul v-if="results.length">
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
    <div class="message" v-else>
        No results were found.
    </div>
</div>
</template>


<script>
import ResultItem from './ResultItem.vue';

export default {
    name: 'SearchResults',
    components: {
        ResultItem
    },
    props: [ 'results' ],
    data() { return {
    }},
    methods: {
    }
}
</script>


<style scoped>

.results {
    padding-top: 40rem;
}
.results > ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, 225rem);
    justify-content: space-between;
    gap: 30rem;
    row-gap: 50rem;
}

.message {
    font-weight: 600;
}

</style>
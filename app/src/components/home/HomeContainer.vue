<template>
<div class="search-container">
    <SearchHeader></SearchHeader>
</div>

</template>


<script>
import SearchHeader from './SearchHeader.vue';

export default {
    name: 'HomeContainer',
    components: {
        SearchHeader
    },
    props: [ ],
    methods: {
    }
}
</script>


<style scoped>

</style>
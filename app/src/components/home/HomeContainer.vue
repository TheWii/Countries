<template>
<div class="home container"
  :class="{ active }"
>
    <SearchHeader
      :searching="searching"
      @search="search"
      @filter-region="setFilterRegion"
    ></SearchHeader>
    <SearchResults
      :results="results.rendered"
      :complete="completeRender"
      @open-result="openResult"
      @load-more="loadMore"
    ></SearchResults>
</div>
</template>


<script>
import SearchHeader from './SearchHeader.vue';
import SearchResults from './SearchResults.vue';

import { getAll, getByName, getByCode } from '../../services/CountryService.js';

export default {
    name: 'HomeContainer',
    components: {
        SearchHeader,
        SearchResults
    },
    props: [ 'activeContainer', 'ctx' ],
    data() { return {
        id: 'home',
        lastQuery: '',
        searching: false,
        renderAmount: 10,
        renderIndex: 0,
        completeRender: false,
        loading: false,
        results: {
            all: [],
            queried: {},
            current: [],
            rendered: []
        },
        filterProps: {},
        openUpdate: false
    }},
    computed: {
        active() {
            return this.id === this.activeContainer;
        }
    },
    watch: {
        activeContainer(containerId) {
            this.openUpdate = this.id === containerId;
        },
        renderIndex() {
            this.updateRendered();
        }
    },
    async created() {
        console.log('Home -> Created.');
        await this.cacheAll();
        this.search();
    },
    updated() {
        this.loading = false;
        console.log('Loaded!');
        this.$nextTick(function() {
            if (!this.openUpdate) return;
            this.openUpdate = false;
            document.documentElement.scrollTop = this.ctx.scroll[this.id].offset;
        });
    },
    methods: {
        async cacheAll() {
            console.log(`Home -> Caching all countries.`);
            const properties = [
                'flags', 'name', 'population',
                'region', 'capital', 'cca3'
            ];
            const all = await getAll(properties);
            this.results.all = all.reduce((acc, country) => {
                acc[country.cca3] = country;
                return acc;
            }, {});
            this.results.queried[''] = all.map(val => val.cca3);
        },

        async search(input='') {
            console.log(`Home -> Searching for '${input}'`);
            const properties = [ 'cca3' ];
            const ids = await this.query(input, properties);
            const results = ids.map(id => this.results.all[id]);
            this.results.current = this.getFiltered(results);
            this.renderIndex = this.renderAmount;
            this.updateRendered();
            console.log(`Home -> Search completed.`);
        },

        async query(input=null, properties=[]) {
            const queries = this.results.queried;
            if (input === null) input = this.lastQuery;
            this.lastQuery = input;
            if (!input.length) return queries[''];
            if (!queries[input]) {
                console.log(`Home -> Fetching the API for '${input}'.`);
                this.searching = true;
                const results = await getByName(input, properties);
                queries[input] = results.map(val => val.cca3);
            }
            this.searching = false;
            return queries[input];
        },

        getFiltered(results) {
            return results.filter(result => {
                for (let prop in this.filterProps) {
                    if (result[prop] !== this.filterProps[prop]) return false;
                }
                return true;
            });
        },

        setFilterProperty(prop, value) {
            console.log(`Set filter property '${prop}' to ${value}.`);
            this.filterProps[prop] = value;
        },
        removeFilterProperty(prop) {
            console.log(`Removed filter property '${prop}'.`);
            delete this.filterProps[prop];
        },

        setFilterRegion(region) {
            if (region) this.setFilterProperty('region', region);
            else this.removeFilterProperty('region');
            this.search(this.lastQuery);
        },

        async openResult(result) {
            console.log(`Home -> Fetching country: ${result.cca3}`);
            const country = await getByCode(result.cca3);
            if (!country) {
                console.log(`Fetch failed.`);
                return;
            }
            const ctx = {
                allCountries: this.results.all,
                targetCountry: country
            }
            console.log(`Fetch completed.`);
            this.$emit('open-result', ctx);
        },

        updateRendered() {
            this.results.rendered = this.results.current.slice(0, this.renderIndex);
            this.completeRender = this.results.rendered.length === this.results.current.length;
            console.log(`Rendering ${this.results.rendered.length} results, complete=${this.completeRender}`);
        },

        loadMore() {
            if(this.completeRender) return;
            console.log('Loading more!');
            this.renderIndex += this.renderAmount;
            this.loading = true;
        },

        scroll() {
            if (this.loading || this.completeRender) return;
            const scroll = this.ctx.scroll[this.id];
            if (scroll.progress >= 0.9) this.loadMore();
        }
    }
}
</script>


<style scoped>

.container {
    display: none;
}
.container.active {
    display: block;
    animation: show 0.3s ease-out;
}

@keyframes show {
    from {
        opacity: 0;
        transform: translateY(50rem);
    }
    to {
        opacity: 1;
    }
}

</style>
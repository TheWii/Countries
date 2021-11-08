<template>
<div class="result">
    <img class="flag" :src="getFlag" alt="Country flag">
    <div class="bottom">
        <h2 class="name">{{ getName }}</h2>
        <div class="info">
            <span class="population">
                <span class="field">Population: </span>
                <span class="value">{{ getPopulation }}</span>
            </span>
            <span class="region">
                <span class="field">Region: </span>
                <span class="value">{{ getRegion }}</span>
            </span>
            <span class="capital" v-if="getCapital">
                <span class="field">Capital: </span>
                <span class="value">{{ getCapital }}</span>
            </span>
        </div>
    </div>
</div>
</template>


<script>

export default {
    name: 'ResultItem',
    components: {},
    props: [ 'data' ],
    data() { return {
    }},
    computed: {
        getFlag() {
            return this.data.flags.svg;
        },
        getName() {
            return this.data.name.common;
        },
        getPopulation() {
            return this.data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getRegion() {
            return this.data.region;
        },
        getCapital() {
            try {
                return this.data.capital[0];
            } catch(err) {
                console.log(`Failed to get capital of ${this.getName}.`)
                return null;
            }
        }
    },
    methods: {
    }
}
</script>


<style scoped>

.result {
    width: 225rem;
    border-radius: 5rem;
    overflow: hidden;
    box-shadow: 2rem 2rem 10rem rgba(0, 0, 0, 0.05);
    cursor: pointer;
}

.flag {
    width: 225rem;
    height: 135rem;
    object-fit: cover;
}

.bottom {
    font-size: 14rem;
    padding: 20rem 20rem 30rem;
    background: var(--element-color);
}
.name {
    font-size: 16rem;
    font-weight: 800;
    padding-bottom: 10rem;
}
.info > * {
    display: block;
    line-height: 25rem;
}
.info .field {
    font-weight: 600;
}

</style>
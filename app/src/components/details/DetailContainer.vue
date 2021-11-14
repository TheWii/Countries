<template>
<div class="detail container"
  :class="{ active }"
>
    <button class="back"
      @click="$emit('open-container', 'home')"
    >
        <img src="../../assets/arrow-left.svg" alt="Arrow pointing to the left.">
        <span>Back</span>
    </button>

    <div class="content" v-if="active">
        <div>
            <img class="flag"
            :src="getFlag"
            alt="Country flag."
            >
        </div>

        <div class="info">
            <h1 class="name">{{ getName }}</h1>

            <div class="columns">
                <div>
                    <div class="field" v-if="getNativeName">
                        <span class="label">Native Name: </span>
                        <span class="value">{{ getNativeName }}</span>
                    </div>
                    <div class="field">
                        <span class="label">Population: </span>
                        <span class="value">{{ getPopulation }}</span>
                    </div>
                    <div class="field">
                        <span class="label">Region: </span>
                        <span class="value">{{ getRegion }}</span>
                    </div>
                    <div class="field" v-if="getSubRegion">
                        <span class="label">Sub Region: </span>
                        <span class="value">{{ getSubRegion }}</span>
                    </div>
                    <div class="field" v-if="getCapital">
                        <span class="label">Capital: </span>
                        <span class="value">{{ getCapital }}</span>
                    </div>
                </div>
                <div>
                    <div class="field" v-if="getTopLevelDomain">
                        <span class="label">Top Level Domain: </span>
                        <span class="value">{{ getTopLevelDomain }}</span>
                    </div>
                    <div class="field" v-if="getCurrencies">
                        <span class="label">Currencies: </span>
                        <span class="value">{{ getCurrencies }}</span>
                    </div>
                    <div class="field" v-if="getLanguages">
                        <span class="label">Languages: </span>
                        <span class="value">{{ getLanguages }}</span>
                    </div>
                </div>
            </div>

            <div class="field borders" v-if="getBorders">
                <span class="label">Border Countries: </span>
                <span class="value"
                  v-for="country in getBorders"
                  :key="country"
                >
                    {{ country }}
                </span>
            </div>

        </div>

    </div>
    <div class="content" v-else>
        Nothing to show.
    </div>

</div>
</template>


<script>
export default {
    name: 'DetailContainer',
    props: [ 'activeContainer', 'ctx' ],
    data() { return {
        id: 'details',
        openUpdate: false
    }},
    watch: {
        context() {
            console.log(`DetailContainer -> Changed data.`);
        },
        activeContainer(containerId) {
            this.openUpdate = this.id === containerId;
        }
    },
    computed: {
        active() {
            return this.id === this.activeContainer;
        },
        getFlag() {
            return this.ctx.result.targetCountry.flags.svg;
        },
        getName() {
            return this.ctx.result.targetCountry.name.common;
        },
        getNativeName() {
            for (let entry of Object.entries(this.ctx.result.targetCountry.name.nativeName)) {
                return entry[1].common;
            }
            return '';
        },
        getPopulation() {
            return this.ctx.result.targetCountry.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getRegion() {
            return this.ctx.result.targetCountry.region;
        },
        getSubRegion() {
            return this.ctx.result.targetCountry.subregion;
        },
        getCapital() {
            return this.ctx.result.targetCountry.capital ? this.ctx.result.targetCountry.capital[0] : '';
        },
        getTopLevelDomain() {
            return this.ctx.result.targetCountry.tld ? this.ctx.result.targetCountry.tld[0] : '';
        },
        getCurrencies() {
            if (!this.ctx.result.targetCountry.currencies) return '';
            return Object.values(this.ctx.result.targetCountry.currencies)
                .map(val => val.name).join(', ');
        },
        getLanguages() {
            if (!this.ctx.result.targetCountry.languages) return '';
            return Object.values(this.ctx.result.targetCountry.languages).join(', ');
        },
        getBorders() {
            if (!this.ctx.result.targetCountry.borders) return;
            return this.ctx.result.targetCountry.borders.map(
                id => this.ctx.result.allCountries[id].name.common
            );
        }
    },
    updated() {
        this.$nextTick(function() {
            if (!this.openUpdate) return;
            this.openUpdate = false;
            document.documentElement.scrollTop = 0;
        });
    },
    methods: {
        scroll() {}
    }
}
</script>


<style scoped>

button {
    display: flex;
    align-items: center;
    gap: 10rem;
    padding: 8rem 30rem;
    border-radius: 4rem;
    background: var(--element-color);
    box-shadow: 0rem 0rem 6rem rgba(0, 0, 0, 0.1);
}

button.back > img {
    display: inline;
    filter: invert(var(--invert-percent));
}

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

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200rem;
    gap: 50rem;
    padding-top: 60rem;
}

.flag {
    display: inline;
    width: 100%;
    max-width: 550rem;
    object-fit:cover;
}

.info {
    flex-shrink: 0;
    flex-grow: 1;
    max-width: 570rem;
}

.name {
    font-weight: 800;
    font-size: 26rem;
    padding-bottom: 25rem;
}

.columns {
    display: flex;
    justify-content: space-between;
    gap: 40rem;
}

.field .label {
    font-weight: 600;
}

.borders {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 10rem;
    padding-top: 50rem;
}

.borders .value {
    padding: 5rem 20rem;
    background: var(--element-color);
    border-radius: 4rem;
    box-shadow: 0rem 0rem 5rem rgba(0, 0, 0, 0.1);
}


@media screen and (max-width: 1000px) {
    .content {
        flex-direction: column;
    }
}
@media screen and (max-width: 600px) {

    .info {
        align-self: flex-start;
    }

    .columns {
        flex-direction: column;
    }
}

</style>
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
        id: 'details'
    }},
    watch: {
        context() {
            console.log(`DetailContainer -> Changed data.`);
        }
    },
    computed: {
        active() {
            return this.id === this.activeContainer;
        },
        getFlag() {
            return this.ctx.targetCountry.flags.svg;
        },
        getName() {
            return this.ctx.targetCountry.name.common;
        },
        getNativeName() {
            for (let entry of Object.entries(this.ctx.targetCountry.name.nativeName)) {
                return entry[1].common;
            }
            return '';
        },
        getPopulation() {
            return this.ctx.targetCountry.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getRegion() {
            return this.ctx.targetCountry.region;
        },
        getSubRegion() {
            return this.ctx.targetCountry.subregion;
        },
        getCapital() {
            return this.ctx.targetCountry.capital ? this.ctx.targetCountry.capital[0] : '';
        },
        getTopLevelDomain() {
            return this.ctx.targetCountry.tld ? this.ctx.targetCountry.tld[0] : '';
        },
        getCurrencies() {
            if (!this.ctx.targetCountry.currencies) return '';
            return Object.values(this.ctx.targetCountry.currencies)
                .map(val => val.name).join(', ');
        },
        getLanguages() {
            if (!this.ctx.targetCountry.languages) return '';
            return Object.values(this.ctx.targetCountry.languages).join(', ');
        },
        getBorders() {
            if (!this.ctx.targetCountry.borders) return;
            return this.ctx.targetCountry.borders.map(
                id => this.ctx.allCountries[id].name.common
            );
        }
    },
    methods: {
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
    /*animation-name: hide;
    animation-duration: 1s;*/
}
.container.active {
    display: block;
    /*animation-name: show;*/
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
    .container {
        padding: 40rem 25rem;
    }

    .info {
        align-self: flex-start;
    }

    .columns {
        flex-direction: column;
    }
}


@keyframes hide {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes show {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}


</style>
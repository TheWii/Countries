<template>
<div class="dropdown"
  :class = "{ active }"
>
    <button @click="clicked"
      :aria-label="`${text}. Selected: ${selected || 'None'}`"
    >
        <span>{{ getText }}</span>
        <img class="expand-icon" src="../assets/expand-arrow.svg" alt="Expand icon">
    </button>
    <ul class="content">
        <li
          v-for="item in items"
          :key="item"
        >
            <button
              @click="clickedItem(item)"
            >
                {{ item }}
            </button>
        </li>
    </ul>
</div>
</template>


<script>
export default {
    name: 'Dropdown',
    props: [ 'text', 'items' ],
    data() { return {
        active: false,
        selected: null
    }},
    computed: {
        getText() {
            return this.selected ? this.selected : this.text;
        }
    },
    methods: {
        open() {
            this.active = true;
            this.$emit('opened');
        },
        close() {
            this.active = false;
            this.$emit('closed');
        },
        switch() {
            if (this.active) this.close();
            else this.open();
        },

        clicked() {
            this.switch();
        },
        clickedItem(item) {
            if (this.selected === item) this.deselect();
            else this.select(item);
        },

        select(item) {
            this.selected = item;
            this.$emit('selected', item);
            this.close();
        },
        deselect() {
            this.$emit('deselected', this.selected);
            this.selected = null;
            this.close();
        }
    }
}
</script>


<style scoped>

.dropdown {
    position: relative;
    width: 100%;
    max-width: 200rem;
}
.dropdown > button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15rem 25rem;
    border-radius: 4rem;
    background: var(--element-color);
    box-shadow: 2rem 2rem 10rem rgba(0, 0, 0, 0.05);
}
.expand-icon {
    display: inline;
    width: 0.65em;
    filter: invert(var(--invert-percent));
}
.content {
    position: absolute;
    top: calc(100% + 5rem);
    left: 0;
    display: none;
    width: 100%;
    padding: 12rem 0;
    border-radius: 4rem;
    background: var(--element-color);
    box-shadow: 2rem 2rem 10rem rgba(0, 0, 0, 0.05);
}
.dropdown.active > .content {
    display: block;
}
.content button {
    line-height: 30rem;
    text-align: left;
    width: 100%;
    padding: 0 25rem;
}
.content button:hover,
.content button:focus {
    background: var(--element-hover-color);
}

</style>
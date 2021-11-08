<template>
<button class="dropdown"
  :class = "{ active }"
  @click="clicked"
>
    <span>{{ text }}</span>
    <img class="expand-icon" src="../assets/expand-arrow.svg" alt="Expand icon">
    <ul class="content">
        <li
          v-for="item in items"
          :key="item"
        >
            <button
              @click="select(item)"
            >
                {{ item }}
            </button>
        </li>
    </ul>
</button>
</template>


<script>
export default {
    name: 'Dropdown',
    props: [ 'text', 'items' ],
    data() { return {
        active: false,
        selected: null
    }},
    methods: {
        clicked() {
            this.active = !this.active;
            this.$emit(this.active ? 'opened' : 'closed');
        },
        select(item) {
            this.selected = item;
            this.$emit('selected', item);
        }
    }
}
</script>


<style scoped>

.dropdown {
    position: relative;
    display: flex;
    align-items: center;
    gap: 45rem;
    padding: 15rem 25rem;
    border-radius: 4rem;
    background: var(--element-color);
    box-shadow: 2rem 2rem 10rem rgba(0, 0, 0, 0.05);
}
.expand-icon {
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

</style>
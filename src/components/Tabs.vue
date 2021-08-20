<template lang="html">
  <div :class="">
    <ul class='tabs-header'>
      <li v-for='(tab, index) in tabs'
        :key='tab.title'
        @click='selectTab(index)'
        :class="{
          'tab-selected': (index == selectedIndex),
          'img-right': tab.imgPosition == 'right'}"
        class="tab-button"
        >
        <img :src="'src/assets/icons/' + (index == selectedIndex ? tab.imgActive : tab.img) + '.svg'"/>
        <div>{{ tab.title }}</div>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String
    }
  },
  data () {
    return {
      selectedIndex: 0,
      tabs: []         
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    this.selectTab(0)
  },
  methods: {
    selectTab (i) {
      this.selectedIndex = i

      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i)
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables";

  ul.tabs-header {
    display: flex;
    list-style: none;
    margin: 0 0 0 20px;
    padding: 0;
    font-size: $font-size-xl;
    justify-content: center;
  }

  ul.tabs-header > li {
    padding: 15px 30px;
    border-radius: 10px;
    margin: 0;
    margin-right: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .tab {
    display: inline-block;
    color: black;
    padding-left: 20px;
    padding-right: 20px;
    min-width: 800px;
    border-radius: 10px;
  }

  .tabs .tab{
    background-color: #fff;
  }
  
  li.tab-selected {
    font-weight: bold;
  }

  li:not(.tab-selected):hover {
    font-weight: 500;
  }

  .img-right {
    flex-direction: row-reverse;
  }

  .tab-button {
    width: 220px;
  }

</style>

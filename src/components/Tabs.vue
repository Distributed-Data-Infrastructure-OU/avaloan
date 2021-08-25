<template lang="html">
  <div class="tabs">
    <ul class='tabs-header'>
      <li v-for='(tab, index) in tabs'
        :key='tab.title'
        @click='selectTab(index)'
        :class="{
          'tab-selected': (index == selectedIndex),
          'img-right': tab.imgPosition == 'right'}">
        <div class="tab-button">
          <img v-if="tab.img" :src="'src/assets/icons/' + (index == selectedIndex ? tab.imgActive : tab.img) + '.svg'"/>
          <div>{{ tab.title }}</div>
        </div>  
        <img v-if="index !== tabs.length - 1" src="src/assets/icons/slash.svg" class="slash">
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

<style lang="scss" scoped>
@import "~@/styles/variables";

  ul.tabs-header {
    display: flex;
    list-style: none;
    margin: 0 0 0 20px;
    padding: 0;
    font-size: $font-size-xl;
    justify-content: center;
  }

  ul.tabs-header .tab-button {
    padding: 15px 30px;
    border-radius: 10px;
    margin: 0;
    margin-right: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .tab-button {
    display: inline-block;
    color: black;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
  }
  
  .tab-selected .tab-button {
    font-weight: bold;
  }

  li {
    display: flex;
  }

  li:not(.tab-selected):hover {
    font-weight: 500;
  }

  .img-right .tab-button {
    flex-direction: row-reverse;
  }

  .tab-button:not(.img-right) {
    display: flex;
    justify-content: flex-end;
  }

  .tab-button {
    width: 255px;
  }

  .tabs {
    width: 100%;
  }

  .slash:not(.md-image) {
    height: 50px;
    align-self: center;
  }
</style>

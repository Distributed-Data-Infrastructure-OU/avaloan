<template>
<div class="page-content">
  <div class="top-bar">
    <router-link to="/">
      <img src="src/assets/icons/avaloan-logo.svg" class="logo">
    </router-link> 
    <Navbar></Navbar>
    <div class="connect" v-on:click="initNetwork()">Connect to wallet</div>
  </div>
  <router-view></router-view>
</div>
</template>



<script>
  import Navbar from "@/components/Navbar.vue";
  import { mapActions } from "vuex";

  export default {
    components: {
      Navbar
    },
    async created() {
      await this.initNetwork();
      await this.initPrices();
      await this.initPool();
      await this.updatePoolData();
    },
    data() {
      return {
      }
    },
    methods: {
      ...mapActions("network", ["initNetwork"]),
      ...mapActions("pool", ["initPool", "updatePoolData"]),
      ...mapActions("prices", ["initPrices"])
    }
  }
</script>

<style lang="scss" scoped>
  .page-content:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.08;
    z-index: -1;

    background-image: linear-gradient(152deg, #7476fc 23%, #ff6f43 65%, #f5217f 96%);
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    padding: 40px 0;
  }

  .logo {
    margin-left: 40px;
    cursor: pointer;

    &:hover {
      transform: scale(1.02);
    }
  }

  .connect {
    white-space: nowrap;
    margin-right: 40px;
    color: #6b70ed;
    cursor: pointer;

    &:hover {
      font-weight: 500;
    }
  }
</style>


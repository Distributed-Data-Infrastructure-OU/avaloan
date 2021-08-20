<template>
<div class="page-content">
  <Navbar></Navbar>
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
      await this.initNetwork()
      this.initPool()
    },
    data() {
      return {
      }
    },
    methods: {
      ...mapActions("network", ["initNetwork"]),
      ...mapActions("pool", ["initPool"])
    }
  }
</script>

<style scoped>
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
</style>


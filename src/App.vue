<template>
<div>
  <Navbar></Navbar>
  <router-view></router-view>
</div>
</template>



<script>
  import Navbar from "./components/Navbar.vue";

  export default {
    components: {
      Navbar
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style>
 
</style>


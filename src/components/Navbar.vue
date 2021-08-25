<template>
  <div class="navbar"> 
    <div class="links-wrapper">
      <router-link to="/deposit"><span title="Deposit">Deposit</span></router-link>
      <router-link to="/invest"><span title="Invest">Invest</span></router-link>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'Navbar',
    data() {
      return {
      }
    },
  }
</script>

<style lang="scss" scoped>
@import "~@/styles/variables";

.navbar {
  text-align: center;
  font-size: $font-size-sm;
}

a {
  padding: 8px 20px 8px 20px;
  text-decoration: none !important;
  width: 140px;
  display: inline-block;
  color: #696969;
}

a:not(.router-link-active):hover {
  font-weight: 500;
}

.router-link-active {
  font-weight: bold;
  border: solid 3px #b9b7ff;
  border-radius: 999px;
  box-shadow: 3px 3px 6px 0 rgba(191, 188, 255, 0.5);
  color: #000000;
}

a :visited{
  color: initial;
}

</style>
<style lang="scss" src="@/styles/app.scss" />

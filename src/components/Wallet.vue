<template>
  <div class="wallet"> 
    <div class="balance">{{ balance | avax }}<img class="logo" src="src/assets/icons/avax-icon.svg"/>
</div>  
    <div class="account">{{ account | tx }}</div>  
  </div>
</template>


<script>
  import { mapState } from "vuex";

  export default {
    name: 'Wallet',
    props: {
      title: String
    },
    computed: {
      ...mapState('network', ['account', 'balance'])
    },
    data() {
      return {

      }
    },
  }
</script>

<style lang="scss" scoped>
.wallet {
  display: flex;
  border-radius: 14px;
  box-shadow: 7px 7px 30px 0 rgba(191, 188, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.3);
  padding: 15px 20px;
  font-weight: 500;
}

.account {
  margin-left: 20px;
}

.logo {
  opacity: 0.7;
  height: 16px;
  vertical-align: middle;
  margin-left: 5px;
}
</style>


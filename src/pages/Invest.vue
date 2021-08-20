<template>
  <div class="container">
    <Block v-if="!isLoanAlreadyCreated">
      <InitLoan/>
    </Block>
    <SmartLoan v-else/>
  </div>
</template>


<script>
  import { mapState } from 'vuex';
  import InitLoan from "@/components/InitLoan.vue";
  import SmartLoan from "@/components/SmartLoan.vue";
  import Bar from "@/components/Bar.vue";
  import Block from "@/components/Block.vue";

  export default {
    name: 'Invest',
    components: {
      InitLoan,
      SmartLoan,
      Bar,
      Block
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState('loan', ['isLoanAlreadyCreated']),
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>

</style>

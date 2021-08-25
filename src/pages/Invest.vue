<template>
  <div class="container">
    <div v-if="!isLoanAlreadyCreated">
    <Bar>
      <Value label="Available in pool" 
        :primary="{value: totalDeposited, type: 'avax', showIcon: true}" 
        :secondary="{value: toUSD(totalDeposited), type: 'usd'}" />
      <Value label="Current APY" :primary="{value: borrowingRate, type: 'percent'}"/>
    </Bar>    
      <Block class="block">
        <InitLoan/>
      </Block>
    </div>
    <SmartLoan v-else/>
  </div>
</template>


<script>
  import { mapState } from 'vuex';
  import InitLoan from "@/components/InitLoan.vue";
  import SmartLoan from "@/components/SmartLoan.vue";
  import Bar from "@/components/Bar.vue";
  import Block from "@/components/Block.vue";
  import Value from "@/components/Value.vue";

  export default {
    name: 'Invest',
    components: {
      InitLoan,
      SmartLoan,
      Bar,
      Block,
      Value
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState('loan', ['isLoanAlreadyCreated']),
      ...mapState('pool', ['totalDeposited', 'borrowingRate'])
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
.block {
  margin-top: 30px;
}

.bars {
  display: flex;
  justify-content: space-between;
}

.bars > * {
  width: 47.5%;
}
</style>

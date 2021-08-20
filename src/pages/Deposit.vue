<template>
  <div class="container">
    <Bar>
      <Value label="Total deposited" :value="totalDeposited | avax" rate="23% APY"></Value>
      <Value label="Total borrowed" :value="totalBorrowed | avax" rate="11% APR"></Value>
    </Bar>
    <Block class="block">
      <Tabs>
        <Tab title="Deposit" imgActive="add-deposit-active" img="add-deposit" imgPosition="left">
          <CurrencyInput label="Deposit" v-on:submitValue="deposit" flexDirection="column" :style="{'width': '490px'}"/>
        </Tab>
        <Tab title="Withdraw" imgActive="withdraw-deposit-active" img="withdraw-deposit" imgPosition="right">
          <CurrencyInput label="Withdraw" v-on:submitValue="withdrawValue" flexDirection="column" :style="{'width': '490px'}" /> 
        </Tab>
      </Tabs>
    </Block>  
  </div>
</template>

<script>
  import CurrencyInput from "@/components/CurrencyInput.vue";
  import Tabs from "@/components/Tabs.vue";
  import Tab from "@/components/Tab.vue";
  import Bar from "@/components/Bar.vue";
  import Value from "@/components/Value.vue";
  import Block from "@/components/Block.vue";
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'Deposit',
    components: {
      CurrencyInput, 
      Tabs, 
      Tab,
      Bar,
      Value,
      Block
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState('pool', ['totalBorrowed', 'totalDeposited']),
    },
    methods: {
      ...mapActions('pool', ['sendDeposit', 'withdraw']),
      async deposit(value) {
        await this.sendDeposit({amount: value});
      },
      async withdrawValue(value) {
        await this.withdraw({amount: value});
      }
    }
  }
</script>

<style lang="scss" scoped>
.block {
  margin-top: 30px;
}
</style>

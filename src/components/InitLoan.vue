<template>
  <div>
    <div>
        <CurrencyInput label="Borrow" v-on:submitValue="borrow" />
    </div>  
  </div>
</template>


<script>
  import { mapActions, mapState } from 'vuex';
  import CurrencyInput from "@/components/CurrencyInput.vue";

  export default {
    name: 'InitLoan',
    components: {
      CurrencyInput
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState('pool', ['pool'])
    },
    methods: {
      ...mapActions('loan', ['createNewLoan']),
      borrow: async function(value) {
        if (value > this.pool.available) {
          console.log("Not enough funds available in the pool!");
        } else {
          this.processing = true;
          try {
            await this.createNewLoan({amount: value});
            console.log("A new Smart Loan has been created!");
          } finally {
            this.processing = false;
          }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="currency-input-wrapper" :style="{ 'flex-direction': flexDirection}">
    <div class="input-wrapper" :style="{ 'margin-top': flexDirection == 'column-reverse' ? '40px' : '0'}">
      <input type="number" v-model="value">
      <img src="src/assets/icons/avax-logo.svg"/>
    </div>
    <button class="btn" :class="color" @click="emitValue" 
      :style="{ 'margin-top': flexDirection == 'column' ? '40px' : '0'}">{{label}}</button>
  </div>
</template>


<script>
  export default {
    name: 'CurrencyInput',
    props: {
      label: { type: String, default: '' },
      color: { type: String, default: 'purple' },
      flexDirection: { type: String, default: 'column'}
    },
    data() {
      return {
        value: { type: Number, default: 0 },
      }
    },
    methods: {
      emitValue() {
        this.$emit('submitValue', this.value)
      }   
    }
  }
</script>

<style lang="scss" scoped>
.currency-input-wrapper {
  display: flex;
  align-items: center;
}

.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset 3px 3px 8px rgba(191, 188, 255, 0.5);
  background-image: linear-gradient(114deg, rgba(115, 117, 252, 0.08) 39%, rgba(255, 162, 67, 0.08) 62%, rgba(245, 33, 127, 0.08) 81%);
  height: 68px;
  border-radius: 15px;
  padding-left: 40px;
  padding-right: 30px;
  border: none;
}

input {
  background: transparent;
  border: none;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 24px;
}



input:focus{
  outline: none;
}

// hiding arrows
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>

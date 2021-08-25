<template>
  <div class="currency-input-wrapper" :style="{ 'flex-direction': flexDirection}">
    <div class="input-wrapper" :style="{ 'margin-top': flexDirection == 'column-reverse' ? '40px' : '0'}">
      <input type="number" v-model="value" step='0.01' min="0" max="999999">
      <div class="converted" v-if="value && (value !== 0)">
        ~ {{ toUSD(value) | usd}}
      </div>
      <img src="src/assets/icons/avax-logo.svg"/>
    </div>
      <!-- <div class="converted">
        {{ toUSD(value) | usd}}
      </div> -->
    <button class="btn" :class="[waiting ? 'waiting' : '', color]" @click="emitValue" 
      :style="{ 'margin-top': flexDirection == 'column' ? '40px' : '0'}">
      <div v-if="!waiting">
        {{label}}
      </div>
      <vue-loaders-ball-beat v-else color="#FFFFFF" scale="0.5"></vue-loaders-ball-beat>
      </button>
  </div>
</template>


<script>
  export default {
    name: 'CurrencyInput',
    props: {
      label: { type: String, default: '' },
      color: { type: String, default: 'purple' },
      flexDirection: { type: String, default: 'column'},
      waiting: { type: Boolean, default: false },
    },
    data() {
      return {
        value: 0
      }
    },
    methods: {
      emitValue() {
        if (!this.waiting) {
          this.$emit('submitValue', this.value);
          this.value = 0;
        }
      }   
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/styles/variables";

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
    //testi
  width: 500px;
}

input {
  background: transparent;
  border: none;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 24px;
  //testing
  width:220px;
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

// .converted {
//   color: #696969;
//   margin-right: 5px;
//   align-self: flex-start;
//   margin-left: 38px;
//   margin-top: 6px;
// }

.converted {
  color: #696969;
  margin-right: 15px;
  white-space: nowrap;
  text-align: right;
  width: 140px;
  font-size: $font-size-sm;
  opacity: 0.6;
}

.waiting.btn {
    opacity: 0.5;
    cursor: initial;
}

</style>

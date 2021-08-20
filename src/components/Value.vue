<template>
  <div class="value-wrapper" :style="{ 'flex-direction': flexDirection}"> 
    <div class="label">{{label}}</div>
    <div></div>
    <div class="avax-value">
      <div>3121</div><img class="avax-logo" src="src/assets/icons/avax-icon.svg"/>
    </div>
    <div class="usd-value">
      <div>12323.92 USD</div>
    </div>
    <div v-if="rate" class="rate-value">
      <div>{{rate}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Value',
    props: {
      label: String,
      value: String,
      flexDirection: {
        type: String,
        default: "column"
      },
      rate: String
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/styles/variables";

.value-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  color: #696969;
  font-size: $font-size-sm;
}

.avax-value, .usd-value {
  display: flex;
  align-items: center;
}

.avax-value {
  font-size: $font-size-lg;
  margin: 10px 0;
}

.avax-logo {
  height: 24px;
  margin-left: 10px;
}

.usd-logo {
  height: 16px;
  margin-left: 5px;
}
</style>


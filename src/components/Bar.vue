<template>
  <div class="bar"> 
    <slot></slot>
  </div>
</template>


<script>
  export default {
    name: 'Bar',
    props: {

    },
    data() {
      return {

      }
    },
  }
</script>

<style lang="scss" scoped>
.bar {
  padding: 14px 110px 14px 110px;
  border-radius: 25px;
  box-shadow: 7px 7px 30px 0 rgba(191, 188, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: space-between;
  font-weight: 500;
}
</style>


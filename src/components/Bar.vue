<template>
  <div class="bar"> 
    <div v-if="title" class="title"></div>
    <div class="elements">
      <slot></slot>
    </div>  
  </div>
</template>


<script>
  export default {
    name: 'Bar',
    props: {
      title: String
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
  font-weight: 500;
}

.elements {
  display: flex;
  justify-content: space-between;
}
</style>


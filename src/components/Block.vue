<template>
  <div class="block-wrapper"> 
    <slot></slot>
  </div>
</template>


<script>
  export default {
    name: 'Block'
  }
</script>

<style lang="scss" scoped>
.block-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 4px solid transparent;
  border-radius: 16px;
  background: white;
  background-clip: padding-box;
  padding: 55px 0;
  box-shadow: 7px 7px 30px 0 rgba(191, 188, 255, 0.5);
}

.block-wrapper::after {
  position: absolute;
  top: -4px; bottom: -4px;
  left: -4px; right: -4px;
  background: linear-gradient(148deg, #c9cbff 21%, #ffd8b1 60%, #fcb7cc 94%);
  content: '';
  z-index: -1;
  border-radius: 16px;
}
</style>


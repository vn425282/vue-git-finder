<template>
  <nav class="header">
    <!-- <img
      src="http://www.finsmes.com/wp-content/uploads/2019/07/taiger.jpg"
      alt
      width="200"
      height="100"
    /> -->
  </nav>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  font-size: 16px;
  line-height: 23px;
  padding: 18px 9px 9px;
  border-bottom: 1px solid #e7e7e7;
}
</style>

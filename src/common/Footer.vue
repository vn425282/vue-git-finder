<template>
  <footer class='footer'>
    <div class='footer_left'>© 2019 , Inc</div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  justify-content: space-between;
  color: #e8e8e8;
  background-color: #555;
  padding: 5px 25px;
  box-sizing: border-box;
  height: 23px;
  line-height: 13px;
  font-size: 9px;
  font-weight: 600;
  -ms-grid-row: 3;
  bottom: 0;
}
</style>

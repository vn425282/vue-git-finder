<template>
  <div class="search">
    <div>
      <form autocomplete="off" @submit="handleSubmit">
        <label for="inp" class="inp">
          <input type="text" id="inp" v-model="message" placeholder="Please enter GIT's username" maxlength="32" required/>
        </label>
      </form>
    </div>
  </div>
</template>

<script>
import { GET_USER_INFO } from '../common/query/user'

export default {
  name: 'Home',
  props: {
    msg: String
  },
  data: function () {
    return {
      message: ''
    }
  },
  methods: {
    handleSubmit: function (e) {
      e.preventDefault();
      console.log(this.message);
    }
  },
  apollo: {
    search: {
      query: GET_USER_INFO,
      variables () {
        return {
          queryString: 'language:react stars:>10000'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inp {
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 280px;
}

.label {
  position: absolute;
  top: 16px;
  left: 0;
  font-size: 16px;
  color: #9098a9;
  font-weight: 500;
  transform-origin: 0 0;
  transition: all 0.2s ease;
}
.border{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    transform: scaleX(0);
    transform-origin: 0 0;
    transition: all .15s ease;
}

input{
    -webkit-appearance: none;
    width: 100%;
    border: 0;
    font-family: inherit;
    padding: 12px 0;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 2px solid #C8CCD4;
    background: none;
    border-radius: 0;
    color: #223254;
    transition: all .15s ease;
}

input::focus{
  background: rgba(#223254,.03);
   outline: none;
}
</style>

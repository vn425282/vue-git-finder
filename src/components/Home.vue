<template>
  <div class="search">
    <div>
      <form autocomplete="off" @submit="handleSubmit">
        <label for="inp" class="inp">
          <input type="text" id="inp" v-model="message" placeholder="Please enter GIT's username" maxlength="32" required />
        </label>
      </form>
      <div class="row">
        <User :queryString.sync="message" ref="refUser" />
        <Repositories :queryString.sync="message" ref="refRepo" />
      </div>
    </div>
  </div>
</template>

<script>
import User from './User';
import Repositories from './Repositories';

export default {
  name: 'Home',
  components: {
    User,
    Repositories
  },
  props: {},
  data: function () {
    return {
      message: '',
      confirm: false
    };
  },
  methods: {
    handleSubmit: function (e) {
      e.preventDefault();
      this.confirm = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inp {
  position: relative;
  margin: auto;
  width: 100%;
  padding: 25px 70px;
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
.border {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  transform: scaleX(0);
  transform-origin: 0 0;
  transition: all 0.15s ease;
}

input {
  -webkit-appearance: none;
  width: 100%;
  border: 0;
  font-family: inherit;
  padding: 12px 0;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid #c8ccd4;
  background: none;
  border-radius: 0;
  color: #223254;
  transition: all 0.15s ease;
}

input::focus {
  background: rgba(#223254, 0.03);
  outline: none;
}
</style>

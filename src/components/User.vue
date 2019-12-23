<template>
  <div class="col-lg-3 container-lg px-md-2 mt-lg-4 clearfix">
    <div class="spinner-border" role="status" v-if="$apollo.loading">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="error && !user">Not found !!!</div>
    <div class="infomation" v-if="user">
      <img class="img-circle" v-bind:src="user.avatarUrl" alt="avatar" width="140" height="140" />
      <h2>{{user.name}}</h2>
      <h4>{{user.login}}</h4>
       Location: {{user.location}}
      <p>User since: {{ convertDate(user.createdAt)}}</p>
    </div>
  </div>
</template>

<script>
import { QUERY_USER_INFO } from '../common/query/user';

export default {
  name: 'User',
  props: ['queryString'],
  data: () => ({
    skipQuery: true,
    myQueryNetworkStatus: 0,
    error: null
  }),
  methods: {
    convertDate (date) {
      var monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

      let d = new Date(date);
      return [
        d.getDay() === 0 ? 1 : d.getDay() + 1,
        monthNames[d.getMonth()],
        d.getFullYear()
      ].join(' ');
    },
    reloadApolloWithNewParams () {
      this.error = '';
      this.$apollo.queries.user.refresh();
    }
  },
  apollo: {
    user: {
      notifyOnNetworkStatusChange: true,
      query: QUERY_USER_INFO,
      variables () {
        this.myQueryNetworkStatus = 0;
        return {
          username: this.queryString
        };
      },
      error (error) {
        this.error = JSON.stringify(error.message);
      },
      skip () {
        return !this.queryString;
      }
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

.img-circle {
  border-radius: 50%;
}

@media only screen and (max-width: 992px) {
  .infomation {
    align-items: center !important;
    justify-content: center !important;
    text-align: center;
    padding-top: 10px;
  }
}

</style>

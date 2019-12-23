<template>
  <div class="col-lg-8 container-lg clearfix">
    <div class="spinner-border" role="status" v-if="$apollo.loading">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="error && !user">Not found !!!</div>
    <div class="d-flex flex-column flex-md-row flex-justify-between border-bottom pb-3 position-relative" v-if="repositoryOwner">
      <h3>
        Found {{repositoryOwner.repositories.totalCount}} public repositories result
      </h3>

      <!-- The modal dialog -->
      <div class="modal__dialog" :class="{'active' : active}">
        <div class="modal__content">
          <button class="modal__close" @click="click">
            <i class="fa fa-times"></i>
          </button>
          <h3 class="modal__header">
            <slot name="modalHeader"></slot>
          </h3>
          <div class="modal__body">
            <slot name="modalBody">
              <vue-simple-markdown :source="markdown"></vue-simple-markdown>
            </slot>
          </div>
          <div class="modal__footer">
            <slot name="modalFooter"></slot>
          </div>
        </div>
      </div>
      <!-- The overlay for the modal -->
      <div class="modal__overlay"></div>
    </div>
    <ul class="repo-list" v-if="repositoryOwner">
      <li class="repo-list-item hx_hit-repo d-flex flex-justify-start py-4 public source" v-for="(node, idx) in repositoryOwner.repositories.edges" :key="idx">
        <div class="flex-shrink-0 mr-2">
          <svg height="16" class="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width="12" aria-hidden="true">
            <path d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z" /></svg>
        </div>
        <div class="mt-n1">
          <div class="f4 text-normal">
            <p class="v-align-middle" :class="{ 'active' : repositoryOwner.repositories.edges[idx].node.object != null,
            'unactive' : repositoryOwner.repositories.edges[idx].node.object == null}" @click="openModal(repositoryOwner.repositories.edges[idx].node)">{{repositoryOwner.repositories.edges[idx].node.name}}</p>
          </div>
          <b>
            <p class="mb-1">
              {{repositoryOwner.repositories.edges[idx].node.description}}
            </p>
          </b>
          <div>
            <div class="topic-tag topic-tag-link f6 px-2">
              {{repositoryOwner.repositories.edges[idx].node.primaryLanguage ? repositoryOwner.repositories.edges[idx].node.primaryLanguage.name : ''}}
            </div>
            <div class="d-flex flex-wrap text-small text-gray">
              <div class="mr-3">
                Updated at: {{convertDate(repositoryOwner.repositories.edges[idx].node.updatedAt)}}
              </div>
            </div>
            <div class="d-flex flex-wrap text-small text-gray">
              <div class="mr-3">
                <span>
                  <span>
                    <span :class="{'repo-language-color-active': repositoryOwner.repositories.edges[idx].node.object }"></span>
                    README.md {{repositoryOwner.repositories.edges[idx].node.object ? 'is' : 'is not'}} available
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <button type="button" class="btn btn-primary" v-if="repositoryOwner && repositoryOwner.repositories.pageInfo.hasNextPage" @click="reloadApolloWithNewParams">Load Next</button>
  </div>
</template>

<script>
import { QUERY_USER_REPO } from '../common/query/repositories';
import VueSimpleMarkdown from 'vue-simple-markdown';
import Vue from 'vue';

Vue.use(VueSimpleMarkdown);

export default {
  name: 'Repositories',
  props: ['queryString'],
  data: () => ({
    skipQuery: true,
    myQueryNetworkStatus: 0,
    error: null,
    cursor: 'Y3Vyc29yOnYyOpK5MjAxOS0xMC0yN1QwMDoxODowMyswNzowMM4M-oDg',
    active: false,
    markdown: ''
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
      window.scrollTo(0, 0);
      this.error = '';
      this.$apollo.queries.repositoryOwner.fetchMore(
        {
          variables: {
            cursor: this.repositoryOwner.repositories.pageInfo.endCursor
          },
          // Transform the previous result with new data
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return fetchMoreResult;
          }
        });
    },
    openModal (obj) {
      this.markdown = obj.object.text;
      this.active = !this.active;
    },
    click (e) {
      this.active = !this.active;
    }
  },
  apollo: {
    repositoryOwner: {
      notifyOnNetworkStatusChange: true,
      query: QUERY_USER_REPO,
      variables () {
        return {
          cursor: this.cursor,
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
.repo-list-item {
  padding-top: 30px;
  padding-bottom: 30px;
  list-style: none;
  border-bottom: 1px solid #eee;
}

.navigation {
  padding-top: 30px !important;
}

.f6 {
  font-size: 12px !important;
}

.active {
  cursor: pointer;
  color: blue;
}

.unactive {
  pointer-events: none;
  color: gray;
}

.topic-tag {
  display: inline-block;
  padding: 0.3em 0.9em;
  margin: 0 0.5em 0.5em 0;
  white-space: nowrap;
  background-color: #f1f8ff;
  border-radius: 3px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  flex-direction: column;
}
.modal__cta {
  margin: 24px 0;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.45);
}
.modal__overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  visibility: hidden;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0;
  background: #000000;
  transition: all 0.25s;
}
.modal__dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  max-width: 630px;
  min-width: 320px;
  height: auto;
  z-index: 2000;
  visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  -webkit-perspective: 1300px;
  perspective: 1300px;
}
.modal__dialog.active {
  opacity: 1;
  visibility: visible;
}
.modal__dialog.active ~ .modal__overlay {
  opacity: 0.9;
  visibility: visible;
}
.modal__dialog.active .modal__content {
  -webkit-transform: rotateX(0deg);
  transform: rotateX(0deg);
  opacity: 1;
}
.modal__content {
  background: #fafafa;
  border-radius: 2px;
  padding: 24px;
  color: #131313;
  position: relative;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: rotateX(-60deg);
  transform: rotateX(-60deg);
  -webkit-transform-origin: 50% 0;
  transform-origin: 50% 0;
  opacity: 0;
  transition: all 0.25s;
}
.modal__close {
  position: absolute;
  right: -16px;
  top: -16px;
  color: #fff;
  background: #585858;
  border: 0;
  outline: 0;
  border-radius: 50%;
  font-size: 16px;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.modal__close:after {
  content: "X";
}
.modal__header {
  text-align: center;
  font-weight: 300;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.45);
}
.modal__body {
  color: blue;
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  overflow: auto;
  max-height: 600px;
}
.modal__footer {
  margin: 24px 0;
}
</style>

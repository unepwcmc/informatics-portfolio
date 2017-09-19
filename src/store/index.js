import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// create store
export default new Vuex.Store({
  state: {
    modalData: {
      teaserTitle: '',
      projectTitle: '',
      problem: '',
      solution: '',
      url: '',
      image: ''
    }
  },

  mutations: {
    updateModalData (state, data) {
      this.state.test = data.teaserTitle
      this.state.modalData = data
    }
  }
})

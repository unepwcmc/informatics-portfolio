import Vue from 'vue'
import Vuex from 'vuex'
import { eventHub } from '../main.js'

Vue.use(Vuex)

// create store
export default new Vuex.Store({
  state: {
    isModalActive: false,
    modalData: {
      test: 'this is a test'
    }
  },

  mutations: {
    updateModalData (state, data) {
      this.isModalActive = true
      this.modalData = data

      console.log('store - updateModalData', this.modalData)

      eventHub.$emit('openModal')
    }
  }
})

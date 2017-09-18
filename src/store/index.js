import Vue from 'vue'
import Vuex from 'vuex'
import { eventHub } from '../main.js'

Vue.use(Vuex)

// create store
export default new Vuex.Store({
  state: {
    isModalActive: false,
    modalData: {}
  },

  mutations: {
    updateModalData (state, data) {
      console.log('store - updateModalData')

      this.isModalActive = true
      this.modalData = data

      eventHub.$emit('openModal')
    }
  }
})

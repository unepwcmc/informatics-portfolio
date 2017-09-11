// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import Modal from './components/Modal'
import Projects from './components/projects/Projects'
import StickyNav from './components/StickyNav'
import TeamMember from './components/TeamMember'

Vue.config.productionTip = false

// create vue instance
new Vue({
  el: '#app',
  store,
  components: { Modal, Projects, StickyNav, TeamMember }
})

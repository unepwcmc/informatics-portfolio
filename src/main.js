// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Modal from './components/Modal'
import Projects from './components/projects/Projects'
import StickyNav from './components/StickyNav'
import TeamMember from './components/TeamMember'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Modal, Projects, StickyNav, TeamMember }
})

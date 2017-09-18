<template>
  <div id="modal" class="modal" :class="{ 'modal--active' : isActive }">
    MODAL
    <i class="projects__modal__close" @click="closeModal()">X</i>
      
    <div class="row projects__modal__gallery">
      <div class="col-xs">
        <img :src="modalData.image" alt="">
      </div>
    </div>

    <div class="row projects__modal-padding projects__modal__titles">
      <div class="col-xs">
        <h3>{{ modalData.teaserTitle }}</h3>
        <p>{{ modalData.projectTitle }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-xs">
        <div class="projects__modal__box projects__modal__box--grey">
          <h4>The problem</h4>
          <p>{{ modalData.problem }}</p>
        </div>
      </div>

      <div class="col-xs">
        <div class="projects__modal__box">
          <h4>The solution</h4>
          <p>{{ modalData.solution }}</p>
        </div>
      </div>
    </div>
    
    <div class="row projects__modal-padding projects__modal__link">
      <div class="col-xs">
        <a :href="modalData.url">Visit site</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { eventHub } from '../main.js'

  export default {
    name: 'modal',

    data () {
      return {
        isActive: false,
        modalData: {
          teaserTitle: '',
          projectTitle: '',
          problem: '',
          solution: '',
          url: '',
          image: ''
        }
      }
    },

    mounted () {
      eventHub.$on('cardClicked', this.openModal)
    },

    watch: {
      modalData () {
        console.log('modalData changed', this.$store.state.modalData)
      },

      isModalActive () {
        console.log('modal is now active')
      }
    },

    methods: {
      openModal () {
        console.log('modal - openModal')

        this.modalData = this.$store.state.modalData
        this.isActive = !this.isActive
      }
    },

    computed: {
      // isActive () {
      //   console.log('isModalActive', this.$store.state.isModalActive)
      //   return this.$store.state.isModalActive
      // }
    }
  }
</script>

<style lang="scss">
  .modal { 
    opacity: 0;

    transition: opacity .3s .4s linear;

    &--active {
      background-color: white;
      position: absolute;
      left: 0; right: 0;

      opacity: 1;
    }
  }

  #test {
    transition: transform .4s;

    &.test--shrink { transform: scale(0.8); }
  }
</style>
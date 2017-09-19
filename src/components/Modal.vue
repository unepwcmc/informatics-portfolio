<template>
  <div>
    <div class="modal-wrapper" :class="{ 'modal--active' : isActive }"></div>

    <div id="modal" :style="styleObject" class="modal" :class="{ 'modal--active' : isActive, 'modal--hidden' : !isActive }">
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

  </div>
</template>

<script>
  import { eventHub } from '../main.js'

  export default {
    name: 'modal',

    data () {
      return {
        isActive: false,
        modalOffset: 0,
        styleObject: {
          top: 0
        },
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
        this.modalData = this.$store.state.modalData
      },

      isModalActive () {
        console.log('modal is now active')
      },

      modalOffset () {
        this.styleObject.top = this.modalOffset + 'px'
      }
    },

    methods: {
      openModal () {
        console.log('modal - openModal')

        // calculate modal offset
        const modalHeight = document.getElementById('modal').clientHeight
        const windowHeight = window.innerHeight

        // if the modal is smaller than the screen it is being viewed on
        // then vertically centre it on the screen
        if (modalHeight < windowHeight) {
          const modalOffset = (windowHeight - modalHeight) / 2

          this.modalOffset = window.pageYOffset + modalOffset
        } else {
          this.modalOffset = window.pageYOffset
        }

        console.log('modal - openModal - update data', this.$store.state.modalData)

        this.modalData = this.$store.state.modalData
        this.isActive = !this.isActive
        document.getElementById('modal-site-content').classList.add('modal-site-content--shrink')
      },

      closeModal () {
        this.isActive = !this.isActive
        document.getElementById('modal-site-content').classList.remove('modal-site-content--shrink')
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
    width: 86%;
    // max-width: $site-width;
    position: absolute;
    
    transform: translate(-50%);
    transition: opacity .3s ease-out;

    &--hidden { 
      z-index: -1;
    }

    &--active {
      background-color: white;
      left: 50%; right: 0;

      opacity: 1;

      &.modal-wrapper {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }

    &-wrapper {
      background-color: rgba(gray, 0.6);

      display: none;
    }
  }

  #modal-site-content {
    transition: transform .2s ease-in;

    &.modal-site-content--shrink { transform: scale(0.9); }
  }
</style>
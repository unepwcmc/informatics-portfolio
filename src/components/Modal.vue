<template>
  <div id="modal" class="modal" :class="{ 'modal--active' : isActive }">
    MODAL
  </div>
</template>

<script>
  export default {
    name: 'modal',

    data () {
      return {
        isActive: false
      }
    },

    mounted () {
      console.log(this.$store.state.modalIsActive)
    },

    methods: {
      openModal () {
        this.isActive = !this.isActive
        console.log('open modal')
      }
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
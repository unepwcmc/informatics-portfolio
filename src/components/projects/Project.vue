<template>
  <div class="project__card" @click="clickCard()" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
    <h3 class="project__title">{{ teaserTitle }}</h3>
  </div>
</template>

<script>
  export default {
    name: 'project',

    props: {
      teaserTitle: String,
      projectTitle: String,
      problem: String,
      solution: String,
      url: String,
      image: String
    },

    data () {
      return {
        backgroundPath: ''
      }
    },

    mounted () {
      this.backgroundPath = this.backgroundImage
    },

    methods: {
      clickCard () {
        var projectData = {
          teaserTitle: this.teaserTitle,
          projectTitle: this.projectTitle,
          problem: this.problem,
          solution: this.solution,
          url: this.url,
          image: this.backgroundPath
        }

        this.$emit('cardClicked', projectData)
      }
    },

    computed: {
      backgroundImage () {
        if (this.image !== '') {
          var path = ''

          try {
            // if you try and pass in a variable along it errors out
            // you must build the path up
            // this is to do with the way webpack compiles
            path = require('../../assets/images/projects/' + this.image)
          } catch (e) {
            return
          }

          return path
        }
      }
    }
  }
</script>

<style lang="scss">
  .project {
    &__card {
      background-color: #cccccc;
      background-position: center;
      background-size: cover;
      cursor: pointer;
      padding: 0;
      height: rem-calc(240);

      position: relative;
      
      &:nth-child(even){ background-color: #dddddd; }

      &:before {
        background-color: rgba(white, 0.08);
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      &:hover:before { background-color: transparent; }
    }

      &__title {
        background-color: rgba(black, 0.6);
        color: white;
        margin: rem-calc(20 20 0 0);
        padding: rem-calc(10 12);

        display: inline-block;
      }
  }
</style>
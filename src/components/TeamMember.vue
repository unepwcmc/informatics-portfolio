<template>
  <div class="team__card flexbox flex-1-third">
    <div class="team__content">
      <div class="team__image" :style="{ backgroundImage: 'url(' + filepath + ')' }" :alt="'Profile photo of ' + name" @mouseenter="changePhoto()" @mouseleave="changePhoto()"></div>
      <p class="team__name">{{ name }}</p>
      <p class="team__job">{{ job }}</p>
      <div class="team__card__social">
        <div v-if="infoUrl">
          <a class="icon--white" :href="infoUrl" target="_blank"><i class="fa fa-info"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'team-member',

    props: {
      name: {
        type: String,
        required: true
      },
      job: {
        type: String,
        required: true
      },
      infoUrl: String
    },

    data () {
      return {
        isHovering: false,
        filepath: '',
        filename: ''
      }
    },

    created () {
      this.filename = this.name.replace(' ', '-').toLowerCase()
      this.setFilePath()
    },

    methods: {
      changePhoto () {
        this.isHovering = !this.isHovering
      },

      setFilePath (variant = '') {
        this.filepath = 'static/images/team/' + this.filename + variant + '.jpg'
      }
    },

    watch: {
      isHovering () {
        var variant = ''

        if (this.isHovering) { variant += '-2' }

        this.setFilePath(variant)
      }
    }
  }
</script>

<style lang="scss">
  .team {
    &__card {
      color: white;
      margin-bottom: rem-calc(40);

      justify-content: center;
    }

      &__content {
        padding: rem-calc(0 40);
      }

        &__image {
          background-color: #efefef;
          margin: 0;
          width: rem-calc(291); height: rem-calc(291);
        }

        &__name, 
        &__job {
          margin: rem-calc(4 0);
        }

        &__name {
          font-size: rem-calc(20);
        }
  }
</style>
<template>
  <div class="projects">
    <div>
      <slot></slot>
    </div>
    <div class="flexbox-wrap">
      <project v-for="project, key in projects"
        :key="key"
        :teaserTitle="project.teaserTitle"
        :projectTitle="project.projectTitle"
        :problem="project.problem"
        :solution="project.solution"
        :url="project.url"
        :image="project.image"
        class="flex-1-third"
        v-on:cardClicked="openModal"
        >
      </project>
    </div>

    <div class="projects__modal" :class="{ 'projects__modal--active' : modalActive }">
      <i class="projects__modal__close" @click="closeModal()">X</i>
      
      <div class="row projects__modal__gallery">
        <div class="col-xs">
          <img :src="image" alt="">
        </div>
      </div>

      <div class="row projects__modal-padding projects__modal__titles">
        <div class="col-xs">
          <h3>{{ teaserTitle }}</h3>
          <p>{{ projectTitle }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-xs">
          <div class="projects__modal__box projects__modal__box--grey">
            <h4>The problem</h4>
            <p>{{ problem }}</p>
          </div>
        </div>

        <div class="col-xs">
          <div class="projects__modal__box">
            <h4>The solution</h4>
            <p>{{ solution }}</p>
          </div>
        </div>
      </div>
      
      <div class="row projects__modal-padding projects__modal__link">
        <div class="col-xs">
          <a :href="url">Visit site</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Project from './Project'

  export default {
    name: 'projects',

    props: {
      projectData: Object
    },

    components: { Project },

    data () {
      return {
        teaserTitle: '',
        projectTitle: '',
        problem: '',
        solution: '',
        url: '',
        image: '',
        modalActive: false,
        projects: [
          {
            teaserTitle: 'Saving the worlds endangered apes',
            projectTitle: 'GRASP',
            problem: 'Lorem ipsum for the problem',
            solution: 'Informatics helped solve the problem by...',
            url: 'http://google.com',
            image: 'grasp.jpg'
          },
          {
            teaserTitle: 'Mapping out the worlds protected environments',
            projectTitle: 'Protected Planet',
            problem: 'Lorem ipsum for the problem',
            solution: 'Lorem ipsum for the solution',
            url: 'http://google.com',
            image: 'test.jpg'
          },
          {
            teaserTitle: 'Teaser title 3',
            projectTitle: 'Project title 3',
            problem: 'Lorem ipsum for the problem',
            solution: 'Lorem ipsum for the solution',
            url: 'http://google.com',
            image: ''
          },
          {
            teaserTitle: 'Teaser title 4',
            projectTitle: 'Project title 4',
            problem: 'Lorem ipsum for the problem',
            solution: 'Lorem ipsum for the solution',
            url: 'http://google.com',
            image: ''
          },
          {
            teaserTitle: 'Teaser title 5',
            projectTitle: 'Project title 5',
            problem: 'Lorem ipsum for the problem',
            solution: 'Lorem ipsum for the solution',
            url: 'http://google.com',
            image: ''
          },
          {
            teaserTitle: 'Teaser title 6',
            projectTitle: 'Project title 6',
            problem: 'Lorem ipsum for the problem',
            solution: 'Lorem ipsum for the solution',
            url: 'http://google.com',
            image: ''
          }
        ]
      }
    },

    methods: {
      openModal (projectData) {
        console.log(projectData)
        this.teaserTitle = projectData.teaserTitle
        this.projectTitle = projectData.projectTitle
        this.problem = projectData.problem
        this.solution = projectData.solution
        this.url = projectData.url
        this.image = projectData.image

        // this.modalActive = true
        document.getElementById('modal-wrapper').classList.add('projects__modal-wrapper--active')

        var top = window.pageYOffset
        console.log(top)
        document.getElementById('modal-test').setAttribute('style', 'top: ' + top + 'px')

        // document.getElementById('test').classList.add('test--shrink')
        document.getElementById('modal-test').classList.add('modal-test--open')
      },

      closeModal () {
        this.modalActive = false
        document.getElementById('modal-wrapper').classList.remove('projects__modal-wrapper--active')
      }
    }
  }
</script>

<style lang="scss">
  .projects {
    position: relative;

    &__modal {
      background-color: white;
      width: 100%;

      display: none;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      h3, h4 { color: $blue; }

      &--active { display: block; }

      &-padding { padding: rem-calc(20); }

      &-wrapper {
        background-color: rgba(gray, 0.5);

        display: none;

        &--active {
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
      }

      &__close {
        cursor: pointer;
        text-align: right;

        float: right;

        &:hover { color: $orange; }
      }

      &__box {
        padding: rem-calc(10 20);

        &--grey {
          background-color: #efefef;
        }
      }

      &__link { 
        text-align: center; 

        a { 
          background-color: lighten($orange, 5%);
          border-radius: rem-calc(3);
          color: white;
          padding: rem-calc(10 20);
          text-decoration: none;

          display: inline-block;

          &:hover { background-color: $orange; }
        }
      }
    }
  }
</style>
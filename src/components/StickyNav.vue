<template>
  <div id="v-sticky-nav" class="v-sticky-nav">
    <div class="v-sticky-nav__wrapper" :class="{ 'v-sticky-nav__wrapper--stuck' : this.isNavSticky, 'v-sticky-nav__wrapper--unstick' : !this.isNavSticky }">
      
      <p class="v-sticky-nav__title">title</p>

      <div 
        @click="toggleMenu" 
        class="v-sticky-nav__burger" 
        :class="{ 'v-sticky-nav__burger--open' : isMenuOpen }">

        <span class="v-sticky-nav__burger-icon"></span>
      </div>

      <ul class="v-sticky-nav__menu" :class="{ 'v-sticky-nav__menu--open' : this.isMenuOpen }">
        <li v-for="link in navItems" @click="closeMenu" class="v-sticky-nav__menu-item">
          <a :id="linkId(link.id)" class="v-sticky-nav__link" @click.prevent="scroll(link.id)">
            <span>{{ link.name }}</span>
          </a>
        </li>
      </ul>

    </div>
  </div>  
</template>

<script>
  import Scrollmagic from 'Scrollmagic'

  export default {
    name: 'sticky-nav',

    data () {
      return {
        config: {
          breakpoints: {
            medium: 763 // this MUST match the breakpoint set in the responsive.scss file
          }
        },
        navItems: [],
        navId: 'v-sticky-nav',
        navY: 0,
        navHeight: 0,
        isMenuOpen: false,
        isNavSticky: false
      }
    },

    created () {
      this.getNavData()
    },

    mounted () {
      this.setNavHeight()
      this.navY = document.getElementById(this.navId).offsetTop

      this.updateNav()
      this.monitorResize()

      this.scrollmagicHandlers()
    },

    methods: {
      toggleMenu () {
        this.isMenuOpen = !this.isMenuOpen
      },

      closeMenu () {
        if (this.isMenuOpen) {
          this.isMenuOpen = false
        }
      },

      updateNav () {
        var self = this

        setInterval(function () {
          var scrollY = window.pageYOffset

          if (scrollY > self.navY + self.navHeight) {
            self.isNavSticky = true
          } else {
            self.isNavSticky = false
          }
        }, 100)
      },

      setNavHeight () {
        this.navHeight = document.getElementById(this.navId).clientHeight
      },

      scroll (sectionId) {
        var sectionY = document.getElementById(sectionId).offsetTop - this.navHeight + 1

        var scrollTo = function (element, to, duration) {
          if (duration <= 0) return

          var difference = to - element.scrollTop
          var perTick = difference / duration * 10

          setTimeout(function () {
            element.scrollTop = element.scrollTop + perTick

            if (element.scrollTop === to) return
            scrollTo(element, to, duration - 10)
          }, 10)
        }

        scrollTo(document.body, sectionY, 200)

        // document.getElementsByTagName('html, body').animate({
        //   scrollTop: sectionY
        // }, 400, function () {
        //   window.location.hash = sectionId
        // })
      },

      monitorResize () {
        var self = this

        window.onresize = function () {
          var width = window.width()

          if (width > self.config.breakpoints.medium) { self.isMenuOpen = false }

          self.setNavHeight()
          self.updateScrollmagicDurations()
        }
      },

      linkId (link) {
        return link + '-menu-item'
      },

      getNavData () {
        // get data from page sections for the nav
        var sections = document.querySelectorAll('[data-nav-name]')
        var data = []

        for (let section of sections) {
          var sectionObj = {}

          sectionObj.id = section.getAttribute('id')
          sectionObj.name = section.dataset.navName

          data.push(sectionObj)
        }

        this.navItems = data
      },

      scrollmagicHandlers () {
        this.navScrollmagic = new Scrollmagic.Controller()

        var ScrollmagicScenes = []

        // add scene for each item in the navigation
        this.navItems.forEach(link => {
          var scene = {}

          scene.id = link.id

          scene.scene = new Scrollmagic.Scene({
            duration: this.getSceneDuration(link.id),
            triggerElement: '#' + link.id,
            triggerHook: 'onLeave'
          })
          .offset(-this.navHeight)
          .setClassToggle('#' + link.id + '-menu-item', 'v-sticky-nav__link-active')
          .addTo(this.navScrollmagic)

          ScrollmagicScenes.push(scene)
        })

        this.ScrollmagicScenes = ScrollmagicScenes
      },

      updateScrollmagicDurations () {
        this.ScrollmagicScenes.forEach(scene => {
          scene.scene.duration(this.getSceneDuration(scene.id))
        })
      },

      getSceneDuration (id) {
        var section = document.getElementById(id)

        return section.clientHeight
      }
    }
  }
</script>

<style lang="scss">
  //----------------------------------------
  // variables
  //----------------------------------------
  $navHeightMobile: rem-calc(48);
  $large: 1024px;

  $navBgColor: rgba(white, 0.6);
  $navBgColorSticky: $navy;
  $navOutlineColor: #4295d5;

  $navItemBgColor: transparent;
  $navItemHoverColor: rgba(white, 0.2);

  //----------------------------------------
  // shared styles
  //----------------------------------------
  %burger-line {
    background-color: white;
    width: rem-calc(30); height: rem-calc(3);
    display: block;
  }

  //----------------------------------------
  // animations
  //----------------------------------------
  @keyframes showNav {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes unstickNav {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  //----------------------------------------
  // sticky nav styles
  //----------------------------------------
  .v-sticky-nav {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;

    @include breakpoint($large){ 
      overflow: hidden;
    }

    &__wrapper {
      // background-color: $navBgColor;
      // border-bottom: solid rem-calc(2) white;
      height: $navHeightMobile;

      display: none;
      position: relative;

      @include breakpoint($large){ 
        height: rem-calc(55); 

        display: flex;
      }

      &--unstick {
        animation: unstickNav .25s forwards linear;
      }

      &--stuck {
        background-color: $navBgColorSticky;
        width: 100%;
        
        display: flex;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 100000;

        animation: showNav .25s forwards linear;

        & .v-sticky-nav__menu {
          @include breakpoint($large){ 
            display: flex;
            margin: auto;
            max-width: 80rem;
            width: 80%;
          }
        }
      }
    }

      &__title {
        color: white;
        font-weight: bold;
        margin-left: rem-calc(14);
        text-transform: uppercase;
        
        align-self: center;
        transform: translateY(2px);

        @include breakpoint($large){ display: none; }
      }

      &__burger {
        cursor: pointer;
        margin-left: auto;
        
        align-self: center;
        justify-self: flex-end;
        position: relative;

        @include breakpoint($large){ display: none; }

        &:hover .v-sticky-nav__burger-icon,
        &:hover .v-sticky-nav__burger-icon:before,
        &:hover .v-sticky-nav__burger-icon:after { 
          background-color: $navBgColor; 
        }
        
        &--open:hover .v-sticky-nav__burger-icon {
          background-color: transparent;
        }

        &-icon {
          @extend %burger-line;
          margin: rem-calc(10 14 10 0);

          &:before {
            @extend %burger-line;
            content: '';

            position: absolute;
            top: 0;

            transform-origin: top right;
          }

          &:after {
            @extend %burger-line;
            content: '';

            position: absolute;
            bottom: 0;

            transform-origin: bottom right;
          }
          
          .v-sticky-nav__burger--open & {
            background-color: transparent;

            &:before { transform: rotateZ(-45deg); }

            &:after { transform: rotateZ(45deg);
            }
          }
        }
      }

      &__menu {
        height: 100%;
        margin: 0;

        display: none;
        position: absolute;
        right: 0;
        top: $navHeightMobile;
        left: 0;

        @include breakpoint($large){
          top: 0;
          // width: 100%;
        
          // display: flex;
          // position: static;
        }

        &--open {
          display: block; 
        }
      }

        &__menu-item {
          flex: 1 1 auto;

          display: flex;
        }

          a.v-sticky-nav__link {
            background-color: $navItemBgColor;
            border-top: solid rem-calc(1) $navOutlineColor;
            color: white;
            cursor: pointer;
            font-size: rem-calc(15);
            padding: rem-calc(16 10 15 10);
            text-align: center;
            text-decoration: none;
            width: 100%; height: 100%;

            display: flex;
            
            align-items: center;
            justify-content: center;

            @include breakpoint($large){
              padding: rem-calc(0 10);
              border: none;
            }

            &:hover,
            &-active {
              background-color: $navItemHoverColor;
            }
          }
  }
</style>
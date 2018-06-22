<template>
  <nav
    :class="{ glass }"
    class="z-999 sticky top-0 noseldrag">
    <div class="container h-100 flex justify-between items-center">
      <div class="nav-left">
        <nuxt-link
          to="/"
          class="flex justify-between items-center">
          <WaterloopFullLogo
            id="logo"
            name="Waterloop Logo"
            class="fg-yellow w-100 h-75"/>
        </nuxt-link>
      </div>
      <div class="ham">
        <input
          v-model="open"
          type="checkbox">
        <span/>
        <span/>
        <span/>
        <ul
          ref="navRight"
          class="ma0 nav-right">
          <li
            v-for="(link, i) of links"
            :key="i"
          >
            <nuxt-link
              v-if="link.href.startsWith('/')"
              :to="link.href"
              class="fw4"
              @click="open = false">{{ link.name }}</nuxt-link>
            <a
              v-else
              :href="link.href"
              class="fw4"
              target="_blank">{{ link.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { noscroll, scroll } from '~/assets/js/util'
import WaterloopFullLogo from '~/assets/img/Header/logo.svg?inline' // eslint-disable-line import/no-unresolved, import/extensions

const eventOpts = {
  capture: false,
  passive: true,
}
export default {
  components: { WaterloopFullLogo },
  data: () => ({
    open: false,
    glass: true,
    links: [
      {
        name: 'Home',
        href: '/',
      },
      {
        name: 'Flock',
        href: '/flock',
      },
      {
        name: 'Team',
        href: '/team',
      },
      {
        name: 'Media',
        href: '/media',
      },
      {
        name: 'Partners',
        href: '/partners',
      },
      {
        name: 'Downloads',
        href: '/downloads',
      },
      {
        name: 'Merch',
        href: 'https://merch.teamwaterloop.ca',
      },
      {
        name: 'Contact',
        href: '/contact',
      },
    ],
  }),
  watch: {
    open(val) {
      val ? noscroll() : scroll()
    },
  },
  mounted() {
    document.body.addEventListener('click', this.clickOutside, eventOpts)
    this.addScroll()
  },
  beforeDestroy() {
    this.removeScroll()
    document.body.removeEventListener('click', this.clickOutside, eventOpts)
  },
  methods: {
    scrollListener() {
      this.glass = document.documentElement.scrollTop === 0
    },
    clickOutside(e) {
      if (!this.$refs.navRight.contains(e.target)) {
        this.open = false
      }
    },
    addScroll() {
      window.addEventListener('scroll', this.scrollListener, eventOpts)
      this.scrollListener()
    },
    removeScroll() {
      window.removeEventListener('scroll', this.scrollListener, eventOpts)
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/css/variables.scss';

$nav-bc: $bg;
$nav-fc: #fff;

nav {
  background-color: $nav-bc;
  font-family: $heading-font;
  font-size: 1.25rem;
  height: $nav-height;
  transition: background-color 200ms ease, box-shadow 200ms ease;

  &.glass {
    background-color: transparentize($nav-bc, 1);
  }
}

nav,
nav a {
  color: $nav-fc;
}

.nav-right a {
  outline: 0 !important;
  position: relative;

  &::before,
  &::after {
    border-radius: 5px;
    border-style: solid;
    border-width: 0;
    box-sizing: border-box;
    content: '';
    display: block;
    height: 120%;
    left: -10%;
    position: absolute;
    top: -10%;
    transition: transform 200ms ease;
    width: 120%;
    will-change: transform;
  }

  &::before {
    border-bottom-width: 2px;
    border-top-width: 2px;
    transform: scaleX(0);
  }

  &::after {
    border-left-width: 2px;
    border-right-width: 2px;
    transform: scaleY(0);
  }

  &.nuxt-link-exact-active {
    pointer-events: none;
  }

  &.nuxt-link-exact-active::before,
  &.nuxt-link-exact-active::after,
  &:hover::before,
  &:hover::after {
    transform: scale(1, 1);
  }
}

.nav-left,
.nav-right {
  display: flex;
}

.nav-right {
  list-style: none;
  padding: 0;

  > li:not(:first-child) {
    margin-left: 1rem;
  }
}

.ham input {
  display: none;
}

@media only screen and (max-width: $mobile) {
  $ham-w: 2rem;
  $ham-h: 1.5rem;

  .nav-right {
    background: $nav-bc;
    flex-direction: column;
    height: 100vh;
    margin: 0;
    padding-top: $nav-height;
    position: fixed;
    right: 0;
    top: 0;
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    width: 50%;

    > li {
      padding: 0 2rem;

      > a {
        display: block;
        padding: 0.5rem 0;
      }
    }

    > li:not(:first-child) {
      margin-left: 0;
      margin-top: 0.5rem;
    }
  }

  .ham {
    position: relative;
    width: $ham-w;
  }

  .ham input {
    cursor: pointer;
    display: block;
    height: $ham-h;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: $ham-w;
    z-index: 1;

    ~ span {
      background-color: currentColor;
      display: block;
      padding-top: 12%;
      pointer-events: none;
      position: relative;
      transition: transform 0.3s ease-in-out;
      width: 100%;
      z-index: 1;

      &:not(:first-of-type) {
        margin-top: 19%;
      }
    }
  }

  .ham input:checked {
    ~ .nav-right {
      box-shadow:
        -3px 0 5px -1px rgba(0, 0, 0, 0.2),
        -6px 0 10px 0 rgba(0, 0, 0, 0.14),
        -1px 0 18px 0 rgba(0, 0, 0, 0.12);
      transform: translateX(0);
    }

    ~ span:nth-of-type(2) {
      opacity: 0;
    }

    ~ span:nth-of-type(1) {
      transform: translateY(260%) rotate(45deg);
    }

    ~ span:nth-of-type(3) {
      transform: translateY(-260%) rotate(-45deg);
    }
  }
}

</style>

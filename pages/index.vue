<template>
  <div>
    <section
      v-once
      class="full-height relative overflow-hidden flex items-center">
      <Parallax class="absolute w-100 h-100">
        <img
          class="absolute responsive-img dark-img h-100 op-cb"
          src="~/assets/img/index/teamback.jpg"
          alt="Team picture">
      </Parallax>
      <div
        class="container center z-0">
        <div class="flex space2">
          <img
            src="~/assets/img/index/waterloo-shield.svg"
            alt="UWaterloo shield"
            height="50">
          <img
            :src="waterloopLogo"
            class="small-glyph"
            alt="Waterloop logo"
            height="50">
          <img
            class="small-glyph"
            src="~/assets/img/index/leaf.svg"
            alt="Canadian maple leaf"
            height="50">
        </div>
        <div class="white">
          <h1 class="mt3 mt5-ns mb3 f1 f-5-ns fw5">Canada's Hyperloop</h1>
          <p
            class="f4 f3-ns fw3 mw-50"
          >Having withstood the test of time, team Waterloop is back with a whole new roster, preparing to take on the SpaceX Hyperloop challenge in Summer 2018.</p>
          <a
            class="mb3 mb5-ns dib ba br-pill ph3 pv2 f4"
            href="https://wloop.ca/join">Join the Team!</a>
          <div class="flex noseldrag space2">
            <a
              class="dim"
              href="https://www.facebook.com/teamwaterloop"
              target="_blank">
              <img
                src="~/assets/img/index/facebook.svg"
                alt="team waterloop facebook"
                height="50"></a>
            <a
              class="dim"
              href="https://twitter.com/team_waterloop"
              target="_blank"><img
                src="~/assets/img/index/twitter.svg"
                alt="team waterloop twitter"
                height="50"></a>
            <a
              class="dim"
              href="https://www.instagram.com/team_waterloop"
              target="_blank"><img
                src="~/assets/img/index/instagram.svg"
                alt="team waterloop insta"
                height="50"></a>
          </div>
          <a
            href="#main"><div class="arrow ml2"/></a>
        </div>
      </div>
    </section>
    <section
      class="relative noseldrag bg"
      style="height:calc(180px + 20vw);">
      <div
        id="main"
        class="target"/>
      <div
        class="flex flex-column justify-center items-center f3 absolute w-100 top-2"
      >
        <div
          ref="crossfade"
          class="crossfade">
          <img
            src="~/assets/img/index/planeLogo.svg"
            alt="Plane Logo"
            class="one"
            height="30">
          <img
            :src="waterloopLogo"
            alt="Waterloop Logo"
            class="two"
            height="30">
        </div>
        <span
          class="fg-yellow pa2">Toronto - Montreal</span>
        <div class="transition-width flex-align pn white">
          <transition-group
            transition-group
            name="time"
            class="time-box"
            tag="div">
            <template
              v-for="(item, i) of timeText">
              <img
                v-if="i == 0"
                :key="item"
                src="~/assets/img/index/stopwatch.svg"
                alt="Stopwatch"
                height="20">
              <div
                v-else
                :key="item">{{ item }}</div>
            </template>
          </transition-group>
        </div>
      </div>
      <div class="absolute left-0 bottom-0 z-1 h-100 w-100 mw25 mh90 toronto"/>
      <div
        ref="podTube"
        class="absolute w-100 pod-tube">
        <img
          ref="pod"
          class="absolute pod"
          src="~/assets/img/index/pod.png"
          alt="Pod">
        <div/>
        <div/>
        <div/>
      </div>
      <div class="absolute right-0 bottom-0 z-1 h-100 w-100 mw25 mh90 montreal"/>
    </section>
    <!-- <div class="relative overflow-hidden h-fit-nav flex flex-column">
      <div class="container white">
        <div class="f2 mv4 b">Our Progress</div>
        <p
          class="text"
          style="font-size:2vmax;">Since the first competition we have learnt more than we we could ever imagine!</p></div>
      <Parallax class="absolute-bg"><img
        class="responsive-img dark-img"
        src="~/assets/img/index/teambg.jpg"
        alt="Team picture"></Parallax>
      <div class="w-100 h-100 flex-auto relative"><LineChart /></div>
    </div> -->
    <section class="white">
      <div class="container cf">
        <h2 class="f2 mv4">Our Blogs</h2>
        <p class="f3">Behind the scene stories from our journey so far
        </p>
        <div
          v-if="blog.length > 0"
          class="blog only-first-on-small">
          <a
            v-for="(post, i) of blog"
            :key="i"
            :href="post.url"
            class="blog-card pa3 light-bg">
            <div class="flex-auto">
              <div
                :style="{ backgroundImage: `url('${post.img}')` }"
                class="noseldrag aspect-ratio--6x4 cover"/>
              <div class="f3 card-title mt3">{{ post.title }}</div>
            </div>
            <div class="flex-auto">
              <p class="mb0 mt3 fw4">{{ post.subtitle }}</p>
            </div>
          </a>
        </div>
        <div
          v-else
          class="loading"/>
        <a
          class="f4 link white b dim fr flex items-center"
          href="https://medium.com/waterloop"
          target="_blank">Read More Blogs ></a>
      </div>
    </section>
    <div
      v-once
      class="bg-l30 mt4 pv4">
      <h2 class="container f2 ma0 mb4 white">Our most valued partners</h2>
      <div class="flex flex-wrap mh4 justify-center img-shadow">
        <a
          v-for="(partner, i) of partners"
          :key="i"
          :href="partner.link"
          class="ma2"
          target="_blank">
          <img
            :src="require('@/assets/img/partners/' + partner.img)"
            :alt="partner.name"
            height="75"
            class="of-contain">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import { hypersonic } from '~/assets/data/partnerStructure'
import waterloopLogo from '~/assets/img/index/icon.svg'

const eventOpts = {
  capture: false,
  passive: false,
}
export default {
  data() {
    return {
      waterloopLogo,
      partners: hypersonic,
      blog: [],
      timeText: [ '', 'in', '2 hours', '30', 'minutes' ],
    }
  },
  mounted() {
    const { podTube, pod, crossfade } = this.$refs
    const animate = () => {
      pod.classList.add('pod-animate')
      const handler = () => {
        this.timeText.splice(2, 1)
        crossfade.classList.add('switch')
        pod.removeEventListener('animationend', handler, eventOpts)
      }
      pod.addEventListener('animationend', handler, eventOpts)
    }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(e => {
        if (e[0].isIntersecting) {
          animate()
          io.disconnect()
        }
      }, { threshold: [ 1 ] })
      io.observe(podTube)
    } else {
      const animateHook = () => {
        const boundingRect = podTube.getBoundingClientRect()
        if (boundingRect.top >= 0 && boundingRect.bottom <= document.documentElement.clientHeight) {
          window.removeEventListener('scroll', animateHook, eventOpts)
          animate()
        }
      }
      window.addEventListener('scroll', animateHook, eventOpts)
      animateHook()
    }

    axios.get('/api/mediumPosts').then(({ data }) => {
      this.blog = data.blog
    })
  },
}
</script>

<style lang="scss">
@import '~/assets/css/variables.scss';

.toronto {
  background: url('~/assets/img/index/Waterloop_Toronto_Skyline.svg') left bottom no-repeat;
}

.montreal {
  background: url('~/assets/img/index/Waterloop_Montreal_Skyline.svg') right bottom no-repeat;
}

.space2 > :not(:last-child) {
  margin-right: 2rem;
}

.pod-tube {
  background-image: linear-gradient(#fff 0%, $bg 90%, #000 100%);
  bottom: 3vw;
  display: flex;
  height: calc(25px + 6vw);
  justify-content: space-around;
  justify-content: space-evenly;

  > div:not(:nth-child(3)) {
    background-image: linear-gradient(lighten($bg, 80%) 0%, lighten($bg, 50%) 5%, $bg 25%, $bg 95%, #000 100%);
    height: 100%;
    width: 0.5rem;
    z-index: 1;
  }
}

.arrow {
  animation: sdb 1.5s infinite;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
  height: 24px;
  width: 24px;
}

@keyframes sdb {
  0% {
    opacity: 0;
    transform: rotate(-45deg) translate(0, 0);
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: rotate(-45deg) translate(-20px, 20px);
  }
}

.pod {
  bottom: 10%;
  height: 50%;
  left: 0;
  transform: translateX(-100%);
}

@media only screen and (min-width: $mobile) {
  .pod {
    height: 70%;
  }
}

.pod-animate {
  animation: slide 2s ease-out forwards;
}

@keyframes slide {
  0% {
    left: 0;
    transform: translateX(-100%);
  }

  100% {
    left: 50%;
    transform: translateX(-50%);
  }
}

.blog-card {
  border-radius: 4px;
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  min-width: 240px;
}

.blog {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-bottom: 20px;
}

.full-height {
  height: 100vh;
  margin-top: -#{$nav-height};
}

.dark-img {
  filter: brightness(0.3);
}

.transition-width {
  transition: all 200ms ease;
}

.time-box {
  > * {
    display: inline-block;
    margin-left: 0.5rem;
    transition: transform 1s;
  }
}

.time-leave-active {
  position: absolute;
}

.time-leave-to {
  transform: translate(-50%) scale(0.001);
}

.crossfade {
  height: 30px;
  position: relative;

  > img {
    backface-visibility: hidden;
    left: 0;
    max-width: unset;
    position: absolute;
    transition: all 1s ease;
  }

  > .one {
    transform: translate(-50%) perspective(120px) rotateX(0deg);
    z-index: 1;
  }

  > .two {
    transform: translate(-50%) perspective(120px) rotateX(-180.1deg);
  }

  &.switch {
    > .one {
      transform: translate(-50%) perspective(120px) rotateX(-180.1deg);
    }

    >.two {
      transform: translate(-50%) perspective(120px) rotateX(0deg);
    }
  }
}
</style>

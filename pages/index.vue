<template>
  <div>
    <Cover
      ref="cover"
      :src="teamSrc"
      img-class="h-100 dark-img op-cb"
      class="items-center"
      alt="Team picture">
      <div
        class="container center z-0">
        <div class="flex space2">
          <img
            src="~/assets/img/index/waterloo-shield.svg"
            alt="UWaterloo shield"
            height="40">
          <img
            :src="waterloopLogo"
            class="small-glyph"
            alt="Waterloop logo"
            height="40">
          <img
            class="small-glyph"
            src="~/assets/img/index/leaf.svg"
            alt="Canadian maple leaf"
            height="40">
        </div>
        <div class="white">
          <h1 class="mt3 mt5-ns mb3 f1 f-5-ns fw5">Canada's Hyperloop</h1>
          <p
            class="f4 f3-ns fw3 mw-50"
          >Having withstood the test of time, Waterloop is back with a whole new roster, preparing to take on the SpaceX Hyperloop challenge.</p>
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
                height="40"></a>
            <a
              class="dim"
              href="https://twitter.com/team_waterloop"
              target="_blank"><img
                src="~/assets/img/index/twitter.svg"
                alt="team waterloop twitter"
                height="40"></a>
            <a
              class="dim"
              href="https://www.instagram.com/team_waterloop"
              target="_blank"><img
                src="~/assets/img/index/instagram.svg"
                alt="team waterloop insta"
                height="40"></a>
          </div>
          <MainArrow class="ml2"/>
        </div>
      </div>
    </Cover>
    <section class="full-height flex flex-column justify-around">
      <div
        class="relative noseldrag bg flex flex-column flex-grow-1 justify-around">
        <div
          id="main"
          class="target"/>
        <div class="flex flex-column justify-center items-center f3 w-100 mv3 tc">
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
          <span class="fg-yellow mt2">Toronto - Montreal</span>
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
          class="relative w-100 pod-tube mb4">
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
      </div>
      <div class="flex items-center">
        <div
          :class="{ active }"
          class="hyper-grid white container mb4">
          <div
            v-for="(item, i) in whyHyperloop"
            :key="i"
            :style="{ animationDelay: `${ i * 500 }ms`}"
            class="flex flex-column justify-center">
            <img
              :src="require('@/assets/img/index/' + item.src)"
              :alt="item.alt"
              class="">
            <h3 class="mv2 f3">
              {{ item.heading }}
            </h3>
            <div class="f5">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="white">
      <div class="container cf">
        <h2 class="f2 mb4">Our Blogs</h2>
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
                class="noseldrag aspect-ratio--6x4 cover bg-center"/>
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

const endpoint = (process.env.NODE_ENV === 'production' ? 'https://3k6mmv3x0a.execute-api.us-east-2.amazonaws.com' : '') + '/api/mediumPosts'

export default {
  data() {
    return {
      waterloopLogo,
      partners: hypersonic,
      blog: [],
      timeText: [ '', 'in', '2 hours', '30', 'minutes' ],
      teamSrc: 'https://drive.google.com/uc?export=view&id=13XxQGl0TrDCSnFRXNw-NWwzPVtkcKyCh', // require('@/assets/img/index/teamback.jpg'),
      active: false,
      whyHyperloop: [
        {
          src: 'icon-fast.svg',
          alt: 'Fast',
          heading: 'Faster than a plane',
          text: 'Air and rolling resistances are taken out of the equation, allowing for speeds over 1200 km/h.',
        },
        {
          src: 'icon-convenient.svg',
          alt: 'Convenient',
          heading: 'As convenient as a train',
          text: 'No need to wait in line for hours, every minute a Hyperloop Pod departs to your destination.',
        },
        {
          src: 'icon-safe.svg',
          alt: 'Safe',
          heading: 'High safety standards',
          text: 'The safety and trustworthiness of the Hyperloop system receives our top priority.',
        },
        {
          src: 'icon-sustainable.svg',
          alt: 'Sustainable',
          heading: 'Sustainable infrastructure',
          text: 'Pods travel extremely efficiently and gain their power from renewable energy sources such as the sun.',
        },
      ],
    }
  },
  mounted() {
    const { podTube, pod, crossfade } = this.$refs
    const animate = () => {
      pod.classList.add('pod-animate')
      const handler = () => {
        this.active = true
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

    axios.get(endpoint).then(({ data }) => {
      this.blog = data.blog
    })
      .catch(() => {}) // eslint-disable-line no-empty-function
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
  display: flex;
  height: calc(25px + 3vw);
  justify-content: space-around;
  justify-content: space-evenly;

  > div:not(:nth-child(3)) {
    background-image: linear-gradient(lighten($bg, 80%) 0%, lighten($bg, 50%) 5%, $bg 25%, $bg 95%, #000 100%);
    height: 100%;
    width: 0.5rem;
    z-index: 1;
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
  animation: slide 1.5s 500ms cubic-bezier(0, 1, 0, 1) forwards;
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
}

.blog {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-bottom: 20px;
}

.full-height {
  min-height: calc(100vh - #{$nav-height});
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

.bg-l30 {
  background-color: lighten($bg, 30%);
}

.hyper-grid {
  display: grid;
  grid-gap: 2rem;
  text-align: center;

  > div {
    transform: scale(0);
  }

  &.active > div {
    animation: appear 1s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
  }

  img {
    height: 5vmax;
    margin: 0 auto;
  }
}

@keyframes appear {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@media only screen and (min-width: $small) {
  .hyper-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

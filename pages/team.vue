<template>
  <div class="mb4">
    <Cover
      img-class="op-cb h-100"
      class="items-end"
      src="https://drive.google.com/uc?export=view&id=13-VSxkdTOXDLX3pKjDh_Ymgdbh4_YVIG"
      alt="Waterloop Team">
      <div class="container f1 fw8 flex flex-column items-center mb5">
        <div>Meet the Team</div>
        <div>
          <MainArrow/>
        </div>
      </div>
    </Cover>
    <section
      v-for="(group, i) of teamStructure.groups"
      :key="i"
      class="white relative">
      <div
        id="main"
        class="target"/>
      <h1 class="container f1 b tc line-through nav-sticky z-3 mt4 mb0">{{ group.name }}</h1>
      <section
        v-for="(team, i) of group.teams"
        :key="i"
        class="mb3">
        <h2 class="container f3 tc small line-through group-sticky z-2 pt4 pv3 ma0">{{ team.name }}</h2>
        <div class="container gg-grid noseldrag">
          <div
            v-for="(member, i) of team.members"
            :key="i"
            class="gg-wrapper"
            @click.passive="ggwp($event, member)">
            <div class="gg-info tc pa2">
              <div class="f3-ns">{{ member.name }}</div>
              <div class="f7 f5-ns">{{ member.role }}</div>
            </div>
            <img :src="member.small">
          </div>
        </div>
      </section>
    </section>
    <div
      ref="mask"
      class="gg-mask dark-bg z-999"/>
    <transition name="fade">
      <div
        v-show="activeMember"
        ref="gg"
        class="gg-desc z-999 flex"
        @click="wpgg(false)">
        <div class="w-50 h-100 pa5 dark-bg">
          <div class="f1 b fg-yellow">
            {{ activeMember && activeMember.bioTitle }}
          </div>
          <p class="white">
            {{ activeMember && activeMember.bio }}
          </p>
        </div>
        <div
          :style="{ backgroundImage: activeMember && `url(${activeMember.big})` }"
          class="w-50 h-100 cover bg-center"/>
      </div>
    </transition>
  </div>
</template>

<script>
import { noscroll, scroll } from '~/assets/js/util'
import teamStructure from '~/assets/data/teamStructure'

const eventHandlerOpts = {
  capture: false,
  passive: true,
}
const In = 'transform 500ms ease-in, opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
const Out = 'transform 300ms ease-out, opacity 300ms cubic-bezier(0.55, 0.09, 0.68, 0.53)'

export default {
  data() {
    return {
      activeMember: null,
      teamStructure,
      noBackCheck: true,
      transtioning: false,
    }
  },
  mounted() {
    window.onhashchange = this.onhashchange
  },
  beforeDestroy() {
    window.onhashchange = null
  },
  methods: {
    remove(mask) {
      mask.removeEventListener('transitionend', this.handler, eventHandlerOpts)
    },
    add(mask) {
      mask.addEventListener('transitionend', this.handler, eventHandlerOpts)
    },
    ggwp(e, member) {
      if (this.transtioning) {
        return
      }
      this.transtioning = true
      this.activeEl = e.currentTarget
      const { mask } = this.$refs
      const { innerWidth, innerHeight } = window

      window.location.hash = 'info'
      noscroll()

      const x = e.clientX - 32
      const y = e.clientY - 32

      requestAnimationFrame(() => {
        mask.style.visibility = 'visible'
        mask.style.opacity = 0.2
        mask.style.transform = `translate3d(${ x }px,${ y }px,0) scale3d(1,1,1)`
        requestAnimationFrame(() => {
          mask.style.transition = In
          requestAnimationFrame(() => {
            const x = innerWidth * 0.5 - 32
            const y = innerHeight * 0.5 - 32
            const factor = Math.sqrt(innerWidth ** 2 + innerHeight ** 2) * 0.03125 - 1
            mask.style.opacity = 1
            mask.style.transform = `translate3d(${ x }px,${ y }px,0) scale3d(${ factor },${ factor },1)`
            this.remove(mask)
            this.handler = () => {
              mask.style.transition = ''
              this.activeMember = member
              this.remove(mask)
              this.noBackCheck = false
              this.transtioning = false
            }
            this.add(mask)
          })
        })
      })
    },
    wpgg(noback) {
      this.activeMember = null
      const rect = this.activeEl.getBoundingClientRect()
      const { mask } = this.$refs

      this.noBackCheck = true
      if (!noback) {
        window.history.back()
      }
      scroll()

      const radius = rect.height * 0.5
      const offset = radius - 32
      const x = rect.left + offset
      const y = rect.top + offset
      const factor = radius * 0.03125

      requestAnimationFrame(() => {
        mask.style.transition = Out
        requestAnimationFrame(() => {
          mask.style.transform = `translate3d(${ x }px,${ y }px,0) scale3d(${ factor },${ factor },1)`
          mask.style.opacity = 0.2
          this.remove(mask)
          this.handler = () => {
            mask.style.transition = ''
            mask.style.visibility = ''
            this.remove(mask)
          }
          this.add(mask)
        })
      })
    },
    onhashchange() {
      if (this.noBackCheck) {
        return
      }
      this.wpgg(true)
    },
  },
  head: { title: 'Waterloop - Team' },
}
</script>

<style lang="scss">
@import '~/assets/css/variables.scss';
$gap: 3rem;
$border-radius: 5%;

.gg-grid {
  display: grid;
  grid-auto-rows: 1fr;
  grid-gap: $gap;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

@media only screen and (max-width: $mobile) {
  .gg-grid {
    grid-gap: $gap / 2;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
}

.gg-info {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: $border-radius;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  line-height: 1.5;
  opacity: 0;
  position: absolute;
  width: 100%;
  z-index: 1;

  >* {
    opacity: 0;
    transform: translateY(50%);
    transition: all 300ms ease-in-out;
  }
}

.gg-mask {
  border-radius: 50%;
  height: 64px;
  left: 0;
  position: fixed;
  top: 0;
  visibility: hidden;
  width: 64px;
  will-change: transform;
}

.gg-wrapper {
  cursor: pointer;
  line-height: 0;
  overflow: hidden;
  padding-bottom: 100%;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  > img {
    border-radius: $border-radius;
    height: 100%;
    object-fit: cover;
    position: absolute;
    width: 100%;
  }

  &:hover > .gg-info {
    opacity: 1;

    > * {
      opacity: 1;
      transform: none;
    }
  }
}

.gg-desc {
  background-color: #d3d3d3;
  cursor: pointer;
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100vw;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave {
  opacity: 0;
}
</style>

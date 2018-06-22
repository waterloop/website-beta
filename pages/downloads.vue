<template>
  <div class="container mb4">
    <h1 class="white f1">Downloads</h1>
    <div class="dl-grid">
      <div
        v-for="(item, i) of dl"
        :key="i"
        class="card">
        <div class="overflow-hidden">
          <div class="relative aspect-ratio--16x9">
            <img
              :src="item.thumbnail"
              class="noseldrag absolute-bg"
              alt="Wallpaper thumbnail">
          </div>
        </div>
        <div class="card-action">
          <a
            :href="item.mobile"
            :download="`${ item.name }-mobile.png`">Mobile</a>
          <a
            :href="item.desktop"
            :download="`${ item.name }-desktop.png`">Desktop</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goforitTbnl from '~/assets/img/downloads/goforit_tbnl.jpg'
import hypeTbnl from '~/assets/img/downloads/hype_tbnl.jpg'
import loopyTbnl from '~/assets/img/downloads/loopy_tbnl.jpg'
import northTbnl from '~/assets/img/downloads/north_tbnl.jpg'

export default {
  data: () => ({
    dl: [
      {
        name: 'Go For It',
        thumbnail: goforitTbnl,
        mobile: '/wallpapers/Go_for_it/goforit_phone_white.png',
        desktop: '/wallpapers/Go_for_it/goforit_1080_white.png',
      },
      {
        name: 'Hype',
        thumbnail: hypeTbnl,
        mobile: '/wallpapers/Hype/hype_phone_white.png',
        desktop: '/wallpapers/Hype/hype_1080_white.png',
      },
      {
        name: 'Loopy',
        thumbnail: loopyTbnl,
        mobile: '/wallpapers/Loopy/loopy_phone_white.png',
        desktop: '/wallpapers/Loopy/loopy_1080_white.png',
      },
      {
        name: 'North',
        thumbnail: northTbnl,
        mobile: '/wallpapers/North/north_phone_white.png',
        desktop: '/wallpapers/North/north_1080_white.png',
      },
    ],
  }),
}
</script>

<style>
.dl-grid {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr;
}
</style>


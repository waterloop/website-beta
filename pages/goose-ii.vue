<template>
  <div class="container white mb4">
    <div class="parallax-container">
      <div class="parallax"><img
        :src="banner"
        class="responsive-img"
        alt="Goose banner"></div>
    </div>
    <div class="section white">
      <div class="row container">
        <h2 class="header">Goose II</h2>
        <p class="grey-text text-darken-3 lighten-3">The next generation.</p>
      </div>
    </div>
    <slot v-for="(section, i) of sections">
      <div
        v-if="section.parallax"
        :key="i"
        class="parallax-container">
        <div class="parallax">
          <img
            :src="section.parallax"
            class="responsive-img pimg"
            alt="Goose features">
        </div>
      </div>
      <div
        :key="i"
        class="section white">
        <div class="row container">
          <h2 class="header">{{ section.title }}</h2>
          <p
            v-for="(content, j) in section.content"
            :key="j"
            class="content">{{ content }}</p>
          <template v-if="'img' in section">
            <img
              v-for="(imgs, j) of section.img"
              :key="j"
              :src="img"
              class="responsive-img"
              alt="Goose features">
          </template>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        {
          title: 'Specifications',
          content: [
            "The GOOSE II is our half-scale, functional prototype vehicle pod. Fabrication has been completed for this pod and we are testing it's capabilities currently. This pod is entered in the SpaceX Hyperloop Pod Competition to perform full systems tests on SpaceX’s one mile long test track at high-speeds and in a vacuum.",
            'The prototype is about 0.5m  (20") wide, 2.5m (8\') long, 0.8m (32") tall, around 150 kg in weight, and is designed to travel at speeds above 550km/h (150m/s).',
          ],
        },
        {
          title: 'Levitation',
          content: [
            'A lightweight pneumatic levitation system that allows the pod to float over a thin cushion of compressed air – creating almost zero drag. Air is supplied by two high pressure carbon fiber tanks and sent to four air casters positioned underneath our levitation and suspension module. This module also deals with unevenness of the track and dampens vibrations produced while travelling at high speeds using shock absorbers.',
          ],
          parallax: '/images/flock/goose2/levitation.jpg',
        },
        {
          title: 'Eddy Current Brakes',
          content: [
            'Eddy current brakes, as its name suggests, is our contact-less braking system that utilizes the eddy current phenomena to smoothly slow down of the pod from high speeds. An array of powerful magnets are used to provide the braking effect.',
          ],
          parallax: '/images/flock/goose2/goose2_ec.png',
        },
        {
          title: 'Magnetic Wheels',
          content: [
            'Inside each magnetic wheel is a ring of magnets arranged in a particular combination such that by spinning, each pair of magnetic wheels generate forces to keep the pod centered on the test track as well as propell the pod forward. High speed brushless DC motors allow us to have effective control over the pod even at high speeds.',
          ],
          parallax: '/images/flock/goose2/goose2_magwheel.png',
        },
        {
          title: 'Shell',
          content: [
            'Incorporating beautiful and modern design while being operable at up to trans-sonic velocities. Its fiberglass composition means it can be lightweight yet strong.',
          ],
          parallax: '/images/flock/goose2/goose2_shell.png',
        },
      ],
    }
  },
  head: { title: 'Waterloop - Goose II' },
}
</script>

<style lang="scss">
</style>

<template>
  <div class="mb4">
    <div
      class="relative overflow-hidden vh-50">
      <Parallax
        class="absolute-bg"
        percentage="0.63"><img
          class="responsive-img"
          src=""
          alt="Sponsors"></Parallax>
      <div class="container h-100 f1 white flex items-center">We love our sponsors!</div>
    </div>
    <section class="white">
      <div class="container f4">
        <div>
          <a
            href="/Waterloop_information_package.pdf"
            class="f2"
            target="_blank">Information Package</a>
          <div>
            Our mission:
            <ul>
              <li>
                To strongly represent Waterloo as a hub for Canadian innovation through the SpaceX Hyperloop Competition
              </li>
              <li>
                To teach technical skills, strong engineering practices, and teamwork
              </li>
              <li>
                To reach out to inspire and cultivate young innovators from all backgrounds
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div
          v-for="(sponsor, i) in sponsors"
          :key="i">
          <h2 class="f1 b tc line-through nav-sticky pb4 z-3 mt4 mb0">{{ sponsor.name }}</h2>
          <div
            :class="sponsor.name.toLowerCase()"
            class="flex-align flex-wrap sponsor-card mh4">
            <img
              v-for="(item, j) of sponsor.members"
              :key="j"
              :src="require('@/assets/img/sponsors/' + item)"
              :alt="sponsor.name + ' sponsor'"
              class="sponsor-logo1">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import sponsors from '~/assets/data/sponsorStructure'

export default {
  data() {
    return { sponsors }
  },
}
</script>

<style lang="scss">
@import '~/assets/css/variables.scss';

.hypersonic img {
  height: 120px;
}

.supersonic img {
  height: 80px;
}

.transonic img {
  height: 70px;
}

.sonic img {
  height: 60px;
}

@media only screen and (max-width: 921px) {
  .sponsor-logo1 {
    height: auto;
    max-width: 95%;
  }

  .sponsors-header {
    font-size: 57px;
  }

  .hypersonic,
  .supersonic,
  .transonic,
  .sonic {
    height: unset;
  }

  .flex-align {
    flex-direction: column;
  }
}

.sponsor-card {
  background: lighten($bg, 50);
  border-radius: 8px;
  padding: 2rem;

  > img {
    margin: 2rem;
  }
}
</style>

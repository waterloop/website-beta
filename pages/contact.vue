<template>
  <div class="container white mb4">
    <h1 class="f1">Contact Info</h1>
    <div class="flex flex-row-ns flex-column">
      <div class="fl2 mr4-ns">
        <form @submit.prevent="submit">
          <h2 class="f2">Send us a message</h2>
          <div class="f4">
            <div class="mb3">
              <div >
                <label for="nameinput">Name *</label>
              </div>
              <div>
                <input
                  id="nameinput"
                  class="w-100 mw6-ns"
                  type="text"
                  required
                  value="">
              </div>
            </div>
            <div class="mb3">
              <div >
                <label for="email">Email *</label>
              </div>
              <div>
                <input
                  id="email"
                  class="w-100 mw6-ns"
                  required
                  type="email"
                  value="">
              </div>
            </div>
            <div class="mb3">
              <div >
                <label for="message">Message *</label>
              </div>
              <div>
                <textarea
                  id="message"
                  class="w-100 mw6-ns"
                  required
                  value=""
                  aria-required="true"/>
              </div>
            </div>
          </div>
          <button
            :class="{ done }"
            :disabled="done"
            class="submit-btn f4"
            type="submit"
            name="action">{{ text }}</button>
          <div v-if="error">An error occurred, please try again</div>
        </form>
      </div>
      <div>
        <h2>Visit us</h2>
        <p>University of Waterloo<br>
          200 University Ave W<br>
          Engineering 5, 1104<br>
          Waterloo, ON N2L 3G1</p>
        <iframe
          class="w-100 bw0"
          height="450"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.4398990702825!2d-80.54704628419452!3d43.47228927212763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf6ad02edccff%3A0xdd9df23996268e17!2sUniversity+of+Waterloo!5e0!3m2!1sen!2sca!4v1511187357255"
          frameborder="0"
          allowfullscreen/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

const endpoint = (process.env.NODE_ENV === 'production' ? 'https://3k6mmv3x0a.execute-api.us-east-2.amazonaws.com' : '') + '/api/sendSlack'

export default {
  data() {
    return {
      error: false,
      state: -1, // -1 not submitted, 0 submitting, 1 submitted
    }
  },
  computed: {
    text() {
      const { state } = this
      return state < 0 ? 'Submit' : state > 0 ? 'Thank you!' : 'Submitting'
    },
  },
  methods: {
    submit() {
      this.error = false
      switch (this.state) {
      case -1:
        this.state = 0
        axios.post(endpoint, {
          name: window.nameinput.value,
          email: window.email.value,
          message: window.message.value,
        }).then(() => {
          this.state = 1
        })
          .catch(() => {
            this.state = -1
            this.error = true
          })
        break
      case 0:
        break
      default:
        window.nameinput.value = ''
        window.email.value = ''
        window.message.value = ''
        this.state = -1
      }
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/css/variables.scss';

.submit-btn,
textarea,
input[type='text'],
input[type='email'] {
  appearance: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
}

textarea,
input[type='text'],
input[type='email'] {
  border-color: $bg;
  border-width: 1px;
  outline: none;
  transition: border-color 200ms ease;

  &:focus {
    border-color: $brand-yellow;
  }
}

.submit-btn {
  background-color: #000;
  border: 1px solid #000;
  color: $brand-yellow;
  transition: all 200ms ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    border-color: $brand-yellow !important;
    outline: 0;
  }

  &.done {
    background-color: $brand-yellow;
    color: #000;
    pointer-events: none;
  }
}
</style>


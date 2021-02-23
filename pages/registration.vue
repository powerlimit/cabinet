<template>
  <div>
    <div class="buttons-wrap mb-6">
      <h1 class="h1">{{ $t('auth.register') }}</h1>
      <span class="text-muted">
        {{ $t('step', {step: step}) }}
        <img v-if="step === 1" src="../static/images/progress.svg" alt="">
        <img v-if="step === 2" src="../static/images/progress2.svg" alt="">
      </span>
    </div>
    <div v-if="step === 1">
      <p class="mb-2">{{ $t('auth.enter_phone') }}</p>
      <TelInput v-model="phone"/>
      <div class="buttons-wrap mt-6">
        <b-button :disabled="loading" @click="handleSubmitPhone" variant="primary">{{ $t('training.registration') }}</b-button>
        <Link :to="localePath('login')">{{ $t('auth.have_account') }}</Link>
      </div>
    </div>
    <div class="mb-6" v-if="step === 2">
      <AppInput
        v-model="$v.code.$model"
        :label="$t('auth.enter_code')"
        :validation="$v.code"
      />
      <div class="buttons-wrap mt-6 mb-4">
        <b-button :disabled="loading" @click="handleSubmitCode" variant="primary">{{ $t('auth.confirm') }}</b-button>
        <span @click="step = 1" class="d-flex align-items-center cursor-pointer">
          <img src="../static/images/back.svg" alt="" class="mr-1">
          {{ $t('auth.change_number') }}
        </span>
      </div>
      <span @click="handleSubmitPhone(true)" class="text-muted cursor-pointer">{{ $t('auth.request_code') }} 0:{{wait}}</span>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators';

export default {
  name: 'registration',
  layout: 'auth',
  data () {
    return {
      phone: null,
      code: null,
      step: 1,
      codeHint: 'Введите код',
      smsSent: false,
      wait: 0,
    };
  },
  validations: {
    code: {
      required,
    },
  },
  computed: {
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    handleSubmitPhone (resend = false) {
      if (!this.phone.valid) {
        this.$toast.error(this.$t('auth.int_phone'));
        return false;
      }

      let tries = localStorage.getItem('tries');
      if (tries) {
        tries = JSON.parse(tries);
        if (this.phone.number === tries.phone) {
          if (tries.expire > Date.now()) {
            this.wait = Math.floor((tries.expire - Date.now()) / 1000);
            this.smsSent = true;
            return false;
          }
          if (tries.qty === 3) {
            this.$toast.error(this.$t('auth.tries_limit'));
            return false;
          }
        }
      }

      this.$axios
        .post('/registration/phone', {phone: this.phone.number})
        .then(res => {
          this.step =
            this.step === 1 || resend
              ? 2
              : this.step === 2
              ? 3
              : null;
          this.loading = false;
          this.wait = 60;
          if (tries && this.phone.number === tries.phone) {
            localStorage.setItem('tries', JSON.stringify({
              qty: tries.qty + 1,
              phone: this.phone.number,
              expire: Date.now() + 60 * 1000,
            }));
          } else {
            localStorage.setItem('tries', JSON.stringify({
              qty: 1,
              phone: this.phone.number,
              expire: Date.now() + 60 * 1000,
            }));
          }
          let interval = setInterval(() => {
            if (this.wait > 0) {
              this.wait--;
            } else {
              this.wait = 0;
              clearInterval(interval);
            }
          }, 1000);
          this.smsSent = true;
        })
        .catch(e => {
          if (e.code === 500) {
            this.$toast.error(e.message);
          } else if (e.message.includes('403')) {
            this.$toast.error(e.message);
            localStorage.removeItem('tries');
            this.$router.push({path: this.localePath('login')});
          } else {
            this.$toast.error(e.message);
          }
        });
    },
    handleSubmitCode () {
      this.$axios
        .post('/registration/code', {phone: this.phone.number, code: this.code})
        .then(res => {
          const userData = {
            username: this.phone.number,
            password: this.code,
          };
          this.$auth
            .loginWith('local', {
              data: userData,
            })
            .then(() => {
              this.$router.push(this.localePath('attributes'));
            })
            .catch(e => {
              this.$toast.error(e.message);
            });
        })
        .catch(e => {
          this.$toast.error(e.message);
        });
    },
  },
};
</script>

<style scoped>

</style>

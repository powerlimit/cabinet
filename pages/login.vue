<template>
  <div>
    <h1 class="h1 mb-6">{{$t('auth.enter_h1')}}</h1>
    <b-form @submit.prevent="handleSubmit">
      <AppInput
        :label="$t('auth.email_or_phone')"
        v-model="$v.username.$model"
        class="mb-4"
        :validation="$v.username"
      />
      <AppInput
        :label="$t('auth.enter_pass')"
        v-model="$v.password.$model"
        type="password"
        class="mb-6"
        :validation="$v.password"
      />
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <b-button type="submit" variant="primary">{{$t('auth.enter')}}</b-button>
        <nuxt-link class="light-link" :to="localePath('registration')">
          {{$t('auth.register')}}
        </nuxt-link>
        <nuxt-link class="light-link" :to="localePath('recovery')">
          {{$t('auth.forgot_password')}}
        </nuxt-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'login',
  layout: 'auth',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    }
  },
  methods: {
    async handleSubmit () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$toast.error(this.$t('validator.check_data'))
        return false
      }
      const userData = {
        username: this.username,
        password: this.password
      };
      this.$auth
        .loginWith("local", {
          data: userData
        })
        .then(async () => {
          const token = this.$route.query.subscribe_token
          try {
            if (token) {
              await this.$axios.$get('/mail/subscribe/' + this.$route.query.subscribe_token)
              this.$toast.success(this.$t('subscription'))
            }
          } catch (e) {
            console.log(e);
          } finally {
            await this.$router.push(this.localePath("index"));
          }
        })
        .catch(e => {
          this.$toast.error(e.message);
        })
    }
  }
};
</script>

<style scoped>

</style>

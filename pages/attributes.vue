<template>
  <div>
    <div class="buttons-wrap mb-6">
      <h1 class="h1">{{ $t('auth.register') }}</h1>
      <span class="text-muted">
        {{ $t('almost_done') }}
        <img src="../static/images/progress3.svg" alt="">
      </span>
    </div>
    <b-form @submit.prevent="handleSubmit">
      <AppInput
        :label="$t('user_update.first_name')"
        v-model="$v.firstName.$model"
        class="mb-4"
        :validation="$v.firstName"
      />
      <AppInput
        :label="$t('user_update.last_name')"
        v-model="$v.lastName.$model"
        class="mb-4"
        :validation="$v.lastName"
      />
      <AppInput
        :label="$t('user_update.second_name')"
        v-model="$v.secondName.$model"
        class="mb-4"
        :validation="$v.secondName"
      />
      <AppInput
        :label="$t('user_update.email')"
        v-model.trim.lazy="$v.email.$model"
        class="mb-4"
        :validation="$v.email"
      />
      <Datepicker class="mb-4" :validation="$v.dob" v-model="$v.dob.$model" />
      <Citypicker
        :validation="$v.geoId"
        v-model="$v.geoId.$model" />
      <AppInput
        :label="$t('auth.codeword')"
        v-model.trim.lazy="$v.codeword.$model"
        class="mb-4"
        :validation="$v.codeword"
      />
      <b-button type="submit" variant="primary">{{$t('training.registration')}}</b-button>
    </b-form>

  </div>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators';

export default {
  name: 'attributes',
  layout: 'auth',
  middleware: ['attributes'],
  data () {
    return {
      firstName: '',
      lastName: '',
      secondName: '',
      email: '',
      dob: null,
      geoId: null,
      codeword: '',
    }
  },
  methods: {
    handleSubmit () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$toast.error(this.$t('validator.check_data'))
        return false
      }
      this.$axios
        .post("/user/attributes", {
          firstName: this.firstName,
          lastName: this.lastName,
          secondName: this.secondName,
          dob: this.dob,
          geoId: this.geoId,
          email: this.email,
          codeword: this.codeword
        })
        .then(() => {
          this.loading = false;
          window.location.href = "/"
        })
        .catch(async e => {
          this.loading = false;
          console.log(e)
          if (e.code === 401) {
            await this.$auth.logout();
            this.$router.push("/login")
          } else {
            this.$toast.error(e.message);
          }
        })
    }
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    secondName: {
      required,
    },
    email: {
      required, email
    },
    dob: {
      required,
    },
    geoId: {
      required,
    },
    codeword: {
      required,
    },
  },
};
</script>

<style scoped>

</style>

<template>
  <div>
    <div v-if="loading" class="progress">
      <div class="indeterminate"></div>
    </div>
    <div class="container">
      <div class="auth-container">
        <div class="d-flex justify-content-between align-items-center mb-100">
          <img src="../static/images/single-logo.svg" alt="">
          <LanguageSwitcher />
        </div>
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'auth',
  middleware: ["locale"],
  computed: {
    loading () {
      return this.$store.state.loading
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/bootstrap_functions";
  .auth-container {
    min-height: 100vh;
    padding: 50px 15px;
    max-width: 530px;
    margin-left: auto;
    margin-right: auto;
    @include media-breakpoint-up(xl) {
      padding-top: 120px;
    }
  }
</style>

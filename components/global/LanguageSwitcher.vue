<template>
  <div class="d-flex align-items-center flex-wrap">
    <nuxt-link
      v-if="locale === 'ru'"
      :to="switchLocalePath('en')"
    >
      <img src="../../static/images/en.png" class="flag" alt="" />
    </nuxt-link>
    <nuxt-link
      v-else
      :to="switchLocalePath('ru')"
    >
      <img src="../../static/images/ru.png" class="flag" alt="" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "LanguageSwitcher",
  computed: {
    locale() {
      return this.$store.state.locale
    }
  }
}
</script>

<style scoped>
.flag {
  width: 30px;
  height: 15px;
}
</style>

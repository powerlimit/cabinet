<template>
  <client-only>
    <div style="position: relative; z-index: 3;">
      <vue-tel-input
              v-model="phone"
              :preferred-countries="['RU', 'UA', 'BY', 'KZ']"
              :dynamic-placeholder="true"
              class="position-relative"
              style="z-index: 3"
              :valid-characters-only="true"
              @input="changeValue"
              :inputOptions="{
                'placeholder': '',
                'styleClasses': 'form-control'
              }"
      />
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      phone: null,
      ph: null,
      translations: {
        countrySelectorLabel: this.$t("auth.choose_country"),
        countrySelectorError: this.$t("index.error"),
        phoneNumberLabel: this.$t("auth.phone"),
        example: this.$t("auth.example")
      }
    }
  },
  methods: {
    changeValue(str, obj) {
      console.log(obj)
      this.$emit("input", obj)
    },
  }
}
</script>

<style scoped></style>

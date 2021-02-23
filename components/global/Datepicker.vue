<template>
  <client-only>
    <div class="form-group">
      <label for="date-input">{{$t('user_update.dob')}}</label>
      <date-picker
        :input-class="statusClass"
        v-model="val"
        :lang="lang"
        @input="changeValue"
        :input-attr="{
            id: 'date-input'
          }"
        valueType="format" />
    </div>
  </client-only>
</template>

<script>
export default {
  props: ['value', 'validation'],
  name: "Datepicker",
  data () {
    return {
      val: this.value,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
    }
  },
  computed: {
    statusClass () {
      let cls = 'form-control ';
      if (!this.validation) {
        return cls;
      }
      cls += this.validation.$error ? 'is-invalid' : !this.validation.$error && this.validation.$model ? 'is-valid' : '';
      return cls
    },
  },
  methods: {
    changeValue(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>

</style>

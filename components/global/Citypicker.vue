<template>
  <client-only>
    <div class="form-group">
      <p class="mb-2">
        {{$t('user_update.city')}}
      </p>
      <multiselect
        v-model="geoId"
        :options="geoList"
        placeholder=" "
        label="text"
        track-by="id"
        select-label=""
        class="mb-4"
        :class="statusClass"
        no-options=""
        @select="handleSelect"
        :no-result="$t('label.no_results')"
        @search-change="searchGeoId"
      >
        <template v-slot:noOptions>
          {{ $t("label.start_typing") }}
        </template>
        <template v-slot:noResult>
          {{ $t("label.no_results") }}
        </template>
      </multiselect>
    </div>
  </client-only>
</template>

<script>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css'
export default {
  name: "Citypicker",
  components: {
    Multiselect
  },
  props: ['value', 'validation'],
  data () {
    return {
      geoList: [],
      geoId: null
    }
  },
  computed: {
    statusClass () {
      if (!this.validation) {
        return '';
      }
      return this.validation.$error ? 'is-invalid' : !this.validation.$error && this.validation.$model ? 'is-valid' : '';
    },
  },
  methods: {
    searchGeoId(q) {
      this.$axios
        .get("/geo/autocomplete?q=" + q)
        .then(res => {
          this.geoList = res.data.results
        })
    },
    handleSelect(val) {
      this.$emit('input', val.id)
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="form-group">
    <label class="label" v-html="label" :for="inputId"/>
    <input
      v-model="val"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      @input="changeValue"
      :id="inputId"
      class="form-control"
      :class="statusClass"
    />
    <span v-if="commission !== undefined" class="commission">
      <span v-if="commission !== 0">
        {{ -commission * 100 }}% = {{ realSum }}
      </span>
    </span>
    <span v-if="currency" class="commission">{{ currency }}</span>
    <span class="hint-wrap">
      <span v-if="hint" :id="hint.id" class="hint-mark">{{ hint.hint }}</span>
    </span>
    <b-popover
      v-if="hint"
      :target="hint.id"
      triggers="focus hover"
      placement="bottom"
    >
      <span v-html="hint.text"/>
    </b-popover>
  </div>
</template>

<script>
import {makeid} from '@/utils';

export default {
  props: {
    /**
     * object example: {hint: '?|!', id: 'text-id for creating ref to popover', text: 'text for hint'}
     */
    hint: {
      type: Object,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    commission: {
      type: Number,
    },
    currency: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    isAmount: {
      type: Boolean,
      default: false,
    },
    value: {
      type: null,
    },
    autocomplete: {
      type: String,
      default: 'none',
    },
    id: {
      type: String,
      default: '',
    },
    validation: {
      type: Object,
    },
  },
  data () {
    return {
      val: this.value,
      inputId: '',
    };
  },
  computed: {
    realSum () {
      return (this.val - this.val * this.commission).toFixed(2) + ' ' + this.currency;
    },
    statusClass () {
      if (!this.validation) {
        return '';
      }
      return this.validation.$error ? 'is-invalid' : !this.validation.$error && this.validation.$model ? 'is-valid' : '';
    },
  },
  methods: {
    changeValue () {
      let value = this.val;
      if (this.isAmount) {
        value = value.replace(/[^\d\.]/g, '');
        if (value.match(/\./g) && value.match(/\./g).length > 1) {
          value = value.substr(0, value.lastIndexOf('.'));
        }
      }
      this.val = value;
      this.$emit('input', value);
    },
  },
  beforeMount() {
    if (this.id) {
      this.inputId = this.id
    } else {
      this.inputId = makeid();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

</style>

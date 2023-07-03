<template>
  <ValidationProvider :vid="$attrs.name" :name="name" :rules="rules" tag="div">
    <a-form-item
      slot-scope="{ errors, flags }"
      :label="label"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :validate-status="resolveState({ errors, flags })"
      :help="showErrors ? errors[0] : ''"
      :colon="colon"
      :required="required"
    >
      <input
        v-model="innerValue"
        :type="type"
        :placeholder="placeholder"
        :size="size"
        class="ant-input"
        :limitSize="limitSize"
        :class="classObject"
        :disabled="disabled || readonly"
        @blur="blurHandler"
        @focus="focusHandler"
      />
    </a-form-item>
  </ValidationProvider>
</template>
<script>
// import Cleave from 'vue-cleave-component';
import { ValidationProvider } from "vee-validate";

export default {
  name: "AppInput",
  components: {
    ValidationProvider,
  },
  directives: {
    uppercase: {
      update(el) {
        el.value = el.value.toUpperCase();
      },
    },
  },
  props: {
    vid: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "default",
    },
    rows: {
      type: Number,
      default: 4,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    labelCol: {
      type: Object,
      default: () => {},
    },
    wrapperCol: {
      type: Object,
      default: () => {},
    },
    vDecorator: {
      type: Array,
      default: () => [],
    },
    prefix: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    colon: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [Object, String],
      default: "",
    },
    showErrors: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Object,
      default: () => {
        return {
          delimiter: "",
          uppercase: true,
          blocks: [9000],
        };
      },
    },
    limitSize: {
      type: Number,
      default: 15,
    },
    spaceAllowed: {
      type: Boolean,
      default: true,
    },
    charAllowed: {
      type: Boolean,
      default: true,
    },
    textAllowed: {
      type: Boolean,
      default: true,
    },
    spaceRegex: {
      type: RegExp,
      default: () => /\s/g,
    },
    specialCharacterRegex: {
      type: RegExp,
      default: () => /[^\w\s-]/gi,
    },
    textOnlyRegex: {
      type: RegExp,
      default: () => /[^0-9]/g,
    },
  },
  data() {
    return {
      innerValue: "",
    };
  },
  computed: {
    classObject() {
      return {
        "ant-input-lg": this.size === "large",
        "ant-input-sm": this.size === "small",
        "ant-input-disabled": this.disabled,
      };
    },
  },
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$nextTick(() => {
        this.$emit("input", newVal);
      });
    },
    // Handles external model changes.
    value: {
      handler(newVal, oldValue) {
        if (!newVal) {
          this.innerValue = "";
          return;
        }
        this.innerValue = String(newVal)
          .slice(0, this.limitSize)
          .replace(/\s/g, "");
      },
      immediate: true,
    },
  },
  created() {
    if (!this.value) {
      this.innerValue = "";
      return;
    }
    if (this.value && !this.spaceAllowed) {
      this.innerValue = String(this.value)
        .toUpperCase()
        .slice(0, this.limitSize)
        .replace(/\s/g, "");
      return;
    }
    this.innerValue = String(this.value)
      .toUpperCase()
      .slice(0, this.limitSize);
  },
  methods: {
    blurHandler(e) {
      const newVal = e.target.value;
      this.$emit("blur", e.target.value);
    },
    focusHandler($event) {
      this.$emit("focus", $event);
    },
    resolveState({ errors, flags }) {
      if (errors[0]) {
        return "error";
      }

      if (flags.pending) {
        return "validating";
      }

      if (flags.valid) {
        return "success";
      }

      return "";
    },
  },
};
</script>
<style>
.ant-input:disabled {
  background-color: #f8f8f8 !important;
  opacity: 1;
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.85) !important;
}
</style>

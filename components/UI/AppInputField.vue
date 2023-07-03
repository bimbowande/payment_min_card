<template>
  <ValidationProvider :vid="$attrs.name" :name="name" :rules="rules">
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
      <span>
        <cleave
          v-model="innerValue"
          :placeholder="placeholder"
          :size="size"
          class="ant-input"
          :class="classObject"
          :limitSize="limitSize"
          style="width: 100%"
          :disabled="disabled || readonly"
          :options="options"
          @input="changeHandler"
          @blur="blurHandler"
        ></cleave>
      </span>
    </a-form-item>
  </ValidationProvider>
</template>
<script>
import Cleave from "vue-cleave-component";
import { ValidationProvider } from "vee-validate";

export default {
  name: "AppAmountInput",
  components: {
    ValidationProvider,
    Cleave,
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
    label: {
      type: String,
      default: "",
    },
    limitSize: {
      type: Number,
      default: 20,
    },
    placeholder: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "default",
    },
    // classNames: {
    //   type: String,
    //   default: 'ant-input',
    // },
    value: {
      type: [String, Number],
      default: 0,
    },
    labelCol: {
      type: Object,
      default: () => {},
    },
    wrapperCol: {
      type: Object,
      default: () => {},
    },
    readonly: {
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
    colon: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => {
        return {
          numeral: true,
          numeralPositiveOnly: true,
        };
      },
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
  // mounted() {
  //   if (this.value) {
  //     this.innerValue = this.value;
  //   }
  // },
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
    changeHandler($event) {
      this.$emit("change", $event);
    },
    blurHandler($event) {
      this.$emit("blur", $event);
      //   this.renderMode = 'E'; // V initial value
    },
    formatAmount(value) {
      if (value) {
        const val = String(value);
        if (val.includes(".") || value > 999999999999999) {
          return value;
        }
        val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parseFloat(val).toFixed(2);
      } else {
        return 0.0;
      }
    },
    toggleMode() {
      this.renderMode = this.renderMode === "E" ? "V" : "E";
    },
  },
};
</script>

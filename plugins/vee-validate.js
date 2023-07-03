import Vue from 'vue';
import VeeValidate /* { Rules } */ from 'vee-validate';

export default () => {
  Vue.use(VeeValidate, { inject: false });
};

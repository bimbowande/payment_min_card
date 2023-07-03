<template>
  <div>
    <AppHeader />
    <AppPaymentForm />
  </div>
</template>
<script>
import AppHeader from "../layout/AppHeader.vue";
import AppPaymentForm from './AppPaymentForm.vue';
export default {
  name: "AppPaymentSystem",
  components: {
      AppHeader,
      AppPaymentForm,
    },
};
</script>

    AppPaymentForm
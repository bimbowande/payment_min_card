<template>
<div class="container">
  <AppPaymentSystem />
  </div>
</template>

<script>
import AppPaymentSystem from "../components/payment/AppPaymentSystem.vue";
export default {
  head() {
    return {
      title: 'App Payment System'
    };
  },
  components: { AppPaymentSystem },
};
</script>

<style></style>

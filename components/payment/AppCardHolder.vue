<template>
  <div class="creditcard">
    <div
      class="creditcard__inner"
      :class="{
        'show-back': showBack,
      }"
    >
      <AppFrontCreditCard
        :symbolImage="symbolImage"
        :cardNumber="cardNumber"
        :expiryDate="expiryDate"
        :cardHolder="cardHolder"
      />
      <AppBackCreditCard :ccv="ccv" />
    </div>
  </div>
</template>
<script>
import AppBackCreditCard from "./credit-card/AppBackCreditCard.vue";
import AppFrontCreditCard from "./credit-card/AppFrontCreditCard.vue";
export default {
  name: "AppCardHolder",
  components: {
    AppFrontCreditCard,
    AppBackCreditCard,
  },
  props: {
    cardNumber: {
      type: String,
      default: "0000 0000 0000 0000",
    },
    cardHolder: {
      type: String,
      default: "FALUA TEMITOPE OYEWOLE",
    },
    ccv: {
      type: String,
      default: "",
    },
    expiryDate: {
      type: String,
      default: "",
    },
    showBack: {
      type: Boolean,
      default: false,
    },
    symbolImage: {
      type: String,
      default: "",
    },
  },
};
</script>

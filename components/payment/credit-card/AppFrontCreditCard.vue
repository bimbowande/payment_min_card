<template>
  <div class="cardfront">
    <div class="cardfront__network">
      <a-icon type="wifi" />
    </div>
    <div class="cardfront__details">
      <p class="f-10">CARD NUMBER</p>
      <p class="c-n">{{ formatCard(cardNumber, 4, " ") }}</p>
      <div class="cardfront__details__img">
        <img src="~/assets/images/chip.png" />
      </div>
      <p class="exp f-10">EXPIRATION DATE</p>
      <p>{{ formatPattern(expiryDate, 2, "/") }}</p>

      <p>{{ cardHolder }}</p>
    </div>
    <div class="cardfront__cardType">
      <img src="~/assets/images/mastercard.png" />
    </div>
  </div>
</template>
<script>
import { formatPattern, formatCard } from "@/components/UI/utils";
export default {
  name: "AppFrontCreditCard",
  props: {
    cardNumber: {
      type: String,
      default: "0000 0000 0000 0000",
    },
    cardHolder: {
      type: String,
      default: "FALUA TEMITTOPE OYEWOLE",
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
      default: true,
    },
    symbolImage: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      formatPattern,
      formatCard,
    };
  },
};
</script>

<template>
  <div class="creditback">
    <div class="creditback__image"></div>
    <div class="creditback__sign">
        <div><span>Authorized Signature</span></div>
        <div><span>Not Valid Unless Signed</span></div>
    </div>
    <div class="creditback__cvv">
      <span>{{ ccv }}</span>
    </div>
    <div class="creditback__banknote">
        <p>This card be used by the authorised signatory and in accorance with the current {{ bankName }} terms and conditions.
        This card is ussye by and remain the property of {{ bankName }}. If found, please return to {{ bankName }}, {{ bankAddress }}</p>
        <p>Tel: {{ bankPhoneContact }} {{ bankWebsite }}</p>
        <p class="b-issued">ISSUED BY {{ bankName }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppBackCreditCard",
  props: {
    ccv: {
      type: String,
      default: "",
    },
    expiryDate: {
      type: String,
      default: "",
    },
    bankName: {
        type: String,
        default: 'Local Bank',
    },
    bankAddress: {
        type: String,
        default: '49 Somewhere in Africa.'
    },
    bankPhoneContact: {
        type: String,
        default: '0900-4843-942048, 01-383383, 0902-938-5000'
    },
    bankWebsite: {
        type: String,
        default: 'www.localbank.com'
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    backgroundImage: {
        type: String,
        default: '',
    },
    symbolImage: {
      type: String,
      default: "",
    },
  },
};
</script>

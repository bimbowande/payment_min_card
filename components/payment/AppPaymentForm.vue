<template>
  <div>
    <div class="paymentform">
      <a-row type="flex" :gutter="30">
        <a-col v-bind="grid1">
          <div class="paymentform__carddetails">
            <h3>Payment Information</h3>
            <h4>Choose your method of payment</h4>

            <div class="paymentform__creditcard">
              <AppCardHolder
                :cardNumber="cardObject.cardNumber"
                :name="cardObject.holder"
                :expiryDate="cardObject.expirydate"
                :ccv="cardObject.ccv"
                :showBack="cardObject.showBack"
              />
            </div>
          </div>
        </a-col>
        <a-col v-bind="grid2">
          <div class="paymentform__formdetails">
            <div class="paymentform__cardselection">
              <a-radio-group name="radioGroup" :default-value="3">
                <a-radio :value="1">
                  <img src="~/assets/images/visa.png" />
                </a-radio>
                <a-radio :value="2">
                  <img src="~/assets/images/discover.png" />
                </a-radio>
                <a-radio :value="3">
                  <img src="~/assets/images/paypal.png" />
                </a-radio>
              </a-radio-group>
            </div>
            <div class="paymentform__formbody">
              <form>
                <ValidationObserver ref="obs" tag="div">
                  <a-row type="flex" :gutter="20">
                    <a-col v-bind="formInputGrid">
                      <div class="form-group">
                        <AppInputField
                          v-model="cardObject.cardNumber"
                          label="Credit Card Number"
                          :options="options.creditCard"
                          name="cardnumber"
                        />
                      </div>
                    </a-col>
                    <a-col v-bind="formInputGrid">
                      <div class="form-group">
                        <AppInputField
                          v-model="cardObject.expirydate"
                          label="Expiration Date"
                          name="expirydate"
                          autocomplete="off"
                          :options="options.date"
                          :limitSize="5"
                        />
                      </div>
                    </a-col>
                    <a-col v-bind="formInputGrid">
                      <div class="form-group">
                        <AppInput
                          v-model="cardObject.ccv"
                          label="Security Code"
                          autocomplete="off"
                          name="cvv"
                          @focus="onFocusCard"
                          @blur="onBlurCard"
                          rules="numeric"
                          :limit-size="3"
                        />
                      </div>
                    </a-col>
                    <a-col v-bind="formInputGrid">
                      <div class="form-group">
                        <AppInputField
                          v-model="cardObject.postalCode"
                          label="Postal Code"
                          name="postal code"
                          autocomplete="off"
                          :limit-size="6"
                          :options="{
                            numeral: true,
                            numeralThousandsGroupStyle: 'none',
                          }"
                        />
                      </div>
                    </a-col>
                    <a-col :span="24">
                      <a-checkbox v-model="cardObject.reuse" @change="onChange">
                        Use this card for next purchase
                      </a-checkbox>
                    </a-col>
                  </a-row>
                </ValidationObserver>
                <a-row>
                  <a-col :span="24">
                    <a-button
                      type="primary"
                      :loading="loading"
                      block
                      @click="onSumbitCard"
                      >Add Card</a-button
                    >
                  </a-col>
                </a-row>
              </form>
            </div>
          </div>
        </a-col>
      </a-row>

      <div class="paymentdetails">
        <div>
          <div class="paymentdetails__span1">Subtotal</div>
          <div class="paymentdetails__span2">
            &#8358;{{ formatAmount(cardObject.subTotal) }}
          </div>
        </div>
        <div>
          <div class="paymentdetails__span1">Estimated TAX</div>
          <div class="paymentdetails__span2">
            &#8358;{{ formatAmount(cardObject.taxAmount) }}
          </div>
        </div>
        <div>
          <div class="paymentdetails__span1">
            Promotional Code: <span>Z4KXLM9A</span>
          </div>
          <div class="paymentdetails__span2">
            &#8358;{{ formatAmount(cardObject.promoAmount) }}
          </div>
        </div>
      </div>

      <div class="paymentcomplete">
        <div>
          <a-button
            type="primary"
            :loading="makingPayment"
            @click="completePayment"
            >Complete Payment</a-button
          >
        </div>
        <div>
          <strong>TOTAL:
            &#8358;
            {{ formatAmount(findTotal) }}</strong
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>


import { ValidationObserver } from "vee-validate";
import AppCardHolder from "@/components/payment/AppCardHolder";
import Cleave from "vue-cleave-component";
import AppInputField from "@/components/UI/AppInputField.vue";
import AppInput from "@/components/UI/AppInput.vue";
import { formatAmount, findAllTotal, formInputGrid, grid1, grid2 } from "@/components/UI/utils";
export default {
  name: "AppPaymentForm",
  components: {
    AppCardHolder,
    Cleave,
    AppInputField,
    AppInput,
    ValidationObserver,
  },
  data() {
    return {
      grid1,
      grid2,
      formatAmount,
      findAllTotal,
      formInputGrid,
      loading: false,
      makingPayment: false,
      cardObject: {
        cardNumber: "4324 5433 9382 1030",
        ccv: "420",
        expirydate: "03/24",
        holder: "Joe Doe",
        reuse: true,
        postalCode: "10119",
        showBack: false,
        subTotal: 2497,
        taxAmount: 119.64,
        promoAmount: -60,
      },
      options: {
        creditCard: {
          creditCard: true,
          delimiter: " ",
        },
        date: {
          date: true,
          datePattern: ["m", "Y"],
          delimiter: "/",
        },
        number: {
          numeral: true,
          numeralPositiveOnly: true,
          min: 0,
          max: 999,
          decimal: "",
          precision: 0,
        },
      },
      CLEAR_TIMEOUT: null,
    };
  },
  computed: {
    findTotal() {
      const { promoAmount, subTotal, taxAmount } = this.cardObject;
      const amountList = [promoAmount, subTotal, taxAmount];
      if (amountList !== null && amountList.length > 0) {
        return amountList.reduce((a, b) => a + parseFloat(b), 0);
      }
      return "0.00";
    },
    randonTranId() {
      let ran = Math.floor(Math.random() * 10);
      return `SN${Date.now()}${ran}`;
    },
  },
  destroyed() {
    if (this.CLEAR_TIMEOUT) {
      clearTimeout(this.CLEAR_TIMEOUT);
    }
  },
  methods: {
    onChange(e) {
      this.cardObject = {
        ...this.cardObject,
        reuse: e.target.checked,
      };
      // console.log(`checked = ${e.target.checked}`);
    },
    onBlurCard() {
      this.cardObject.showBack = false;
    },
    onFocusCard() {
      this.cardObject.showBack = true;
    },
    onSumbitCard() {
      this.loading = true;
      this.CLEAR_TIMEOUT = setTimeout(() => {
        this.$notification.success({
          message: "Success",
          description: "Card Details Added Successfully",
          duration: 5,
        });
        this.loading = false;
      }, 3000);
    },
    completePayment() {
      this.makingPayment = true;
      this.CLEAR_TIMEOUT = setTimeout(() => {
        this.$notification.success({
          message: "Success",
          description: `Payment Completed Successfully with Tran ID: ${this.randonTranId}`,
          duration: 0,
        });
        this.makingPayment = false;
      }, 2000);
    },
  },
};
</script>

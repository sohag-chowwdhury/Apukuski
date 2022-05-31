<template>
  <div>
    <b-container>
      <b-row class="row justify-content-center">
        <b-col class="order" cols="12" sm="8" md="8" lg="8" xl="8">
          <h4>Customer information</h4>
          <b-form-input class="input-field" placeholder="Name*"></b-form-input>
          <b-form-input
            class="input-field"
            placeholder="Company "
          ></b-form-input>
          <b-form-input
            class="input-field"
            placeholder="E-mail*"
          ></b-form-input>
          <b-form-input
            class="input-field"
            placeholder="Telephone number*"
          ></b-form-input>
        </b-col>

        <b-col cols="12" sm="8" md="8" lg="8" xl="8">
          <b-row class="my-0">
            <b-col cols="9" sm="9" md="11" lg="11" xl="11">
              <p class="mx-2 my-1">
                The contact for the pickup is different from the customer.
              </p>
            </b-col>
            <b-col cols="2" sm="2" md="1" lg="1" xl="1">
              <b-button
                @click="funcCompanyAddress"
                variant="light"
                v-if="funcCompanyAddressValue == false"
                pill
                size="sm"
                ><img
                  src="https://img.icons8.com/material/24/fa314a/circled.png"
              /></b-button>
              <b-button
                @click="funcCompanyAddress"
                variant="light"
                v-if="funcCompanyAddressValue == true"
                pill
                size="sm"
                ><img
                  src="https://img.icons8.com/material/24/fa314a/filled-circle.png"
              /></b-button>
            </b-col>
          </b-row>
          <span v-if="funcCompanyAddressValue == true">
            <b-form-input
              class="input-field mt-2"
              placeholder="Name*"
            ></b-form-input>
            <b-form-input
              class="input-field"
              placeholder="Company "
            ></b-form-input>
            <b-form-input
              class="input-field"
              placeholder="Telephone number*"
            ></b-form-input>
          </span>
          <b-row class="my-0">
            <b-col cols="9" sm="9" md="11" lg="11" xl="11">
              <p class="mx-2 my-1">
                The contact for the delivery address is different from the
                customer.
              </p>
            </b-col>

            <b-col cols="2" sm="2" md="1" lg="1" xl="1">
              <b-button
                @click="diffrentAddress"
                variant="light"
                v-if="diffrentAddressValue == false"
                pill
                size="sm"
                ><img
                  src="https://img.icons8.com/material/24/fa314a/circled.png"
              /></b-button>
              <b-button
                @click="diffrentAddress"
                variant="light"
                v-if="diffrentAddressValue == true"
                pill
                size="sm"
                ><img
                  src="https://img.icons8.com/material/24/fa314a/filled-circle.png"
              /></b-button>
            </b-col>
            <b-col
              v-if="diffrentAddressValue == true"
              cols="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
            >
              <b-form-input
                class="input-field mt-2"
                placeholder="Name*"
              ></b-form-input>
              <b-form-input
                class="input-field"
                placeholder="Company "
              ></b-form-input>
              <b-form-input
                class="input-field"
                placeholder="Telephone number*"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-0">
            <b-col  cols="9" sm="9" md="11" lg="11" xl="11">
              <p class="mx-2 my-1">Payment by card or cash upon transport.</p>
            </b-col>
            <b-col cols="2" sm="2" md="1" lg="1" xl="1">
              <b-button
                @click="paymentOnTransport"
                variant="light"
                v-if="paymentOnTransportValue == false"
                pill
                size="sm"
                ><img
                  src="https://img.icons8.com/material/24/fa314a/circled.png"
              /></b-button>
              <b-button
                @click="paymentOnTransport"
                variant="light"
                v-if="paymentOnTransportValue == true"
                pill
                size="sm"
                ><img
                  src="https://img.icons8.com/material/24/fa314a/filled-circle.png"
              /></b-button>
            </b-col>
          </b-row>
          <b-row class="my-0">
            <b-col  cols="9" sm="9" md="11" lg="11" xl="11">
              <p class="mx-2 my-1">Payment by invoice (companies only).</p>
            </b-col>
            <b-col cols="2" sm="2" md="1" lg="1" xl="1">
              <b-button
                @click="paymentInvoice"
                variant="light"
                v-if="paymentInvoiceValue == false"
                pill
                size="sm"
                ><img
                  src="https://img.icons8.com/material/24/fa314a/circled.png"
              /></b-button>
              <b-button
                @click="paymentInvoice"
                variant="light"
                v-if="paymentInvoiceValue == true"
                pill
                size="sm"
                ><img
                  src="https://img.icons8.com/material/24/fa314a/filled-circle.png"
              /></b-button>
            </b-col>
            <b-col cols="9" sm="9" md="11" lg="11" xl="11">
              <p class="mx-2 my-1">Pay Now</p>
            </b-col>
            <b-col cols="2" sm="2" md="1" lg="1" xl="1">
              <b-button
                @click="payNow"
                variant="light"
                v-if="payNowValue == false"
                pill
                size="sm"
                ><img
                  src="https://img.icons8.com/material/24/fa314a/circled.png"
              /></b-button>
              <b-button
                @click="payNow"
                variant="light"
                v-if="payNowValue == true"
                pill
                size="sm"
                ><img
                  src="https://img.icons8.com/material/24/fa314a/filled-circle.png"
              /></b-button>
            </b-col>
            <b-col cols="12" sm="12" lg="12" xl="12" md="12">
              <b-form-input
                class="input-field"
                placeholder="Message to the employee*"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row v-if="payNowValue == true">
            <b-col>
              <div>
                <stripe-element-card
                  :hidePostalCode="true"
                  ref="elementRef"
                  :pk="publishableKey"
                  @token="tokenCreated"
                />
              </div>
            </b-col>
          </b-row>
          <b-row class="row justify-content-center">
            <b-card no-body style="width: 100%">
              <b-col style="" cols="12" sm="12" md="12" lg="12" xl="12">
                <b-progress
                  :value="value"
                  :max="max"
                  variant="dark"
                  animated
                ></b-progress>
              </b-col>
              <b-row class="my-1">
                <b-col>
                  <b-row class="row justify-content-start">
                    <b-col cols="10" sm="10" md="6" lg="6" xl="6">
                      <b-button
                        to="/"
                        variant="dark"
                        style="width: 100%; color: #ffffff"
                      >
                        <img
                          class="mx-1"
                          src="https://img.icons8.com/material-outlined/24/ffffff/long-arrow-left.png"
                        />Previous</b-button
                      >
                    </b-col>
                  </b-row>
                </b-col>
                <b-col>
                  <b-row class="row justify-content-end">
                    <b-col cols="10" sm="10" md="6" lg="6" xl="6">
                      <b-button
                        @click="submit"
                        variant="dark"
                        style="width: 100%; color: #ffffff"
                      >
                        Next
                        <img
                          class="mx-1"
                          src="https://img.icons8.com/ios-glyphs/30/ffffff/long-arrow-right.png"
                      /></b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-card>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { StripeElementCard } from "@vue-stripe/vue-stripe";

export default {
  components: {
    StripeElementCard,
  },
  data() {
    this.publishableKey =
      "pk_test_51KQyV8FyCgqnsPce3wXxaiaOtB0SkXa73Z8PHB8a5HN9CNgAk2NCv6CxbVoHDZtRQI5RpRIRb3ndlIyoC3ZiOGYU00CxIdIqCn";
    return {
      diffrentPersonPick: false,
      totalPrice: 100,
      funcValue: false,
      funcCompanyAddressValue: false,
      diffrentAddressValue: false,
      paymentOnTransportValue: false,
      paymentInvoiceValue: false,
      payNowValue: false,
    };
  },
  methods: {
    submit() {
      // this will trigger the process
      this.$refs.elementRef.submit();
    },
    funcCompanyAddress() {
      this.funcCompanyAddressValue = !this.funcCompanyAddressValue;
    },
    diffrentAddress() {
      this.diffrentAddressValue = !this.diffrentAddressValue;
    },
    paymentOnTransport() {
      this.payNowValue = false;
      this.paymentInvoiceValue = false;
      this.paymentOnTransportValue = !this.paymentOnTransportValue;
    },
    paymentInvoice() {
      this.payNowValue = false;
      this.paymentOnTransportValue = false;
      this.paymentInvoiceValue = !this.paymentInvoiceValue;
    },
    payNow() {
      this.paymentOnTransportValue = false;
      this.paymentInvoiceValue = false;
      this.payNowValue = !this.payNowValue;
    },
    tokenCreated(token) {
      console.log("token", token);
      this.functionDataFetch(token);
    },
    functionDataFetch(e) {
      console.log("e", e);
      const stripe = window.Stripe(this.publishableKey);
      // let amountToCharge = String(parseFloat(this.totalPrice) * 100);

      let payload = {
        amount: "10000",
        currency: "eur",
      };
      const requestOptions = {
        method: "POST",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer sk_test_51KQyV8FyCgqnsPceGO6iaH0imPjEyJmhO1a6ctuUo7lgMldcQ9xD3XCYfEVhOEkrzpTktHDHgQa1dlOIBVdd64DY008Ka7xX9i",
        },
        body: JSON.stringify(payload),
      };
      console.log(requestOptions);
      console.log(payload);
      fetch("http://localhost:4000/v1/payment-intent", requestOptions)
        .then((response) => response.text())

        .then((response) => {
          let data;
          try {
            data = JSON.parse(response);
            stripe
              .confirmCardPayment(data.client_secret, {
                payment_method: {
                  card: {
                    token: e.id,
                  },
                },
              })
              .then((result) => {
                if (result.error) {
                  // this.errorSetFunc(2, result.error.message);
                  console.log(result.error);
                  // card declined, or something went wrong with the card
                } else if (result.paymentIntent) {
                  if (result.paymentIntent.status === "succeeded") {
                    console.log("success");
                  }
                }
              });
          } catch (err) {
            console.log(err);
          }
        });

      // handle the token
      // send it to your server
    },
  },
};
</script>
<style scoped>
.input-field {
  height: 42px !important;
  margin-top: 4px;
  border-radius: 8px;
}
p {
  font-weight: 500;
  font-size: 16px !important;
  font-family: acumin-pro, sans-serif;
  color: #000000 !important;
  margin-top: 15px !important;
}
.order h4 {
  font-weight: 400;
  color: #ffffff;
  font-style: normal;
  font-size: 18px;
  font-family: acumin-pro, sans-serif;
  background: #dd0303;
  padding: 9px;
  border-radius: 5px;
  text-align: center;
}
</style>>
  

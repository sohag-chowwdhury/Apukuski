<template>
  <div>
    <div>
      <b-modal
        hide-header
        hide-footer
        ref="my-modal"
        size="lg"
        title="Using Component Methods"
      >
        <div class="d-block text-center">
          <b-row class="justify-content-end">
            <b-col cols="3" md="2" xl="2" lg="2" sm="2">
              <b-button
                size="sm"
                pill
                style="width: 40px; height: 35px"
                class=""
                variant="light"
                block
                @click="hideModal"
                ><img
                  style="width: 20px"
                  src="https://img.icons8.com/material-outlined/64/000000/delete-sign.png"
                />
              </b-button>
            </b-col>
          </b-row>
          <b-row class="row justify-content-center">
            <b-col
              v-if="errorCheck == true"
              class="modal1"
              cols="12"
              sm="10"
              md="10"
              lg="10"
              xl="10"
            >
              <div class="xyz">
                <div class="mt-4">
                  <img style="width: 70px" :src="unsuccessful" />
                </div>
              </div>
              <h4 style="color: red">
                {{ errMsg }}
              </h4>
            </b-col>
            <b-col cols="12" sm="10" md="12" lg="12" xl="12">
              <b-col
                cols="12"
                md="12"
                sm="12"
                xl="12"
                lg="12"
                v-if="errorCheck == false"
              >
                <div class="xyz">
                  <div class="mt-4">
                    <img style="width: 70px" :src="success" />
                  </div>
                </div>
              </b-col>
            </b-col>
            <b-col
              v-if="errorCheck == false"
              class="modal1"
              cols="12"
              sm="10"
              md="10"
              lg="10"
              xl="10"
            >
              <h4>Your Order Placed successfully.</h4>
              <h4>
                Order Id:#5x34221 , <span> Price: {{ price.toFixed(2) }}</span>
                <img
                  class="img-euro"
                  style="margin-bottom: 3px"
                  src="https://img.icons8.com/material-outlined/24/000000/euro-pound-exchange.png"
                />
              </h4>
            </b-col>
          </b-row>
        </div>
      </b-modal>
    </div>
    <b-container>
      <b-row class="row justify-content-center">
        <b-col class="order" cols="12" sm="8" md="8" lg="8" xl="8">
          <h4>Customer information</h4>
          <b-form-input
            v-model="name"
            class="input-field"
            placeholder="Name*"
          ></b-form-input>
          <b-form-input
            class="input-field"
            placeholder="Company "
            v-model="company" 
          ></b-form-input>
          <b-form-input
            class="input-field"
            v-model="email"
            placeholder="E-mail*"
          ></b-form-input>
          <b-form-input
            class="input-field"
            v-model="phone"
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
              v-model="cmName" 
              placeholder="Name*" 
            ></b-form-input>
            <b-form-input
              class="input-field"
              placeholder="Company "
              v-model="cmComapny"
            ></b-form-input>
            <b-form-input
              class="input-field"
              placeholder="Telephone number*"
              v-model="cmNumber"
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
                v-model="dfName" 
              ></b-form-input>
              <b-form-input
                class="input-field"
                placeholder="Company "
                v-model="dfCompany"  
            
              ></b-form-input>
              <b-form-input
                class="input-field"
                placeholder="Telephone number*"
                v-model="dfNumber"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-0">
            <b-col cols="9" sm="9" md="11" lg="11" xl="11">
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
            <b-col cols="9" sm="9" md="11" lg="11" xl="11">
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
              <b-form-textarea
                class="input-field"
                v-model="message"
                placeholder="Message to the employee"
              ></b-form-textarea>
            </b-col>
          </b-row>
          <b-row v-if="payNowValue == true">
            <b-col>
              <p style="font-size: 12px; color: green !important">
                Paying Amount:
                <span style="color: #000000 !important">
                  {{ price.toFixed(2) }}</span
                >
                <img
                  class="img-euro"
                  style="margin-bottom: 3px; width: 16px"
                  src="https://img.icons8.com/material-outlined/24/000000/euro-pound-exchange.png"
                />
              </p>
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
                        @click="passEvent"
                        to="/en"
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
                        v-if="payNowValue == false"
                        :disabled="!formValidation || buttonFalse == true"
                        @click="orderPlace"
                        variant="success"
                        style="width: 100%; color: #ffffff"
                      >
                        Confirm
                      </b-button>
                      <b-button
                        v-if="payNowValue == true && progress == false"
                        :disabled="!formValidationCard || buttonFalse == true"
                        @click="submit"
                        variant="success"
                        style="width: 100%; color: #ffffff"
                      >
                        Confirm
                      </b-button>
                      <b-spinner
                        style="width: 30px !important; height: 30px !important"
                        v-if="progress == true"
                        variant="success"
                        type="grow"
                        label="Spinning"
                      ></b-spinner>
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
  props: ["value", "price"],
  components: {
    StripeElementCard,
  },
  data() { 
    this.publishableKey =
    return {
      diffrentPersonPick: false,
      totalPrice: 100,
      funcValue: false,
      funcCompanyAddressValue: false,
      diffrentAddressValue: false,
      paymentOnTransportValue: false,
      paymentInvoiceValue: false,
      payNowValue: false,
      success: require("@/assets/img/success.png"),
      unsuccessful: require("@/assets/img/unsuccessful.png"),
      name: "",
      email: "",
      phone: "",
      company: "",
      cmName:"",
      cmComapny:"",
      cmNumber:"",
      dfName:"",
      dfCompany:"",
      dfNumber:"",
      message: "",
      max: 100,
      errorCheck: false,
      errMsg: "",
      progress: false,
      buttonFalse: false,
    };
  },
  computed: {
    formValidation() {
      return (
        this.name != "" &&
        this.email != "" &&
        this.phone != "" &&
        (this.paymentOnTransportValue != false ||
          this.paymentInvoiceValue != false)
      );
    },
    formValidationCard() {
      return this.name != "" && this.email != "" && this.phone != "";
    },
  },
  methods: {
    orderPlace() {
       this.successFunc()
      this.showModal();
      this.errorCheck = false;
      this.buttonFalse = true;
    },
    showModal() {
      this.$refs["my-modal"].show();
      this.valueIndex = 5;
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
     successFunc(){
       this.$store.dispatch("orderFunc",
      {
      name:this.name ,
      email:this.email ,
      phone:this.phone ,
      company:this.company ,
      cmName:this.cmName,
      cmComapny:this.cmComapny,
      cmNumber:this.cmNumber,
      dfName:this.dfName,
      dfCompany:this.dfCompany,
      dfNumber:this.dfNumber,
      message: this.message,
      paymentOnTransportValue: this.paymentOnTransportValue,
      paymentInvoiceValue: this.paymentInvoiceValue,
      payNowValue: this.payNowValue, 
      })
    },
    passEvent() {
      this.buttonFalse = false;
      this.$emit("changeTitle", 7);
    },
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
      this.progress = true;
      console.log("e", e);
      const stripe = window.Stripe(this.publishableKey);
      // let amountToCharge = String(parseFloat(this.totalPrice) * 100);

      let amountToCharge = String(this.price.toFixed(2) * 100);
      let payload = {
        amount: amountToCharge,
        currency: "eur",
      };
      const requestOptions = {
        method: "POST",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
        },
        body: JSON.stringify(payload),
      };
      console.log(requestOptions);
      console.log("payload", payload);
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
                  this.errorCheck = true;
                  this.errMsg = result.error.message;
                  this.progress = false;

                  this.showModal();
                  // card declined, or something went wrong with the card
                } else if (result.paymentIntent) {
                  if (result.paymentIntent.status === "succeeded") {
                   this.errorCheck = false;
                    console.log("success");
                    this.progress = false;
                    this.buttonFalse = true;
                     this.successFunc()
                    this.showModal();
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
@media only screen and (max-width: 600px) {
  .xyz {
    display: flex !important;
    justify-content: center;
  }
  .input-field {
    height: 40px !important;
    margin-top: 4px;
    border-radius: 8px;
  }
  p {
    font-weight: 500;
    font-size: 13px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    margin-top: 15px !important;
  }
  .order h4 {
    font-weight: 400;
    color: #ffffff;
    font-style: normal;
    font-size: 16px;
    font-family: acumin-pro, sans-serif;
    background: #dd0303;
    padding: 9px;
    border-radius: 5px;
    text-align: center;
  }
  .modal1 h4 {
    font-weight: 400;
    color: #000000;
    font-style: normal;
    font-size: 16px;
    font-family: acumin-pro, sans-serif;
    margin-top: 10px;
    padding: 9px;
    border-radius: 5px;
    text-align: center;
  }
}
@media (min-width: 601px) and (max-width: 1200px) {
  .xyz {
    display: flex !important;
    justify-content: center;
  }
  .input-field {
    height: 42px !important;
    margin-top: 4px;
    border-radius: 8px;
  }
  p {
    font-weight: 500;
    font-size: 14px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    margin-top: 15px !important;
  }
  .order h4 {
    font-weight: 400;
    color: #ffffff;
    font-style: normal;
    font-size: 16px;
    font-family: acumin-pro, sans-serif;
    background: #dd0303;
    padding: 9px;
    border-radius: 5px;
    text-align: center;
  }
  .modal1 h4 {
    font-weight: 400;
    color: #000000;
    font-style: normal;
    font-size: 17px;
    font-family: acumin-pro, sans-serif;
    margin-top: 10px;
    padding: 9px;
    border-radius: 5px;
    text-align: center;
  }
}
@media only screen and (min-width: 1201px) {
  .xyz {
    display: flex !important;
    justify-content: center;
  }
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
  .modal1 h4 {
    font-weight: 400;
    color: #000000;
    font-style: normal;
    font-size: 20px;
    font-family: acumin-pro, sans-serif;
    margin-top: 10px;
    padding: 9px;
    border-radius: 5px;
    text-align: center;
  }
}
</style>>
  

<template>
  <div style="background: #F7F7F7 !important;
">
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
            <b-col cols="12" sm="10" md="10" lg="10" xl="10">
              <log-in v-if="logValue == true" />
              <sign-up v-if="signValue == true" />
              <b-col
                style="margin-left: 5%"
                cols="12"
                md="12"
                sm="12"
                xl="12"
                lg="12"
              >
                <b-row v-if="logValue == true">
                  <b-col cols="7" md="7" sm="7" lg="6" xl="6">
                    <p style="margin-top: 10px">Create an account?</p>
                  </b-col>
                  <b-col cols="5" md="5" sm="5" lg="4" xl="4">
                    <b-button
                      @click="signCheck"
                      variant="light"
                      size="sm"
                      style="width: 85%"
                      class="mt-2"
                      ><span style="color: blue">To Sign Up</span></b-button
                    >
                  </b-col>
                </b-row>
                <b-row v-if="signValue == true">
                  <b-col cols="7" md="7" sm="7" lg="6" xl="6">
                    <p style="margin-top: 10px">Create an account?</p>
                  </b-col>
                  <b-col cols="5" md="5" sm="5" lg="4" xl="4">
                    <b-button
                      @click="logCheck"
                      variant="light"
                      size="sm"
                      style="width: 85%"
                      class="mt-2"
                      ><span style="color: blue">To Log in</span></b-button
                    >
                  </b-col>
                </b-row>
              </b-col>
            </b-col>
          </b-row>
        </div>
      </b-modal>
    </div>
    <b-navbar toggleable="lg" type="light" style="height: 90px">
      <b-navbar-brand to="/"
        ><h2 class="nav-brand">
          <b-img class="nav-img" :src="logo"></b-img></h2
      >
      
      </b-navbar-brand>

      <b-collapse
        style="text-align: end !important"
        is-nav
        class="hide-xs hide-md"
      >
        <b-navbar-nav style="width: 13%"> </b-navbar-nav>

        <b-navbar-nav style="width: 87%" class="ml-auto"> </b-navbar-nav>
      </b-collapse>
      <span > 
         <b-button class="mx-2" v-if="!isHome" @click="LangButton('fi')" size="sm" style="background:#DD0303" > <span style="font-weight:600; font-size:16px;margin  font-style: oblique; color:white;" class="mx-1">FI</span> <img style="width:26px" src="https://img.icons8.com/external-flat-icons-inmotus-design/67/000000/external-finland-flags-flat-icons-inmotus-design.png"/></b-button>

          <b-button class="mx-2" v-if="isHome"  @click="LangButton('en')" size="sm" style="background:#DD0303" > <span style="font-weight:600; font-size:16px;margin  font-style: oblique; color:white;" class="mx-1">EN</span> <img style="width:28px" src="https://img.icons8.com/color/48/000000/usa.png"/></b-button>

        <b-button  v-b-toggle.sidebar-backdrop
        class="mx-2"
         style="background:#DD0303; display:none"
          ><i style="color: #FFFFFF; padding:4px;" class="fas fa-align-justify"></i
        ></b-button>
        
      </span>
    </b-navbar>
    <b-sidebar id="sidebar-backdrop" backdrop shadow>
      <div class="px-3 py-2">
        <b-navbar-brand href="#"
          ><b-img class="nav-img" :src="logo"></b-img
          ></b-navbar-brand
        >
        <br />
        <br />
        <b-row class="hide-l"> </b-row>

      
         <h5 v-if="user" style="cursor: pointer" class="my-2">
           <h5 v-if="user.userPhoto" style="margin-top:28px;"><b-avatar style="width:30px; height:30px" :src="user.userPhoto"></b-avatar> <span style="font-size:16px;">{{user.name}}</span> </h5>
        </h5>
         <h5  v-if="user" style="cursor: pointer ;margin-top:20px; !important"  @click="routerCalender" >
          <img
            class="mx-2"
            style="width: 25px"
            img
            src="https://img.icons8.com/color/48/fa314a/planner.png"
          />Calender
        </h5>
        <h5  v-if="user" style="cursor: pointer ;margin-top:20px; !important"  @click="logOut">
          <img
            class="mx-2"
            style="width: 25px"
            img
            src="https://img.icons8.com/external-sbts2018-outline-sbts2018/58/fa314a/external-logout-social-media-basic-1-sbts2018-outline-sbts2018.png"
          />Log Out
        </h5>
         

        <h5
          v-if="!user"
          style="cursor: pointer"
          @click="showModal"
          class="my-2"
        >
          <img
            class="mx-2"
            style="width: 30px"
            img
            src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/4a90e2/external-sign-in-call-to-action-bearicons-glyph-bearicons.png"
          />Sign In
        </h5>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toggle: false,
      signValue: false,
      valueIndex: 0,
      location: null,
      enValue:true,
      gettingLocation: false,
      errorStr: null,
      logValue: true,
      filterText: "",
      logo: require("@/assets/logo.png"),
    };
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        //this.$router.push("/");
        this.hideModal();
      }
    },
  },
  methods: {
    funcCheck(e) {
      this.valueIndex = e;
      if (e == 1) {
        this.$router.push("/reservation");
      } else if (e == 2) {
        this.$router.push("/contact");
      } else if (e == 3) {
        this.$router.push("/private");
      } else if (e == 6) {
        this.$router.push("/order");
      } else {
        this.$router.push("/companies");
      }
    },
    LangButton(e){
      if(e =='fi'){
          this.$router.push('/')
          this.enValue = false
      }
      if(e =='en'){
         this.$router.push('/en')
          this.enValue = true
      }
    },
    signCheck() {
      this.signValue = true;
      this.logValue = false;
    },
    logCheck() {
      this.logValue = true;
      this.signValue = false;
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
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.push("/").catch(() => {});
      this.valueIndex = 0;
    },
    routerCalender(){
       this.$router.push("/calender")
    },
    toggleFun() {
      this.toggle = !this.toggle;
    },
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    isHome() {
    return this.$route.path == "/" ;
   }
  },
};
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .hiden-xs {
    display: none;
  }
  .xm {
    margin-top: 10px;
  }
  .location-error {
    height: 90px;
  }
  p {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    font-family: "Maven Pro", sans-serif;
  }
  .input-field {
    min-height: 80px !important;
  }
  .input-btn {
    width: 14%;
    height: 40px;
    margin-bottom: 6px;
    margin-left: -15%;
    background: green;
  }
  .input-search {
    width: 100%;
    height: 45px;
    outline: none !important;
    border: 1px solid #fff;
    box-shadow: 0 0 10px #719ece;
    border-radius: 0px 0px 0px 0px;
  }
  .search-bg {
    margin-top: 10px !important;
    background-color: #4b8f1b;
    padding: 8px;
    border-radius: 25px;
  }
  .search-bg2 {
    margin-top: 10px !important;
    background-color: #4b8f1b;
    padding: 6px;
    border-radius: 25px;
  }
  .serch-nav h1 {
    text-align: center;
    font-family: "Maven Pro", sans-serif;
    font-size: 18px;
    color: #fff;
    margin-bottom: 10px;
  }
  .hide-xs {
    display: none;
  }
  .nav-img {
    width: 80px;
    margin-left: 0px;
  }
  .nav-brand {
    font-family: "Maven Pro", sans-serif;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #000000 !important;
  }
  .nav-brand2 {
    font-family: "Maven Pro", sans-serif;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #000000 !important;
  }
  .nav-lang {
    margin-top: 4%;
    margin-left: 20px;
    font-size: 1.3em;
  }
  .nav-item-right {
    margin: 0 10px;
    margin-top: 4%;
  }
  .drop-down-right {
    margin-top: 2%;
    color: rgba(59, 52, 52, 0) !important;
  }
  .user-details {
    color: black;
  }
  h5 {
    font-family: "Maven Pro", sans-serif;
    font-size: 18px;
    margin-top: 15px !important;
    margin-left: 10%;
    color: #000000;
  }
}
@media (min-width: 601px) and (max-width: 1200px) {
  .hiden-md {
    display: none;
  }
  .location-error {
    height: 90px;
  }
  p {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    font-family: "Maven Pro", sans-serif;
  }
  .input-field {
    min-height: 80px !important;
  }
  .input-btn {
    width: 14%;
    height: 40px;
    margin-bottom: 6px;
    margin-left: -15%;
    background: green;
  }
  .input-search {
    width: 100%;
    height: 45px;
    outline: none !important;
    border: 1px solid #fff;
    box-shadow: 0 0 10px #719ece;
  }
  .search-bg {
    margin-top: 10px !important;
    background-color: #4b8f1b;
    padding: 8px;
    border-radius: 25px;
  }
  .search-bg2 {
    margin-top: 10px !important;
    background-color: #4b8f1b;
    padding: 6px;
    border-radius: 25px;
  }
  .serch-nav h1 {
    text-align: center;
    font-family: "Maven Pro", sans-serif;
    font-size: 18px;
    color: #fff;
    margin-bottom: 10px;
  }
  .hide-xs {
    display: none;
  }
  .nav-img {
    width: 95px;
    margin-left: 0px;
  }
  .nav-brand {
    font-family: "Maven Pro", sans-serif;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #000000 !important;
  }
  .nav-brand2 {
    font-family: "Maven Pro", sans-serif;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #000000 !important;
  }
  .nav-lang {
    margin-top: 4%;
    margin-left: 20px;
    font-size: 1.3em;
  }
  .nav-item-right {
    margin: 0 10px;
    margin-top: 4%;
  }
  .drop-down-right {
    margin-top: 2%;
    color: rgba(59, 52, 52, 0) !important;
  }
  .user-details {
    color: black;
  }
  h5 {
    font-family: "Maven Pro", sans-serif;
    font-size: 18px;
    margin-top: 15px !important;
    margin-left: 10%;
    color: #000000;
  }
}
@media only screen and (min-width: 1201px) {
  .hide-xl {
    display: none;
  }
  .nav-img {
    width: 95px;
    margin-left: 30px;
  }
  .nav-brand {
    font-family: "Maven Pro", sans-serif;
    margin-left: 10px;
    margin-top: 5px !important;
    font-size: 30px;
    font-weight: 900;
    color: #000000 !important;
  }
  .nav-lang {
    margin-top: 4%;
    margin-left: 20px;
    font-size: 1.3em;
  }
  .nav-item-right {
    margin: 0 10px;
    margin-top: 4%;
    font-family: "Maven Pro", sans-serif;
    font-weight: 800;
    color: #000000;
  }
  .serch-nav h1 {
    text-align: center;
    font-family: "Maven Pro", sans-serif;
    font-size: 18px;
    color: #fff;
    margin-bottom: 10px;
  }
  .search-bg {
    background-color: #4b8f1b;
    padding: 6px;
    border-radius: 10px;
  }
  .search-bg2 {
    background-color: #4b8f1b;
    padding: 6px;
    border-radius: 10px;
  }
  .drop-down-right {
    margin-top: 2%;
    color: rgba(59, 52, 52, 0) !important;
  }
  p {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    font-family: "Maven Pro", sans-serif;
  }
  .user-details {
    color: black;
  }
  .input-search {
    width: 100%;
    height: 45px;
    outline: none !important;
    border: 1px solid #fff;
    box-shadow: 0 0 10px #719ece;
    border-radius: 5px 5px 5px 5px;
  }
  .input-btn {
    width: 8%;
    height: 45px;
    margin-bottom: 6px;
    margin-left: -8%;
    background: #4b8f1b;
  }
  .input-field {
    height: 70px;
  }
  .location-error {
    height: 50px;
  }
}
</style>
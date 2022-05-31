<template>
  <div>
    <div
      v-if="checkSection == 0"
      class="overlay back-img"
      style=""
      :style="{
        'background-image': 'url(' + require('@/assets/img/cover.jpg') + ')',
      }"
    >
      <div class="overlay">
        <b-row style="" class="row justify-content-center">
          <b-col style="" cols="6" sm="6" md="5" lg="4" xl="4">
            <b-img class="main-img" style="" :src="logo"></b-img>
          </b-col>
        </b-row>
        <b-row class="row justify-content-center">
          <b-col class="main-section" cols="12" sm="12" md="6" xl="6" lg="6">
            <h3 style="">
              Transportation, removals, pickups & carrying assistance when you
              need them!
            </h3>
            <b-button @click="startFunc" variant="light" class="btn-main"
              >Start</b-button
            >
          </b-col>
        </b-row>
      </div>
    </div>
    <v-container v-if="checkSection > 0">
      <!-- manu Section -->
      <b-row class="row justify-content-center">
        <b-col
          v-if="checkSection == 1"
          class="manu"
          cols="12"
          sm="12"
          md="8"
          lg="8"
          xl="8"
        >
          <h4 style="text-align: center">How can we help you?</h4>

          <b-card
            no-body
            class="my-1 manu-card"
            v-for="(item, index) in order"
            :key="index"
          >
            <b-row class="mx-1" @click="manuFunc(item.title)">
              <b-col cols="2" sm="2" lg="2" xl="2" md="2">
                <b-img class="manu-img" :src="item.image"></b-img>
              </b-col>
              <b-col class="manu-text" cols="7" sm="7" lg="7" xl="7" md="7">
                <h5 class="margin:0px;">{{ item.title }}</h5>
                <p v-if="item.id">{{ item.description }}</p>
              </b-col>
              <b-col
                style="text-align: end"
                cols="3"
                sm="3"
                lg="3"
                xl="3"
                md="3"
              >
                <b-button size="sm" class="manu-btn" variant="light" disabled
                  ><span
                    style="
                      font-size: 12px !important;
                      font-style: italic;
                      font-weight: 500;
                    "
                    >Starting at</span
                  >
                  : {{ item.price }}</b-button
                >
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <!-- item Section -->
      <b-row class="row justify-content-center">
        <!-- {{ heightValue}} {{  widthValue}} {{   depthValue}} {{palletGoods}} {{durationTime}} {{locations}} -->

        <b-col
          v-if="checkSection == 2"
          class="item"
          cols="12"
          sm="12"
          md="8"
          lg="8"
          xl="8"
        >
          <h4 style="text-align: center">Add Items</h4>
          <b-card class="item-summery" v-if="totalVolum != ''" no-body>
            <h5 style="text-align: center">
              <span
                style="
                  font-size: 14px;
                  font-weight: bold;
                  opacity: 0.9 !important;
                "
                class="mx-2"
                v-if="totalVolum != 0"
              >
                Quantity: {{ quantityValue }}
              </span>
              <span
                style="
                  font-size: 14px;
                  font-weight: bold;
                  opacity: 0.9 !important;
                "
                class="mx-2"
                v-if="totalVolum != 0"
                >Volumn: {{ totalVolum.toFixed(2) }} metre
              </span>
            </h5>
          </b-card>
          <b-row class="row justify-content-center">
            <b-col
              class="item-search-text"
              cols="11"
              sm="11"
              md="11"
              lg="11"
              xl="11"
            >
              <input
                style="height: 40px; width: 100%"
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                v-model="search"
                aria-describedby="emailHelp"
                placeholder="Search for Item"
              />
              <h5 style="opacity: 0.7 !important">--Or--</h5>
              <h5 style="opacity: 0.7 !important">Select from basics</h5>
            </b-col>
          </b-row>
          <b-card
            class="my-1 item-card"
            v-for="(item, index) in filter"
            :key="index"
            no-body
          >
            <b-row>
              <b-col cols="2" sm="2" lg="2" xl="2" md="2">
                <div class="img-item-div">
                  <b-img class="item-img" :src="item.photo"></b-img>
                </div>
              </b-col>
              <b-col
                class="item-text my-auto"
                cols="6"
                sm="7"
                lg="6"
                xl="6"
                md="6"
              >
                <h5 :class="item.description == '.' ? 'vartical-text' : ''">
                  {{ item.name }}
                </h5>
                <p v-if="item.description != '.'">
                  {{ item.description }}
                </p>
              </b-col>
              <b-col
                style="text-align: end"
                cols="4"
                sm="3"
                lg="4"
                xl="4"
                md="4"
              >
                <b-row class="row justify-content-center">
                  <b-col
                    v-if="item.count != undefined"
                    cols="11"
                    sm="11"
                    md="11"
                    lg="11"
                    xl="11"
                  >
                    <b-button
                      class="btn-item"
                      :disabled="item.count == 0"
                      @click="buttonMin(item, index)"
                      style=""
                      variant="light"
                      >-</b-button
                    >
                    <b-button class="btn-item2" variant="light">{{
                      item.count
                    }}</b-button>
                    <b-button
                      @click="buttonAdd(item, index)"
                      variant="light"
                      class="btn-item"
                      >+</b-button
                    >
                  </b-col>
                  <b-col
                    v-if="item.count == undefined"
                    cols="11"
                    md="11"
                    lg="11"
                    xl="11"
                    sm="11"
                  >
                    <b-button
                      @click="buttonCheck(item, index)"
                      class="btn-check-red"
                      size="sm"
                      pill
                      variant="light"
                      ><img
                        style="width: 30px"
                        src="https://img.icons8.com/material/48/fa314a/plus--v1.png"
                    /></b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body style="width: 100%">
            <b-row>
              <b-col style="" cols="12" sm="12" md="12" lg="12" xl="12">
                <b-progress
                  :value="value"
                  :max="max"
                  variant="dark"
                  animated
                ></b-progress>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col>
                <b-row class="row justify-content-start">
                  <b-col cols="10" sm="10" md="6" lg="6" xl="6">
                    <b-button
                      @click="backFunc"
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
                      @click="itemFunc(3)"
                      variant="dark"
                      style="width: 100%; color: #ffffff"
                      :disabled="this.summeryValue.length == 0"
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
        </b-col>

        <!-- map -->

        <b-col v-if="checkSection == 3" cols="11" sm="11" md="8" lg="8" xl="8">
          <b-card style="width: 100%; background: #dd0303">
            <b-row v-if="this.locPlace < 7" class="row justify-content-center">
              <b-col cols="1" sm="1" lg="1" xl="1" md="1">
                <img
                  style="width: 30px; margin: auto !importnat"
                  src="https://img.icons8.com/ios-filled/50/ffffff/marker.png"
                />
              </b-col>
              <b-col cols="11" sm="11" md="10" lg="10" xl="10">
                <form @submit.prevent="funcLocation">
                  <input
                    @click="funcLocation"
                    style="width: 100%; height: 40px; border-color: red"
                    type="text"
                    placeholder="Pickup Location"
                    ref="origin"
                  />
                </form>
              </b-col>
            </b-row>

            <!-- picup1 -->
            <b-row v-if="this.locPlace > 2" class="row justify-content-center">
              <b-col cols="1" sm="1" lg="1" xl="1" md="1">
                <img
                  style="width: 30px; margin: auto !importnat"
                  src="https://img.icons8.com/ios-filled/50/ffffff/marker.png"
                />
              </b-col>
              <b-col cols="11" sm="11" md="10" lg="10" xl="10">
                <form @submit.prevent="funcLocation">
                  <input
                    @click="funcLocation"
                    style="width: 100%; height: 40px; border-color: red"
                    type="text"
                    placeholder="First Stopage"
                    ref="drop1"
                  />
                </form>
              </b-col>
            </b-row>
            <!-- pickup2 -->
            <b-row v-if="this.locPlace > 3" class="row justify-content-center">
              <b-col cols="1" sm="1" lg="1" xl="1" md="1">
                <img
                  style="width: 30px; margin: auto !importnat"
                  src="https://img.icons8.com/ios-filled/50/ffffff/marker.png"
                />
              </b-col>
              <b-col cols="11" sm="11" md="10" lg="10" xl="10">
                <form @submit.prevent="funcLocation">
                  <input
                    @click="funcLocation"
                    style="width: 100%; height: 40px; border-color: red"
                    type="text"
                    placeholder="Second Stopage"
                    ref="drop2"
                  />
                </form>
              </b-col>
            </b-row>
            <!-- pickup3 -->
            <b-row v-if="this.locPlace > 4" class="row justify-content-center">
              <b-col cols="1" sm="1" lg="1" xl="1" md="1">
                <img
                  style="width: 30px; margin: auto !importnat"
                  src="https://img.icons8.com/ios-filled/50/ffffff/marker.png"
                />
              </b-col>
              <b-col cols="11" sm="11" md="10" lg="10" xl="10">
                <form @submit.prevent="funcLocation">
                  <input
                    @click="funcLocation"
                    style="width: 100%; height: 40px; border-color: red"
                    type="text"
                    placeholder="Third Stopage"
                    ref="drop3"
                  />
                </form>
              </b-col>
            </b-row>
            <!-- Final -->
            <b-row v-if="this.locPlace < 7" class="row justify-content-center">
              <b-col cols="1" sm="1" lg="1" xl="1" md="1">
                <img
                  style="width: 30px; margin: auto !importnat"
                  src="https://img.icons8.com/ios-filled/50/ffffff/marker.png"
                />
              </b-col>
              <b-col cols="11" sm="11" md="10" lg="10" xl="10">
                <form @submit.prevent="funcLocation">
                  <input
                    @click="funcLocation"
                    style="width: 100%; height: 40px; border-color: red"
                    type="text"
                    placeholder="Final Destination Location"
                    ref="destination"
                  />
                </form>
              </b-col>
            </b-row>
            <b-row>
              <b-col v-if="locPlace < 5" cols="1" sm="1" lg="1" xl="1" md="1">
              </b-col>
              <b-col v-if="locPlace < 5" cols="5" sm="5" lg="4" xl="4" md="4">
                <b-button
                  :disabled="
                    locations[0].lat == 0 ||
                    locations[locations.length - 1].lat == 0
                  "
                  variant="danger"
                  size="sm"
                  @click="addLocFunc"
                  style="background: #dd0303 !important; width: 110px"
                >
                  <img
                    style="width: 25px"
                    src="https://img.icons8.com/ios-glyphs/30/ffffff/add--v1.png"
                  />
                  Add Stop</b-button
                >
              </b-col>
              <b-col v-if="locPlace > 2" cols="1" sm="1" lg="1" xl="1" md="1">
              </b-col>
              <b-col v-if="locPlace > 2" cols="5" sm="5" lg="4" xl="4" md="4">
                <b-button
                  variant="danger"
                  size=""
                  @click="minLocFunc"
                  style="background: #dd0303 !important; width: 110px"
                >
                  <img
                    style="width: 25px"
                    src="https://img.icons8.com/ios-glyphs/30/ffffff/filled-trash.png"
                  />
                  Delete</b-button
                >
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col
          v-if="checkSection == 3"
          style="margin-top: -20px"
          cols="11"
          sm="11"
          md="8"
          lg="8"
          xl="8"
        >
          <b-card>
            <div style="width: 100%">
              <gmap-map
                :center="center"
                :zoom="12"
                style="width: 100%; height: 555px"
              >
                <gmap-marker
                  :key="index"
                  v-for="(gmp, index) in locations"
                  :position="gmp"
                  @click="center = gmp"
                ></gmap-marker>
              </gmap-map>
            </div>
          </b-card>
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
                  <b-col cols="12" sm="10" md="6" lg="6" xl="6">
                    <b-button
                      @click="backFunc"
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
                  <b-col cols="12" sm="10" md="6" lg="6" xl="6">
                    <b-button
                      :disabled="
                        locations[0].lat == 0 ||
                        locations[locations.length - 1].lat == 0
                      "
                      @click="mapFunc(4)"
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
        </b-col>
      </b-row>

      <!-- place 123123-->
      <!-- {{locations}} -->

      <b-row
        v-if="checkSection == 4"
        style=""
        class="row justify-content-center"
      >
        <b-col class="elevator" cols="12" sm="12" md="8" lg="8" xl="8">
          <h4 style="text-align: center">Additional address information</h4>
        </b-col>
        <b-col
          v-for="(item, index) in locations"
          :key="index + 'c'"
          cols="12"
          sm="12"
          md="8"
          lg="8"
          xl="8"
        >
          <h5 v-if="locations[index].label != undefined">
            <img
              style="width: 30px; margin: auto !importnat"
              src="https://img.icons8.com/ios-filled/50/fa314a/marker.png"
            />
            <span v-if="index == 0">Pickup</span>
            <span v-if="index == locations.length - 1">Drop Up</span>
            <span v-if="index != 0 && index != locations.length - 1"
              >Pickup / Drop Up</span
            >:{{ locations[index].label }}
          </h5>
          <b-row
            v-if="locations[index].label != undefined"
            class="text-appartment"
          >
            <p>Apartment staircase/number</p>
          </b-row>
          <input
            v-if="locations[index].label != undefined"
            style="height: 35px; width: 120px"
            type="text"
            v-model="dataPickDrop[index].apartmentNumber"
            class="form-control my-2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="eg-A54"
          />
          <!-- 090909 -->
          <b-card
            v-if="locations[index].label != undefined"
            no-body
            style="width: 100%"
          >
            <b-row>
              <b-col cols="9" sm="9" md="10" lg="10" xl="10">
                <p v-if="index == 0" class="mx-2">
                  Carried from indoor, ground level.
                </p>
                <p v-if="index == locations.length - 1" class="mx-2">
                  Carried to indoor, ground level.
                </p>
                <p
                  v-if="index != 0 && index != locations.length - 1"
                  class="mx-2"
                >
                  Carried from/to, indoor ground level.
                </p>
              </b-col>
              <b-col cols="3" sm="3" md="2" lg="2" xl="2">
                <b-button
                  @click="funcOneGround(index)"
                  variant="light"
                  v-if="dataPickDrop[index].groundLevele == false"
                  pill
                  size="sm"
                  ><img
                    src="https://img.icons8.com/material/24/fa314a/circled.png"
                /></b-button>
                <b-button
                  @click="funcOneGround(index)"
                  variant="light"
                  v-if="dataPickDrop[index].groundLevele == true"
                  pill
                  size="sm"
                  ><img
                    src="https://img.icons8.com/material/24/fa314a/filled-circle.png"
                /></b-button>
              </b-col>
            </b-row>
          </b-card>
          <b-card
            v-if="locations[index].label != undefined"
            no-body
            style="width: 100%"
          >
            <b-row>
              <b-col cols="9" sm="9" md="10" lg="10" xl="10">
                <p class="mx-2">The goods are picked from the yard.</p>
              </b-col>
              <b-col cols="3" sm="3" md="2" lg="2" xl="2">
                <b-button
                  @click="funcOne1(index)"
                  variant="light"
                  v-if="dataPickDrop[index].yard == false"
                  pill
                  size="sm"
                  ><img
                    src="https://img.icons8.com/material/24/fa314a/circled.png"
                /></b-button>
                <b-button
                  @click="funcOne1(index)"
                  variant="light"
                  v-if="dataPickDrop[index].yard == true"
                  pill
                  size="sm"
                  ><img
                    src="https://img.icons8.com/material/24/fa314a/filled-circle.png"
                /></b-button>
              </b-col>
            </b-row>
          </b-card>
          <b-card
            v-if="locations[index].label != undefined"
            no-body
            class="mt-1"
            style="width: 100%"
          >
            <b-row>
              <b-col cols="9" sm="9" md="10" lg="10" xl="10">
                <p class="mx-2">The helpers can use elevator</p>
              </b-col>
              <b-col cols="3" sm="3" md="2" lg="2" xl="2">
                <b-button
                  @click="funcElevator1(index)"
                  variant="light"
                  v-if="dataPickDrop[index].elevator == false"
                  pill
                  size="sm"
                  ><img
                    src="https://img.icons8.com/material/24/fa314a/circled.png"
                /></b-button>
                <b-button
                  @click="funcElevator1(index)"
                  variant="light"
                  v-if="dataPickDrop[index].elevator == true"
                  pill
                  size="sm"
                  ><img
                    src="https://img.icons8.com/material/24/fa314a/filled-circle.png"
                /></b-button>
              </b-col>
            </b-row>
          </b-card>
          <b-card
            v-if="locations[index].label != undefined"
            no-body
            class="mt-1"
            style="width: 100%"
          >
            <b-row class="row justify-content-center">
              <b-col cols="7" sm="7" md="7" lg="8" xl="9">
                <p style="text-align: start !important" class="mx-2">
                  The helpers must use stairs
                </p>
              </b-col>

              <b-col class="mt-n1" cols="5" sm="5" md="5" lg="4" xl="3">
                <div style="margin-left: 18%">
                  <b-button
                    class="btn"
                    :disabled="dataPickDrop[index].floor == 0"
                    @click="funcFloorMin1(index)"
                    style="width: 35px"
                    variant="light"
                    >-</b-button
                  >
                  <b-button variant="light" class="mx-1" style="">{{
                    dataPickDrop[index].floor
                  }}</b-button>
                  <b-button
                    @click="funcFloorAdd1(index)"
                    variant="light"
                    style="width: 35px"
                    >+</b-button
                  >
                </div>
              </b-col>
            </b-row>
            <b-row v-if="pickItems.length == 0 && index == 0">
              <b-col>
                <b-form-textarea
                  id="textarea-small"
                  size="md"
                  placeholder="Details about Product from  Pick Up place"
                ></b-form-textarea>
              </b-col>
            </b-row>
            <b-row
              v-if="pickItems.length == 0 && index == locations.length - 1"
            >
              <b-col>
                <b-form-textarea
                  id="textarea-small"
                  size="md"
                  placeholder="Details about Product from  Drop Up place"
                ></b-form-textarea>
              </b-col>
            </b-row>
          </b-card>
          <!-- length 1 -->
          <b-card v-if="index == 0 && locations.length > 2" style="width: 100%">
            <b-row cols="row justify-content-start">
              <p class="loc-p">Avalilbale items & quantity for pick-up</p>
              <b-col
                class="my-1"
                v-for="(item, i) in summeryValue"
                :key="i + 'f'"
                cols="4"
                sm="4"
                md="4"
                lg="4"
                xl="3"
              >
                <!-- 123123 -->
                <b-row>
                  <b-col
                    class="loc-card"
                    cols="12"
                    md="9"
                    sm="12"
                    lg="9"
                    xl="9"
                    style="height: 70px"
                  >
                    <b-img
                      style="width: 100%; height: 100%; object-fit: contain"
                      :src="item.photo"
                    >
                    </b-img>
                    <img
                      class="loc-img1"
                      v-if="item.count == 0"
                      style="width: 20px"
                      src="https://img.icons8.com/fluency-systems-filled/48/26e07f/circled-dot.png"
                    />
                    <img
                      :style="item.count == 0 ? 'display:none' : ''"
                      @click="funcLocItem(index, item, i)"
                      class="loc-img1"
                      style="width: 20px; cursor: pointer"
                      src="https://img.icons8.com/ios/50/000000/add--v1.png"
                    />

                    <p :style="item.count == 0 ? 'display:none' : ''">
                      {{ item.count }}
                    </p>
                  </b-col>
                </b-row>
              </b-col>
              <b-col
                v-if="pickItems.length != 0"
                cols="12"
                md="12"
                sm="12"
                lg="12"
                xl="12"
              >
                <p class="loc-p">Selected items & quantity for pick-up</p>
                <b-row>
                  <b-col
                    class="loc-card"
                    style="height: 70px"
                    v-for="(value, m) in pickItems"
                    :key="m + 'g'"
                    cols="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="3"
                  >
                    <b-row>
                      <b-col
                        class="loc-card"
                        cols="12"
                        md="9"
                        sm="12"
                        lg="9"
                        xl="9"
                        style="height: 70px"
                      >
                        <b-img
                          style="width: 100%; height: 100%; object-fit: contain"
                          :src="value.photo"
                        >
                        </b-img>
                        <img
                          v-if="value.count != 0"
                          @click="funcLocItemMin(index, value, m)"
                          class="loc-img1"
                          style="width: 20px; cursor: pointer"
                          src="https://img.icons8.com/ios/50/000000/minus.png"
                        />

                        <p>{{ value.count }}</p>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-textarea
                      id="textarea-small"
                      size="sm"
                      placeholder="Details about Product from  Pick Up place"
                    ></b-form-textarea>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>

          <!-- length 2 -->
          <b-card
            v-if="index == 1 && locations.length - 1 != index"
            style="width: 100%"
          >
            <b-row cols="row justify-content-start">
              <p class="loc-p">Avalilbale items & quantity for pick-up</p>
              <b-col
                class="my-1"
                v-for="(item, i) in summeryValue"
                :key="i + 'h'"
                cols="4"
                sm="4"
                md="4"
                lg="4"
                xl="3"
              >
                <!-- 123123 -->
                <b-row>
                  <b-col
                    class="loc-card"
                    cols="12"
                    md="9"
                    sm="12"
                    lg="9"
                    xl="9"
                    style="height: 70px"
                  >
                    <b-img
                      style="width: 100%; height: 100%; object-fit: contain"
                      :src="item.photo"
                    >
                    </b-img>
                    <img
                      class="loc-img1"
                      v-if="item.count == 0"
                      style="width: 20px"
                      src="https://img.icons8.com/fluency-systems-filled/48/26e07f/circled-dot.png"
                    />
                    <img
                      :style="item.count == 0 ? 'display:none' : ''"
                      @click="funcLocItem(index, item, i)"
                      class="loc-img1"
                      style="width: 20px; cursor: pointer"
                      src="https://img.icons8.com/ios/50/000000/add--v1.png"
                    />

                    <p :style="item.count == 0 ? 'display:none' : ''">
                      {{ item.count }}
                    </p>
                  </b-col>
                </b-row>
              </b-col>
              <b-col
                v-if="pickDropItems1.length != 0"
                style="border-bottom: 2px solid gray"
                cols="12"
                md="12"
                sm="12"
                lg="12"
                xl="12"
              >
                <p class="loc-p">Selected items & quantity for pick-up</p>
                <b-row class="my-1">
                  <b-col
                    class="loc-card"
                    style="height: 70px"
                    v-for="(value, m) in pickDropItems1"
                    :key="m + 'i'"
                    cols="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="3"
                  >
                    <b-row>
                      <b-col
                        class="loc-card"
                        cols="12"
                        md="9"
                        sm="12"
                        lg="9"
                        xl="9"
                        style="height: 70px"
                      >
                        <b-img
                          style="width: 100%; height: 100%; object-fit: contain"
                          :src="value.photo"
                        >
                        </b-img>
                        <img
                          v-if="value.count != 0"
                          @click="funcLocItemMin(index, value, m)"
                          class="loc-img1"
                          style="width: 20px; cursor: pointer"
                          src="https://img.icons8.com/ios/50/000000/minus.png"
                        />

                        <p>{{ value.count }}</p>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
              <!-- drop -->
              <p class="loc-p my-2">Available items & quantity for Drop</p>
              <b-col
                class="my-1"
                v-for="(item, i) in dropList"
                :key="i + 'j'"
                cols="4"
                sm="4"
                md="4"
                lg="4"
                xl="3"
              >
                <!-- 123123 -->
                <b-row>
                  <b-col
                    class="loc-card"
                    cols="12"
                    md="9"
                    sm="12"
                    lg="9"
                    xl="9"
                    style="height: 70px"
                  >
                    <b-img
                      style="width: 100%; height: 100%; object-fit: contain"
                      :src="item.photo"
                    >
                    </b-img>
                    <img
                      class="loc-img1"
                      v-if="item.count == 0"
                      style="width: 20px"
                      src="https://img.icons8.com/fluency-systems-filled/48/26e07f/circled-dot.png"
                    />
                    <img
                      :style="item.count == 0 ? 'display:none' : ''"
                      @click="funcLocItemDrop(index, item, i)"
                      class="loc-img1"
                      style="width: 20px; cursor: pointer"
                      src="https://img.icons8.com/ios/50/000000/add--v1.png"
                    />

                    <p :style="item.count == 0 ? 'display:none' : ''">
                      {{ item.count }}
                    </p>
                  </b-col>
                </b-row>
              </b-col>

              <b-col
                v-if="dropItems1.length != 0"
                cols="12"
                md="12"
                sm="12"
                lg="12"
                xl="12"
              >
                <p class="loc-p">Selected items & quantity for Drop</p>
                <b-row>
                  <b-col
                    class="loc-card"
                    style="height: 70px"
                    v-for="(value, m) in dropItems1"
                    :key="m + 'k'"
                    cols="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="3"
                  >
                    <b-row>
                      <b-col
                        class="loc-card"
                        cols="12"
                        md="9"
                        sm="12"
                        lg="9"
                        xl="9"
                        style="height: 70px"
                      >
                        <b-img
                          style="width: 100%; height: 100%; object-fit: contain"
                          :src="value.photo"
                        >
                        </b-img>
                        <img
                          v-if="value.count != 0"
                          @click="funcLocItemMinDrop(index, value, m)"
                          class="loc-img1"
                          style="width: 20px; cursor: pointer"
                          src="https://img.icons8.com/ios/50/000000/minus.png"
                        />

                        <p>{{ value.count }}</p>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-textarea
                      id="textarea-small"
                      size="sm"
                      placeholder="Details about Product from stoppage one"
                    ></b-form-textarea>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>

          <!-- length 3 -->
          <b-card
            v-if="index == 2 && locations.length - 1 != index"
            style="width: 100%"
          >
            <b-row cols="row justify-content-start">
              <p class="loc-p">Available items & quantity for pick-up</p>
              <b-col
                class="my-1"
                v-for="(item, i) in summeryValue"
                :key="i + 'l'"
                cols="4"
                sm="4"
                md="4"
                lg="4"
                xl="3"
              >
                <!-- 123123 -->
                <b-row>
                  <b-col
                    class="loc-card"
                    cols="12"
                    md="9"
                    sm="12"
                    lg="9"
                    xl="9"
                    style="height: 70px"
                  >
                    <b-img
                      style="width: 100%; height: 100%; object-fit: contain"
                      :src="item.photo"
                    >
                    </b-img>
                    <img
                      class="loc-img1"
                      v-if="item.count == 0"
                      style="width: 20px"
                      src="https://img.icons8.com/fluency-systems-filled/48/26e07f/circled-dot.png"
                    />
                    <img
                      :style="item.count == 0 ? 'display:none' : ''"
                      @click="funcLocItem(index, item, i)"
                      class="loc-img1"
                      style="width: 20px; cursor: pointer"
                      src="https://img.icons8.com/ios/50/000000/add--v1.png"
                    />

                    <p :style="item.count == 0 ? 'display:none' : ''">
                      {{ item.count }}
                    </p>
                  </b-col>
                </b-row>
              </b-col>
              <b-col
                v-if="pickDropItems2.length != 0"
                cols="12"
                md="12"
                sm="12"
                lg="12"
                xl="12"
              >
                <b-row>
                  <p class="loc-p">Selected items & quantity for pick-up</p>
                  <b-col
                    class="loc-card"
                    style="height: 70px"
                    v-for="(value, m) in pickDropItems2"
                    :key="m + 'm'"
                    cols="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="3"
                  >
                    <b-row>
                      <b-col
                        class="loc-card"
                        cols="12"
                        md="9"
                        sm="12"
                        lg="9"
                        xl="9"
                        style="height: 70px"
                      >
                        <b-img
                          style="width: 100%; height: 100%; object-fit: contain"
                          :src="value.photo"
                        >
                        </b-img>
                        <img
                          v-if="value.count != 0"
                          @click="funcLocItemMin(index, value, m)"
                          class="loc-img1"
                          style="width: 20px; cursor: pointer"
                          src="https://img.icons8.com/ios/50/000000/minus.png"
                        />

                        <p>{{ value.count }}</p>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
              <!-- drop -->
              <p class="loc-p">Avalilbale items & quantity for Drop</p>
              <b-col
                class="my-1"
                v-for="(item, i) in dropList"
                :key="i + 'n'"
                cols="4"
                sm="4"
                md="4"
                lg="4"
                xl="3"
              >
                <!-- 123123 -->
                <b-row>
                  <b-col
                    class="loc-card"
                    cols="12"
                    md="9"
                    sm="12"
                    lg="9"
                    xl="9"
                    style="height: 70px"
                  >
                    <b-img
                      style="width: 100%; height: 100%; object-fit: contain"
                      :src="item.photo"
                    >
                    </b-img>
                    <img
                      class="loc-img1"
                      v-if="item.count == 0"
                      style="width: 20px"
                      src="https://img.icons8.com/fluency-systems-filled/48/26e07f/circled-dot.png"
                    />
                    <img
                      :style="item.count == 0 ? 'display:none' : ''"
                      @click="funcLocItemDrop(index, item, i)"
                      class="loc-img1"
                      style="width: 20px; cursor: pointer"
                      src="https://img.icons8.com/ios/50/000000/add--v1.png"
                    />

                    <p :style="item.count == 0 ? 'display:none' : ''">
                      {{ item.count }}
                    </p>
                  </b-col>
                </b-row>
              </b-col>

              <b-col
                v-if="dropItems2.length != 0"
                cols="12"
                md="12"
                sm="12"
                lg="12"
                xl="12"
              >
                <p class="loc-p">Selected items & quantity for Drop</p>

                <b-row>
                  <b-col
                    class="loc-card"
                    style="height: 70px"
                    v-for="(value, m) in dropItems2"
                    :key="m + 'o'"
                    cols="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="3"
                  >
                    <b-row>
                      <b-col
                        class="loc-card"
                        cols="12"
                        md="9"
                        sm="12"
                        lg="9"
                        xl="9"
                        style="height: 70px"
                      >
                        <b-img
                          style="width: 100%; height: 100%; object-fit: contain"
                          :src="value.photo"
                        >
                        </b-img>
                        <img
                          v-if="value.count != 0"
                          @click="funcLocItemMinDrop(index, value, m)"
                          class="loc-img1"
                          style="width: 20px; cursor: pointer"
                          src="https://img.icons8.com/ios/50/000000/minus.png"
                        />

                        <p>{{ value.count }}</p>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-textarea
                      id="textarea-small"
                      size="sm"
                      placeholder="Details about Product from stoppage two"
                    ></b-form-textarea>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>

          <!-- length 4 -->
          <b-card
            v-if="index == 3 && locations.length - 1 != index"
            style="width: 100%"
          >
            <b-row cols="row justify-content-start">
              <p class="loc-p">Available items & quantity for pick-up</p>
              <b-col
                class="my-1"
                v-for="(item, i) in summeryValue"
                :key="i + 'p'"
                cols="4"
                sm="4"
                md="4"
                lg="4"
                xl="3"
              >
                <!-- 123123 -->
                <b-row>
                  <b-col
                    class="loc-card"
                    cols="12"
                    md="9"
                    sm="12"
                    lg="9"
                    xl="9"
                    style="height: 70px"
                  >
                    <b-img
                      style="width: 100%; height: 100%; object-fit: contain"
                      :src="item.photo"
                    >
                    </b-img>
                    <img
                      class="loc-img1"
                      v-if="item.count == 0"
                      style="width: 20px"
                      src="https://img.icons8.com/fluency-systems-filled/48/26e07f/circled-dot.png"
                    />
                    <img
                      :style="item.count == 0 ? 'display:none' : ''"
                      @click="funcLocItem(index, item, i)"
                      class="loc-img1"
                      style="width: 20px; cursor: pointer"
                      src="https://img.icons8.com/ios/50/000000/add--v1.png"
                    />

                    <p :style="item.count == 0 ? 'display:none' : ''">
                      {{ item.count }}
                    </p>
                  </b-col>
                </b-row>
              </b-col>
              <b-col
                v-if="pickDropItems3.length != 0"
                cols="12"
                md="12"
                sm="12"
                lg="12"
                xl="12"
              >
                <p class="loc-p">Selected items & quantity for pick-up</p>

                <b-row>
                  <b-col
                    class="loc-card"
                    style="height: 70px"
                    v-for="(value, m) in pickDropItems3"
                    :key="m + 'q'"
                    cols="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="3"
                  >
                    <b-row>
                      <b-col
                        class="loc-card"
                        cols="12"
                        md="9"
                        sm="9"
                        lg="9"
                        xl="9"
                        style="height: 70px"
                      >
                        <b-img
                          style="width: 100%; height: 100%; object-fit: contain"
                          :src="value.photo"
                        >
                        </b-img>
                        <img
                          v-if="value.count != 0"
                          @click="funcLocItemMin(index, value, m)"
                          class="loc-img1"
                          style="width: 20px; cursor: pointer"
                          src="https://img.icons8.com/ios/50/000000/minus.png"
                        />

                        <p>{{ value.count }}</p>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
              <!-- drop -->
              <p class="loc-p my-2">Available items & quantity for Drop</p>
              <b-col
                class="my-1"
                v-for="(item, i) in dropList"
                :key="i + 'r'"
                cols="4"
                sm="4"
                md="4"
                lg="4"
                xl="3"
              >
                <!-- 123123 -->
                <b-row>
                  <b-col
                    class="loc-card"
                    cols="12"
                    md="9"
                    sm="12"
                    lg="9"
                    xl="9"
                    style="height: 70px"
                  >
                    <b-img
                      style="width: 100%; height: 100%; object-fit: contain"
                      :src="item.photo"
                    >
                    </b-img>
                    <img
                      class="loc-img1"
                      v-if="item.count == 0"
                      style="width: 20px"
                      src="https://img.icons8.com/fluency-systems-filled/48/26e07f/circled-dot.png"
                    />
                    <img
                      :style="item.count == 0 ? 'display:none' : ''"
                      @click="funcLocItemDrop(index, item, i)"
                      class="loc-img1"
                      style="width: 20px; cursor: pointer"
                      src="https://img.icons8.com/ios/50/000000/add--v1.png"
                    />

                    <p :style="item.count == 0 ? 'display:none' : ''">
                      {{ item.count }}
                    </p>
                  </b-col>
                </b-row>
              </b-col>

              <b-col
                v-if="dropItems3.length != 0"
                cols="12"
                md="12"
                sm="12"
                lg="12"
                xl="12"
              >
                <p class="loc-p">Selected items & quantity for Drop</p>
                <b-row>
                  <b-col
                    class="loc-card"
                    style="height: 70px"
                    v-for="(value, m) in dropItems3"
                    :key="m + 's'"
                    cols="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="3"
                  >
                    <b-row>
                      <b-col
                        class="loc-card"
                        cols="12"
                        md="9"
                        sm="12"
                        lg="9"
                        xl="9"
                        style="height: 70px"
                      >
                        <b-img
                          style="width: 100%; height: 100%; object-fit: contain"
                          :src="value.photo"
                        >
                        </b-img>
                        <img
                          v-if="value.count != 0"
                          @click="funcLocItemMinDrop(index, value, m)"
                          class="loc-img1"
                          style="width: 20px; cursor: pointer"
                          src="https://img.icons8.com/ios/50/000000/minus.png"
                        />

                        <p>{{ value.count }}</p>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-textarea
                      id="textarea-small"
                      size="sm"
                      placeholder="Details about Product from stoppage three"
                    ></b-form-textarea>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>

          <!-- length 5 -->
          <b-card
            v-if="index == locations.length - 1 && locations.length > 2"
            style="width: 100%"
          >
            <b-row cols="row justify-content-start">
              <p class="loc-p my-2">Available items & quantity for Drop</p>
              <b-col
                class="my-1"
                v-for="(item, i) in dropList"
                :key="i + 't'"
                cols="4"
                sm="4"
                md="4"
                lg="4"
                xl="3"
              >
                <!-- 123123 -->
                <b-row>
                  <b-col
                    class="loc-card"
                    cols="12"
                    md="9"
                    sm="12"
                    lg="9"
                    xl="9"
                    style="height: 70px"
                  >
                    <b-img
                      style="width: 100%; height: 100%; object-fit: contain"
                      :src="item.photo"
                    >
                    </b-img>
                    <img
                      class="loc-img1"
                      v-if="item.count == 0"
                      style="width: 20px"
                      src="https://img.icons8.com/fluency-systems-filled/48/26e07f/circled-dot.png"
                    />
                    <img
                      :style="item.count == 0 ? 'display:none' : ''"
                      @click="funcLocItemDrop(index, item, i)"
                      class="loc-img1"
                      style="width: 20px; cursor: pointer"
                      src="https://img.icons8.com/ios/50/000000/add--v1.png"
                    />

                    <p :style="item.count == 0 ? 'display:none' : ''">
                      {{ item.count }}
                    </p>
                  </b-col>
                </b-row>
              </b-col>
              <b-col
                v-if="lastDropItems.length != 0"
                cols="12"
                md="12"
                sm="12"
                lg="12"
                xl="12"
              >
                <p class="loc-p">Selected items & quantity for Drop</p>
                <b-row>
                  <b-col
                    class="loc-card"
                    style="height: 70px"
                    v-for="(value, m) in lastDropItems"
                    :key="m + 'v'"
                    cols="4"
                    sm="4"
                    md="4"
                    lg="4"
                    xl="3"
                  >
                    <b-row>
                      <b-col
                        class="loc-card"
                        cols="12"
                        md="9"
                        sm="12"
                        lg="9"
                        xl="9"
                        style="height: 70px"
                      >
                        <b-img
                          style="width: 100%; height: 100%; object-fit: contain"
                          :src="value.photo"
                        >
                        </b-img>
                        <img
                          v-if="value.count != 0"
                          @click="funcLocItemMinDrop(index, value, m)"
                          class="loc-img1"
                          style="width: 20px; cursor: pointer"
                          src="https://img.icons8.com/ios/50/000000/minus.png"
                        />

                        <p>{{ value.count }}</p>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-textarea
                      id="textarea-small"
                      size="sm"
                      placeholder="Details about Product from Drop up place"
                    ></b-form-textarea>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols="12" sm="12" md="8" lg="8" xl="8"
          ><b-card no-body style="width: 100%">
            <b-col style="" cols="12" sm="12" md="12" lg="12" xl="12">
              <b-progress
                :value="value"
                :max="max"
                variant="dark"
                animated
              ></b-progress>
            </b-col>
            <b-col
              v-if="locations.length !== 2"
              style=""
              cols="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
            >
              <p
                style="font-size: 12px; color: red; font-weight: 600"
                v-if="summeryCheck !== 0"
              >
                *Remaining item for Pick Up: {{ summeryCheck }}
              </p>
              <p
                style="font-size: 12px; color: red; font-weight: 600"
                v-if="summeryCheck == 0 && dropCheck !== 0"
              >
                *Remaining item for Drop Up: {{ dropCheck }}
              </p>
            </b-col>
            <b-row class="my-1">
              <b-col>
                <b-row class="row justify-content-start">
                  <!-- 565656 -->
                  <b-col cols="10" sm="10" md="6" lg="6" xl="6">
                    <b-button
                      variant="dark"
                      @click="backFunc2"
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
                      :disabled="summeryCheck != 0 || dropCheck != 0"
                      v-if="locations.length != 2"
                      variant="dark"
                      style="width: 100%; color: #ffffff"
                      @click="useElevetor(5)"
                    >
                      Next
                      <img
                        class="mx-1"
                        src="https://img.icons8.com/ios-glyphs/30/ffffff/long-arrow-right.png"
                    /></b-button>
                    <b-button
                      v-if="locations.length == 2"
                      variant="dark"
                      style="width: 100%; color: #ffffff"
                      @click="useElevetor(5)"
                    >
                      Next
                      <img
                        class="mx-1"
                        src="https://img.icons8.com/ios-glyphs/30/ffffff/long-arrow-right.png"
                    /></b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row> </b-card
        ></b-col>
      </b-row>

      <!-- halper -->
      <b-row v-if="checkSection == 5" class="row justify-content-center">
        <b-col class="elevator" cols="12" sm="12" md="8" lg="8" xl="8">
          <h4
            style="
              background: #dd0303;
              text-align: center;
              padding: 10px;
              color: #ffffff;
            "
          >
            How many helper do you need?
          </h4>
          <b-card no-body style="width: 100%">
            <b-row>
              <b-col cols="2" sm="2" md="2" lg="2" xl="2">
                <img
                  style="width: 40px; max-height: 80px; margin-left: 20%"
                  :src="helper[0].image"
                />
              </b-col>
              <b-col class="manu-text" cols="7" sm="7" md="8" lg="8" xl="8">
                <h5>{{ helper[0].title }}</h5>
                <p>{{ helper[0].description }}</p>
              </b-col>
              <b-col cols="3" sm="3" md="2" lg="2" xl="2">
                <b-button
                  class="helper-btn"
                  @click="funcOne(helper[0])"
                  variant="light"
                  v-if="onePerson == false"
                  pill
                  size="sm"
                  ><img
                    src="https://img.icons8.com/material/24/fa314a/circled.png"
                /></b-button>
                <b-button
                  class="helper-btn"
                  @click="funcOne(helper[0])"
                  variant="light"
                  v-if="onePerson == true"
                  pill
                  size="sm"
                  ><img
                    src="https://img.icons8.com/material/24/fa314a/filled-circle.png"
                /></b-button>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="mt-1" style="width: 100%">
            <b-row>
              <b-col cols="2" sm="2" md="2" lg="2" xl="2">
                <img
                  style="width: 40px; max-height: 80px; margin-left: 20%"
                  :src="helper[1].image"
                />
              </b-col>
              <b-col class="manu-text" cols="7" sm="7" md="8" lg="8" xl="8">
                <h5>{{ helper[1].title }}</h5>
                <p>{{ helper[1].description }}</p>
              </b-col>
              <b-col cols="3" sm="3" md="2" lg="2" xl="2">
                <b-button
                  class="helper-btn"
                  @click="funcTwo(helper[1])"
                  variant="light"
                  v-if="twoPerson == false"
                  pill
                  size="sm"
                  ><img
                    src="https://img.icons8.com/material/24/fa314a/circled.png"
                /></b-button>
                <b-button
                  class="helper-btn"
                  @click="funcTwo(helper[1])"
                  variant="light"
                  v-if="twoPerson == true"
                  pill
                  size="sm"
                  ><img
                    src="https://img.icons8.com/material/24/fa314a/filled-circle.png"
                /></b-button>
              </b-col>
            </b-row>
          </b-card>
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
                      @click="backFunc"
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
                      :disabled="onePerson == false && twoPerson == false"
                      variant="dark"
                      style="width: 100%; color: #ffffff"
                      @click="personFunc(6)"
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
        </b-col>
      </b-row>
      <b-row v-if="checkSection == 6" class="row justify-content-center">
        <b-col
          style="background: #dd0303"
          cols="11"
          sm="11"
          md="8"
          lg="8"
          xl="8"
        >
          <h4
            class="my-1"
            style="
              text-align: center;
              color: #ffffff;
              background: #dd0303 !important;
              padding: 8px;
              font-weight: bold;
              font-size: 18px;
            "
          >
            Date and Time
          </h4>

          <v-date-picker
            :min="new Date().toISOString().substr(0, 10)"
            color="#dd0303"
            v-model="date2"
            full-width
            class="my-1"
            style="width: 100%"
          ></v-date-picker>
        </b-col>

        <b-col
          style="background: #dd0303"
          cols="11"
          sm="11"
          md="8"
          lg="8"
          xl="8"
        >
          <b-row class="row justify-content-center">
            <p style="text-align: center; color: #ffffff">
              Choose Your Starting Time
            </p>
            <b-col cols="11" sm="11" md="5" lg="5" xl="5">
              <v-select
                :items="timeSlot"
                label="Earliest"
                item-text="time"
                v-model="earliest"
                solo
              ></v-select>
            </b-col>
            <b-col cols="11" sm="11" md="5" lg="5" xl="5">
              <v-select
                :items="timeSlot"
                label="Latest"
                item-text="time"
                v-model="latest"
                solo
              ></v-select>
            </b-col>
          </b-row>
        </b-col>
        <b-col style="" cols="11" sm="11" md="8" lg="8" xl="8">
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
                  <b-col cols="12" sm="10" md="6" lg="6" xl="6">
                    <b-button
                      @click="backFunc"
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
                  <b-col cols="12" sm="10" md="6" lg="6" xl="6">
                    <b-button
                      variant="dark"
                      @click="priceFunc(7)"
                      style="width: 100%; color: #ffffff"
                    >
                      Next<img
                        class="mx-1"
                        src="https://img.icons8.com/ios-glyphs/30/ffffff/long-arrow-right.png"
                    /></b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- 321321 -->
      <b-row
        v-if="checkSection == 7 || checkValueSection == 7"
        class="row justify-content-center"
      >
        <b-col cols="11" sm="11" md="8" lg="8" xl="8">
          <h4
            class="my-2"
            style="
              text-align: center;
              color: #ffffff;
              background: #dd0303 !important;
              padding: 8px;
              font-weight: bold;
              font-size: 18px;
            "
          >
            Price
          </h4>
        </b-col>

        <b-col class="price-section" cols="11" sm="11" md="7" lg="7" xl="7">
          <h2>
            Your Price:
            <span class="price-main"> {{ totalPrice.toFixed(2) }}</span>

            <img
              class="img-price"
              src="https://img.icons8.com/material-outlined/24/000000/euro-pound-exchange.png"
            />
          </h2>
          <h4 class="btn-work" style="width:90%; !important" size="md">
            The work includes
          </h4>
          <h3 v-if="pirceCarId != null">
            <span v-if="hourlyRate == 79">Two workers</span>
            <span v-if="hourlyRate != 79">One worker</span> and a
            <span v-if="pirceCarId.vehicle_id == '1'">19m3</span>
            <span v-if="pirceCarId.vehicle_id == '2'">6m3</span> van
          </h3>
          <p>
            <img
              class="img"
              src="https://img.icons8.com/ios/50/000000/lift-cart-here.png"
            />Necessary equipment for safe transport and carrying goods.
          </p>
          <p>
            <img
              class="img"
              src="https://img.icons8.com/ios/50/000000/security-checked.png"
            />The goods are insured during transport.
          </p>
          <p>
            <img
              class="img"
              src="https://img.icons8.com/ios/50/000000/price-tag-euro.png"
            />Advance pricing.
          </p>
        </b-col>
        <b-col cols="11" sm="11" md="7" lg="7" xl="7">
          <b-card no-body style="width: 100%; background: #d9d9d9 !important">
            <b-row class="row justify-content-center align-items-center">
              <div class="xyz">
                <div class="mt-4">
                  <img style="max-width: 90px" :src="logo" />
                </div>
              </div>
              <b-col class="log-tag" cols="10">
                <h4 style="text-align: center">
                  More than Dozens shipments ordered last week.
                </h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols="11" sm="11" md="7" lg="7" xl="7">
          <b-card style="width: 100%; background: #d9d9d9">
            <b-row style="border-bottom: 1px solid black">
              <b-col class="price-l">
                <h4>Price</h4>
              </b-col>
              <b-col class="price-r">
                <h4>
                  {{ totalPrice.toFixed(2) }}

                  <img
                    class="img-euro"
                    src="https://img.icons8.com/material-outlined/24/000000/euro-pound-exchange.png"
                  />
                </h4>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="price-l my-3">
                <h4>Price VAT 0%</h4>
              </b-col>
              <b-col class="price-r my-3">
                <h4>
                  {{ priceNormal.toFixed(2) }}
                  <img
                    class="img-euro"
                    src="https://img.icons8.com/material-outlined/24/000000/euro-pound-exchange.png"
                  />
                </h4>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="price-l">
                <!-- total_price vehicle_id -->
                <h4>VAT 24%</h4>
              </b-col>
              <b-col class="price-r">
                <h4>
                  {{ vatPrice.toFixed(2) }}
                  <img
                    class="img-euro"
                    src="https://img.icons8.com/material-outlined/24/000000/euro-pound-exchange.png"
                  />
                </h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col style="" cols="11" sm="11" md="8" lg="8" xl="8">
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
                  <b-col cols="12" sm="10" md="6" lg="6" xl="6">
                    <b-button
                      @click="backFunc"
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
                  <b-col cols="12" sm="10" md="6" lg="6" xl="6">
                    <b-button
                      @click="check8"
                      variant="dark"
                      style="width: 100%; color: #ffffff"
                    >
                      Order<img
                        class="mx-1"
                        src="https://img.icons8.com/ios-glyphs/30/ffffff/long-arrow-right.png"
                    /></b-button>
                  </b-col>
                </b-row>
              </b-col>
              <p
                style="
                  color: red;
                  text-align: center;
                  font-weight: bold;
                  display: none;
                "
                v-if="!user"
              >
                You Have to Log in for place an order.
              </p>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-if="checkSection == 8">
        <order
          @changeTitle="ChangeT($event)"
          :price="totalPrice"
          :value="value"
        />
      </b-row>
    </v-container>
  </div>
</template>
<script>
import "vuetify/dist/vuetify.min.css";

const GET = axios.get;
import axios from "axios";
export default {
  data() {
    return {
      logo: require("@/assets/logo.png"),
      durationTime: 0,
      pirceCarId: null,
      onePersonNumber: false,
      twoPersonNumber: false,
      lastDropItems: [],
      search: "",
      dropList: [],
      earliest: "",
      latest: "",
      items: [],
      office: {
        label: "Mäntyhaantie 4B Halli 46, 33870 Tampere, Finland",
        lat: 61.4808531,
        lng: 23.7852079,
      },
      pickItems: [],
      dropItems: [],
      pickDropItems1: [],
      pickDropItems2: [],
      pickDropItems3: [],
      dropItems1: [],
      dropItems2: [],
      dropItems3: [],
      widthValue: [],
      heightValue: [],
      palletGoods: false,
      depthValue: [],
      hourlyRate: 0,
      order: null,
      totalVolum: 0,
      quantityValue: 0,
      checkSection: 0,
      priceNormal: 0,
      vatPrice: 0,
      totalPrice: 0,
      dumpArr:[],
      value: 0,
      max: 100,
      checkValue: null,
      manuText: "",
      timeSlot: [
        { id: 1, time: "06:00 AM" },
        { id: 2, time: "06:30 AM" },
        { id: 3, time: "07:00 AM" },
        { id: 4, time: "07:30 AM" },
        { id: 5, time: "08:00 AM" },
        { id: 6, time: "08:30 AM" },
        { id: 7, time: "09:00 AM" },
        { id: 8, time: "09:30 AM" },
        { id: 8, time: "10:00 AM" },
        { id: 9, time: "10:30 AM" },
        { id: 10, time: "11:00 AM" },
        { id: 11, time: "11:30 AM" },
        { id: 12, time: "12:00 PM" },
        { id: 13, time: "12:30 PM" },
        { id: 14, time: "01:00 PM" },
        { id: 15, time: "01:30 PM" },
        { id: 16, time: "02:00 PM" },
        { id: 17, time: "02:30 PM" },
        { id: 18, time: "03:00 PM" },
        { id: 19, time: "03:30 PM" },
        { id: 20, time: "04:00 PM" },
        { id: 21, time: "04:30 PM" },
        { id: 22, time: "05:00 PM" },
        { id: 23, time: "05:30 PM" },
        { id: 24, time: "06:00 PM" },
        { id: 25, time: "06:30 PM" },
        { id: 26, time: "07:00 PM" },
        { id: 27, time: "07:30 PM" },
        { id: 28, time: "08:30 PM" },
        { id: 29, time: "09:00 PM" },
        { id: 30, time: "09:30 PM" },
        { id: 31, time: "10:00 PM" },
      ],
      summeryValue: [],
      date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      helper: null,
      onePerson: false,
      twoPerson: false,
      destinationValue: false,
      fromValue: false,
      fromLng: "",
      locPlace: 2,
      toLng: "",
      toLat: "",
      oneYard: true,
      oneElevator: false,
      totalPickDropTime: 0,
      florFrom: 0,
      oneElevator1: false,
      florFrom1: 0,
      fromLat: "",
      distance: null,
      toPlace: "",
      fromPlace: "",
      center: {
        lat: 61.4808531,
        lng: 23.7852079,
      },
      locations: [
        { lat: 0, lng: 0, label: "none" },
        { lat: 0, lng: 0, label: "none" },
        { lat: 0, lng: 0, label: "none" },
        { lat: 0, lng: 0, label: "none" },
        { lat: 0, lng: 0, label: "none" },
      ],
      dataPickDrop: [
        {
          yard: true,
          groundLevele: false,
          elevator: false,
          floor: 0,
          apartmentNumber: "",
        },
        {
          yard: true,
          groundLevele: false,
          elevator: false,
          floor: 0,
          apartmentNumber: "",
        },
        {
          yard: true,
          groundLevele: false,
          elevator: false,
          floor: 0,
          apartmentNumber: "",
        },
        {
          yard: true,
          groundLevele: false,
          elevator: false,
          floor: 0,
          apartmentNumber: "",
        },
        {
          yard: true,
          groundLevele: false,
          elevator: false,
          floor: 0,
          apartmentNumber: "",
        },
      ],
      locationsFrom: {},
      locationsTo: {},
      currentLocation: null,
    };
  },
  created() {
    GET("http://localhost:4000/v1/items")
      .then((res) => (this.items = res.data.items))
      .then(() => {
        GET("http://localhost:4000/v1/prices").then(
          (res) => (this.helper = res.data.prices)
        );
      })
      .then(() => {
        GET("http://localhost:4000/v1/order").then(
          (res) => (this.order = res.data.order)
        );
      });
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    checkValueSection() {
      return this.$store.getters.checkValue;
    },
    filter() {
      if (!this.search) {
        return this.items;
      } else {
        return this.items.filter(({ name }) =>
          name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },
    summeryCheck() {
      var summery = 0;
      this.summeryValue.map((item) => (summery += item.count));
      return summery;
    },
    dropCheck() {
      var summery = 0;
      this.dropList.map((item) => (summery += item.count));
      return summery;
    },
  },
  methods: {
    ChangeT(title) {
      this.checkSection = title;
    },
    check8() {
      if (this.locations.length == 2) {
        (this.value = 100), (this.checkSection = 8);
        this.$store.dispatch("dataBind", {
          pickItems: this.summeryValue,
          dropItems: this.summeryValue,
          pickDropItems1: this.pickDropItems1,
          pickDropItems2: this.pickDropItems2,
          pickDropItems3: this.pickDropItems3,
          dropItems1: this.dropItems1,
          dropItems2: this.dropItems2,
          dropItems3: this.dropItems3,
          widthValue: this.widthValue,
          heightValue: this.heightValue,
          palletGoods: this.palletGoods,
          totalPrice: this.totalPrice,
          pirceCarId: this.pirceCarId,
          locations: this.locations,
          quantityValue: this.quantityValue,
          totalVolum: this.totalVolum,
          dataPickDrop: this.dataPickDrop,
          date: this.date2,
          earliest: this.earliest,
          latest: this.latest,
          hourlyRate: this.hourlyRate,
        });
      }
      if (this.locations.length != 2) {
        (this.value = 100), (this.checkSection = 8);
        this.$store.dispatch("dataBind", {
          pickItems: this.pickItems,
          dropItems: this.lastDropItems,
          pickDropItems1: this.pickDropItems1,
          pickDropItems2: this.pickDropItems2,
          pickDropItems3: this.pickDropItems3,
          dropItems1: this.dropItems1,
          dropItems2: this.dropItems2,
          dropItems3: this.dropItems3,
          widthValue: this.widthValue,
          heightValue: this.heightValue,
          palletGoods: this.palletGoods,
          totalPrice: this.totalPrice,
          pirceCarId: this.pirceCarId,
          locations: this.locations,
          quantityValue: this.quantityValue,
          totalVolum: this.totalVolum,
          dataPickDrop: this.dataPickDrop,
          date: this.date2,
          earliest: this.earliest,
          latest: this.latest,
          hourlyRate: this.hourlyRate,
        });
      }
    },
    startFunc() {
      this.checkSection = 1;
    },
    funcOne1(e) {
      this.dataPickDrop[e].yard = !this.dataPickDrop[e].yard;
      this.dataPickDrop[e].elevator = false;
      this.dataPickDrop[e].floor = 0;
      this.dataPickDrop[e].groundLevele = false;
    },
    funcOneGround(e) {
      this.dataPickDrop[e].groundLevele = !this.dataPickDrop[e].groundLevele;
      this.dataPickDrop[e].yard = false;
      this.dataPickDrop[e].elevator = false;
      this.dataPickDrop[e].floor = 0;
    },
    funcYard() {
      this.oneYard = true;
    },
    funcElevator1(e) {
      this.dataPickDrop[e].elevator = !this.dataPickDrop[e].elevator;
      this.dataPickDrop[e].yard = false;
      this.dataPickDrop[e].floor = 0;
      this.dataPickDrop[e].groundLevele = false;
    },
    funcFloorMin1(e) {
      this.dataPickDrop[e].floor = this.dataPickDrop[e].floor - 1;
      this.dataPickDrop[e].yard = false;
      this.dataPickDrop[e].elevator = false;
      this.dataPickDrop[e].groundLevele = false;
    },
    funcFloorAdd1(e) {
      this.dataPickDrop[e].floor = this.dataPickDrop[e].floor + 1;
      this.dataPickDrop[e].yard = false;
      this.dataPickDrop[e].elevator = false;
      this.dataPickDrop[e].groundLevele = false;
    },

    backFunc2() {
      this.checkSection = 3;
    },
    backFunc() {
      this.checkSection = this.checkSection - 1;
      if (this.checkSection == 5) {
        this.durationTime = 0;
      }
      if (this.checkSection == 4) {
        this.totalPickDropTime = 0;
      }
    },
    itemFunc(e) {
      this.checkSection = e;
      this.value = 40;
    },
    personFunc(e) {
      this.checkSection = e;
      this.value = 80;
      this.getDistanceAll();
    },
    useElevetor(e) {
      this.checkSection = e;
      this.value = 70;
      this.carryingTimeFunc();
    },
    priceFunc(e) {
      this.postForPrice();
      this.value = 90;
      this.checkSection = e;
    },
    mapFunc(e) {
      this.checkSection = e;
      this.value = 55;
      let arr = [];
      for (let i = 0; i < this.locations.length; i++) {
        if (this.locations[i].lat != 0) {
          arr.push(this.locations[i]);
        }
      }
      this.locations = arr;

     
    },
    manuFunc(text) {
      this.checkSection = 2;
      this.manuText = text;
      this.value = 20;
    },
    funcDuration(e) {
      this.durationTime += e;
    },
    officedistanceFunc() {
      this.getDistance1(this.office, this.locations[0]);
      this.getDistance2(this.locations[this.locations.length - 1], this.office);
    },
    getDistanceAll() {
      this.officedistanceFunc();
      for (let i = 0; i < this.locations.length; i++) {
        if (i < this.locations.length - 1) {
          this.getDistance(this.locations[i], this.locations[i + 1]);
        }
      }
    },
    getDistance2(from, to) {
      const fromLat = from.lat;
      const fromLng = from.lng;
      const fromLabel = from.label;
      const toLat = to.lat;
      const toLng = to.lng;
      const toLabel = to.label;

      const google = window.google;
      var origin1 = new google.maps.LatLng(fromLat, fromLng);
      var origin2 = fromLabel;
      var destinationA = toLabel;
      var destinationB = new google.maps.LatLng(toLat, toLng);

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin1, origin2],
          destinations: [destinationA, destinationB],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        (response) => {
          var time = response.rows[0].elements[0].duration.value;
          this.funcDuration(time);
        }
      );
    },
    getDistance1(from, to) {
      const fromLat = from.lat;
      const fromLng = from.lng;
      const fromLabel = from.label;
      const toLat = to.lat;
      const toLng = to.lng;
      const toLabel = to.label;

      const google = window.google;
      var origin1 = new google.maps.LatLng(fromLat, fromLng);
      var origin2 = fromLabel;
      var destinationA = toLabel;
      var destinationB = new google.maps.LatLng(toLat, toLng);

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin1, origin2],
          destinations: [destinationA, destinationB],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        (response) => {
          var time = response.rows[0].elements[0].duration.value;
          this.funcDuration(time);
        }
      );
    },
    getDistance(from, to) {
      const fromLat = from.lat;
      const fromLng = from.lng;
      const fromLabel = from.label;
      const toLat = to.lat;
      const toLng = to.lng;
      const toLabel = to.label;

      const google = window.google;
      var origin1 = new google.maps.LatLng(fromLat, fromLng);
      var origin2 = fromLabel;
      var destinationA = toLabel;
      var destinationB = new google.maps.LatLng(toLat, toLng);

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin1, origin2],
          destinations: [destinationA, destinationB],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        (response) => {
          var time = response.rows[0].elements[0].duration.value;
          this.funcDuration(time);
        }
      );
    },
    funcLocation() {
      const google = window.google;
      for (let ref in this.$refs) {
        const autocomplete = new google.maps.places.Autocomplete(
          this.$refs[ref]
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          this.fromPlace = place.formatted_address;
          this.fromLat = place.geometry.location.lat();

          this.fromLng = place.geometry.location.lng();
          this.center.lat = this.fromLat;
          this.center.lng = this.fromLng;
          if (ref == "origin" && this.locPlace == 2) {
            let data2 = {
              lat: this.fromLat,
              lng: this.fromLng,
              label: this.fromPlace,
            };

            this.locations.splice(0, 1, data2);
          } else if (ref == "destination" && this.locPlace == 2) {
            let data2 = {
              lat: this.fromLat,
              lng: this.fromLng,
              label: this.fromPlace,
            };

            this.locations.splice(4, 1, data2);
          } else if (this.locPlace == 3) {
            let data2 = {
              lat: this.fromLat,
              lng: this.fromLng,
              label: this.fromPlace,
            };

            this.locations.splice(1, 1, data2);
          } else if (this.locPlace == 4) {
            let data2 = {
              lat: this.fromLat,
              lng: this.fromLng,
              label: this.fromPlace,
            };

            this.locations.splice(2, 1, data2);
          } else if (this.locPlace == 5) {
            let data2 = {
              lat: this.fromLat,
              lng: this.fromLng,
              label: this.fromPlace,
            };

            this.locations.splice(3, 1, data2);
          }
        });
      }
    },

    calculationItem() {
      var quantity = 0;
      var totalVolumS = 0;
      for (let i = 0; i < this.summeryValue.length; i++) {
        quantity = quantity + this.summeryValue[i].count;

        var itemVol =
          this.summeryValue[i].count *
          parseFloat(this.summeryValue[i].ItemDimensions.volume);
        totalVolumS = totalVolumS + itemVol;
      }
      this.quantityValue = quantity;
      this.totalVolum = totalVolumS;
    },
    summeryEdit(e, k) {
      for (let i = 0; i < this.summeryValue.length; i++) {
        if (this.summeryValue[i].id == e) {
          this.summeryValue.splice(i, 1, k);
        }
      }
      this.calculationItem();
    },
    addLocFunc() {
      if (this.locPlace < 6) {
        this.locPlace = this.locPlace + 1;
      }
    },
    minLocFunc() {
      if (this.locPlace < 7) {
        this.locPlace = this.locPlace - 1;
        this.locations.splice(this.locPlace - 1, 1, {});
      }
    },
    funcTwo(e) {
      this.onePerson = false;
      this.twoPerson = !this.twoPerson;
      this.onePersonNumber = false;
      this.twoPersonNumber = !this.twoPersonNumber;
      this.hourlyRate = parseFloat(e.hourly_rate);
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    funcOne(e) {
      this.twoPerson = false;
      this.onePerson = !this.onePerson;
      this.twoPersonNumber = false;
      this.onePersonNumber = !this.onePersonNumber;
      this.hourlyRate = parseFloat(e.hourly_rate);
    },

    buttonAdd(e, j) {
      var indexValue = this.items.findIndex(function (o) {
        return o.id === e.id;
      });
      this.dumpArr.push(j)
      let data = {
        id: e.id,
        name: e.name,
        name_in_finnish: e.name_in_finnish,
        photo: e.photo,
        count: e.count + 1,
        ItemDimensions: e.ItemDimensions,
        CarryingTime: e.CarryingTime,
        description: e.description,
      };
      this.summeryEdit(e.id, data);
      this.items.splice(indexValue, 1, data);
      this.calculationItem();
    },

    buttonMin(e, j) {
      var indexValue = this.items.findIndex(function (o) {
        return o.id === e.id;
      });
      this.dumpArr.push(j)
      let data = {
        id: e.id,
        name: e.name,
        name_in_finnish: e.name_in_finnish,
        photo: e.photo,
        count: e.count - 1,
        ItemDimensions: e.ItemDimensions,
        CarryingTime: e.CarryingTime,
        description: e.description,
      };
      this.items.splice(indexValue, 1, data);
      this.summeryEdit(e.id, data);
      if (data.count == 0) {
        this.heightValue.splice(j, 1, "0");
        this.widthValue.splice(j, 1, "0");
        this.depthValue.splice(j, 1, "0");
        if (data.id == 4) {
          this.palletGoods = false;
        }
      }

      this.calculationItem();
    },
    buttonItems(e, j) {
      let data = {
        id: e.id,
        name: e.name,
        name_in_finnish: e.name_in_finnish,
        photo: e.photo,
        count: e.count - 1,
        ItemDimensions: e.ItemDimensions,
        CarryingTime: e.CarryingTime,
        description: e.description,
      };
      this.summeryValue.splice(j, 1, data);
    },
    buttonItemsDrop(e) {
      var indexValue = this.dropList.findIndex(function (o) {
        return o.id === e.id;
      });
      let data = {
        id: this.dropList[indexValue].id,
        name: this.dropList[indexValue].name,
        name_in_finnish: this.dropList[indexValue].name_in_finnish,
        photo: this.dropList[indexValue].photo,
        count: this.dropList[indexValue].count - 1,
        ItemDimensions: this.dropList[indexValue].ItemDimensions,
        CarryingTime: this.dropList[indexValue].CarryingTime,
        description: this.dropList[indexValue].description,
      };
      if (this.dropList[indexValue].count > 0) {
        this.dropList.splice(indexValue, 1, data);
      }
    },
    buttonItemsMinDrop(e) {
      var indexValue = this.dropList.findIndex(function (o) {
        return o.id === e.id;
      });

      let data2 = {
        id: this.dropList[indexValue].id,
        name: this.dropList[indexValue].name,
        name_in_finnish: this.dropList[indexValue].name_in_finnish,
        photo: this.dropList[indexValue].photo,
        count: this.dropList[indexValue].count + 1,
        ItemDimensions: this.dropList[indexValue].ItemDimensions,
        CarryingTime: this.dropList[indexValue].CarryingTime,
        description: this.dropList[indexValue].description,
        itemcheck: false,
      };

      this.dropList.splice(indexValue, 1, data2);
    },
    buttonItemsMin(e) {
      var indexValue = this.summeryValue.findIndex(function (o) {
        return o.id === e.id;
      });
      var indexValueDrop = this.dropList.findIndex(function (o) {
        return o.id === e.id;
      });
      for (let i = 0; i < this.summeryValue.length; i++) {
        if (this.summeryValue[i].id == e.id) {
          let data2 = {
            id: this.summeryValue[i].id,
            name: this.summeryValue[i].name,
            name_in_finnish: this.summeryValue[i].name_in_finnish,
            photo: this.summeryValue[i].photo,
            count: this.summeryValue[i].count + 1,
            ItemDimensions: this.summeryValue[i].ItemDimensions,
            CarryingTime: this.summeryValue[i].CarryingTime,
            description: this.summeryValue[i].description,
            itemcheck: false,
          };
          this.summeryValue.splice(indexValue, 1, data2);
        }
      }
      for (let i = 0; i < this.dropList.length; i++) {
        if (this.dropList[i].id == e.id) {
          let data2 = {
            id: this.dropList[i].id,
            name: this.dropList[i].name,
            name_in_finnish: this.dropList[i].name_in_finnish,
            photo: this.dropList[i].photo,
            count: this.dropList[i].count - 1,
            ItemDimensions: this.dropList[i].ItemDimensions,
            CarryingTime: this.dropList[i].CarryingTime,
            description: this.dropList[i].description,
            itemcheck: false,
          };
          if (this.dropList[i].count > 0) {
            this.dropList.splice(indexValueDrop, 1, data2);
          }
        }
      }
    },
    funcLocItemMinDrop(i, item, k) {
      if (this.locations.length == 2) {
        this.dumpArr.push(k)
      } else {
        if (i == 1) {
          var indexValue2 = this.dropItems1.findIndex(function (o) {
            return o.id === item.id;
          });
          for (let i = 0; i < this.dropItems1.length; i++) {
            if (this.dropItems1[i].id == item.id) {
              let data2 = {
                id: this.dropItems1[i].id,
                name: this.dropItems1[i].name,
                name_in_finnish: this.dropItems1[i].name_in_finnish,
                photo: this.dropItems1[i].photo,
                count: this.dropItems1[i].count - 1,
                ItemDimensions: this.dropItems1[i].ItemDimensions,
                CarryingTime: this.dropItems1[i].CarryingTime,
                description: this.dropItems1[i].description,
                itemcheck: false,
              };
              this.dropItems1.splice(indexValue2, 1, data2);
              this.buttonItemsMinDrop(item);
            }
          }
        }
        if (i == 2 && this.locations.length - 1 != 2) {
          var indexValue3 = this.dropItems2.findIndex(function (o) {
            return o.id === item.id;
          });
          
          for (let i = 0; i < this.dropItems2.length; i++) {
            if (this.dropItems2[i].id == item.id) {
              let data2 = {
                id: this.dropItems2[i].id,
                name: this.dropItems2[i].name,
                name_in_finnish: this.dropItems2[i].name_in_finnish,
                photo: this.dropItems2[i].photo,
                count: this.dropItems2[i].count - 1,
                ItemDimensions: this.dropItems2[i].ItemDimensions,
                CarryingTime: this.dropItems2[i].CarryingTime,
                description: this.dropItems2[i].description,
                itemcheck: false,
              };
              this.dropItems2.splice(indexValue3, 1, data2);
              this.buttonItemsMinDrop(item);
            }
          }
        }
        if (i == 3 && this.locations.length - 1 != 3) {
         
          var indexValue4 = this.dropItems3.findIndex(function (o) {
            return o.id === item.id;
          });
          for (let i = 0; i < this.dropItems3.length; i++) {
            if (this.dropItems3[i].id == item.id) {
              let data2 = {
                id: this.dropItems3[i].id,
                name: this.dropItems3[i].name,
                name_in_finnish: this.dropItems3[i].name_in_finnish,
                photo: this.dropItems3[i].photo,
                count: this.dropItems3[i].count - 1,
                ItemDimensions: this.dropItems3[i].ItemDimensions,
                CarryingTime: this.dropItems3[i].CarryingTime,
                description: this.dropItems3[i].description,
                itemcheck: false,
              };
              this.dropItems3.splice(indexValue4, 1, data2);
              this.buttonItemsMinDrop(item);
            }
          }
        }
        if (this.locations.length - 1 == i) {
          var indexValue5 = this.lastDropItems.findIndex(function (o) {
            return o.id === item.id;
          });
          for (let i = 0; i < this.lastDropItems.length; i++) {
            if (this.lastDropItems[i].id == item.id) {
              let data2 = {
                id: this.lastDropItems[i].id,
                name: this.lastDropItems[i].name,
                name_in_finnish: this.lastDropItems[i].name_in_finnish,
                photo: this.lastDropItems[i].photo,
                count: this.lastDropItems[i].count - 1,
                ItemDimensions: this.lastDropItems[i].ItemDimensions,
                CarryingTime: this.lastDropItems[i].CarryingTime,
                description: this.lastDropItems[i].description,
                itemcheck: false,
              };
              this.lastDropItems.splice(indexValue5, 1, data2);
              this.buttonItemsMinDrop(item);
            }
          }
        }
      }
    },
    funcLocItemMin(i, item, k) {
      if (this.locations.length == 2) {
       this.dumpArr.push(k)
      } else {
        if (i == 0) {
         

          for (let i = 0; i < this.pickItems.length; i++) {
            if (this.pickItems[i].id == item.id) {
              let data2 = {
                id: this.pickItems[i].id,
                name: this.pickItems[i].name,
                name_in_finnish: this.pickItems[i].name_in_finnish,
                photo: this.pickItems[i].photo,
                count: this.pickItems[i].count - 1,
                ItemDimensions: this.pickItems[i].ItemDimensions,
                CarryingTime: this.pickItems[i].CarryingTime,
                description: this.pickItems[i].description,
                itemcheck: false,
              };
              this.pickItems.splice(k, 1, data2);
              this.buttonItemsMin(item);
            }
          }
         
        }
        if (i == 1 && this.locations.length - 1 != 1) {
         
          for (let i = 0; i < this.pickDropItems1.length; i++) {
            if (this.pickDropItems1[i].id == item.id) {
              let data2 = {
                id: this.pickDropItems1[i].id,
                name: this.pickDropItems1[i].name,
                name_in_finnish: this.pickDropItems1[i].name_in_finnish,
                photo: this.pickDropItems1[i].photo,
                count: this.pickDropItems1[i].count - 1,
                ItemDimensions: this.pickDropItems1[i].ItemDimensions,
                CarryingTime: this.pickDropItems1[i].CarryingTime,
                description: this.pickDropItems1[i].description,
                itemcheck: false,
              };
              this.pickDropItems1.splice(k, 1, data2);
              this.buttonItemsMin(item);
            }
          }
        }
        if (i == 2 && this.locations.length - 1 != 2) {
         
          for (let i = 0; i < this.pickDropItems2.length; i++) {
            if (this.pickDropItems2[i].id == item.id) {
              let data2 = {
                id: this.pickDropItems2[i].id,
                name: this.pickDropItems2[i].name,
                name_in_finnish: this.pickDropItems2[i].name_in_finnish,
                photo: this.pickDropItems2[i].photo,
                count: this.pickDropItems2[i].count - 1,
                ItemDimensions: this.pickDropItems2[i].ItemDimensions,
                CarryingTime: this.pickDropItems2[i].CarryingTime,
                description: this.pickDropItems2[i].description,
                itemcheck: false,
              };
              this.pickDropItems2.splice(k, 1, data2);
              this.buttonItemsMin(item);
            }
          }
        }
        if (i == 3 && this.locations.length - 1 != 3) {
         
          for (let i = 0; i < this.pickDropItems3.length; i++) {
            if (this.pickDropItems3[i].id == item.id) {
              let data2 = {
                id: this.pickDropItems3[i].id,
                name: this.pickDropItems3[i].name,
                name_in_finnish: this.pickDropItems3[i].name_in_finnish,
                photo: this.pickDropItems3[i].photo,
                count: this.pickDropItems3[i].count - 1,
                ItemDimensions: this.pickDropItems3[i].ItemDimensions,
                CarryingTime: this.pickDropItems3[i].CarryingTime,
                description: this.pickDropItems3[i].description,
                itemcheck: false,
              };
              this.pickDropItems3.splice(k, 1, data2);
              this.buttonItemsMin(item);
            }
          }
        }
        if (this.locations.length - 1 != i) {
         this.dumpArr.push(i)
        }
      }
    },
    // drop
    funcLocItemDrop(i, item, k) {
      if (this.locations.length == 2) {
                this.dumpArr.push(k)

      } else {
        let data = {
          id: item.id,
          name: item.name,
          name_in_finnish: item.name_in_finnish,
          photo: item.photo,
          count: 1,
          ItemDimensions: item.ItemDimensions,
          CarryingTime: item.CarryingTime,
          description: item.description,
          itemcheck: false,
        };

        if (i == 1 && this.locations.length - 1 != i) {
          this.buttonItemsDrop(item);
          var indexValue2 = this.dropItems1.findIndex(function (o) {
            return o.id === item.id;
          });
          if (indexValue2 != -1) {
            var id2 = this.dropItems1.findIndex(function (o) {
              return o.id === item.id;
            });
            for (let i = 0; i < this.dropItems1.length; i++) {
              if (this.dropItems1[i].id == item.id) {
                let data2 = {
                  id: item.id,
                  name: item.name,
                  name_in_finnish: item.name_in_finnish,
                  photo: item.photo,
                  count: this.dropItems1[i].count + 1,
                  ItemDimensions: item.ItemDimensions,
                  CarryingTime: item.CarryingTime,
                  description: item.description,
                  itemcheck: false,
                };
                this.dropItems1.splice(id2, 1, data2);
              }
            }
          } else {
            this.dropItems1.push(data);
          }
        }
        if (i == 2 && this.locations.length - 1 != i) {
          this.buttonItemsDrop(item);
          var indexValue3 = this.dropItems2.findIndex(function (o) {
            return o.id === item.id;
          });

          if (indexValue3 !== -1) {
            var id3 = this.dropItems2.findIndex(function (o) {
              return o.id === item.id;
            });
            for (let i = 0; i < this.dropItems2.length; i++) {
              if (this.dropItems2[i].id == item.id) {
                let data2 = {
                  id: item.id,
                  name: item.name,
                  name_in_finnish: item.name_in_finnish,
                  photo: item.photo,
                  count: this.dropItems2[i].count + 1,
                  ItemDimensions: item.ItemDimensions,
                  CarryingTime: item.CarryingTime,
                  description: item.description,
                  itemcheck: false,
                };
                this.dropItems2.splice(id3, 1, data2);
              }
            }
          } else {
            this.dropItems2.push(data);
          }
        }
        if (i == 3 && this.locations.length - 1 != i) {
          this.buttonItemsDrop(item);
          var indexValue4 = this.dropItems3.findIndex(function (o) {
            return o.id === item.id;
          });
          if (indexValue4 != -1) {
            var id4 = this.dropItems3.findIndex(function (o) {
              return o.id === item.id;
            });
            for (let i = 0; i < this.dropItems3.length; i++) {
              if (this.dropItems3[i].id == item.id) {
                let data2 = {
                  id: item.id,
                  name: item.name,
                  name_in_finnish: item.name_in_finnish,
                  photo: item.photo,
                  count: this.dropItems3[i].count + 1,
                  ItemDimensions: item.ItemDimensions,
                  CarryingTime: item.CarryingTime,
                  description: item.description,
                  itemcheck: false,
                };
                this.dropItems3.splice(id4, 1, data2);
              }
            }
          } else {
            this.dropItems3.push(data);
          }
        }
        if (this.locations.length - 1 == i) {
          this.buttonItemsDrop(item);
          var indexValue5 = this.lastDropItems.findIndex(function (o) {
            return o.id === item.id;
          });
          if (indexValue5 != -1) {
            var id5 = this.lastDropItems.findIndex(function (o) {
              return o.id === item.id;
            });
            for (let i = 0; i < this.lastDropItems.length; i++) {
              if (this.lastDropItems[i].id == item.id) {
                let data2 = {
                  id: item.id,
                  name: item.name,
                  name_in_finnish: item.name_in_finnish,
                  photo: item.photo,
                  count: this.lastDropItems[i].count + 1,
                  ItemDimensions: item.ItemDimensions,
                  CarryingTime: item.CarryingTime,
                  description: item.description,
                  itemcheck: false,
                };
                this.lastDropItems.splice(id5, 1, data2);
              }
            }
          } else {
            this.lastDropItems.push(data);
          }
        }
      }
    },
    funcTowItemPick() {
      this.dropList.length = 0;
      this.dropList = this.summeryValue;
      if (this.dataPickDrop[0].groundLevele == true) {
        for (let i = 0; i < this.summeryValue.length; i++) {
          this.totalPickDropTime +=
            parseFloat(this.summeryValue[i].CarryingTime.yard) *
            this.summeryValue[i].count;
        }
      } else if (this.dataPickDrop[0].yard == true) {
        for (let i = 0; i < this.summeryValue.length; i++) {
          let time = parseFloat(this.summeryValue[i].CarryingTime.yard) / 2;
          let time2 = time * this.summeryValue[i].count;
          this.totalPickDropTime += time2;
        }
      } else if (this.dataPickDrop[0].elevator == true) {
        for (let i = 0; i < this.summeryValue.length; i++) {
          let time =
            parseFloat(this.summeryValue[i].CarryingTime.yard) +
            parseFloat(this.summeryValue[i].CarryingTime.elevator);
          this.totalPickDropTime += time * this.summeryValue[i].count;
        }
      } else {
        for (let i = 0; i < this.summeryValue.length; i++) {
          let time =
            parseFloat(this.summeryValue[i].CarryingTime.stairs) *
            this.dataPickDrop[0].floor;
          let time2 = time + parseFloat(this.summeryValue[i].CarryingTime.yard);
          this.totalPickDropTime += time2 * this.summeryValue[i].count;
        }
      }
      this.funcTowItemDrop();
    },
    funcTowItemDrop() {
      if (this.dataPickDrop[1].groundLevele == true) {
        for (let i = 0; i < this.dropList.length; i++) {
          this.totalPickDropTime +=
            parseFloat(this.dropList[i].CarryingTime.yard) *
            this.dropList[i].count;
        }
      } else if (this.dataPickDrop[1].yard == true) {
        for (let i = 0; i < this.dropList.length; i++) {
          let time = parseFloat(this.dropList[i].CarryingTime.yard) / 2;
          let time2 = time * this.dropList[i].count;
          this.totalPickDropTime += time2;
        }
      } else if (this.dataPickDrop[1].elevator == true) {
        for (let i = 0; i < this.dropList.length; i++) {
          let time =
            parseFloat(this.dropList[i].CarryingTime.yard) +
            parseFloat(this.dropList[i].CarryingTime.elevator);
          this.totalPickDropTime += time * this.dropList[i].count;
        }
      } else {
        for (let i = 0; i < this.dropList.length; i++) {
          let time =
            parseFloat(this.dropList[i].CarryingTime.stairs) *
            this.dataPickDrop[1].floor;
          let time2 = time + parseFloat(this.dropList[i].CarryingTime.yard);
          this.totalPickDropTime += time2 * this.dropList[i].count;
        }
      }
    },
    carryingTimeFunc() {
      //  dataPickDrop: [
      //   { yard: true, elevator: false, floor: 0, apartmentNumber: "" },
      //   { yard: true, elevator: false, floor: 0, apartmentNumber: "" },
      //   { yard: true, elevator: false, floor: 0, apartmentNumber: "" },
      //   { yard: true, elevator: false, floor: 0, apartmentNumber: "" },
      //   { yard: true, elevator: false, floor: 0, apartmentNumber: "" },
      // ],
      if (this.locations.length == 2) {
        this.funcTowItemPick();
      } else {
        if (this.pickItems.length != 0) {
          if (this.dataPickDrop[0].groundLevele == true) {
            for (let i = 0; i < this.pickItems.length; i++) {
              this.totalPickDropTime +=
                parseFloat(this.pickItems[i].CarryingTime.yard) *
                this.pickItems[i].count;
            }
          } else if (this.dataPickDrop[0].yard == true) {
            for (let i = 0; i < this.pickItems.length; i++) {
              let time = parseFloat(this.pickItems[i].CarryingTime.yard) / 2;
              let time2 = time * this.pickItems[i].count;
              this.totalPickDropTime += time2;
            }
          } else if (this.dataPickDrop[0].elevator == true) {
            for (let i = 0; i < this.pickItems.length; i++) {
              let time =
                parseFloat(this.pickItems[i].CarryingTime.yard) +
                parseFloat(this.pickItems[i].CarryingTime.elevator);
              this.totalPickDropTime += time * this.pickItems[i].count;
            }
          } else {
            for (let i = 0; i < this.pickItems.length; i++) {
              let time =
                parseFloat(this.pickItems[i].CarryingTime.stairs) *
                this.dataPickDrop[0].floor;
              let time2 =
                time + parseFloat(this.pickItems[i].CarryingTime.yard);
              this.totalPickDropTime += time2 * this.pickItems[i].count;
            }
          }
        }

        if (this.pickDropItems1.length != 0) {
          if (this.dataPickDrop[1].groundLevele == true) {
            for (let i = 0; i < this.pickDropItems1.length; i++) {
              this.totalPickDropTime +=
                parseFloat(this.pickDropItems1[i].CarryingTime.yard) *
                this.pickDropItems1[i].count;
            }
          } else if (this.dataPickDrop[1].yard == true) {
            for (let i = 0; i < this.pickDropItems1.length; i++) {
              let time =
                parseFloat(this.pickDropItems1[i].CarryingTime.yard) / 2;
              let time2 = time * this.pickDropItems1[i].count;
              this.totalPickDropTime += time2;
            }
          } else if (this.dataPickDrop[1].elevator == true) {
            for (let i = 0; i < this.pickDropItems1.length; i++) {
              let time =
                parseFloat(this.pickDropItems1[i].CarryingTime.yard) +
                parseFloat(this.pickDropItems1[i].CarryingTime.elevator);
              this.totalPickDropTime += time * this.pickDropItems1[i].count;
            }
          } else {
            for (let i = 0; i < this.pickDropItems1.length; i++) {
              let time =
                parseFloat(this.pickDropItems1[i].CarryingTime.stairs) *
                this.dataPickDrop[1].floor;
              let time2 =
                time + parseFloat(this.pickDropItems1[i].CarryingTime.yard);
              this.totalPickDropTime += time2 * this.pickDropItems1[i].count;
            }
          }
        }

        if (this.pickDropItems2.length != 0) {
          if (this.dataPickDrop[2].groundLevele == true) {
            for (let i = 0; i < this.pickDropItems2.length; i++) {
              this.totalPickDropTime +=
                parseFloat(this.pickDropItems2[i].CarryingTime.yard) *
                this.pickDropItems2[i].count;
            }
          } else if (this.dataPickDrop[2].yard == true) {
            for (let i = 0; i < this.pickDropItems2.length; i++) {
              let time =
                parseFloat(this.pickDropItems2[i].CarryingTime.yard) / 2;
              let time2 = time * this.pickDropItems2[i].count;
              this.totalPickDropTime += time2;
            }
          } else if (this.dataPickDrop[2].elevator == true) {
            for (let i = 0; i < this.pickDropItems2.length; i++) {
              let time =
                parseFloat(this.pickDropItems2[i].CarryingTime.yard) +
                parseFloat(this.pickDropItems2[i].CarryingTime.elevator);
              this.totalPickDropTime += time * this.pickDropItems2[i].count;
            }
          } else {
            for (let i = 0; i < this.pickDropItems2.length; i++) {
              let time =
                parseFloat(this.pickDropItems2[i].CarryingTime.stairs) *
                this.dataPickDrop[2].floor;
              let time2 =
                time + parseFloat(this.pickDropItems2[i].CarryingTime.yard);
              this.totalPickDropTime += time2 * this.pickDropItems2[i].count;
            }
          }
        }
        if (this.pickDropItems3.length != 0) {
          if (this.dataPickDrop[3].groundLevele == true) {
            for (let i = 0; i < this.pickDropItems3.length; i++) {
              this.totalPickDropTime +=
                parseFloat(this.pickDropItems3[i].CarryingTime.yard) *
                this.pickDropItems3[i].count;
            }
          } else if (this.dataPickDrop[3].yard == true) {
            for (let i = 0; i < this.pickDropItems3.length; i++) {
              let time =
                parseFloat(this.pickDropItems3[i].CarryingTime.yard) / 2;
              let time2 = time * this.pickDropItems3[i].count;
              this.totalPickDropTime += time2;
            }
          } else if (this.dataPickDrop[3].elevator == true) {
            for (let i = 0; i < this.pickDropItems3.length; i++) {
              let time =
                parseFloat(this.pickDropItems3[i].CarryingTime.yard) +
                parseFloat(this.pickDropItems3[i].CarryingTime.elevator);
              this.totalPickDropTime += time * this.pickDropItems3[i].count;
            }
          } else {
            for (let i = 0; i < this.pickDropItems3.length; i++) {
              let time =
                parseFloat(this.pickDropItems3[i].CarryingTime.stairs) *
                this.dataPickDrop[3].floor;
              let time2 =
                time + parseFloat(this.pickDropItems3[i].CarryingTime.yard);
              this.totalPickDropTime += time2 * this.pickDropItems3[i].count;
            }
          }
        }
        if (this.dropItems1.length != 0) {
          if (this.dataPickDrop[1].groundLevele == true) {
            for (let i = 0; i < this.dropItems1.length; i++) {
              this.totalPickDropTime +=
                parseFloat(this.dropItems1[i].CarryingTime.yard) *
                this.dropItems1[i].count;
            }
          } else if (this.dropItems1[1].yard == true) {
            for (let i = 0; i < this.dropItems1.length; i++) {
              let time = parseFloat(this.dropItems1[i].CarryingTime.yard) / 2;
              let time2 = time * this.dropItems1[i].count;
              this.totalPickDropTime += time2;
            }
          } else if (this.dataPickDrop[1].elevator == true) {
            for (let i = 0; i < this.dropItems1.length; i++) {
              let time =
                parseFloat(this.dropItems1[i].CarryingTime.yard) +
                parseFloat(this.dropItems1[i].CarryingTime.elevator);
              this.totalPickDropTime += time * this.dropItems1[i].count;
            }
          } else {
            for (let i = 0; i < this.dropItems1.length; i++) {
              let time =
                parseFloat(this.dropItems1[i].CarryingTime.stairs) *
                this.dataPickDrop[1].floor;
              let time2 =
                time + parseFloat(this.dropItems1[i].CarryingTime.yard);
              this.totalPickDropTime += time2 * this.dropItems1[i].count;
            }
          }
        }
        if (this.dropItems2.length != 0) {
          if (this.dataPickDrop[2].groundLevele == true) {
            for (let i = 0; i < this.dropItems2.length; i++) {
              this.totalPickDropTime +=
                parseFloat(this.dropItems2[i].CarryingTime.yard) *
                this.dropItems2[i].count;
            }
          } else if (this.dataPickDrop[2].yard == true) {
            for (let i = 0; i < this.dropItems2.length; i++) {
              let time = parseFloat(this.dropItems2[i].CarryingTime.yard) / 2;
              let time2 = time * this.dropItems2[i].count;
              this.totalPickDropTime += time2;
            }
          } else if (this.dataPickDrop[2].elevator == true) {
            for (let i = 0; i < this.dropItems2.length; i++) {
              let time =
                parseFloat(this.dropItems2[i].CarryingTime.yard) +
                parseFloat(this.dropItems2[i].CarryingTime.elevator);
              this.totalPickDropTime += time * this.dropItems2[i].count;
            }
          } else {
            for (let i = 0; i < this.dropItems2.length; i++) {
              let time =
                parseFloat(this.dropItems2[i].CarryingTime.stairs) *
                this.dataPickDrop[2].floor;
              let time2 =
                time + parseFloat(this.dropItems2[i].CarryingTime.yard);
              this.totalPickDropTime += time2 * this.dropItems2[i].count;
            }
          }
        }
        if (this.dropItems3.length != 0) {
          if (this.dataPickDrop[3].groundLevele == true) {
            for (let i = 0; i < this.dropItems3.length; i++) {
              this.totalPickDropTime +=
                parseFloat(this.dropItems3[i].CarryingTime.yard) *
                this.dropItems3[i].count;
            }
          } else if (this.dataPickDrop[3].yard == true) {
            for (let i = 0; i < this.dropItems3.length; i++) {
              let time = parseFloat(this.dropItems3[i].CarryingTime.yard) / 2;
              let time2 = time * this.dropItems3[i].count;
              this.totalPickDropTime += time2;
            }
          } else if (this.dataPickDrop[3].elevator == true) {
            for (let i = 0; i < this.dropItems3.length; i++) {
              let time =
                parseFloat(this.dropItems3[i].CarryingTime.yard) +
                parseFloat(this.dropItems3[i].CarryingTime.elevator);
              this.totalPickDropTime += time * this.dropItems3[i].count;
            }
          } else {
            for (let i = 0; i < this.dropItems3.length; i++) {
              let time =
                parseFloat(this.dropItems3[i].CarryingTime.stairs) *
                this.dataPickDrop[3].floor;
              let time2 =
                time + parseFloat(this.dropItems3[i].CarryingTime.yard);
              this.totalPickDropTime += time2 * this.dropItems3[i].count;
            }
          }
        }
        if (this.lastDropItems.length != 0) {
          let lastIndex = this.locations.length - 1;

          if (this.dataPickDrop[lastIndex].groundLevele == true) {
            for (let i = 0; i < this.lastDropItems.length; i++) {
              this.totalPickDropTime +=
                parseFloat(this.lastDropItems[i].CarryingTime.yard) *
                this.lastDropItems[i].count;
            }
          } else if (this.dataPickDrop[lastIndex].yard == true) {
            for (let i = 0; i < this.lastDropItems.length; i++) {
              let time =
                parseFloat(this.lastDropItems[i].CarryingTime.yard) / 2;
              let time2 = time * this.lastDropItems[i].count;
              this.totalPickDropTime += time2;
            }
          } else if (this.dataPickDrop[lastIndex].elevator == true) {
            for (let i = 0; i < this.lastDropItems.length; i++) {
              let time =
                parseFloat(this.lastDropItems[i].CarryingTime.yard) +
                parseFloat(this.lastDropItems[i].CarryingTime.elevator);
              this.totalPickDropTime += time * this.lastDropItems[i].count;
            }
          } else {
            for (let i = 0; i < this.lastDropItems.length; i++) {
              let time =
                parseFloat(this.lastDropItems[i].CarryingTime.stairs) *
                this.dataPickDrop[lastIndex].floor;
              let time2 =
                time + parseFloat(this.lastDropItems[i].CarryingTime.yard);
              this.totalPickDropTime += time2 * this.lastDropItems[i].count;
            }
          }
        }
      }
    },
    postForPrice() {
      var time1 = this.durationTime / 3600;
      var time2 = this.totalPickDropTime / 60;
      var time3 = time2 + time1;
      var data = {
        height: this.heightValue,
        width: this.widthValue,
        depth: this.depthValue,
        hourly_rate: this.hourlyRate,
        order_duration: time3,
        pallet_goods: this.palletGoods,
        volume: this.totalVolum,
      };
      const postData = JSON.stringify(data);
      axios.post("http://localhost:4000/v1/price", postData).then(
        (response) => {
          this.pirceCarId = response.data.response;
          this.priceNormal = response.data.response.total_price;
          this.vatPrice = response.data.response.total_price * 0.24;
          this.totalPrice = this.priceNormal + this.vatPrice;
        },
        (error) => {
          this.dumpArr.push(error)     
             }
      );
    },

    dropListFunc(e) {
      var indexValueNe = this.dropList.findIndex(function (o) {
        return o.id === e.id;
      });
      if (indexValueNe == -1) {
        let data = {
          id: e.id,
          name: e.name,
          name_in_finnish: e.name_in_finnish,
          photo: e.photo,
          count: 1,
          ItemDimensions: e.ItemDimensions,
          CarryingTime: e.CarryingTime,
          description: e.description,
          itemcheck: false,
        };
        this.dropList.push(data);
      }
      if (indexValueNe != -1) {
        for (let i = 0; i < this.dropList.length; i++) {
          if (this.dropList[i].id == e.id) {
            let data = {
              id: this.dropList[i].id,
              name: this.dropList[i].name,
              name_in_finnish: this.dropList[i].name_in_finnish,
              photo: this.dropList[i].photo,
              count: this.dropList[i].count + 1,
              ItemDimensions: this.dropList[i].ItemDimensions,
              CarryingTime: this.dropList[i].CarryingTime,
              description: this.dropList[i].description,
              itemcheck: false,
            };
            this.dropList.splice(indexValueNe, 1, data);
          }
        }
      }
    },
    //pickFunc
    funcLocItem(i, item, k) {
      if (this.locations.length == 2) {
        this.dumpArr.push(i)
      } else {
        let data = {
          id: item.id,
          name: item.name,
          name_in_finnish: item.name_in_finnish,
          photo: item.photo,
          count: 1,
          ItemDimensions: item.ItemDimensions,
          CarryingTime: item.CarryingTime,
          description: item.description,
          itemcheck: false,
        };

        if (i == 0) {
          this.buttonItems(item, k);
          var indexValue = this.pickItems.findIndex(function (o) {
            return o.id === item.id;
          });

          this.dropListFunc(item);
          if (indexValue === -1) {
            this.pickItems.push(data);
          } else {
            var id = this.pickItems.findIndex(function (o) {
              return o.id === item.id;
            });

            for (let i = 0; i < this.pickItems.length; i++) {
              if (this.pickItems[i].id == item.id) {
                let data2 = {
                  id: item.id,
                  name: item.name,
                  name_in_finnish: item.name_in_finnish,
                  photo: item.photo,
                  count: this.pickItems[i].count + 1,
                  ItemDimensions: item.ItemDimensions,
                  CarryingTime: item.CarryingTime,
                  description: item.description,
                  itemcheck: false,
                };
                this.pickItems.splice(id, 1, data2);
              }
            }
          }
        }

        if (i == 1) {
          this.buttonItems(item, k);

          this.dropListFunc(item);
          var indexValue2 = this.pickDropItems1.findIndex(function (o) {
            return o.id === item.id;
          });

          if (indexValue2 === -1) {
            this.pickDropItems1.push(data);
          } else {
            var id2 = this.pickDropItems1.findIndex(function (o) {
              return o.id === item.id;
            });

            for (let i = 0; i < this.pickDropItems1.length; i++) {
              if (this.pickDropItems1[i].id == item.id) {
                let data2 = {
                  id: item.id,
                  name: item.name,
                  name_in_finnish: item.name_in_finnish,
                  photo: item.photo,
                  count: this.pickDropItems1[i].count + 1,
                  ItemDimensions: item.ItemDimensions,
                  CarryingTime: item.CarryingTime,
                  description: item.description,
                  itemcheck: false,
                };
                this.pickDropItems1.splice(id2, 1, data2);
              }
            }
          }
        }
        if (i == 2) {
          this.buttonItems(item, k);
          this.dropListFunc(item);
          var indexValue3 = this.pickDropItems2.findIndex(function (o) {
            return o.id === item.id;
          });
          if (indexValue3 === -1) {
            this.pickDropItems2.push(data);
          } else {
            var id3 = this.pickDropItems2.findIndex(function (o) {
              return o.id === item.id;
            });

            for (let i = 0; i < this.pickDropItems2.length; i++) {
              if (this.pickDropItems2[i].id == item.id) {
                let data2 = {
                  id: item.id,
                  name: item.name,
                  name_in_finnish: item.name_in_finnish,
                  photo: item.photo,
                  count: this.pickDropItems2[i].count + 1,
                  ItemDimensions: item.ItemDimensions,
                  CarryingTime: item.CarryingTime,
                  description: item.description,
                  itemcheck: false,
                };
                this.pickDropItems2.splice(id3, 1, data2);
              }
            }
          }
        }
        if (i == 3) {
          this.buttonItems(item, k);
          this.dropListFunc(item);
          var indexValue4 = this.pickDropItems3.findIndex(function (o) {
            return o.id === item.id;
          });

          if (indexValue4 === -1) {
            this.pickDropItems3.push(data);
          } else {
            var id4 = this.pickDropItems3.findIndex(function (o) {
              return o.id === item.id;
            });

            for (let i = 0; i < this.pickDropItems3.length; i++) {
              if (this.pickDropItems3[i].id == item.id) {
                let data2 = {
                  id: item.id,
                  name: item.name,
                  name_in_finnish: item.name_in_finnish,
                  photo: item.photo,
                  count: this.pickDropItems3[i].count + 1,
                  ItemDimensions: item.ItemDimensions,
                  CarryingTime: item.CarryingTime,
                  description: item.description,
                  itemcheck: false,
                };
                this.pickDropItems3.splice(id4, 1, data2);
              }
            }
          }
        }
        if (i == 4) {
        this.dumpArr.push(i)        }
      }
    },
    buttonCheck(e, j) {
      var indexValue = this.items.findIndex(function (o) {
        return o.id === e.id;
      });
      this.dumpArr.push(j)
      let data = {
        id: e.id,
        name: e.name,
        name_in_finnish: e.name_in_finnish,
        photo: e.photo,
        count: 1,
        ItemDimensions: e.ItemDimensions,
        CarryingTime: e.CarryingTime,
        description: e.description,
      };
      this.heightValue.push(e.ItemDimensions.height);
      this.widthValue.push(e.ItemDimensions.width);
      this.depthValue.push(e.ItemDimensions.depth);
      this.summeryValue.push(data);

      if (data.id == 4) {
        this.palletGoods = true;
      }
      this.items.splice(indexValue, 1, data);
      this.calculationItem();
      this.checkValue = e.id;
    },
  },
};
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .btn-check-red {
    margin-top: 12% !important;
  }
  input {
    text-indent: 10px;
  }
  .btn-item {
    margin-top: 12% !important;
    height: 30px;
    width: 25px;
    font-size: 12px !important;
  }
  .btn-item2 {
    margin-top: 12% !important;
    height: 30px;
    margin-left: 1px;
    margin-right: 1px;
    width: 40px;
    font-size: 12px !important;
  }
  .manu-card {
    width: 100%;
    height: 115px;
    cursor: pointer;
  }
  .manu-img {
    padding: 4px;
    margin-top: 30%;
    width: 55px;
  }
  .manu h4 {
    font-weight: 600;
    color: #ffffff;
    font-style: normal;
    font-size: 14px;
    font-family: acumin-pro, sans-serif;
    background: #dd0303;
    padding: 10px;
    border-radius: 8px;
  }
  .elevator h4 {
    font-weight: 600;
    color: #ffffff;
    font-style: normal;
    font-size: 14px;
    font-family: acumin-pro, sans-serif;
    background: #dd0303;
    padding: 10px;
    border-radius: 8px;
  }

  .manu-text h5 {
    font-weight: 600;
    color: #000000;
    letter-spacing: 1px;
    font-style: normal;
    font-size: 13px;
    font-family: acumin-pro, sans-serif;
  }

  .item-card {
    width: 100%;
    height: 110px;
    cursor: pointer;
  }
  .item-img {
    max-width: 40px;
    max-height: 50px;
    padding: 4px;
    display: block;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 8%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
  .item h4 {
    font-weight: 400;
    color: #ffffff;
    font-style: normal;
    font-size: 16px;
    font-family: acumin-pro, sans-serif;
    background: #dd0303;
    padding: 8px;
    border-radius: 5px;
  }
  .item-text h5 {
    font-weight: 600;
    color: #000000;
    letter-spacing: 1px;
    font-style: normal;
    font-size: 14px;
    font-family: acumin-pro, sans-serif;
  }
  .manu-text p {
    color: #000000;
    letter-spacing: 1px;
    font-style: normal;
    font-size: 10px;
    font-family: acumin-pro, sans-serif;
  }
  .manu-btn {
    font-family: acumin-pro, sans-serif;
    background: green !important;
    margin-top: 25%;
    border-radius: 8px !important;
    color: #ffffff !important;
    font-size: 10px;
  }
  .v-list .v-list-item--active {
    background-color: green !important;
  }
  .v-list .v-list-item--active .v-list-item__title {
    color: #ffd54f !important;
  }
  .img-item-div {
    display: flex;
    justify-content: center;
    min-height: 10em;
    display: table-cell;
    vertical-align: middle;
  }
  h5 {
    margin-top: 15px;
    font-weight: 500;
    font-size: 13px;
  }
  .b-btn {
    margin-right: 0px !important;
  }
  input {
    outline: none !important;
    border-color: #fdfdfd;
    box-shadow: 0 0 10px #fcfcfc;
    background: #ffffff;
    border-radius: 5px;
  }
  input:focus {
    outline: none !important;
    border-color: #e9ebec;
    box-shadow: 0 0 10px #e6e6e7;
    background: #ffffff;
    border-radius: 5px;
  }
  .item-summery h5 {
    margin-top: 5px;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    color: #000000;
  }
  .item-search-text h5 {
    margin-top: 5px;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    color: #000000;
  }
  .overlay {
    min-height: 100%;
    background: linear-gradient(
      0deg,
      rgba(15, 15, 15, 0.8),
      rgba(7, 7, 7, 0.8)
    );
    background-size: cover;
  }
  .main-section h3 {
    position: absolute;
    top: 53%;
    bottom: 0;
    left: 15%;
    right: 15%;
    margin: auto;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    color: #ffffff;
    font-size: 14px;
    opacity: 0.8;
  }
  .btn-main {
    width: 60%;
    height: 35px;
    position: absolute;
    font-weight: 600;
    letter-spacing: 1px;
    top: 30%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #ffffff;
  }
  .vartical-text {
    margin-top: -2% !important;
  }
  .back-img {
    height: 125vh;
    background-position: center;
    margin-top: -25%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .helper-btn {
    margin-top: 25%;
  }
  .main-img {
    position: absolute;
    top: -15%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 200px;
  }
  .item-text p {
    color: #000000;
    font-style: normal;
    font-size: 10px;
    font-family: acumin-pro, sans-serif;
  }
  .loc-img1 {
    margin-top: -120% !important;
    margin-left: 80%;
  }
  .loc-img2 {
    margin-top: -98%;
    margin-left: 80%;
  }
  .loc-card p {
    margin-top: -35%;
    margin-left: 80%;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    background: #6b6868;
    color: #ffffff !important;
    border-radius: 3px;
    font-size: 12px;
  }
  .loc-p {
    text-align: start;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    border-radius: 3px;
    font-size: 13px;
    margin-left: 2%;
  }
  .price-l h4 {
    text-align: start;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    font-size: 14px !important;
    font-weight: 500;
  }
  .price-r h4 {
    text-align: end;
    font-size: 14px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
  }
  .img-euro {
    width: 17px;
  }
  .btn-work {
    background: #e0dede;
    padding: 8px !important;
    margin-left: 5%;
    text-align: center;
    font-size: 16px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
  }
  .price-section h3 {
    font-weight: 600;
    font-size: 16px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    text-align: center;
    margin-top: 15px !important;
  }
  .price-section p {
    font-size: 14px !important;
    margin-top: 10px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
  }
  .price-section h2 {
    font-size: 22px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    text-align: center;
    margin-bottom: 15px;
  }
  .price-section img {
    width: 23px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .log-tag h4 {
    font-size: 14px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    text-align: center;
    margin-bottom: 20px;
  }
  .img-price {
    margin-left: -3px !important;
    margin-bottom: 5px !important;
  }
  .xyz {
    display: flex !important;
    justify-content: center;
  }
  #textarea-small {
    width: 98%;
    margin-left: 1%;
    margin-bottom: 10px;
    background: #fdfbfb;
    border-radius: 8px;
  }
}
@media (min-width: 601px) and (max-width: 1200px) {
  .btn-check-red {
    margin-top: 7% !important;
  }
  .btn-item {
    margin-top: 7% !important;
    height: 30px;
    width: 25px;
    font-size: 12px !important;
  }
  .btn-item2 {
    margin-top: 7% !important;
    height: 30px;
    margin-left: 1px;
    margin-right: 1;
    width: 40px;
    font-size: 12px !important;
  }
  .manu-card {
    width: 100%;
    height: 115px;
    cursor: pointer;
  }
  .manu-img {
    padding: 8px;
    width: 70px;
  }
  .manu h4 {
    font-weight: 600;
    color: #ffffff;
    font-style: normal;
    font-size: 14px;
    font-family: acumin-pro, sans-serif;
    background: #dd0303;
    padding: 10px;
    border-radius: 8px;
  }
  .manu-text h5 {
    font-weight: 600;
    color: #000000;
    letter-spacing: 1px;
    font-style: normal;
    font-size: 15px;
    font-family: acumin-pro, sans-serif;
  }

  .item-card {
    width: 100%;
    height: 100px;
    cursor: pointer;
  }
  .item-img {
    padding: 8px;
    width: 70px;
    max-height: 80px;
  }
  .item h4 {
    font-weight: 400;
    color: #ffffff;
    font-style: normal;
    font-size: 15px;
    font-family: acumin-pro, sans-serif;
    background: #dd0303;

    border-radius: 8px;
  }
  .elevator h4 {
    font-weight: 400;
    color: #ffffff;
    font-style: normal;
    font-size: 15px;
    font-family: acumin-pro, sans-serif;
    background: #dd0303;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
  }
  .item-text h5 {
    font-weight: 600;
    color: #000000;

    letter-spacing: 1px;
    font-style: normal;
    font-size: 15px;
    font-family: acumin-pro, sans-serif;
  }
  .manu-text p {
    color: #000000;
    letter-spacing: 1px;
    font-style: normal;
    font-size: 12px;
    font-family: acumin-pro, sans-serif;
  }
  .manu-btn {
    font-family: acumin-pro, sans-serif;
    background: green !important;
    margin-top: 15%;
    border-radius: 8px !important;
    color: #ffffff !important;
  }
  .v-list .v-list-item--active {
    background-color: green !important;
  }
  .v-list .v-list-item--active .v-list-item__title {
    color: #ffd54f !important;
  }

  h5 {
    margin-top: 15px;
    font-weight: 500;
    font-size: 16px;
  }
  .b-btn {
    margin-right: 20px !important;
  }
  input {
    outline: none !important;
    border-color: #ffffff;
    box-shadow: 0 0 10px #ffffff;
    background: #ffffff;
    border-radius: 5px;
  }
  input:focus {
    outline: none !important;
    border-color: #fafafa;
    box-shadow: 0 0 10px #f5f6f7;
    background: #ffffff;
    border-radius: 5px;
  }
  .item-summery h5 {
    margin-top: 5px;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    color: #000000;
  }
  .item-search-text h5 {
    margin-top: 5px;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    color: #000000;
  }
  .overlay {
    min-height: 100%;
    background: linear-gradient(
      0deg,
      rgba(15, 15, 15, 0.8),
      rgba(7, 7, 7, 0.8)
    );
    background-size: cover;
  }
  .main-section h3 {
    position: absolute;
    top: 58%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    color: #ffffff;
    font-size: 14px;
    opacity: 0.8;
  }
  .btn-main {
    width: 55%;
    height: 40px;
    position: absolute;
    font-weight: 600;
    letter-spacing: 1px;
    top: 35%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #ffffff;
  }
  .back-img {
    height: 115vh;
    background-position: center;
    margin-top: -15%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .helper-btn {
    margin-top: 15%;
  }
  .main-img {
    position: absolute;
    top: -15%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 250px;
  }
  .item-text p {
    color: #000000;
    letter-spacing: 1px;

    font-style: normal;
    font-size: 10px;
    font-family: acumin-pro, sans-serif;
  }
  .vartical-text {
    margin-top: -3% !important;
  }
  .loc-img1 {
    margin-top: -100% !important;
    margin-left: 80%;
  }
  .loc-img2 {
    margin-top: -98%;
    margin-left: 80%;
  }
  .loc-card p {
    margin-top: -35%;
    margin-left: 80%;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    background: #6b6868;
    color: #ffffff !important;
    border-radius: 3px;
    font-size: 12px;
  }
  .loc-p {
    text-align: start;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    border-radius: 3px;
    font-size: 13px;
    margin-left: 5%;
  }
  .loc-p {
    text-align: start;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    border-radius: 3px;
    font-size: 13px;
    margin-left: 5%;
  }
  .price-l h4 {
    text-align: start;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    font-size: 15px !important;
    font-weight: 500;
  }
  .price-r h4 {
    text-align: end;
    font-size: 15px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
  }
  .img-euro {
    width: 18px;
  }
  .btn-work {
    background: #e0dede;
    padding: 8px !important;
    margin-left: 5%;
    text-align: center;
    font-size: 16px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
  }
  .price-section h3 {
    font-weight: 600;
    font-size: 17px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    text-align: center;
    margin-top: 15px !important;
  }
  .price-section p {
    font-size: 15px !important;
    margin-top: 15px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
  }
  .price-section h2 {
    font-size: 24px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    text-align: center;
    margin-bottom: 20px;
  }
  .price-section img {
    width: 25px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .log-tag h4 {
    font-size: 16px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    text-align: center;
    margin-bottom: 20px;
  }
  .img-price {
    margin-left: -3px !important;
    margin-bottom: 5px !important;
  }
  .xyz {
    display: flex !important;
    justify-content: center;
  }
  input {
    text-indent: 10px;
  }
  #textarea-small {
    width: 98%;
    margin-left: 1%;
    margin-bottom: 10px;
    background: #fdfbfb;
    border-radius: 8px;
  }
}
@media only screen and (min-width: 1201px) {
  .btn-check-red {
    margin-top: 7% !important;
  }
  .btn-item {
    margin-top: 7% !important;
    height: 30px;
    width: 25px;
    font-size: 12px !important;
  }
  .btn-item2 {
    margin-top: 7% !important;
    height: 30px;
    margin-left: 2px;
    margin-right: 2px;
    width: 40px;
    font-size: 12px !important;
  }
  .manu-card {
    width: 100%;
    height: 110px;
    cursor: pointer;
  }
  .manu-img {
    padding: 4px;
    width: 80px;
  }
  .manu h4 {
    font-weight: 400;
    color: #ffffff;
    font-style: normal;
    font-size: 18px;
    font-family: acumin-pro, sans-serif;
    background: #dd0303;
    padding: 10px;
    border-radius: 5px;
  }
  .manu-text p {
    color: #000000;
    letter-spacing: 1px;
    font-style: normal;
    font-size: 14px !important;
    font-family: acumin-pro, sans-serif;
  }
  .manu-text h5 {
    font-weight: 600;
    color: #000000;
    letter-spacing: 1px;
    font-style: normal;
    font-size: 18px;
    font-family: acumin-pro, sans-serif;
  }

  .item-card {
    width: 100%;
    height: 110px;
    cursor: pointer;
  }
  .item-img {
    padding: 8px;
    margin: auto;
    display: block;
    max-width: 90px;
    max-height: 90px !important;
  }
  .item h4 {
    font-weight: 400;
    color: #ffffff;
    font-style: normal;
    font-size: 18px;
    font-family: acumin-pro, sans-serif;
    background: #dd0303;
    padding: 10px;
    border-radius: 8px;
  }
  .item-text h5 {
    font-weight: 600;
    color: #000000;
    letter-spacing: 1px;
    vertical-align: middle !important;

    font-style: normal;
    font-size: 18px;
    font-family: acumin-pro, sans-serif;
  }
  .item-text p {
    color: #000000;
    letter-spacing: 1px;
    font-style: normal;
    font-size: 14px;
    font-family: acumin-pro, sans-serif;
    vertical-align: middle !important;
  }
  .manu-text p {
    color: #000000;
    letter-spacing: 1px;
    font-style: normal;
    font-size: 16px;
    font-family: acumin-pro, sans-serif;
  }
  .manu-btn {
    font-family: acumin-pro, sans-serif;
    background: #00d036 !important;
    margin-top: 15%;
    border-radius: 8px !important;
    font-style: 600;
    color: #ffffff !important;
  }
  .v-list .v-list-item--active {
    background-color: green !important;
  }
  .v-list .v-list-item--active .v-list-item__title {
    color: #ffd54f !important;
  }
  h4 {
    font-weight: 500;
    margin-top: 5px;
    font-size: 16px;
    font-family: acumin-pro, sans-serif;
    color: #000000;
  }
  h5 {
    margin-top: 5px;
    font-weight: 500;
    font-size: 16px;

    font-family: acumin-pro, sans-serif;
    color: #000000;
  }
  .b-btn {
    margin-right: 15% !important;
  }
  input {
    outline: none !important;
    border-color: #ffffff;
    background: #ffffff;
    border-radius: 5px;
  }
  input:focus {
    outline: none !important;
    border-color: #fcfcfc;
    background: #ffffff;
    border-radius: 5px;
  }
  .item-summery h5 {
    margin-top: 5px;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    color: #000000;
  }
  .item-search-text h5 {
    margin-top: 5px;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    color: #000000;
  }
  .text-appartment p {
    font-size: 14px;
    font-family: acumin-pro, sans-serif;
    color: #000000;
    margin-left: 8px;
    opacity: 0.8;
  }
  .overlay {
    min-height: 100%;
    background: linear-gradient(
      0deg,
      rgba(15, 15, 15, 0.8),
      rgba(7, 7, 7, 0.8)
    );
    background-size: cover;
  }
  .main-section h3 {
    position: absolute;
    top: 58%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    color: #ffffff;
    font-size: 16px;
    opacity: 0.8;
  }
  .btn-main {
    width: 40%;
    height: 40px;
    position: absolute;
    font-weight: 600;
    letter-spacing: 1px;
    top: 35%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #ffffff;
  }
  .back-img {
    height: 115vh;
    background-position: center;
    margin-top: -10%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .helper-btn {
    margin-top: 15%;
  }
  .main-img {
    position: absolute;
    top: -15%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 250px;
  }
  .elevator h4 {
    font-weight: 400;
    color: #ffffff;
    font-style: normal;
    font-size: 18px;
    font-family: acumin-pro, sans-serif;
    background: #dd0303;
    padding: 10px;
    text-align: center;
    border-radius: 8px;
  }
  .img-item-div {
    display: flex;
    justify-content: center;
  }
  .vartical-text {
    margin-top: -3% !important;
  }
  .loc-img1 {
    margin-top: -100% !important;
    margin-left: 80%;
  }
  .loc-img2 {
    margin-top: -98%;
    margin-left: 80%;
  }
  .loc-card p {
    margin-top: -35%;
    margin-left: 80%;
    text-align: center;
    font-family: acumin-pro, sans-serif;
    background: #6b6868;
    color: #ffffff !important;
    border-radius: 3px;
    font-size: 12px;
  }
  .loc-p {
    text-align: start;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    border-radius: 3px;
    font-size: 13px;
    margin-left: 5%;
  }
  .price-l h4 {
    text-align: start;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    font-size: 16px !important;
    font-weight: 500;
  }
  .price-r h4 {
    text-align: end;
    font-size: 16px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
  }
  .img-euro {
    width: 20px;
  }
  .btn-work {
    background: #e0dede;
    padding: 8px !important;
    margin-left: 5%;
    text-align: center;
    font-size: 16px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
  }
  .price-section h3 {
    font-weight: 600;
    font-size: 18px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    text-align: center;
    margin-top: 15px !important;
  }
  .price-section p {
    font-size: 16px !important;
    margin-top: 15px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
  }
  .price-section h2 {
    font-size: 26px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    text-align: center;
    margin-bottom: 20px;
  }
  .price-section img {
    width: 25px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .log-tag h4 {
    font-size: 20px !important;
    font-family: acumin-pro, sans-serif;
    color: #000000 !important;
    text-align: center;
    margin-bottom: 20px;
  }
  /* .price-main {

  } */
  .img-price {
    margin-left: -3px !important;
    margin-bottom: 5px !important;
  }
  .xyz {
    display: flex !important;
    justify-content: center;
  }
  #textarea-small {
    width: 98%;
    margin-left: 1%;
    margin-bottom: 10px;
    background: #fdfbfb;
    border-radius: 8px;
  }
  input {
    text-indent: 10px;
  }
}
</style>

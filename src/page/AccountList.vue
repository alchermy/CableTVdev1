<template>
  <body>
    <div class="page-body">
      <div class="header-bg-fade">
        <div class="d-flex-between pt-2">
          <img class="logo-header" src="../assets/img/logo.png" alt="logo" />
        </div>
        <div class="card-header mt-8">
          <a @click="AddRegisterCode()" class="d-flex-between p-5">
            <div class="d-flex-column line-height-30">
              <span class="title-content font-size-h2">Register Code</span>
              <span class="detail-content font-size-lg">เพิ่มรหัสลงทะเบียน</span>
            </div>
            <div class="btn-icon-gradient my-auto">
              <span class="svg-icon">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_19_355)">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M22.75 9.75H16.25V3.25C16.25 1.45438 14.7948 0 13 0C11.2052 0 9.75 1.45438 9.75 3.25V9.75H3.25C1.45519 9.75 0 11.2044 0 13C0 14.7956 1.45519 16.25 3.25 16.25H9.75V22.75C9.75 24.5456 11.2052 26 13 26C14.7948 26 16.25 24.5456 16.25 22.75V16.25H22.75C24.5448 16.25 26 14.7956 26 13C26 11.2044 24.5448 9.75 22.75 9.75Z"
                      fill="#F6F6F6" />
                  </g>
                  <defs>
                    <clipPath id="clip0_19_355">
                      <rect width="26" height="26" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
      <div class="pt-12 px-5">
        <span class="title-content font-size-h2 text-dark-75 font-700">รายการข้อมูล</span>
        <div>
          <div v-for="(code, index) in registerCodes" :key="index" class="card-check">
            <input class="card__input" type="checkbox" @change="updateCheckedStatus(code, $event.target.checked)"
              :checked="code.isChecked" :disabled="code.ExpireDate !== null && code.ExpireDate !== undefined || code.Amount == null && code.Amount == undefined"   />
            <!-- <input
              class="card__input"
              type="checkbox"
              :checked="code.isChecked"
              disabled
            /> -->
            <div class="card-bg img-card-bg">
              <span class="label__text">
                <span class="label__check">
                  <i class="fa fa-check icon"></i>
                </span>
              </span>
              <span class="content-card">
                <span class="title-card mr-10">{{ code.Address1 }}</span>
                <span class="d-flex mt-2">
                  <i class="fa-solid fa-map-pin"></i>
                  <span class="detail-card mr-5">{{ code.Address1 }}</span>
                </span>
                <span class="d-flex">
                  <span class="svg-icon svg-icon-lg mt-1">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_18_84)">
                        <path
                          d="M10.9119 9.13693H9.38244C9.36912 9.13693 9.35608 9.14056 9.34301 9.14165C9.2911 8.88751 9.08363 8.69934 8.83598 8.69934H6.10192C5.81527 8.69934 5.56933 8.94391 5.56933 9.25757V10.0996H2.46149C1.76571 10.0996 1.19969 9.48813 1.19969 8.72682C1.19969 7.96552 1.76571 7.35001 2.46117 7.35001L7.66856 7.35491C9.02585 7.35491 10.1301 6.14293 10.1301 4.65777C10.1301 3.17261 9.02585 1.96059 7.66856 1.96059H5.88925V1.08695C5.88925 0.773294 5.66999 0.516563 5.38334 0.516563H2.64924C2.40158 0.516563 2.19412 0.704725 2.14221 0.958874C2.12917 0.95778 2.1161 0.954148 2.10282 0.954148H0.573293C0.286647 0.954148 0.050747 1.21591 0.050747 1.52957V3.67277C0.050747 3.98643 0.286647 4.23603 0.573293 4.23603H2.10278C2.1161 4.23603 2.12913 4.2324 2.14217 4.23135C2.19408 4.4855 2.40154 4.67361 2.6492 4.67361H5.3833C5.66995 4.67361 5.88921 4.42905 5.88921 4.11539V3.2733H7.66852C8.36426 3.2733 8.93035 3.89738 8.93035 4.65874C8.93035 5.42004 8.3643 6.04176 7.66884 6.04176L2.46145 6.04001C1.1042 6.04006 0 7.24105 0 8.72621C0 10.2114 1.1042 11.4124 2.46149 11.4124H5.56933V12.286C5.56933 12.5997 5.81527 12.8564 6.10192 12.8564H8.83598C9.08363 12.8564 9.2911 12.6682 9.34301 12.4141C9.35608 12.4152 9.36912 12.4188 9.38244 12.4188H10.9119C11.1985 12.4188 11.4078 12.157 11.4078 11.8434V9.70023C11.4078 9.38653 11.1985 9.13693 10.9119 9.13693ZM1.73032 3.57961H0.770563V2.92323H1.73032V3.57961ZM1.73032 2.26686H0.770563V1.61048H1.73032V2.26686ZM10.688 11.7624H9.72827V11.1061H10.688V11.7624ZM10.688 10.4497H9.72827V9.7933H10.688V10.4497Z"
                          fill="#393939" />
                      </g>
                      <defs>
                        <clipPath id="clip0_18_84">
                          <rect width="11.4078" height="12.4829" fill="#393939" transform="translate(0 0.445023)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span class="detail-card">{{ code.RegisterCode }}</span>
                </span>
                <span class="d-flex">
                  <span class="detail-card" v-if="code.Amount"><b>ยอดค้างชำระ
                      {{
                        code.Amount.toLocaleString("th-TH", { currency: "THB" })
                      }}
                      บาท</b></span>
                </span>
                <!-- <span class="d-flex">
                  <span class="detail-card">{{ code.ExpireDate ? formatDateTime(code.ExpireDate) : '' }}</span>
                </span> -->
                <span class="d-flex" v-if="code.ExpireDate">
                  <span class="detail-card">ExpireDate: {{ formatDateTime(code.ExpireDate) }}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <a @click="toCoupon()" class="btn-gradient my-5" id="btn-next">ต่อไป</a>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import moment from 'moment-timezone';
import 'moment/locale/th'; // นำเข้า locale ไทยเพื่อให้ moment.js แสดงข้อความภาษาไทย

// กำหนด timezone เป็น 'Asia/Bangkok'
moment.tz.setDefault('Asia/Bangkok');


export default {
  data() {
    return {
      lineID: "",
      registerCodes: [],
      message: "",
      resCode: "",
      resDesc: "",
    };
  },
  created() {
    this.lineID = this.$route.query.lineID;
    this.registerCodes = this.$route.query.registerCodes;
    this.fetchRegisterCode();
  },
  methods: {
    formatDateTime(dateTimeString) {
      return moment(dateTimeString).format('DD-MM-YYYY HH:mm:ss');
    },
    fetchRegisterCode() {
      const url = "https://c8888.grandlinux.com/api/ebilling/preinvoice";
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Basic ZWJpbGxpbmc6MTJRV2FzenhAQmlsbGluZw==",
      };
      const data = {
        LineID: this.lineID,
        registerCodes: this.registerCodes,
      };
      axios
        .post(url, data, { headers })
        .then((response) => {
          console.log("Response Status:", response.status);
          if (response.status === 200) {
            this.registerCodes = response.data.RegisterCodes; // กำหนดค่า Register Codes จาก response
            console.log("Register Codes ที่ได้:", this.registerCodes);
            this.resCode = response.data.ResCode;
            this.resDesc = response.data.ResDesc;
          } else {
            console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล: " + response.status);
          }
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล: " + error.message);
        });
    },
    AddRegisterCode() {
      this.$router.push({
        path: "/AccountAdd",
        query: { lineID: this.lineID },
      });
    },
    toCoupon() {
      const selectedCodes = this.registerCodes.filter((code) => code.isChecked);
      const selectedCodesString = JSON.stringify(selectedCodes);
      this.$router.push({
        path: "/Coupon",
        query: {
          lineID: this.lineID,
          registerCodes: selectedCodesString,
        },
      });
    },
    toDetail() {
      const selectedCodes = this.registerCodes.filter((code) => code.isChecked);
      const selectedCodesString = JSON.stringify(selectedCodes);
      this.$router.push({
        path: "/DetailHome",
        query: {
          lineID: this.lineID,
          registerCodes: selectedCodesString,
        },
      });
    },
    updateCheckedStatus(code, isChecked) {
      code.isChecked = isChecked;
      console.log(isChecked);
    },
  },
};
</script>
<style scoped>
.img-card-bg {
  background-image: url(../assets/img/home-vector-1.png);
  background-repeat: no-repeat;
  background-position: bottom -1px right -25px;
  background-size: 155px;
}
</style>

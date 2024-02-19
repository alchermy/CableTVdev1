<template>
  <body>
    <div class="page-body">
      <div class="header-bg-fade">
        <div class="d-flex-between pt-2">
          <a @click="backBtn()" class="btn-icon">
            <span class="svg-icon">
              <svg
                width="12"
                height="24"
                viewBox="0 0 12 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.2298 1.29917C11.84 2.03139 11.84 3.21859 11.2298 3.95082L4.52229 12L11.2298 20.0492C11.84 20.7815 11.84 21.9685 11.2298 22.7007C10.6196 23.433 9.63041 23.433 9.0202 22.7007L1.20764 13.3257C0.597453 12.5935 0.597453 11.4065 1.20764 10.6742L9.0202 1.29917C9.63041 0.566944 10.6196 0.566944 11.2298 1.29917Z"
                  fill="#61259E"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
      <div class="list-payment pt-12 px-5">
        <span class="title-content font-size-h2 text-dark-75 font-700"
          >รายการชำระเงิน</span
        >
        <div class="list-box mt-3">
          <div
            class="d-flex-column list-data"
            v-for="(code, index) in registerCodes"
            :key="index"
          >
            <div class="d-flex-between">
              <span class="d-flex align-items-center">
                <span class="svg-icon svg-icon-1x svg-icon-purple">
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_18_84)">
                      <path
                        d="M10.9119 9.13693H9.38244C9.36912 9.13693 9.35608 9.14056 9.34301 9.14165C9.2911 8.88751 9.08363 8.69934 8.83598 8.69934H6.10192C5.81527 8.69934 5.56933 8.94391 5.56933 9.25757V10.0996H2.46149C1.76571 10.0996 1.19969 9.48813 1.19969 8.72682C1.19969 7.96552 1.76571 7.35001 2.46117 7.35001L7.66856 7.35491C9.02585 7.35491 10.1301 6.14293 10.1301 4.65777C10.1301 3.17261 9.02585 1.96059 7.66856 1.96059H5.88925V1.08695C5.88925 0.773294 5.66999 0.516563 5.38334 0.516563H2.64924C2.40158 0.516563 2.19412 0.704725 2.14221 0.958874C2.12917 0.95778 2.1161 0.954148 2.10282 0.954148H0.573293C0.286647 0.954148 0.050747 1.21591 0.050747 1.52957V3.67277C0.050747 3.98643 0.286647 4.23603 0.573293 4.23603H2.10278C2.1161 4.23603 2.12913 4.2324 2.14217 4.23135C2.19408 4.4855 2.40154 4.67361 2.6492 4.67361H5.3833C5.66995 4.67361 5.88921 4.42905 5.88921 4.11539V3.2733H7.66852C8.36426 3.2733 8.93035 3.89738 8.93035 4.65874C8.93035 5.42004 8.3643 6.04176 7.66884 6.04176L2.46145 6.04001C1.1042 6.04006 0 7.24105 0 8.72621C0 10.2114 1.1042 11.4124 2.46149 11.4124H5.56933V12.286C5.56933 12.5997 5.81527 12.8564 6.10192 12.8564H8.83598C9.08363 12.8564 9.2911 12.6682 9.34301 12.4141C9.35608 12.4152 9.36912 12.4188 9.38244 12.4188H10.9119C11.1985 12.4188 11.4078 12.157 11.4078 11.8434V9.70023C11.4078 9.38653 11.1985 9.13693 10.9119 9.13693ZM1.73032 3.57961H0.770563V2.92323H1.73032V3.57961ZM1.73032 2.26686H0.770563V1.61048H1.73032V2.26686ZM10.688 11.7624H9.72827V11.1061H10.688V11.7624ZM10.688 10.4497H9.72827V9.7933H10.688V10.4497Z"
                        fill="#393939"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_18_84">
                        <rect
                          width="11.4078"
                          height="12.4829"
                          fill="#393939"
                          transform="translate(0 0.445023)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span class="title-card ml-1">{{ code.RegisterCode }}</span>
              </span>
              <a @click="deleteItem()" class="btn-delete"
                ><i class="fa-regular fa-trash-can"></i
              ></a>
            </div>
            <span class="detail-card mx-0">{{ code.Address1 }}</span>

            <div class="border-b"></div>
          </div>
        </div>
      </div>
      <div class="po-relative pt-5 px-5 mb-30">
        <span class="title-content font-size-h2 text-dark-75 font-700"
          >คูปอง</span
        >
        <div class="d-flex-column mt-3">
          <a href="#" class="card-check mb-0">
            <input class="card__input" type="checkbox" checked />
            <div class="coupon-card">
              <div class="d-flex p-3">
                <img src="../assets/img/logo.png" alt="coupon" />
                <div class="coupon-style">
                  <span class="circle1"></span>
                  <div class="dashed-top"></div>
                  <span class="circle2"></span>
                </div>
                <div class="ml-10 my-auto mr-8">
                  <span
                    class="title-card text-dark-75 font-600 font-size-base line-height-25"
                    >ส่วนลดมูลค่า 100 บาท</span
                  >
                  <span
                    class="detail-card text-danger font-size-xs font-500 mx-0"
                    >วันหมดอายุ : 25/02/2567</span
                  >
                </div>
                <span class="label__text">
                  <span class="label__check">
                    <i class="fa fa-check icon"></i>
                  </span>
                </span>
              </div>
            </div>
          </a>
          <a href="#" class="card-check mb-0">
            <input class="card__input" type="checkbox" />
            <div class="coupon-card">
              <div class="d-flex p-3">
                <img src="../assets/img/logo.png" alt="coupon" />
                <div class="coupon-style">
                  <span class="circle1"></span>
                  <div class="dashed-top"></div>
                  <span class="circle2"></span>
                </div>
                <div class="ml-10 my-auto mr-8">
                  <span
                    class="title-card text-dark-75 font-600 font-size-base line-height-25"
                    >ส่วนลดมูลค่า 100 บาท</span
                  >
                  <span class="detail-card text-muted font-size-xs mx-0"
                    >วันหมดอายุ : 15/07/2567</span
                  >
                </div>
                <span class="label__text">
                  <span class="label__check">
                    <i class="fa fa-check icon"></i>
                  </span>
                </span>
              </div>
            </div>
          </a>
          <a href="#" class="card-check mb-0">
            <input class="card__input" type="checkbox" />
            <div class="coupon-card">
              <div class="d-flex p-3">
                <img src="../assets/img/logo.png" alt="coupon" />
                <div class="coupon-style">
                  <span class="circle1"></span>
                  <div class="dashed-top"></div>
                  <span class="circle2"></span>
                </div>
                <div class="ml-10 my-auto mr-8">
                  <span
                    class="title-card text-dark-75 font-600 font-size-base line-height-25"
                    >ส่วนลดมูลค่า 250 บาท</span
                  >
                  <span class="detail-card text-muted font-size-xs mx-0"
                    >วันหมดอายุ : 31/10/2567</span
                  >
                </div>
                <span class="label__text">
                  <span class="label__check">
                    <i class="fa fa-check icon"></i>
                  </span>
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="navbar-bottom">
        <div class="d-flex-column w-100 px-5">
          <div class="d-flex-between">
            <span class="text-dark-75 font-600 font-size-h4 py-3">รวม</span>
            <span class="text-purple font-700 font-size-h4 py-3"
              >{{ registerCodes.length }} รายการ</span
            >
          </div>
          <a
            @click="toDetail()"
            class="btn-gradient mb-5 mt-0 px-0"
            id="payment-invoice"
            >สร้างใบแจ้งชำระเงิน</a
          >
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      lineID: "",
      registerCodes: [],
      message: "",
      resCode: "",
      resDesc: "",
      timeDifference: "",
    };
  },
  created() {
    this.lineID = this.$route.query.lineID;
    this.registerCodes = JSON.parse(this.$route.query.registerCodes);
  },
  methods: {
    backBtn() {
      this.$router.push({
        path: "/AccountList",
        query: { lineID: this.lineID },
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
    deleteItem(index) {
      // ลบรายการที่มี index ที่กำหนด
      this.registerCodes.splice(index, 1);
      // อัพเดท query โดยลบรายการที่ถูกลบออกจาก registerCodes แล้วแปลงเป็นสตริง JSON
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          registerCodes: JSON.stringify(this.registerCodes),
        },
      });
    },
  },
};
</script>

<style scoped>
.img-card-bg {
  background-image: url(../assets/img/home-vector-1.png);
  background-repeat: no-repeat;
  background-position: bottom right -25px;
  background-size: 155px;
}
</style>

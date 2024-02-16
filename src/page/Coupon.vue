<template>
  <body>
    <div class="page-body">
      <div class="header-bg">
        <div class="d-flex-between pt-2">
          <!-- back btn -->
          <a href="#" class="btn-icon" @click="backBtn()">
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
      <div class="content">
        <div class="d-flex-column">
          <span class="title-content text-center">รายละเอียดคูปอง</span>
          <span class="detail-content text-center"
            >หมายเลขคูปอง : {{ lineID }}</span
          >
          <span class="detail-content text-center">: {{ registerCodes }}</span>
        </div>
      </div>
      <div class="d-flex">
        <a @click="toDetail()" class="btn-gradient my-5" id="btn-next">ต่อไป</a>
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
    this.registerCodes = this.$route.query.registerCodes;
  },
  methods: {
    backBtn() {
      this.$router.push({
        path: "/AccountList",
        query: { lineID: this.lineID },
      });
    },
    toDetail() {
      this.$router.push({
        path: "/DetailHome",
        query: {
          lineID: this.lineID,
          registerCodes: this.registerCodes,
        },
      });
    },
  },
};
</script>

<style></style>
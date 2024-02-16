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
          <span class="title-content text-center">Register Code</span>
          <span class="detail-content text-center">เพิ่มรหัสลงทะเบียน</span>
        </div>
        <div class="px-5">
          <div class="card mt-5">
            <div class="py-10 px-5">
              <input type="hidden" v-model="lineID" />
              <input
                type="text"
                v-model="registerCode"
                name="registerCode"
                placeholder="กรอก Register Code"
                class="input-form"
              />
              <div class="d-flex">
                <a
                  href="#"
                  class="btn-gradient"
                  @click="Register()"
                  id="submit-btn"
                  >บันทึก</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      lineID: "",
      registerCodes: "",
      responseMessage: "",
      resCode: "",
      resDesc: "",
    };
  },
  created() {
    this.lineID = this.$route.query.lineID;
  },
  methods: {
    Register() {
      const url = "https://c8888.grandlinux.com/api/ebilling/register";
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Basic ZWJpbGxpbmc6MTJRV2FzenhAQmlsbGluZw==",
      };
      const data = {
        LineID: this.lineID,
        // LineID: 'TEST0001',
        RegisterCode: this.registerCode,
      };
      axios
        .post(url, data, { headers })
        .then((response) => {
          if (response.status === 200) {
            console.log("Line ID", data.LineID);
            console.log("RegisterCode :", response.data.RegisterCode); // กำหนดค่า Register Codes จาก response
            console.log("ResCode :", response.data.ResCode);
            console.log("ResDesc :", response.data.ResDesc);
            if (response.data.ResCode === "000") {
              this.responseMessage = "ได้ทำการลงทะเบียนข้อมูลสำเร็จ";
              Swal.fire({
                title: "ลงทะเบียนสำเร็จ",
                text: this.responseMessage,
                icon: "success",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#834d9b",
              });
              console.log("Message: ", this.responseMessage);
            } else if (response.data.ResCode === "001") {
              this.responseMessage = "ไม่พบข้อมูล RegisterCode";
              Swal.fire({
                title: "ไม่พบข้อมูล",
                text: this.responseMessage,
                icon: "warning",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#834d9b",
              });
              console.log("Message: ", this.responseMessage);
            } else if (response.data.ResCode === "002") {
              this.responseMessage =
                "ไม่ใช่ Register Code ของบริษัท กรุณากรอกข้อมูลอีกครั้ง";
              Swal.fire({
                title: "ข้อมูลไม่ถูกต้อง",
                text: this.responseMessage,
                icon: "warning",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#834d9b",
              });
              console.log("Message: ", this.responseMessage);
            } else if (response.data.ResCode === "003") {
              this.responseMessage =
                "Register Code นี้ทำการลงทะเบียนแล้ว กรุณากรอกข้อมูลอีกครั้ง";
              Swal.fire({
                title: "<span>Register Code นี้ <br> ลงทะเบียนแล้ว</span>",
                text: this.responseMessage,
                icon: "warning",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#834d9b",
              });
              console.log("Message: ", this.responseMessage);
            } else {
              this.responseMessage = "เกิดข้อผิดพลาด: " + response.data.ResDesc;
              Swal.fire({
                title: "ลงทะเบียนไม่สำเร็จ",
                text: this.responseMessage,
                icon: "error",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#834d9b",
              });
            }
          } else {
            this.responseMessage =
              "พบข้อผิดพลาดในการเชื่อมต่อ: " + response.status;
            Swal.fire({
              title: "Error",
              text: this.responseMessage,
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#834d9b",
            });
          }
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล: " + error.message);
        });
    },
    backBtn() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>

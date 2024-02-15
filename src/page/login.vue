<template>
  <div class="text-center">
    <div class="bg-load">
      <div class="content-load">
        <img class="logo" src="../assets/img/logo.png" alt="background" />
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { liff } from "@line/liff";
import axios from "axios";

export default {
  data() {
    return {
      profile: null,

      responseMessage: "",
      lineID: null,
      userId: null, // เพิ่ม userId ใน data
      isLoading: false, // เพิ่ม isLoading เพื่อตรวจสอบสถานะการโหลด
    };
  },
  methods: {
    async loginAndCheckRegistration() {
      await liff.init({ liffId: "2003557072-xpWd4pNB" });
      if (!liff.isLoggedIn()) {
        liff.login();
        return false;
      }
      this.profile = await liff.getProfile();

      console.log("ล็อกอินแล้ว");
      console.log(this.profile);
      localStorage.setItem("profile", JSON.stringify(this.profile));

      // กำหนดค่า userId จากโปรไฟล์ของผู้ใช้
      this.userId = this.profile.userId;

      this.isLoading = true;
      setTimeout(async () => {
        this.checkRegistration();
      }, 2000);
    },
    checkRegistration() {
      this.isLoading = true;
      const url = "https://c8888.grandlinux.com/api/ebilling/isregistered";
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Basic ZWJpbGxpbmc6MTJRV2FzenhAQmlsbGluZw==",
      };
      this.lineID = this.userId;
      // this.lineID = "TEST0001";
      const data = {
        LineID: this.lineID,
      };

      axios
        .post(url, data, { headers })
        .then((response) => {
          console.log("Response data:", response.data);
          console.log("Response status:", response.status);
          // ตรวจสอบค่า ResCode และจัดการตามเงื่อนไข
          if (response.status === 200) {
            if (response.data.ResCode === "000") {
              this.responseMessage = "ยังไม่เคยลงทะเบียนในระบบ";
              this.$router.push({
                path: "/RegisterOTP",
                query: { lineID: this.lineID },
              });
            } else if (response.data.ResCode === "001") {
              this.responseMessage = "เคยลงทะเบียนในระบบแล้ว";
              this.$router.push({
                path: "/AccountList",
                query: { lineID: this.lineID },
              });
            } else if (response.data.ResCode === "999") {
              this.responseMessage = "Exception Error";
            } else {
              this.responseMessage =
                "ResCode ไม่ถูกต้อง: " + response.data.ResCode;
            }
          } else {
            this.responseMessage =
              "พบข้อผิดพลาดในการเชื่อมต่อ: " + response.status;
          }
        })
        .catch((error) => {
          this.responseMessage = "เกิดข้อผิดพลาดในการส่งคำขอ: " + error.message;
        })
        .finally(() => {
          this.isLoading = false;
          if (response.data.ResCode === "000") {
            this.$router.push({
              path: "/RegisterOTP",
              query: { lineID: this.lineID },
            });
          } else if (response.data.ResCode === "001") {
            this.$router.push({
              path: "/AccountList",
              query: { lineID: this.lineID },
            });
          }
        });
    },
  },
  mounted() {
    this.loginAndCheckRegistration();
  },
};
</script>
<style></style>

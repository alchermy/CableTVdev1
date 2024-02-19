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
      <div>
        <div class="content">
          <div class="d-flex-column">
            <span class="title-content text-center" style="margin: 0 auto"
              >ใบแจ้งชำระเงิน</span
            >
            <div v-for="(code, index) in registerCodes" :key="index">
              <p style="display: flex; justify-content: center">
                Register Code: {{ code.RegisterCode }}
              </p>
            </div>
          </div>
          <div class="text-center">
            <div>
              <div class="content-load">
                <img
                  v-if="QrURL"
                  v-bind:src="QrURL"
                  alt="background"
                  style="margin: 0 auto"
                  width="90%"
                />
                <div v-else class="loader"></div>
              </div>
            </div>
            <button @click="downloadImage(QrURL)">ดาวน์โหลดรูป Qr Code</button>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import { liff } from "@line/liff";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      lineID: "",
      registerCodes: "", // เก็บค่า registerCodes ที่ได้จาก query parameters
      message: "",
      ResCode: "",
      QrURL: "",
      ResDesc: "",
    };
  },
  created() {
    this.lineID = this.$route.query.lineID;
    this.registerCodes = JSON.parse(this.$route.query.registerCodes);
    console.log("lineID:", this.lineID);
    console.log("registerCodes:", this.registerCodes);
    console.log("RegisterCode:", this.registerCodes[0].RegisterCode);
    this.initLiff();
  },
  methods: {
    async initLiff() {
      try {
        await liff.init({ liffId: "2003557072-xpWd4pNB" });
        this.fetchPaymentBill();
        console.log("Liff initialized successfully!");
      } catch (error) {
        console.error("Error initializing LINE liff:", error);
      }
    },
    fetchPaymentBill() {
      const url = "https://c8888.grandlinux.com/api/ebilling/create";
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Basic ZWJpbGxpbmc6MTJRV2FzenhAQmlsbGluZw==",
      };

      const data = {
        LineID: this.lineID,
        RegisterCode: this.registerCodes, // ส่งเฉพาะ RegisterCode จากทุกตัวใน registerCodes
      };

      console.log("RegisterCode", data.RegisterCode);
      console.log("lineID", data.LineID);
      axios
        .post(url, data, { headers })
        .then((response) => {
          console.log("Response Status:", response);
          if (response.status === 200) {
            this.QrURL = response.data.QrURL;
            this.ResCode = response.data.ResCode;
            this.ResDesc = response.data.ResDesc;
            console.log("QrURL:", this.QrURL);
            console.log("ResCode:", this.ResCode);
            console.log("ResDesc:", this.ResDesc);
          } else {
            console.error(
              "เกิดข้อผิดพลาดในการสร้างใบแจ้งชำระเงิน: " + response.status
            );
          }
        })
        .catch((error) => {
          console.error(
            "เกิดข้อผิดพลาดในการสร้างใบแจ้งชำระเงิน: " + error.message
          );
        });
    },
    backBtn() {
      this.$router.push({
        path: "/AccountList",
        query: { lineID: this.lineID },
      });
    },
    async downloadImage(imageUrl) {
      try {
        const response = await fetch(imageUrl);
        const imageBlob = await response.blob();

        // Create a temporary anchor element
        const anchor = document.createElement("a");
        anchor.href = URL.createObjectURL(imageBlob);
        anchor.download = "image.png"; // Set the default download file name
        anchor.style.display = "none";
        document.body.appendChild(anchor);

        // Simulate a click to trigger the download
        anchor.click();

        // Remove the anchor from the document
        document.body.removeChild(anchor);

        Swal.fire("Saved!");
      } catch (error) {
        console.error("Error saving the file:", error);
        Swal.fire("Error", "Failed to save the image.", "error");
      }
    },
  },
};
</script>

<style></style>

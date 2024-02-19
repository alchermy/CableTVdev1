<template>
    <body>
        <div class="page-body">
            <div class="header-bg">
                <div class="d-flex-between pt-2">
                    <img class="logo-header" src="../assets/img/logo.png" alt="logo">
                </div>
            </div>
            <div v-if="!showOTP" class="content pr-m-35" id="phonenumber">
                <span class="d-flex justify-content-center mb-5">
                    <img src="../assets/img/icon-phonenumber.png" alt="icon">
                </span>
                <div class="d-flex-column ">
                    <span class="title-content text-center font-700">หมายเลขโทรศัพท์</span>
                    <span class="detail-content text-center">กรอกหมายเลขโทรศัพท์มือถือของคุณ</span>
                    <span class="detail-content text-center mt-0">เราจะส่ง OTP ให้คุณเพื่อยืนยันรหัส</span>
                </div>
                <div class="px-5">
                    <div class="card mt-5">
                        <div class="py-10 px-5">
                            <input type="text" placeholder="0XXXXXXXXX" class="input-form" v-model="phonenumber"
                                inputmode="numeric" autocapitalize="none" maxlength="10" @keypress="isNumber($event)">
                            <div class="d-flex">
                                <a href="#" class="btn-gradient" @click="submitForm">ส่ง OTP</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showOTP" class="content pr-m-35" id="otp">
                <span class="d-flex justify-content-center mb-5">
                    <img src="../assets/img/icon-otp.png" alt="icon">
                </span>
                <div class="d-flex-column ">
                    <span class="title-content text-center font-700">กรอกรหัส</span>
                    <span class="detail-content text-center">กรุณากรอกเลข OTP ที่ส่งไปที่หมายเลข</span>
                    <span class="title-content text-center font-size-h2 mt-2">{{ hidePhoneNumber(phonenumber) }}</span>
                </div>
                <div class="px-5">
                    <div class="card mt-5">
                        <div class="py-10 px-5">
                            <form @submit.prevent="submitOTP" class="form-otp">
                                <input v-model="otp[0]" class="input-form otp" type="text" @keyup="tabChange(1)" inputmode="numeric" autocapitalize="none" maxlength="1" @keypress="isNumber($event)">
                                <input v-model="otp[1]" class="input-form otp" type="text" @keyup="tabChange(2)" inputmode="numeric" autocapitalize="none" maxlength="1" @keypress="isNumber($event)">
                                <input v-model="otp[2]" class="input-form otp" type="text" @keyup="tabChange(3)" inputmode="numeric" autocapitalize="none" maxlength="1" @keypress="isNumber($event)">
                                <input v-model="otp[3]" class="input-form otp" type="text" @keyup="tabChange(4)" inputmode="numeric" autocapitalize="none" maxlength="1" @keypress="isNumber($event)">
                                <input v-model="otp[4]" class="input-form otp" type="text" @keyup="tabChange(5)" inputmode="numeric" autocapitalize="none" maxlength="1" @keypress="isNumber($event)">
                                <input v-model="otp[5]" class="input-form otp" type="text" @keyup="tabChange(6)" inputmode="numeric" autocapitalize="none" maxlength="1" @keypress="isNumber($event)">
                            </form>
                            <div class="d-flex">
                                <a href="#" class="btn-gradient" @click="submitOTP">ยืนยัน OTP</a>
                            </div>
                            <div class="w-100 text-center mt-5">
                                <span class="detail-content">
                                    <a href="#" class="btn-link" @click="resendOTP">ไม่ได้รับรหัส OTP?</a>
                                    <template v-if="isResending">
                                        กำลังขอรหัส OTP ใหม่...
                                    </template>
                                    <template v-else>
                                        ขออีกครั้งใน {{ countdownTime }} วินาที
                                    </template>
                                </span>
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
            showOTP: false,
            phonenumber: "",
            otp: ['', '', '', '', '', ''], // สร้าง array เก็บรหัส OTP
            countdownTime: 0, // เริ่มต้นเป็น 0 เพื่อให้ไม่นับถอยหลังเลย
            isResending: false

        };
    },
    created() {
        this.lineID = this.$route.query.lineID;
    },
    methods: {
        submitForm() {
            if (!this.phonenumber) {
                Swal.fire({
                    title: "ผิดพลาด!",
                    text: "กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง",
                    icon: "error",
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#834d9b",
                });
                return; // ออกจากฟังก์ชันเพื่อไม่ให้ทำงานต่อ
            }
            if (this.phonenumber.length !== 10) {
                Swal.fire({
                    title: "ผิดพลาด!",
                    text: "กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง",
                    icon: "error",
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#834d9b",
                });
                return; // ออกจากฟังก์ชันเพื่อไม่ให้ทำงานต่อ
            }
            this.showOTP = true;
            this.startCountdown();
            phonenumber = this.phonenumber;

        },
        submitOTP() {
            // ตรวจสอบความถูกต้องของ OTP
            const otpString = this.otp.join(''); // รวมรหัส OTP จาก array เป็น string

            if (otpString.length !== 6) {
                Swal.fire({
                    title: "ผิดพลาด!",
                    text: "กรุณากรอกรหัส OTP ให้ถูกต้อง",
                    icon: "error",
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#834d9b",
                });
                this.otp = ['', '', '', '', '', ''];
                return; // ออกจากฟังก์ชันเพื่อไม่ให้ทำงานต่อ
            }
            // ตรวจสอบความถูกต้องของ OTP
            const expectedOTP = "123456"; // OTP
            if (otpString !== expectedOTP) {
                Swal.fire({
                    title: "ผิดพลาด!",
                    text: "รหัส OTP ไม่ถูกต้อง",
                    icon: "error",
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#834d9b",
                });
                this.otp = ['', '', '', '', '', ''];
                return; // ออกจากฟังก์ชันเพื่อไม่ให้ทำงานต่อ
            }
            // ถ้า OTP ถูกต้อง ให้แสดง SweetAlert
            Swal.fire({
                title: "ยืนยันสำเร็จ",
                text: "ยืนยันรหัสเรียบร้อยแล้ว",
                icon: "success",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#834d9b",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push({
                        path: "/AccountList",
                        query: { lineID: this.lineID },
                    });
                }
            });

        },

        digitValidate(event) {
            // ตรวจสอบค่าที่ใส่ในช่องกรอก OTP เพื่อให้มีเฉพาะตัวเลขเท่านั้น
            event.target.value = event.target.value.replace(/\D/g, "");
        },
        tabChange(index) {
            // เลื่อน focus ไปยังช่องกรอกถัดไปเมื่อกรอกครบตามขนาดที่กำหนด
            if (event.target.value.length === 1) {
                document.getElementsByClassName("otp")[index].focus();
            }
        },
        hidePhoneNumber(phoneNumber) {
            // ฟังก์ชันสำหรับซ่อนหมายเลขโทรศัพท์
            return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-XXXX");
        },
        isNumber(event) {
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
            }
        },
        startCountdown() {
            this.countdownTime = 60; // เริ่มนับถอยหลัง 60 วินาที
            const countdownInterval = setInterval(() => {
                if (this.countdownTime > 0) {
                    this.countdownTime--;
                } else {
                    clearInterval(countdownInterval);
                }
            }, 1000);
        },
        // ขอ OTP ใหม่
        resendOTP() {
            if (this.countdownTime === 0) {
                // ส่ง request ขอรหัส OTP ใหม่ที่นี่
                this.isResending = true; // เปลี่ยนสถานะการขอรหัส OTP เป็น true เพื่อแสดงว่ากำลังทำงาน
                setTimeout(() => {
                    this.isResending = false; // เมื่อทำงานเสร็จสิ้นให้เปลี่ยนสถานะกลับเป็น false
                    this.startCountdown(); // เริ่มนับถอยหลังอีกครั้ง
                }, 2000); //
            } else {
                Swal.fire({
                    title: "ผิดพลาด!",
                    text: `ยังไม่สามารถขอ OPT ใหม่ได้ กรุณารอสักครู่`,
                    icon: "error",
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#834d9b",
                });
            }


        },
    },
};
</script>
  
<style ></style>


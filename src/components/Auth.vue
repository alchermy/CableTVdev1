<template>
    <div>
        <span id="loading">Loading</span>

        <div id="lineProfile" style="display: none;">
            <img id="lineImage" src="" alt="" width="100px">
            <div id="lineName"></div>
            <div id="lineUID"></div>
        </div>
        <p>{{ responseMessage }}</p>
    </div>
</template>
<script lang="ts">
import { liff } from "@line/liff";
import axios from 'axios';
export default {
    data() {
        return {
            
            lineID: 'TEST0001', // profile.userId
            responseMessage: ''
        };
    },
    methods: {
        async loginWithLine() {
            await liff.init({ liffId: '2003317234-8noYn7wY' });
            if (!liff.isLoggedIn()) {
                liff.login();
                return false
            }
            const profile = await liff.getProfile();
            console.log("ล็อกอินแล้ว");
            console.log(profile);
            loading.style.display = 'none'
            lineImage.src = profile.pictureUrl
            lineName.textContent = profile.displayName
            lineUID.textContent = `UID : ${profile.userId}`;
            lineProfile.style.display = 'block';

        },
        checkRegistration() {
            const url = 'https://c8888.grandlinux.com/api/ebilling/isregistered';
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ZWJpbGxpbmc6MTJRV2FzenhAQmlsbGluZw=='
            };
            const data = {
                LineID: this.lineID
            };

            axios.post(url, data, { headers })
                .then(response => {
                    if (response.status === 200) {
                        if (response.data.ResCode === '000') {
                            this.responseMessage = 'ยังไม่เคยลงทะเบียนในระบบ';
                        } else if (response.data.ResCode === '001') {
                            this.responseMessage = 'เคยลงทะเบียนในระบบแล้ว';
                        } else {
                            this.responseMessage = 'เกิดข้อผิดพลาด: ' + response.data.ResDesc;
                        }
                    } else {
                        this.responseMessage = 'พบข้อผิดพลาดในการเชื่อมต่อ: ' + response.status;
                    }
                })
                .catch(error => {
                    this.responseMessage = 'เกิดข้อผิดพลาดในการส่งคำขอ: ' + error.message;
                });
        }
    },

    mounted() {
        this.loginWithLine();
        this.checkRegistration();
    },
}
</script>
<style >
</style>
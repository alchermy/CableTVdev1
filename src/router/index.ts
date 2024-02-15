import { createRouter, createWebHistory } from "vue-router";

import login from "../page/login.vue";
import AccountList from "../page/AccountList.vue";
import AccountAdd from "../page/AccountAdd.vue";
import RegisterOPT from "../page/RegisterOPT.vue";
import Coupon from "../page/Coupon.vue";
import DetailHome from "../page/DetailHome.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/AccountList",
    name: "AccountList",
    component: AccountList,
    meta: { requiresAuth: true } // ระบุว่าหน้านี้ต้องการการ login เพื่อเข้าถึง
  },
  {
    path: "/AccountAdd",
    name: "AccountAdd",
    component: AccountAdd,
    meta: { requiresAuth: true } // ระบุว่าหน้านี้ต้องการการ login เพื่อเข้าถึง
  },
  {
    path: "/RegisterOTP",
    name: "RegisterOPT",
    component: RegisterOPT,
    meta: { requiresAuth: true } // ระบุว่าหน้านี้ต้องการการ login เพื่อเข้าถึง
  },
  {
    path: "/Coupon",
    name: "Coupon",
    component: Coupon,
    meta: { requiresAuth: true } // ระบุว่าหน้านี้ต้องการการ login เพื่อเข้าถึง
  },
  {
    path: "/DetailHome",
    name: "DetailHome",
    component: DetailHome,
    meta: { requiresAuth: true } // ระบุว่าหน้านี้ต้องการการ login เพื่อเข้าถึง
  },
  // เพิ่มเส้นทางอื่นๆ ตามต้องการ
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ตรวจสอบการล็อกอินก่อนการเข้าถึงหน้า
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('profile');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
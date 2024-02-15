<template>
    <v-card class="mx-auto" max-width="400" elevation="10">
      <v-card-title class="headline">Login ผ่าน</v-card-title>
      <v-card-text>TEST</v-card-text>
      <v-card-actions class="text-center justify-center">
        <div v-if="profile">
          <img :src="profile.pictureUrl" alt="Profile Image">
        </div>
      </v-card-actions>
    </v-card>
  </template>
<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const lineId = computed(() => store.getters.getLineId);
    const profile = computed(() => store.getters.getProfile);
    console.log(store);
    
    return {
      lineId,
      profile
    };
  }
}
</script>
<style lang="">
    
</style>
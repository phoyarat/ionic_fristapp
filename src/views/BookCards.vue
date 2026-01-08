<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>ผู้แต่ง: {{ author }} </p>
      <p>ราคา: {{ price }} บาท</p>
      <ion-button color="danger" expand="block" @click="deleteBook">ลบหนังสือ</ion-button>
    </ion-card-content>
  </ion-card>
</template>
<script>
export default {
  name: "BookCard",
  props: {
    title: {type: String,},
    price: {type: Number, },
    author: {type: String, }
  },
  methods: {
    deleteBook() {
      this.$emit("remove");
    }
  }
};
</script>
<style scoped>
ion-card {
  margin: 12px;
}
</style>

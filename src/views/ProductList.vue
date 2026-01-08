<template>
  <ion-page class="dark-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>รายการสินค้า</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col
            size="12"
            size-sm="6"
            size-md="4"
            v-for="item in products"
            :key="item.id"
          >
            <ProductCard :product="item" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol
} from "@ionic/vue";
import ProductCard from "./ProductCard.vue";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    ProductCard,
  },
  data() {
    return {
      products: [
        { id: 1, name: "Lyn Sweet Eau De Toilete", price: 1600, image: "pink.png" },
        { id: 2, name: "Yves Saint Laurent Y Eau de Parfum", price: 3500, image: "kim.png" },
        { id: 3, name: "Habit Rouge", price: 1500, image: "red.png" }
      ]
    };
  }
};
</script>

<style scoped>
/* ธีมดำเฉพาะหน้านี้ */
.dark-page {
  --background: #121212;
  background-color: #121212;
}

/* Header */
.dark-page ion-toolbar {
  --background: #1f1f1f;
  --color: #ffffff;
}

/* Content */
.dark-page ion-content {
  --background: #565656;
}

/* ปรับ grid spacing ให้นุ่มตา */
.dark-page ion-col {
  margin-bottom: 8px;
}
</style>

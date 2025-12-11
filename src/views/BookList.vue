<template>
  <BaseLayout title="รายการหนังสือ">

    <!-- ปุ่ม Theme อยู่ตรง header-end -->
    <template #header-end>
      <ion-buttons slot="end">
        <ion-button @click="toggleTheme">
          <ion-icon :icon="isDark ? moon : sunny"></ion-icon>
        </ion-button>
      </ion-buttons>
    </template>

    <!-- เนื้อหาหลักของหน้า (slot หลัก) -->
    <ion-searchbar
      v-model="q"
      @ionInput="filter"
      placeholder="ค้นหาชื่อ/ผู้เขียน"
    />

    <ion-list>
  <BookCard
    v-for="book in filtered"
    :key="book.id"
    :book="book"
    @select="open"
  />
</ion-list>
  

  </BaseLayout>
</template>


<script>
import BaseLayout from "@/components/BaseLayout.vue";
import BookCard from "../views/BookCard.vue";

import { sunny, moon } from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonSearchbar,
  IonBadge,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/vue";

export default {
  components: {
    BaseLayout,
    BookCard,
    IonButtons,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonThumbnail,
  },

  data() {
    return {
      q: "",
      books: [],
      filtered: [],
      isDark: false,
    };
  },

  setup() {
    return { sunny, moon };
  },

  created() {
    this.loadBooks();
    this.loadTheme();
  },

  methods: {
    /* โหลดข้อมูลหนังสือ */
    loadBooks() {
      this.books = [
        {
          id: 1,
          title: "การเขียนโปรเเกรมด้วย PYTHON",
          author: "JACK PK",
          price: 299,
          available_copies: 3,
          cover_url: "https://api.chulabook.com/images/pid-148910.jpg",
        },
        {
          id: 2,
          title: "เรียน Coding ระดับเริ่มต้นด้วย Python",
          author: "กิตติพง อักนาน",
          price: 277.5,
          available_copies: 0,
          cover_url:
            "https://platform-api.nanmeebooks.com/uploads/images/image-1649076106247.jpg",
        },
        {
          id: 3,
          title: "ความรู้เบื้องต้นภาษาไพธอน",
          author: "ศุภชัย สมพานิช",
          price: 265.5,
          available_copies: 5,
          cover_url: "https://api.chulabook.com/images/pid-112671.jpg",
        },
          {
        id: 4,
        title: "เขียนโปรแกรมด้วย Python",
        author: "เอกพล นานา",
        price: 105.5,
        available_copies: 5,
        cover_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR1b33WcqBUVnFwXnY1Jadlnp3w_2u6ORB0w&s",
      },
      {
        id: 5,
        title: "ตะลุยโจทย์ Python 500 ข้อ",
        author: "ดร.สภชัย ดีงาม",
        price: 200,
        available_copies: 5,
        cover_url:
          "https://cdn-ookbee.okbcdn.net/Books/TAUTOLOGY_CODE/2022/20221004/Thumbnails/Cover.jpg",
      },
      {
        id: 6,
        title: "NANMEEBOOKS หนังสือ 1000 คำศัพ",
        author: "พิมเสน จันนา",
        price: 300,
        available_copies: 5,
        cover_url:
          "https://img.lazcdn.com/g/p/63011f0359243ae78f634291bc48c7a3.jpg_720x720q80.jpg",
      },
      {
        id: 7,
        title: "หนังสือเรียนเสริมภาษาอังกฤษ ป.2",
        author: "อัชชาติ โตมา",
        price: 500,
        available_copies: 5,
        cover_url:
          "https://www.maceducation.com/wp-content/uploads/2018/09/2321205120-cover-1.jpg",
      },
      {
        id: 8,
        title: "หนังสือเรียนเสริมภาษาอังกฤษ ป.1",
        author: "สวยราดี ทองมาก",
        price: 700,
        available_copies: 5,
        cover_url:
          "https://www.maceducation.com/wp-content/uploads/2018/09/2311205140-cover-1.jpg",
      },
      {
        id: 9,
        title: "หนังสือเรียนภาษาอังกฤษ Blueprint",
        author: "คิม คำกาก",
        price: 2000,
        available_copies: 5,
        cover_url: "https://inwfile.com/s-fi/k2v01t.jpg",
      },
      {
        id: 10,
        title: "หนังสือ เก่งภาษาไทยและอังกฤษ อนุบาล",
        author: "นานาชาติ",
        price: 1500,
        available_copies: 5,
        cover_url:
          "https://cache-igetweb-v2.mt108.info/uploads/images-cache/13995/product/d37c6a3512cd58a16584978dda18cf73_full.jpg",
      },
      ];

      this.filtered = this.books;
    },

    /* ค้นหา */
    filter() {
      const q = this.q.toLowerCase();

      this.filtered = this.books.filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q)
      );
    },

    /* เปิดรายละเอียด */
    open(id) {
      this.$router.push(`/book/${id}`);
    },

    /* โหลดธีมจาก localStorage */
    loadTheme() {
      const saved = localStorage.getItem("theme-dark");
      this.isDark = saved === "true";

      document.body.classList.toggle("dark", this.isDark);
    },

    /* ปุ่มสลับโหมด */
    toggleTheme() {
      this.isDark = !this.isDark;

      document.body.classList.toggle("dark", this.isDark);

      localStorage.setItem("theme-dark", this.isDark);
    },
  },
};
</script>

<style scoped src="../theme/theme.css"></style>

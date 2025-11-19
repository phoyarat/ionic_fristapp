<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbar">
        <ion-title>รายการหนังสือ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- ช่องค้นหา -->
      <ion-searchbar
        v-model="q"
        @ionInput="filter"
        placeholder="ค้นหาชื่อ/ผู้เขียน"
      />

      <!-- แสดงรายการหนังสือ -->
      <ion-list >
        <ion-item
          v-for="book in filtered"
          :key="book.id"
          @click="open(book.id)"
        >
          <ion-thumbnail slot="start">
            <img
              :src="book.cover_url"
              @error="book.cover_url = '/src/assets/cover-placeholder.png'"
            />
          </ion-thumbnail>

          <ion-label>
            <h2>{{ book.title }}</h2>
            <p>{{ book.author }}</p>
            <p>{{ book.price }}฿</p>
            <p v-if="book.available_copies">
              คงเหลือ: {{ book.available_copies }}
            </p>
          </ion-label>

          <ion-badge slot="end" v-if="book.available_copies > 0" color="success"
            >ว่าง</ion-badge
          >
          <ion-badge slot="end" v-else color="danger">ถูกยืม</ion-badge>
        </ion-item>
      </ion-list>
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
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonSearchbar,
  IonBadge,
} from "@ionic/vue";

export default {
  name: "BookList",
  components: {
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
  },
  data() {
    return {
      q: "",
      books: [],
      filtered: [],
    };
  },
  created() {
    // ✅ กำหนดข้อมูลหนังสือ
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
  methods: {
    // ✅ ฟังก์ชันกรองข้อมูล
    filter() {
      const query = this.q.toLowerCase();
      this.filtered = this.books.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    },

    // ✅ ฟังก์ชันเปิดรายละเอียดหนังสือ
    open(id) {
      this.$router.push(`/book/${id}`);
    },
  },
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%);
}

ion-toolbar {
  --background: #00b4d8;
  --color: #ffffff;
}

ion-searchbar {
  margin: 5px 0 2px;
  --ion-background-color: #060505;
  --ion-searchbar-input-background: #090b0a;
  --placeholder-color: #100909;
  border-radius: 8px;
  
}

ion-item {
  --ion-item-background: #e0f7fa;
  margin-bottom: 5px;
  margin-top: 3px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

ion-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

ion-thumbnail img {
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 2px;
  background: #fff;
}

ion-label h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0a3d62;
}

ion-label p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

ion-badge {
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 8px;
}
</style>

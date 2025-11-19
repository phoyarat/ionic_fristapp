<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbartoolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/books" text="กลับ" />
        </ion-buttons>
        <ion-title>รายละเอียดหนังสือ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="book" class="book-card animate">
        <div class="cover-container">
          <img
            :src="book.cover_url || '/src/assets/cover-placeholder.png'"
            alt="Book cover"
            class="book-cover"
            @error="book.cover_url = '/src/assets/cover-placeholder.png'"
          />
          
            <div
    class="ribbon"
    :class="{
      available: book.available_copies > 0,
      borrowed: book.available_copies === 0,
    }"
  >
    {{ book.available_copies > 0 ? "พร้อมให้ยืม" : "ถูกยืมหมดแล้ว" }}
  </div>
        </div>

        <div class="info-section">
          <h2 class="title">{{ book.title }}</h2>
          <p class="author">✎ เขียนโดย: {{ book.author }}</p>
          <div class="detail-row">
            <span class="label">▣ คงเหลือ: </span>
            <span class="value">{{ book.available_copies }} เล่ม</span>
          </div>
          <div class="detail-row">
            <span class="price">𖤘 ราคา: </span>
            <span class="value price">{{ book.price }} ฿</span>
          </div>

          <ion-button
            expand="block"
            class="borrow-btn"
            :disabled="book.available_copies === 0"
            @click="borrowBook"
          >
            <ion-icon slot="start" name="book-outline"></ion-icon>
            ยืมหนังสือ
          </ion-button>
        </div>
      </div>

      <ion-text v-else color="medium" class="not-found">
        <p>ไม่พบข้อมูลหนังสือ</p>
      </ion-text>
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
  IonButtons,
  IonBackButton,
  IonButton,
  IonText,
  IonIcon,
} from "@ionic/vue";

export default {
  name: "BookDetail",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonButton,
    IonText,
    IonIcon,
  },
  data() {
    return {
      book: null,
    };
  },
  created() {
    const id = parseInt(this.$route.params.id);
    const books = [
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
    ];
    this.book = books.find((b) => b.id === id);
  },
  methods: {
    borrowBook() {
      if (this.book.available_copies > 0) {
        this.book.available_copies -= 1;
        alert(`📚 คุณได้ยืมหนังสือ "${this.book.title}" แล้ว`);
      } else {
        alert("❌ หนังสือเล่มนี้ถูกยืมหมดแล้ว");
      }
    },
  },
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%);
}

.toolbar {
  --background: #00b4d8;
  --color: #fff;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.book-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 91, 170, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}
.book-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 35px rgba(0, 91, 170, 0.25);
}

/* --- ป้ายคาดแนวเฉียง --- */
.ribbon {
  position: absolute;
  top: 15px;
  right: -40px;
  width: 140px;
  text-align: center;
  transform: rotate(45deg);
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  padding: 6px 0;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
}

/* สีของป้าย */
.ribbon.available {
  background: linear-gradient(90deg, #2ecc71, #27ae60);
}

.ribbon.borrowed {
  background: linear-gradient(90deg, #e74c3c, #c0392b);
}

/* ครอบรูปภาพให้เป็นตำแหน่ง relative */
.cover-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}


.status-overlay.available {
  background: rgba(0, 200, 83, 0.85);
  color: white;
}

.status-overlay.borrowed {
  background: rgba(229, 57, 53, 0.85);
  color: white;
}

/* -------- ส่วนข้อมูล -------- */
.title {
  font-size: 22px;
  font-weight: 700;
  color: #005baa;
  text-align: center;
  margin-top: 12px;
}
.author {
  color: #555;
  font-size: 16px;
  text-align: left;
}
.price {
  color: #00b4d8;
}
.detail-row {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 16px;
  color: #010002;
}
.label {
  margin-right: 4px;
}

/* -------- ปุ่มยืม -------- */
.borrow-btn {
  margin-top: 20px;
  --background: linear-gradient(90deg, #0078d7, #00b4d8);
  font-weight: 600;
  border-radius: 10px;
  box-shadow: 0 6px 14px rgba(0, 120, 215, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.borrow-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 120, 215, 0.4);
}

.animate {
  animation: fadeIn 0.8s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.not-found {
  text-align: center;
  margin-top: 40px;
  font-size: 16px;
}
</style>

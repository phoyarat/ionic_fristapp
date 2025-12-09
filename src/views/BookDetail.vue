<template>
  <BaseLayout title="รายละเอียดหนังสือ" :showBack="true">
    
    <!-- เนื้อหาหลัก -->
    <template #default>
      <div v-if="book" class="book-card animate">
        <div class="cover-container">
          <img
            :src="book.cover_url || '/src/assets/cover-placeholder.png'"
            alt="Book cover"
            class="book-cover"
            @error="book.cover_url = '/src/assets/cover-placeholder.png'"
          />

          <!-- Ribbon -->
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
            <span class="label">▣ คงเหลือ:</span>
            <span class="value">{{ book.available_copies }} เล่ม</span>
          </div>

          <div class="detail-row">
            <span class="label">𖤘 ราคา:</span>
            <span class="value price">{{ book.price }} ฿</span>
          </div>

          <!-- ปุ่มด้านในเนื้อหา -->
          

          
        </div>
      </div>

      <ion-text v-else color="medium" class="not-found">
        <p>ไม่พบข้อมูลหนังสือ</p>
      </ion-text>
    </template>

    <!-- Footer -->
    <template #footer>
      <ion-toolbar>
        <div class="footer-buttons">
          <ion-button
            expand="block"
            class="borrow-btn"
            :disabled="book?.available_copies === 0"
            @click="borrowBook"
          >
            <ion-icon slot="start" name="book-outline"></ion-icon>
            ยืมหนังสือ
          </ion-button>

          <ion-button
            expand="block"
            color="danger"
            :disabled="book?.available_copies === book?.total_copies"
            @click="returnBook"
          >
            <ion-icon slot="start" name="book-outline"></ion-icon>
            คืนหนังสือ
          </ion-button>
        </div>
      </ion-toolbar>
    </template>

  </BaseLayout>
</template>



<script>
import BaseLayout from "@/components/BaseLayout.vue";
import {
  IonButton,
  IonText,
  IonIcon
} from "@ionic/vue";

export default {
  name: "BookDetail",
  components: {
    BaseLayout,
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
        total_copies: 3,
        cover_url: "https://api.chulabook.com/images/pid-148910.jpg",
      },
      {
        id: 2,
        title: "เรียน Coding ระดับเริ่มต้นด้วย Python",
        author: "กิตติพง อักนาน",
        price: 277.5,
        available_copies: 0,
        total_copies: 0,
        cover_url:
          "https://platform-api.nanmeebooks.com/uploads/images/image-1649076106247.jpg",
      },
      {
        id: 3,
        title: "ความรู้เบื้องต้นภาษาไพธอน",
        author: "ศุภชัย สมพานิช",
        price: 265.5,
        available_copies: 5,
        total_copies: 5,
        cover_url: "https://api.chulabook.com/images/pid-112671.jpg",
      },
    ];

    this.book = books.find((b) => b.id === id);
  },

  methods: {
    borrowBook() {
      if (this.book.available_copies > 0) {
        this.book.available_copies -= 1;
        alert(` คุณได้ยืมหนังสือ "${this.book.title}" แล้ว`);
      } else {
        alert("❌ หนังสือเล่มนี้ถูกยืมหมดแล้ว");
      }
    },

    returnBook() {
      if (this.book.available_copies < this.book.total_copies) {
        this.book.available_copies += 1;
        alert(` คุณได้คืนหนังสือ "${this.book.title}"`);
      } else {
        alert("❌ ไม่สามารถคืนได้ เพราะจำนวนหนังสือครบแล้ว");
      }
    },
  },
};
</script>



<style scoped>
/* พื้นหลัง */
ion-content {
  --background: var(--ion-background-color);
}

.book-card {
  background: var(--ion-item-background, #ffffff);
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
  transition: 0.25s ease;
}
body.dark .book-card {
  background: #1e1e1e;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.45);
}

.book-card:hover {
  transform: translateY(-3px);
}

/* รูปหนังสือ */
.cover-container {
  position: relative;
}
.book-cover {
  width: 70%;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

/* Ribbon */
.ribbon {
  position: absolute;
  top: 18px;
  right: -40px;
  width: 140px;
  transform: rotate(45deg);
  text-align: center;
  padding: 6px 0;
  font-size: 13px;
  font-weight: bold;
  border-radius: 4px;
  color: #fff;
}

/* Light */
.ribbon.available {
  background: linear-gradient(90deg, #2ecc71, #27ae60);
}
.ribbon.borrowed {
  background: linear-gradient(90deg, #e74c3c, #c0392b);
}

/* Dark */
body.dark .ribbon.available {
  background: linear-gradient(90deg, #27ae60, #1f8b4d);
}
body.dark .ribbon.borrowed {
  background: linear-gradient(90deg, #c0392b, #992a22);
}

/* ข้อมูลหนังสือ */
.title {
  color: var(--ion-text-color);
  text-align: center;
  font-size: 22px;
  margin-top: 12px;
  font-weight: 700;
}

.author {
  color: var(--ion-text-color);
}

.detail-row {
  display: flex;
  font-size: 16px;
  color: var(--ion-text-color);
}

.price {
  color: var(--ion-color-primary);
}

/* ปุ่ม */
.borrow-btn {
  margin-top: 20px;
  --background: var(--ion-color-primary);
  --color: #fff;
  border-radius: 10px;
  font-weight: 600;
}
.borrow-btn:disabled {
  opacity: 0.6;
}

.animate {
  animation: fadeIn 0.8s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
  }
}

.not-found {
  text-align: center;
  margin-top: 40px;
  font-size: 16px;
  color: var(--ion-text-color);
}
.book-cover {
  display: block;       /* ทำให้ img เป็น block element */
  margin: 0 auto;       /* จัดให้อยู่ตรงกลางแนวนอน */
}

</style>

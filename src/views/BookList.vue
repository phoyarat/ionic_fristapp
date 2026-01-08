<template>
  <BaseLayout title="รายการหนังสือ">

    <!-- ปุ่มเพิ่มหนังสือ -->
    <div class="flex justify-center mb-4">
      <IonButton size="small" @click="showModal = true">
        <IonIcon :icon="add" />
        เพิ่มหนังสือ
      </IonButton>
    </div>

    <!-- ค้นหา -->
    <IonSearchbar v-model="q" placeholder="ค้นหา..." />

    <!-- รายการหนังสือ -->
    <IonList>
      <BookCard
        v-for="b in filtered"
        :key="b.id"
        :book="b"
        @select="open"
        @delete="remove"
      >
        <template #extra>
          <IonBadge :color="b.available_copies > 0 ? 'success' : 'danger'">
            {{ b.available_copies > 0 ? "ว่าง" : "ยืม" }}
          </IonBadge>
        </template>
      </BookCard>
    </IonList>

    <!-- Modal เพิ่มหนังสือ -->
    <IonModal :is-open="showModal" @didDismiss="closeModal">

      <IonHeader>
        <IonToolbar>
          <IonTitle>เพิ่มหนังสือ</IonTitle>

          <IonButtons slot="end">
            <IonButton @click="closeModal">ปิด</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">

        <IonItem>
          <IonInput v-model="form.title" label="ชื่อหนังสือ" />
        </IonItem>

        <IonItem>
          <IonInput v-model="form.author" label="ผู้แต่ง" />
        </IonItem>

        <IonItem>
          <IonInput v-model="form.price" label="ราคา" />
        </IonItem>

        <IonItem>
          <IonInput
            v-model.number="form.available_copies"
            type="number"
            label="จำนวน"
          />
        </IonItem>

        <!-- preview image -->
        <div class="flex justify-center my-4" v-if="form.cover_url">
          <IonImg :src="form.cover_url" class="w-28 h-40 rounded shadow" />
        </div>

        <div class="flex justify-center mb-4">
          <IonButton size="small" color="secondary" @click="selectImage">
            อัปโหลดรูปปก
          </IonButton>
        </div>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          hidden
          @change="onImageChange"
        />

        <IonButton expand="block" class="mt-4" @click="saveBook">
          บันทึก
        </IonButton>

      </IonContent>
    </IonModal>

  </BaseLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

/* Ionic components */
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonSearchbar,
  IonList,
  IonBadge,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonImg
} from "@ionic/vue"

;

/* icon */
import { add } from "ionicons/icons";

/* components */
import BaseLayout from "@/components/BaseLayout.vue";
import BookCard from "@/views/BookCard.vue";

/* store / router */
const store = useStore();
const router = useRouter();

/* search */
const q = ref("");

const books = computed(() => store.getters.allBooks);

const filtered = computed(() =>
  books.value.filter(
    (b) =>
      b.title.toLowerCase().includes(q.value.toLowerCase()) ||
      b.author.toLowerCase().includes(q.value.toLowerCase())
  )
);
function remove(id) {
  if (confirm("ต้องการลบหนังสือเล่มนี้ใช่ไหม?")) {
    store.commit("DELETE_BOOK", id)
  }
}
/* open book detail */
function open(id) {
  router.push({ name: "BookDetail", params: { id } });
}

/* ---------- modal ---------- */
const showModal = ref(false);

function closeModal() {
  showModal.value = false;
}

/* ---------- form ---------- */
const form = ref({
  title: "",
  author: "",
  price: "",
  available_copies: 1,
  cover_url: ""
});

/* ---------- upload image ---------- */
const fileInput = ref(null);

function selectImage() {
  fileInput.value.click();
}

function onImageChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  form.value.cover_url = URL.createObjectURL(file);
}

/* ---------- save ---------- */
function saveBook() {
  if (!form.value.title || !form.value.author) {
    alert("กรอกชื่อหนังสือและผู้แต่งก่อน");
    return;
  }

  store.commit("ADD_BOOK", {
    id: Date.now(),
    ...form.value
  });

  // reset form
  form.value = {
    title: "",
    author: "",
    price: "",
    available_copies: 1,
    cover_url: ""
  };

  showModal.value = false;
}
</script>

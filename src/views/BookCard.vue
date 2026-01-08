<template>
  <ion-item
    button
    detail="false"
    class="rounded-xl my-2 shadow-sm bg-white"
    @click="$emit('select', book.id)"
  >
    <ion-thumbnail slot="start">
      <img :src="book.cover_url || '/src/assets/cover-placeholder.png'" />
    </ion-thumbnail>

    <ion-label>
      <h2 class="font-semibold text-[15px] text-gray-800">
        {{ book.title }}
      </h2>

      <p class="text-gray-600 text-sm">{{ book.author }}</p>

      <small class="text-gray-500">
        คงเหลือ: {{ book.available_copies }}
      </small>
    </ion-label>

    <!-- badge จาก parent -->
    <slot name="extra"></slot>

    <!-- ปุ่มลบ -->
    <ion-button
      color="danger"
      size="small"
      slot="end"
      @click.stop="$emit('delete', book.id)"
    >
      ลบ
    </ion-button>
  </ion-item>
</template>

<script setup>
import { IonItem, IonThumbnail, IonLabel, IonButton } from "@ionic/vue";

defineProps({
  book: { type: Object, required: true },
});

defineEmits(["select", "delete"]);
</script>

<template>
  <div class="book-card" @click="handleClick">
    <img :src="book.cover" class="cover" />
    <h3>{{ book.title }}</h3>
    <p>{{ book.author }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  book: Object
});

// ส่งข้อมูลกลับไป Parent
const emit = defineEmits(["click-book"]);

function handleClick() {
  emit("click-book", props.book.id);
}
</script>

<style>
.book-card {
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
}
.cover {
  width: 100%;
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>รายการหนังสือ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <BookCard
        v-for="(book, idx) in books":key="idx":title="book.title":price="book.price":author="book.author"@remove="onDelete(idx)"
      />
    </ion-content>
  </ion-page>
</template>
<script>
import BookCard from "../views/BookCards.vue";
export default {
  components: { BookCard },
  data() {
    return {
      books: [
        { title: "เรียน Vue 3", price: 299 , author:"kim" },
        { title: "JavaScript Basics", price: 199 ,author:"ice"},
        { title: "Frontend Patterns", price: 350 ,author:"phoyarat kamnan"}
      ]
    };
  },
  methods: {
    onDelete(idx) {
      this.books.splice(idx, 1);
    }
  }
};

</script>

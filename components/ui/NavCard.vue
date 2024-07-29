<template>
  <div>
    <v-card
    :to="{
      name: 'category',
      params:{ category: category.attributes.slug}
    }"
    >
      <v-img :src="category.attributes.img || 'https://www.eclosio.ong/wp-content/uploads/2018/08/default.png'" height="150"></v-img>
      <v-card-title class="body-1">
        <v-icon class="mr-2" color="primary">{{ category.attributes.icon }}</v-icon>
        {{ category.attributes.name }}
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'NavCard',
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

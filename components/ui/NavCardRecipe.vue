<template>
  <v-card
  :to="{
          name: 'category-recipe',
          params: {
            recipe: recipe.id,
            category: $route.params.category
          }
        }"
  >
    <v-img
      :src="recipe.attributes.img"
      height="200px"
    ></v-img>
    <v-card-title >
      <v-row>
        <v-col cols="7" class="primary--text">
          {{ recipe.attributes.name }}
          <span class="body-2 secondary--text">Author: @{{ recipe.attributes.autor.data.attributes.username }}</span>
        </v-col>
        <v-col cols="5">
          <v-icon :color="recipe.attributes.likes == 0 ? 'secondary' : 'accent'">mdi-heart</v-icon>
          <v-text class="body-1">{{ recipe.attributes.likes }}</v-text>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      {{ recipe.attributes.description }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'NavCardRecipe',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
}
</script>

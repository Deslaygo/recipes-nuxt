<template>
  <v-card width="400">
    <v-card-title>
      <v-row>
        <v-col cols="12" justify="end">
          <v-menu
            v-model="menu"

            >
            <template v-slot:activator="{on}">
              <v-btn v-on="on" icon>
                <v-icon color="primary">mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-card width="300">
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary">mdi-text-box-edit</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="primary--text">Update</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="error">mdi-delete-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="error--text">Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-img height="200" :src="recipe.img" aspect-ratio="1"></v-img>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="7" justify="center">
              <v-icon color="primary">mdi-food</v-icon>
              <v-card-text class="primary--text">{{ recipe.name }}</v-card-text>
            </v-col>
            <v-col cols="5">
              <v-chip color="primary" class="white--text body-3">{{ recipe.category.name }}</v-chip>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12">
              <v-card-text class="pa-0">{{ recipe.description }}</v-card-text>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UserRecipeCard',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      menu: false
    }
  }

}
</script>

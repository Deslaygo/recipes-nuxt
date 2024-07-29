<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <h2 class="primary--text headline">{{ $auth.user.username }}'s recipes</h2>
      </v-col>
      <v-col cols="2" justify="end">
        <v-btn color="primary" @click="openCreateModal">Create Recipe</v-btn>
      </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>

    <v-dialog v-model="createModal" max-width="600">
      <component is="app-forms-create-recipe" @close="createModal = $event"></component>
    </v-dialog>

    <v-dialog v-model="deleteModal" max-width="600">
      <component is="app-forms-delete-recipe" @close="deleteModal = $event"></component>
    </v-dialog>

    <v-row>
        <v-col v-for="recipe in recipes" cols="4" :key="recipe.id">
          <app-ui-user-recipe-card
          :recipe="recipe"
          @open-delete="openDeleteModal"
          >

          </app-ui-user-recipe-card>
        </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
export default {

  name: 'UserIndex',
  middleware: 'auth',
  computed: {
    ...mapGetters({
      recipes: 'userRecipes/getRecipes'
    }),
  },
  data() {
    return {
      createModal: false,
      deleteModal: false,
    }
  },
  mounted(){
    this.reloadRecipes();
  },
  methods: {
    openCreateModal(){
    this.createModal = true;
    },
    openDeleteModal(){
      this.deleteModal = true;
    },
    async reloadRecipes(){
      console.log("execute reload recipes")
      this.$store.dispatch('userRecipes/loadRecipes');
    }
  }
}
</script>

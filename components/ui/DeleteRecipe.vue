<template>
  <v-card>
      <v-card-title class="title primary white--text mb-4">
      <v-row>
        <v-col cols="12" justify="center">
          <v-icon dark>mdi-delete</v-icon>
          <span>Delete Recipe</span>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-card-text class="mb-4">Are you sure you want to delete this recipe?</v-card-text>
      <v-card-text class="mb-4">{{ recipe.name }}</v-card-text>
      <v-row>
        <v-col cols="6">
          <v-btn block color="error" @click="deleteRecipe">Delete</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block outlined color="secondary" @click="close">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DeleteRecipe',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods:{
    close(){
      this.$emit('close',false)
    },
    async deleteRecipe(){
      await this.$apollo.mutate({
        context:{
          headers:{
            authorization:this.$auth.strategy.token.get()
          }
        },
        mutation: require('../../graphql/deleteRecipe.gql'),
        variables:{
          id: this.recipe.id
        }
      }).then(res => {
        window.location.reload();
      })
    }
  }
}
</script>

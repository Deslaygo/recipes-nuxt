<template>
  <v-card>
    <v-card-title class="title primary white--text mb-4">
      <v-row>
        <v-col cols="12" justify="center">
          <v-icon dark>mdi-food</v-icon>
          <span>Create Recipe</span>
        </v-col>
      </v-row>
    </v-card-title>
  <v-card-text>
    <v-form @submit.prevent="onSubmit">
        <v-text-field dense outlined label="Type name" v-model="createData.name" type="input"></v-text-field>
        <v-text-field dense outlined label="Type duration" v-model="createData.duration" type="number"></v-text-field>
        <v-text-field dense outlined label="Type servings" v-model="createData.servings" type="number"></v-text-field>
        <v-text-field dense outlined label="Type img" v-model="createData.img" type="input"></v-text-field>
        <v-text-field dense outlined label="Type category" v-model="createData.category" type="number"></v-text-field>
        <v-textarea label="Type description" variant="outlined" v-model="createData.description"></v-textarea>
        <div class="d-flex justify-space-between">
          <v-btn small outlined color="secondary" @click="close">Cancel</v-btn>
          <v-btn small color="primary" type="submit">Save</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      createData: {
        name: '',
        description: '',
        duration: 0,
        servings: 0,
        img: '',
        category: '',
        author: '',
      }
    }
  },
  methods:{
    close(){
      this.$emit('close',false)
    },
    async onSubmit(){
      this.createData.author = this.$auth.user.id;
      this.createData.duration = parseInt(this.createData.duration);
      this.createData.servings = parseInt(this.createData.servings);
      this.createData.category = parseInt(this.createData.category);
      await this.$apollo.mutate({
          context:{
            headers:{
              authorization:this.$auth.strategy.token.get()
            }
          },
          mutation:require("../../graphql/createRecipe.gql"),
          variables:this.createData
        }).then(res =>{
        this.close();
      })
      this.$store.dispatch('userRecipes/loadRecipes');
    }
  }
}
</script>

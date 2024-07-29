<template>
  <v-container>
    <v-row>
      <v-col
      cols="3"
      v-for="(category, index) in categories"
      :index="category.id"
      >
      <app-ui-nav-card :category="category" ></app-ui-nav-card>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { categories } from '../graphql/queries';

// import { categories } from '../graphql/queries';
export default {
  name: 'IndexPage',
  // middleware: 'initData',
  data: () => ({
    // query: categories

  }),
  computed: {
    categories(){
      return this.$store.getters.getCategories
    }
  },
  // async fetch() {
  //   const client = this.$apollo.getClient();

  //   const query = {
  //     query: require('../graphql/categories.gql')
  //   };

  //   await client.query(query).then((response) => {
  //     this.categories = response.data.categories.data;
  //   });
  // },
  // async asyncData(context) {
  //   const client = context.app.apolloProvider.defaultClient;
  //   const query = {
  //     query: require('../graphql/categories.gql')
  //   };
  //   let categories = []
  //   await client.query(query).then((response) => {
  //     categories = response.data.categories.data;
  //   });

  //   return {
  //     categories
  //   }
  // },
  // apollo:{
  //   categories:{
  //     query: categories
  //   }
  // }
}
</script>

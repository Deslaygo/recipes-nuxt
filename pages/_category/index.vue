<template>
  <v-container>
    <h2 class="primary--text">{{ category.attributes.name }}</h2>
    <p class="secondary--text">{{ category.attributes.description }}</p>
    <v-divider></v-divider>
    <v-row class="mt-3">
      <v-col
        v-for="(recipe, index) in recipes"
        :key="index"
        cols="4"
        md="4"
      >
        <app-ui-nav-card-recipe :recipe="recipe"></app-ui-nav-card-recipe>
      </v-col>
    </v-row>
    <!-- <ApolloQuery
      :query="query"
      :variables="{
        id: $route.query.id
      }"
      v-slot="{ result: { loading, error, data }, query }"
    >

      {{ data }}
    </ApolloQuery> -->
  </v-container>
</template>

<script>
import { category } from '../../graphql/queries';


export default {
  name: 'CategoryPage',
  data: () => ({
    query: category
  }),
  computed: {
    category(){
      let slug = this.$route.params.category;
      return this.$store.getters.getCategories.find(cat => cat.attributes.slug === slug);
    }
  },
  async asyncData({app, route}) {
    const slug = route.params.category;
    const cliente = app.apolloProvider.defaultClient;
    const query = {
      query: require('../../graphql/recipes.gql'),
      variables: {
        slug
      }
    }
    let recipes = [];
    await cliente.query(query).then((response) => {
      recipes = response.data.recipes.data;
    });

    return {
      recipes
    }
  },
  // apollo:{
  //   category: {
  //     query : category,
  //     variables(){
  //       return {
  //         id: this.$route.query.id
  //       }
  //     }
  //   }
  // }
}
</script>

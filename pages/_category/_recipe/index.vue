<template>
  <v-container>
    <h1 class="primary--text">{{ recipe.attributes.name }}</h1>
    <h4 class="secondary--text">{{ recipe.attributes.category.data.attributes.name }}</h4>
    <v-divider></v-divider>
    <v-card class="mt-3">
      <v-card-title>
       <v-icon color="black" class="ml-2">mdi-information</v-icon> Información
      </v-card-title>

      <v-card-text class="black--text">
        <v-row>
          <v-col cols="6">
            <v-chip color="primary" class="mr-4">
              <v-icon color="white">mdi-account-group</v-icon>
              <span class="ml-2">{{ recipe.attributes.servings }}</span>
            </v-chip>

            <v-chip color="primary">
              <v-icon color="white">mdi-clock</v-icon>
              <span class="ml-2">{{ recipe.attributes.duration }} min.</span>
            </v-chip>
            <v-divider class="my-5"></v-divider>
            <h2 class="primary--text">Description</h2>
            <p class="body-1">{{ recipe.attributes.description }}</p>

            </v-col>
          <v-col cols="6">
            <v-img :src="recipe.attributes.img" aspect-ratio="1" max-height="300"></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <div class="mt-4">
      <v-row justify="between">
        <v-col cols="5">
          <v-card>
            <v-title>
              <v-icon>mdi-fridge</v-icon>
              <span class="ml-2">Ingredients</span>
            </v-title>
            <v-list>
                <v-list-item
                v-for="(ingredient, i) in recipe.attributes.ingredients"
                :key="i"
                >
                {{ ingredient }}
                </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-card>
            <v-title>
              <v-icon>mdi-stove</v-icon>
              <span class="ml-2">preparation</span>
            </v-title>
            <v-timeline>
              <v-timeline-item
              v-for="(step, i) in recipe.attributes.steps"
                :key="i"
              >
              {{ step }}
            </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  name: 'RecipePage',
  async asyncData({app, route}) {
    const id = route.params.recipe;
    const cliente = app.apolloProvider.defaultClient;
    const query = {
      query: require('../../../graphql/recipe.gql'),
      variables: {
        id
      }
    }
    let recipe = {};
    await cliente.query(query).then((response) => {
      console.log(response);
      recipe = response.data.recipe.data;
    }).catch((error) => {
      console.log(error);
    })

    return {
      recipe
    }
  },
}</script>

export const strict = false


export const state = () => ({
  counter: 1,
  categories: [],
  loadedRecipes: [],
});

export const getters = {
  getCounter(state) {
    return state.counter;
  },
  getCategories(state) {
    return state.categories;
  },
  getLoadedRecipes(state) {
    return state.loadedRecipes;
  }
}

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
  setLoadedRecipes(state, loadedRecipes) {
    state.loadedRecipes = loadedRecipes;
  },
  increment(state) {
    state.counter++;
  }
}

export const actions = {
  nuxtServerInit({ commit }) {

    console.log('nuxtServerInit');
    return new Promise((resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient;
      const query = {
        query: require('../graphql/categories.gql')
      }

      client.query(query)
        .then((response) => {
          console.log("categories",response);
          commit('setCategories', response.data.categories.data);
          // commit('setLoadedRecipes', response.data.recipes.data);
          resolve();
        })
        .catch((error) => {

          reject();
        });
    });
  },
  increment(context) {
    setTimeout(() => {
      context.commit('increment');
    },1000);
  },
  searchRecipe({ commit }, search) {
    const client = this.app.apolloProvider.defaultClient;
    const query = {
      query: require('../graphql/searchRecipe.gql'),
      variables:{
        term:search
      }
    }

    client.query(query)
      .then((response) => {
        commit('setLoadedRecipes', response.data.recipes.data);
        console.log(response)
      })
      .catch((error) => {
        console.error('error', error);
      });
  }
}

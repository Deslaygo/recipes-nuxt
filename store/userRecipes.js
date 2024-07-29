import { remapRecipes } from '../helpers/utils';
export const strict = false


export const state = () => ({
  recipes: [],
});

export const getters = {
  getRecipes(state) {
    return state.recipes;
  }
}

export const mutations = {
  setRecipes(state, recipes) {
    state.recipes = recipes;
  }
}

export const actions = {
  setRecipes({commit}, payload) {
    commit('setRecipes', payload);
  },
  async loadRecipes({commit}) {
    const client = this.app.apolloProvider.defaultClient;
    let id = this.app.$auth.user.id;
    let query ={
      query: require('../graphql/userRecipes.gql'),
      variables: { id }
    }

    await client.query(query)
      .then((res) => {
        let recipes = remapRecipes(res.data.recipes.data);
        commit('setRecipes', recipes);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

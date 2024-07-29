
export const strict = false


export const state = () => ({
  snackbars: [],
});

export const getters = {
  getSnackbars(state) {
    return state.snackbars;
  }
}

export const mutations = {
  setSnackbar(state, snack) {
    state.snackbars = state.snackbars.concat(snack);
  }
}

export const actions = {
  setSnackbar({commit}, snack) {
    snack.show = true;
    snack.timeout = snack.timeout || 2000;
    snack.color = snack.color || 'success';
    snack.text = snack.text || '';
    commit('setSnackbar', snack);
  }
}

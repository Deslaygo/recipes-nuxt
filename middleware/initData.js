export default function initData({ store }) {
  console.log("function initData");
  if(store.state.categories.length === 0) {
    store.dispatch('nuxtServerInit');
  }
}

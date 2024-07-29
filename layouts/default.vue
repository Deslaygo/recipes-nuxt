<template>
  <v-app>
    <v-navigation-drawer
    app
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    >
    <v-list color="primary--text">
      <v-list-item
      to="/"
      >
      <v-list-item-icon>
        <v-icon>mdi-home</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          Home
        </v-list-item-title>
      </v-list-item-content>

      </v-list-item>
      <v-list-item
      v-for="link in links"
      :key="link.id"
      :to="{
        name: 'category',
        params: {
          category: link.attributes.slug
        }
      }"
      >
      <v-list-item-icon>
        <v-icon>{{ link.attributes.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          {{ link.attributes.name }}
        </v-list-item-title>
      </v-list-item-content>

      </v-list-item>
    </v-list>
    </v-navigation-drawer>
    <v-app-bar
    app
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-model="search" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{on}">
          <v-btn v-on="on" color="primary" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <v-card width="700" class="pa-4">
          <v-card-title>Search recipes</v-card-title>
          <v-text-field
            outlined
            dense
            v-model="findRecipe"
            label="Type recipe"
            type="input"
            @input="searchRecipe"
          ></v-text-field>
          <v-list v-if="findRecipe.length !== 0">
            <v-list-item
            v-for="recipe in recipes"
            :key="recipe.id"
            @click="goToRecipe(recipe.attributes.category.data.attributes.slug, recipe.id)"
            >{{ recipe.attributes.name }}</v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <div v-if="$auth.loggedIn">
        <v-menu
        v-model="loginMenu"
        :close-on-content-click="false"
        offset-y
        >
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon>
            <v-avatar class="primary">
              <span class="white--text headline">{{ $auth.user.username[0] }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-content>
                <v-list-item-title>{{ $auth.user.username }}</v-list-item-title>
                <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
              </v-list-content>
              <v-list-item-action>
                <v-btn to="/user">Details</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn text color="primary" @click="loginMenu = false">Close</v-btn>
            <v-btn color="error" @click="logout()" class="mr-4" small>Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      </div>
      <div v-else>
        <v-btn color="primary" @click="openDialog('app-forms-login')" class="mr-4">Login</v-btn>
        <v-btn color="primary" @click="openDialog('app-forms-register')">Register</v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
      <v-snackbar
      v-for="(snack,i) in snacks"
      :key="i"
      v-model="snack.show"
      :color="snack.color"
      :timeout="snack.timeout"
      right
      :style="`bottom: ${i * 60 + 8}px`"
      >
      {{ snack.text }}
      <v-btn slot="action" small icon @click="snack.show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    {{ snacks }}
    </v-main>

    <v-dialog v-model="dialog">
      <component :is="type" @close="dialog = $event"></component>
    </v-dialog>

    <v-footer padless>
      <v-row justify="center" no-gutters>
        <v-btn color="primary" small icon><v-icon>mdi-facebook</v-icon></v-btn>
        <v-btn color="primary" small icon><v-icon>mdi-instagram</v-icon></v-btn>
        <v-btn color="primary" small icon><v-icon>mdi-pinterest</v-icon></v-btn>
        <v-btn color="primary" small icon><v-icon>mdi-twitter</v-icon></v-btn>
        <v-col class="text-center primary--text" cols="12">
          &copy; {{ new Date().getFullYear() }} Recipes
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: false,
      dialog: false,
      title: 'Recipes',
      search: false,
      showSnack: false,
      snackText: 'hola from snackbar',
      findRecipe: '',
      type: 'app-forms-login',
      loginMenu: false
    }
  },
  computed: {
    ...mapGetters({
      links: 'getCategories',
      recipes: 'getLoadedRecipes',
      snacks: 'snackbars/getSnackbars'
    }),
    filteredRecipes(){
      return this.recipes.filter(recipe =>
        recipe.attributes.name.toLowerCase().match(this.findRecipe.toLowerCase())
      )
    }
  },
  methods: {
    goToRecipe(category, recipe){
      this.search = false;
      this.findRecipe = '';
      this.$router.push({
        name: 'category-recipe',
        params: {
          category,
          recipe
        }
      })
    },
    searchRecipe(){
      this.$store.dispatch('searchRecipe', this.findRecipe)
    },
    openDialog(type){
      this.showSnack = true;
      this.type = type;
      this.dialog = true;
    },
    testSnack(){
      this.$store.dispatch('snackbars/setSnackbar', {
        text: 'hola from snackbar',
        color: 'info'
      })
    },
    logout(){
      this.$auth.logout();
    }
  }
}
</script>

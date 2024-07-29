<template>
  <v-card min-width="400" width="500">
    <v-card-title class="title primary white--text mb-4">
      <v-row>
        <v-col cols="12" justify="center">
          <v-icon dark>mdi-account-key</v-icon>
          <span>Login</span>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit">
        <v-text-field dense outlined label="Type username" v-model="userInfo.identifier"type="input"></v-text-field>
        <v-text-field dense outlined label="Type username" v-model="userInfo.password"type="password"></v-text-field>
        <div class="d-flex justify-space-between">
          <v-btn small outlined color="secondary" @click="close">Cancel</v-btn>
          <v-btn small color="primary" type="submit">Login</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'LoginForm',
  data(){
    return {
      userInfo: {
        identifier: '',
        password: ''
      }
    }
  },
  methods: {
    login(){

    },
    close(){
      this.$emit('close',false)
    },
    async onSubmit(){
      await this.$auth.loginWith('local', {
        data: this.userInfo
      }).then((response) => {
        console.log(this.$auth)
        this.close();
      }).catch((error) => {
        this.$store.dispatch('snackbars/setSnackbar', {
          text: 'Wrong username or password',
          color: 'error'
        })
      })
    }
  }
}
</script>

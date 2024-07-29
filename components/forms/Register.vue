<template>
  <v-card min-width="400" width="500">
    <v-card-title class="title primary white--text mb-4">
      <v-row>
        <v-col cols="12" justify="center">
          <v-icon dark>mdi-account-plus</v-icon>
          <span>Register</span>
        </v-col>
      </v-row>
    </v-card-title>
    <v-container>
      <v-form @submit.prevent="onSubmit">
        <v-card-text>
          <v-text-field dense outlined v-model="userInfo.name" label="Type name" type="input"></v-text-field>
          <v-text-field dense outlined v-model="userInfo.username" label="Type username" type="input"></v-text-field>
          <v-text-field dense outlined v-model="userInfo.email" label="Type Email" type="input"></v-text-field>
          <v-text-field dense outlined v-model="userInfo.password" label="Type password" type="password"></v-text-field>
          <v-text-field dense outlined v-model="userInfo.confirm_password" label="Type confirm password" type="password"></v-text-field>
          <div class="d-flex justify-space-between">
            <v-btn small outlined color="secondary" @click="close">Cancel</v-btn>
            <v-btn small color="primary" type="submit">Save</v-btn>
          </div>
        </v-card-text>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'RegisterForm',
  data(){
    return {
      userInfo:{
        name:'',
        username:'',
        email:'',
        password:'',
        confirm_password:''
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
      await this.$apollo.mutate({
        mutation: require('../../graphql/register.gql'),
        variables:{
          username: this.userInfo.username,
          email: this.userInfo.email,
          password: this.userInfo.password,
        }
      }).then(res => {
        this.$auth.loginWith('local', {
          data: {
            identifier: this.userInfo.username,
            password: this.userInfo.password
          }
        }).then(() => {
          this.close()
        })
      });
    }
  }
}
</script>

<template>
  <v-app class="masterpage-container">
    <v-app-bar app color="primary" dense>
      <h3 style="color:white;">Usuário: {{user.name}}</h3>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push('produtos')" :disabled="$router.history.current.name == 'Products'">
        <v-icon color="white" >mdi-sack</v-icon>
      </v-btn>
      <v-btn icon @click="$router.push('categorias')" :disabled="$router.history.current.name == 'Categories'">
        <v-icon color="white">mdi-shape</v-icon>
      </v-btn>
      <v-menu :close-on-content-click="false" :nudge-width="150" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon color="white">mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-btn block depressed @click="logOutUser(); $router.push('login')">LogOut</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>
    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: "App",
  computed: {
    ... mapGetters([ 'user' ])
  },
  methods: {
    ... mapMutations([ 'logOutUser' ])
  },
};
</script>

<style>
  .masterpage-container {
    background-color:#e8dfdf;
  }
</style>

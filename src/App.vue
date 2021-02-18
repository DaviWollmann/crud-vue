<template>
  <v-app style="background-color:#e8dfdf;">
    <v-app-bar app color="primary" dense>
      <h3 style="color:white;">Usuário: {{user.name}}</h3>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="white" @click="$router.push('produtos')">mdi-sack</v-icon>
      </v-btn>
      <v-btn icon @click="$router.push('categorias')">
        <v-icon color="white">mdi-shape</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "App",

  components: {},

  computed: {
    ... mapGetters([
      'user'
    ])
  }
};
</script>

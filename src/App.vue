<template>
  <v-app style="background-color:#e8dfdf;">
    <v-app-bar app color="primary" dense>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>

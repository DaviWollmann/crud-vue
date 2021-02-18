<template>
  <div class="home">
    {{this.teste}}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Home",
  components: {},
  computed: {
    ... mapState({
      teste: state => state.teste
    })
  }
};
</script>

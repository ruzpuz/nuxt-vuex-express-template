<template>
  <div>
    <v-select
      :key="selected"
      v-model="selected"
      :flat="true"
      :items="languages"
      class="dense-input"
      label="Standard"
      @change="languageChange">
      <template
        slot="selection"
        slot-scope="data">
        <v-flex xs12>
          <img
            :src="getSelectedUrl(data.item)"
            :alt="data.item">
        </v-flex>
      </template>
      <template
        slot="item"
        slot-scope="data">
        <v-list-tile-avatar
          :key="reload">
          <img
            :src="getImageUrl(data.item)"
            :alt="data.item">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title> {{ data.item }} </v-list-tile-title>
        </v-list-tile-content>
      </template>
    </v-select>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';

  export default {
    name: 'LanguagePicker',
    data() {
      return {
        languages: this.$store.getters['languages/getAvailable'],
        selected: this.$store.getters['languages/getSelected'],
        reload: Math.random()
      };
    },
    mounted() {
      Cookies.set('language', this.selected, { path: '/' });
    },
    methods: {
      getSelectedUrl(image) {
        return `/flags/4x3/${image}.svg`;
      },
      getImageUrl(image) {
        return `/flags/1x1/${image}.svg`;
      },
      languageChange(language) {

        this.$store.dispatch('languages/DO_SELECT_LANGUAGE', { language });
        this.$router.push(this.switchLocalePath(language));
      }
    }
  };
</script>

<style scoped>
  .dense-input { width:50px; }
</style>
<template>
  <v-select
    v-model="selected"
    :flat="true"
    :items="languages"
    class="dense-input"
    label="Standard">
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
      <v-list-tile-avatar>
        <img
          :src="getImageUrl(data.item)"
          :alt="data.item">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title> {{ data.item }} </v-list-tile-title>
      </v-list-tile-content>
    </template>
  </v-select>
</template>

<script>
  import Cookies from 'js-cookie';

  export default {
    name: 'LanguagePicker',
    data() {
      return {
        languages: this.$i18n.locales.map(item => item.code),
        selected: (() => {
          const cookie = Cookies.get('language');
          if(cookie) {
            return cookie;
          }
          Cookies.set('language', this.$i18n.defaultLocale, { path: '/' });
          return this.$i18n.defaultLocale;
        })()
      };
    },
    methods: {
      getSelectedUrl(image) {
        return `/flags/4x3/${image}.svg`;
      },
      getImageUrl(image) {
        return `/flags/1x1/${image}.svg`;
      }
    },
    created() {
      /*console.log(this.selected);
      console.log(Object.keys(this.$i18n));*/
    }
  };
</script>

<style scoped>
  .dense-input { width:50px; }
</style>
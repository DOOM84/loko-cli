<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Общая информация</h1>
    </div>
    <div class="row">
      <div class="col-12">
          <div id="editorone" ></div>
      </div>
    </div>
        <div class="custom-control custom-checkbox m-2 float-left">
          <input v-model="info.status" type="checkbox" class="custom-control-input" id="customCheck1">
          <label class="custom-control-label" for="customCheck1">Опубликовано</label>
        </div>
        <button v-if="mode === 'edit'" @click.prevent="updateItem" type="button" class="mod-but btn btn-success">Сохранить</button>
        <button v-else @click.prevent="createItem" type="button" class="mod-but btn btn-success">Сохранить</button>


    </div>
</template>

<script>
  import commonEditor from "~/mixins/commonEditor";
  export default {
    mixins: [commonEditor],
    layout: 'admin',
    data() {
      return {
        info: {
          text_content: '',
          status: '',
        },
        mode: '',
      }
    },

    async asyncData({store}) {
      try {
        const {info} = await store.dispatch('adminInfo/index');
        return {
          info,
          text_content: info.text_content
        }
      } catch (error) {
        /*if (error.response.status === 401) {
            return $nuxt.$router.replace('/login');
        }*/
      }
    },

    created() {
      this.mode = !this.info.text_content ? 'add' : 'edit';
    },

    methods: {
      async createItem() {
        try {
          this.info.text_content = this.editor.getContent();
           const {success} = await this.$store.dispatch('adminInfo/create', this.info);
           this.$notify({
             type: 'success',
             group: 'foo',
             text: success
           });
        } catch (e) {
          const message = e.response.data.errors;
          this.$notify({
            type: 'error',
            group: 'foo',
            text: 'Ошибка'
          });
        }
      },

      async updateItem(){
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          this.info.text_content = this.editor.getContent();
          const {success, info} = await this.$store.dispatch('adminInfo/update', this.info);
          this.info = info;
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          console.log(e);
        }
      },

    }
  }
</script>

<style lang="scss">

</style>

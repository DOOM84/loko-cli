<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Услуги</h1>
    </div>
    <div class="row">
      <div class="col-12">
          <div id="editorone" ></div>
      </div>
    </div>
        <div class="custom-control custom-checkbox m-2 float-left">
          <input v-model="service.status" type="checkbox" class="custom-control-input" id="customCheck1">
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
        service: {
          text_content: '',
          status: '',
        },
        mode: '',
      }
    },

    async asyncData({store}) {
      try {
        const {service} = await store.dispatch('adminService/index');
        return {
          service,
          text_content : service.text_content
        }
      } catch (error) {
        /*if (error.response.status === 401) {
            return $nuxt.$router.replace('/login');
        }*/
      }
    },

    created() {
      this.mode = !this.service.text_content ? 'add' : 'edit';
    },

    methods: {
      async createItem() {
        try {
          this.service.text_content = this.editor.getContent();
           const {success} = await this.$store.dispatch('adminService/create', this.service);
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
          this.service.text_content = this.editor.getContent();

          const {success, service} = await this.$store.dispatch('adminService/update', this.service);
          this.service = service;
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

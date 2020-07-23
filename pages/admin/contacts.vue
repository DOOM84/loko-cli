<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Контакты</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <div id="editorone" ></div>
      </div>
    </div>
    <button v-if="mode === 'edit'" @click.prevent="updateItem" type="button" class="mod-but btn btn-info">Сохранить</button>
    <button v-else @click.prevent="createItem" type="button" class="mod-but btn btn-info">Сохранить</button>


  </div>
</template>

<script>
  import commonEditor from "~/mixins/commonEditor";

  export default {
    mixins: [commonEditor],
    layout: 'admin',
    data() {
      return {
        contact: {
          address: '',
        },
        mode: '',
      }
    },

    async asyncData({store}) {
      try {
        const {contact} = await store.dispatch('adminContact/index');
        return {
          contact,
          text_content: contact.address
        }
      } catch (error) {
        /*if (error.response.status === 401) {
            return $nuxt.$router.replace('/login');
        }*/
      }
    },

    created() {
      this.mode = !this.contact.address ? 'add' : 'edit';
    },

    methods: {
      async createItem() {
        try {
          this.contact.address = this.editor.getContent();
          const {success} = await this.$store.dispatch('adminContact/create', this.contact);
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
          this.contact.address = this.editor.getContent();
          const {success, contact} = await this.$store.dispatch('adminContact/update', this.contact);
          this.contact = contact;
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

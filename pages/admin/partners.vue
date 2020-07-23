<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Партнеры</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button @click.prevent="showModal('add')" type="button" class="mod-but btn btn-info">
            Добавить
          </button>
        </div>
      </div>
    </div>
    <div v-if="partners" class="container">
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Изображение</th>
            <th scope="col">Опубликовано</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(partner, i) in partners" :key="partner.id">
            <th scope="row">{{i+1}}</th>
            <td>{{partner.name}}</td>
            <td>
              <img :src="partner.images.thumbnail" alt="">
            </td>
            <td>{{partner.status ? 'ДА' : 'Нет'}}</td>
            <td>
              <button @click.prevent="editItem(partner)" type="button" class="btn mod-btn btn-info"><i class="fa fa-edit"></i>
              </button>
              <button @click.prevent="deleteItem(partner.id)" type="button" class="btn mod-btn btn-danger"><i
                class="fa fa-remove"></i></button>

            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
    <client-only>
      <modal
        style="z-index: 1000000"
        name="conditional-modal"
        :adaptive="false"
        :max-width="1000"
        width="80%"
        height="auto"
        @before-close="beforeClose"
      >
        <div class="container">

          <div class="text-center">
            <img class="img-fluid" :src="partner.images.thumbnail" alt="">
          </div>


        <div class="form-group">
          <label for="name">Название (необязательно)</label>
          <input type="text" v-model="partner.name" class="form-control" id="name">
        </div>

        <div class="input-group p-2">
          <div class="custom-file">
            <input ref="file" type="file" class="custom-file-input" id="editFile" >
            <label class="custom-file-label" for="editFile">Выберите изображение </label>
          </div>
        </div>

          <div class="custom-control custom-checkbox m-2 float-left">
            <input v-model="partner.status" type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">Опубликовано</label>
          </div>

        <div class="float-right m-3">
          <button v-if="mode === 'add'"
                  type="button"
                  class="mod-but btn btn-success"
                  @click.prevent="uploadFiles">
            Загрузить
          </button>
          <button v-else
                  type="button"
                  class="mod-but btn btn-success"
                  @click.prevent="updateItem">
            Сохранить
          </button>
        </div>
        </div>
      </modal>
    </client-only>

  </div>
</template>

<script>
  export default {
    layout: 'admin',
    data() {
      return {
        partners: [],
        partner: {
          id: '',
          name: '',
          status: '',
          images: []
        },
        mode: '',
      }
    },

    async asyncData({store}) {
      try {
        const {partners} = await store.dispatch('adminPartner/index');
        return {
          partners
        }
      } catch (error) {
        /*if (error.response.status === 401) {
            return $nuxt.$router.replace('/login');
        }*/
      }
    },

    methods: {
      showModal(mode) {
        this.mode = mode;
        this.$modal.show('conditional-modal')
      },
      editItem(partner) {
        this.partner.id = partner.id;
        this.partner.name = partner.name;
        this.partner.images = partner.images;
        this.partner.status = partner.status;
        this.showModal('edit');
      },

      async uploadFiles() {
        let formData = new FormData();
          let file = this.$refs.file.files[0];
        if(file){formData.append('image', file)}
          formData.append('name', this.partner.name);
          formData.append('status', this.partner.status);
        try {
          const {success, partner} = await this.$store.dispatch('adminPartner/create', formData);
          this.$modal.hide('conditional-modal');
          this.partners.unshift(partner);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          this.$modal.hide('conditional-modal');
          const message = e.response.data.errors;
          for (const key of Object.keys(message)) {
            this.$notify({
              type: 'error',
              group: 'foo',
              text: message[key][0]
            });
            break;
          }
        }
      },

      async updateItem(){
        try {
          //console.log({id: this.id, hall: this.hall, status: this.status})
          let formData = new FormData();
          let upFile = this.$refs.file.files[0];
          if(upFile){formData.append('image', upFile)}

          formData.append('name', this.partner.name);
          formData.append('status', this.partner.status);
          formData.append('_method', 'PATCH');

          const {success, partner} = await this.$store.dispatch('adminPartner/update', {data: formData, id: this.partner.id});
          this.$set(this.partners, this.partners.findIndex(item => item.id === partner.id), partner);
          this.$modal.hide('conditional-modal');
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          this.$modal.hide('conditional-modal');
          const message = e.response.data.errors;
          for (const key of Object.keys(message)) {
            this.$notify({
              type: 'error',
              group: 'foo',
              text: message[key][0]
            });
            break;
          }
        }
      },

      beforeClose(event) {
        this.partner = {
            id: '',
            name: '',
            status: '',
            images: [],
        }
        if (this.mode === 'add' || this.mode === 'edit') {
          this.$refs.file.value = '';
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminPartner/delete', id);
          this.partners.splice(this.partners.findIndex(item => item.id === id), 1);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        }
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>

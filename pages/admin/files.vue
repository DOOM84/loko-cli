<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Файлы</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button @click.prevent="showModal('add')" type="button" class="mod-but btn btn-info">
            Добавить
          </button>
        </div>
      </div>
    </div>
    <div v-if="files" class="container">
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Файл</th>
            <th scope="col">Опубликовано</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(file, i) in files" :key="file.id">
            <th scope="row">{{i+1}}</th>
            <td>{{file.name}}</td>
            <td>
              <a :href="file.file" target="_blank">Показать/Скачать</a>
            </td>
            <td>{{file.status ? 'ДА' : 'Нет'}}</td>
            <td>
              <button @click.prevent="editItem(file)" type="button" class="btn mod-btn btn-info"><i class="fa fa-edit"></i>
              </button>
              <button @click.prevent="deleteItem(file.id)" type="button" class="btn mod-btn btn-danger"><i
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
        <div class="form-group">
          <label for="name">Название документа (файла)</label>
          <input type="text" v-model="file.name" class="form-control" id="name">
        </div>

        <div class="input-group p-2">
          <div class="custom-file">
            <input ref="file" type="file" class="custom-file-input" id="editFile" >
            <label class="custom-file-label" for="editFile">Выберите файл </label>
          </div>
        </div>

          <div class="custom-control custom-checkbox m-2 float-left">
            <input v-model="file.status" type="checkbox" class="custom-control-input" id="customCheck1">
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
        files: [],
        file: {
          id: '',
          name: '',
          status: '',
        },
        mode: '',
      }
    },

    async asyncData({store}) {
      try {
        const {files} = await store.dispatch('adminFile/index');
        return {
          files
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
      editItem(file) {
        this.file.id = file.id;
        this.file.name = file.name;
        this.file.status = file.status;
        this.showModal('edit');
      },

      async uploadFiles() {
        let formData = new FormData();
          let file = this.$refs.file.files[0];
        if(file){formData.append('file', file)}
          formData.append('name', this.file.name);
          formData.append('status', this.file.status);
        try {
          const {success, file} = await this.$store.dispatch('adminFile/create', formData);
          //console.log(file);
          this.$modal.hide('conditional-modal');
          this.files.unshift(file);
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
          let formData = new FormData();
          let upFile = this.$refs.file.files[0];
          if(upFile){formData.append('file', upFile)}

          formData.append('name', this.file.name);
          formData.append('status', this.file.status);
          formData.append('_method', 'PATCH');

          const {success, file} = await this.$store.dispatch('adminFile/update', {data: formData, id: this.file.id});
          this.$set(this.files, this.files.findIndex(item => item.id === file.id), file);
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

      async loadFiles() {
        const {files} = await this.$store.dispatch('adminFile/index');
        this.files = files;
        this.$modal.hide('conditional-modal')
      },

      beforeClose(event) {
        this.file = {
            id: '',
            name: '',
            status: '',
        }
        if (this.mode === 'add' || this.mode === 'edit') {
          this.$refs.file.value = '';
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminFile/delete', id);
          this.files.splice(this.files.findIndex(item => item.id === id), 1);
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

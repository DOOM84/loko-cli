<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Слайды</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button @click.prevent="showModal('add')" type="button" class="mod-but btn btn-success">
            Добавить
          </button>
        </div>
      </div>
    </div>
    <div v-if="slides" class="container">
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Изображение</th>
            <th scope="col">Опубликовано</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(pic, i) in slides" :key="pic.id">
            <th scope="row">{{i+1}}</th>
            <td>
              <img @click="showImage(pic.images.original)" style="cursor: pointer" :src="pic.images.thumbnail" alt="">
            </td>
            <td>{{pic.status ? 'ДА' : 'Нет'}}</td>
            <td>
              <button @click.prevent="editItem(pic)" type="button" class="btn mod-btn btn-info"><i class="fa fa-edit"></i>
              </button>
              <button @click.prevent="deleteItem(pic.id)" type="button" class="btn mod-btn btn-danger"><i
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
             :adaptive="true"
             :max-width="1000"
             width="80%"
             height="auto"
             @before-close="beforeClose"
      >
        <div class="p-2">
          <div class="text-center" v-if="mode === 'edit'">
            <img :src="image" alt="">
          </div>
        </div>

        <div v-if="mode === 'add'" class="input-group p-2">
          <div class="custom-file">
            <input ref="file" type="file" class="custom-file-input" id="customFile" multiple>
            <label class="custom-file-label" for="customFile">Выберите файл(ы)</label>
          </div>
        </div>

          <div class="custom-control custom-checkbox m-2 float-left">
            <input v-model="status" type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">Опубликовано</label>
          </div>
  <div class="float-right m-3">
        <button v-if="mode === 'add'"
                type="button"
                class="mod-but btn btn-success"
                @click.prevent="uploadImgs">
          Загрузить
        </button>

        <button v-else
                type="button"
                class="mod-but btn btn-success"
                @click.prevent="updateItem">
          Сохранить
        </button>
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
        status: 0,
        slides: [],
        mode: '',
        image: '',
        id: '',
      }
    },

    async asyncData({store}) {
      try {
        const {slides} = await store.dispatch('adminSlide/index');
        return {
          slides
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
      editItem(pic) {
        this.id = pic.id;
        this.status = pic.status;
        this.image = pic.images.thumbnail;
        this.showModal('edit');
      },

      async uploadImgs() {
        let formData = new FormData();

        for (let i = 0; i < this.$refs.file.files.length; i++) {
          let file = this.$refs.file.files[i];
          formData.append('images[' + i + ']', file,);
          formData.append('status', this.status);
        }
        try {
          const {success} = await this.$store.dispatch('adminSlide/create', formData);
          this.$modal.hide('conditional-modal');
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
          await this.loadGal();

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
          const {success, slide} = await this.$store.dispatch('adminSlide/update', {id: this.id, status: this.status});
          this.$set(this.slides, this.slides.findIndex(item => item.id === this.id), slide);
          this.$modal.hide('conditional-modal');
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          console.log(e);
        }
      },

      async loadGal() {
        const {slides} = await this.$store.dispatch('adminSlide/index');
        this.slides = slides;
        this.$modal.hide('conditional-modal')
      },

      beforeClose(event) {
        this.status = 0;
        this.image = '';
        if (this.mode === 'add') {
          if(this.$refs.file){this.$refs.file.value = '';}
          //console.log(this.$refs.file);
          // this.$refs.file.value = '';
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminSlide/delete', id);
          this.slides.splice(this.slides.findIndex(item => item.id === id), 1);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        }
      },

      showImage(pic) {
        this.$modal.show({
          template: `<img width="100%" :src="pic" alt="">`,
          props: ['pic']
        }, {
          pic
        }, {
          style: 'z-index: 1000000;',
          scrollable: true,
          width: '70%',
          height: 'auto'
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
</style>

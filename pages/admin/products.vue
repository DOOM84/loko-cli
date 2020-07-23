<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Продукция</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button @click.prevent="showModal('add')" type="button" class="mod-but btn btn-info">
            Добавить
          </button>
        </div>
      </div>
    </div>
    <div v-if="products" class="container">
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
          <tr v-for="(product, i) in products" :key="product.id">
            <th scope="row">{{i+1}}</th>
            <td>
              {{product.name}}
              <p>
                <button class="mod-but btn btn-info" type="button" data-toggle="collapse" :data-target="'#collapseExample'+product.id" aria-expanded="false" :aria-controls="'collapseExample'+product.id">
                  Детали
                </button>
              </p>
              <div class="collapse" :id="'collapseExample'+product.id">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th scope="col">№</th>
                      <th scope="col">Наименование</th>
                      <th scope="col">Номер чертежа</th>
                      <th scope="col">Вес (кг)</th>
                      <th scope="col">Операции</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(detail, i) in product.details" :key="i">
                      <th scope="row">{{i+1}}</th>
                      <td>{{detail.name}}</td>
                      <td>{{detail.drawing}}</td>
                      <td>{{detail.weight}}</td>
                      <td>
                        <button @click.prevent="delProdDetRelation(product.id, detail.id)" type="button" class="btn mod-btn btn-danger"><i
                          class="fa fa-remove"></i></button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </td>
            <td>
              <img :src="product.images.thumbnail" alt="">
            </td>
            <td>{{product.status ? 'ДА' : 'Нет'}}</td>
            <td>
              <button @click.prevent="editItem(product)" type="button" class="btn mod-btn btn-info"><i class="fa fa-edit"></i>
              </button>
              <button @click.prevent="deleteItem(product.id)" type="button" class="btn mod-btn btn-danger"><i
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
        :max-width="1000"
        width="80%"
        height="auto"
        @before-close="beforeClose"
        scrollable
      >
        <div class="container">

          <div class="text-center">
            <img class="img-fluid" :src="product.images.thumbnail" alt="">
          </div>


        <div class="form-group">
          <label for="name">Название</label>
          <input type="text" v-model="product.name" class="form-control" id="name">
        </div>

        <div class="input-group p-2">
          <div class="custom-file">
            <input ref="file" type="file" class="custom-file-input" id="editFile" >
            <label class="custom-file-label" for="editFile">Выберите изображение </label>
          </div>
        </div>

          <div class="input-group p-2">
            <div class="custom-file">
              <input ref="files" type="file" class="custom-file-input" id="customFile" multiple>
              <label class="custom-file-label" for="customFile">Выберите изображение(я) на странице продукции</label>
            </div>
          </div>

          <div v-if="mode==='edit' && product.pictures.length" class="table-responsive">
            <table class="table table-striped">
              <thead>
              <tr>
                <th scope="col">№</th>
                <th scope="col">Изображение</th>
                <th scope="col">Опубликовано</th>
                <th scope="col">Операции</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(picture, i) in product.pictures" :key="i">
                <th scope="row">{{i+1}}</th>
                <td>
                  <img :src="picture.image" alt="" width="160px">
                </td>
                <td>
                  <div class="custom-control custom-checkbox m-2 float-left">
                    <input v-model="picture.status" type="checkbox" class="custom-control-input" :id="'customCheck'+picture.id">
                    <label class="custom-control-label" :for="'customCheck'+picture.id">Опубликовано</label>
                  </div>
                </td>
                <td>
                  <button @click.prevent="saveProdPic(picture.id)" type="button" class="btn mod-btn btn-danger"><i
                    class="fa fa-save"></i></button>
                  <button @click.prevent="delProdPic(picture.id)" type="button" class="btn mod-btn btn-danger"><i
                    class="fa fa-remove"></i></button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>


          <div class="custom-control custom-checkbox m-2 float-left">
            <input v-model="product.status" type="checkbox" class="custom-control-input" id="customCheck1">
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
        products: [],
        product: {
          id: '',
          name: '',
          status: '',
          images: [],
          pictures: [],
        },
        mode: '',
      }
    },

    async asyncData({store}) {
      try {
        const {products} = await store.dispatch('adminProduct/index');
        return {
          products
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
      editItem(product) {
        this.product.id = product.id;
        this.product.name = product.name;
        this.product.images = product.images;
        this.product.pictures = product.pictures;
        this.product.status = product.status;
        this.showModal('edit');
      },

      async uploadFiles() {
        let formData = new FormData();
          let file = this.$refs.file.files[0];
        if(file){formData.append('image', file)}

        for (let i = 0; i < this.$refs.files.files.length; i++) {
          let custFile = this.$refs.files.files[i];
          if(custFile){formData.append('images[' + i + ']', custFile,)}
        }
          formData.append('name', this.product.name);
          formData.append('status', this.product.status);
        try {
          const {success, product} = await this.$store.dispatch('adminProduct/create', formData);
          this.$modal.hide('conditional-modal');
          this.products.unshift(product);
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
          if(upFile){formData.append('image', upFile)}

          for (let i = 0; i < this.$refs.files.files.length; i++) {
            let custFile = this.$refs.files.files[i];
            if(custFile){formData.append('images[' + i + ']', custFile,)}
          }

          formData.append('name', this.product.name);
          formData.append('status', this.product.status);
          formData.append('_method', 'PATCH');

          const {success, product} = await this.$store.dispatch('adminProduct/update', {data: formData, id: this.product.id});
          this.$set(this.products, this.products.findIndex(item => item.id === product.id), product);
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
        this.product = {
            id: '',
            name: '',
            status: '',
            images: [],
            pictures: [],
        }
        if (this.mode === 'add' || this.mode === 'edit') {
          this.$refs.file.value = '';
        }
      },

      async delProdDetRelation(product, detail){
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminProduct/delProdDetRelation',
            {prId:product, detId:detail});
          let prInd = this.products.findIndex(item => item.id === product);
          this.products[prInd].details.splice(this.products[prInd].details.findIndex(item => item.id === detail), 1);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        }
      },

      async delProdPic(picture){
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminProduct/delProdPic',
            {picId:picture});
          this.product.pictures.splice(this.product.pictures.findIndex(item => item.id === picture), 1)

          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        }
      },

      async saveProdPic(picture){

        let status = this.product.pictures[this.product.pictures.findIndex(item => item.id === picture)].status
        const {success} = await this.$store.dispatch('adminProduct/updProdPic', {id:picture, status: status});

          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
      },



      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminProduct/delete', id);
          this.products.splice(this.products.findIndex(item => item.id === id), 1);
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

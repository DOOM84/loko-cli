<template>
  <div>
      <div
        class="container d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Детали</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group mr-2">
            <button @click.prevent="showModal('add')" type="button" class="mod-but btn btn-info">
              Добавить
            </button>
          </div>
        </div>
      </div>

    <div v-if="details" class="container">
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Наименование</th>
            <th scope="col">Номер чертежа</th>
            <th scope="col">Вес (кг)</th>
            <th scope="col">Опубликовано</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(detail, i) in details" :key="detail.id">
            <th scope="row">{{i+1}}</th>
            <td>{{detail.name}}</td>
            <td>{{detail.drawing}}</td>
            <td>{{detail.weight}}</td>
            <td>{{detail.status ? 'ДА' : 'НЕТ'}}</td>
            <td>
              <button @click.prevent="editItem(detail)" type="button" class="btn mod-btn btn-info"><i class="fa fa-edit"></i>
              </button>
              <button @click.prevent="deleteItem(detail.id)" type="button" class="btn mod-btn btn-danger"><i
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
        <div class="form-group">
          <label for="name">Наименование</label>
          <input type="text" v-model="detailToUpdate.name" class="form-control" id="name">
        </div>
        <div class="form-group">
          <label for="drawing">Номер чертежа</label>
          <input type="text" v-model="detailToUpdate.drawing" class="form-control" id="drawing">
        </div>
          <div class="form-group">
          <label for="weight">Вес (кг)</label>
          <input type="text" v-model="detailToUpdate.weight" class="form-control" id="weight">
        </div>
          <div class="row">
            <div class="col">
              <label for="inputGroupSelect01">Относится к продукции</label>
            </div>
          </div>
          <div class="input-group mb-3" style="min-height: 250px">
            <select v-model="detailToUpdate.ids" multiple class="custom-select" id="inputGroupSelect01">
              <option v-for="(product, i) in products" :key="i" :value="product.id">{{product.name}}</option>
            </select>
          </div>
          <div class="custom-control custom-checkbox m-2 float-left">
            <input v-model="detailToUpdate.status" type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">Опубликовано</label>
          </div>
        <div class="float-right m-3">
          <button v-if="mode === 'add'"
                  type="button"
                  class="mod-but btn btn-success"
                  @click.prevent="createItem">
            Добавить
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
        mode: '',
        details: [],
        prodDetails: [],
        products: [],
        detailToUpdate: {
          name: '',
          drawing: '',
          weight: '',
          products: [],
          ids: [],
          status: false,
        }
      }
    },

    async asyncData({store}) {
      try {
        const {details, products} = await store.dispatch('adminDetail/index');
        return {
          details,
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
      editItem(detail) {
        this.detailToUpdate = Object.assign(this.detailToUpdate, detail);
        this.showModal('edit');
      },

      async createItem() {
        try {
          const {success, detail} = await this.$store.dispatch('adminDetail/create', this.detailToUpdate);
          this.details.push(detail);
          this.$modal.hide('conditional-modal');
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          const message = e.response.data.errors;
          this.$modal.hide('conditional-modal');
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
          const {success, detail} = await this.$store.dispatch('adminDetail/update', this.detailToUpdate);
          this.$set(this.details, this.details.findIndex(item => item.id === detail.id), detail);
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
        this.detailToUpdate = {
          name: '',
          email: '',
          weight: '',
          drawing: '',
          products: [],
          ids: [],
          status: false,
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminDetail/delete', id);
          this.details.splice(this.details.findIndex(item => item.id === id), 1);
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

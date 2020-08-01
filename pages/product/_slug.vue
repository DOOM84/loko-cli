<template>
  <div class="container">
    <div class="row pb-5">
      <div class="col-12 py-4">
        <h5 class="text-center">Продукция — {{product.name}}</h5>
        <client-only placeholder="Loading...">
          <carousel-3d :perspective="180" :controls-visible="true" :width="700" :height="500"  :display="1">
            <slide v-for="(picture, i) in product.pictures" :index="i" :key="i">
              <img  class="imw-pr" :src="picture.image">
            </slide>
          </carousel-3d>
        </client-only>
        <div class="row">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
              <tr>
                <th scope="col">№</th>
                <th scope="col">Наименование</th>
                <th scope="col">Изображение</th>
                <th scope="col">Номер чертежа</th>
                <th scope="col">Вес (кг)</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(detail,i) in product.details">
                <th scope="row">{{i+1}}</th>
                <td>{{detail.name}}</td>
                <td><img v-if="detail.image" :src="detail.image" alt=""></td>
                <td>{{detail.drawing}}</td>
                <td>{{detail.weight}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
      head(){
        return {
          title: 'Продукция — '+this.product.name + ' « ' + process.env.SITE_NAME
        }
      },
      data(){
        return {
          product: '',
        }
      },

      async asyncData({store, params, error}) {
        try {
          const {product} = await store.dispatch('front/product',
            {slug : params.slug});
          return {
            product
          }
        }
        catch (err) {
          if(err.response.status === 404){
            error({statusCode: 404, message: "Not found"})
          }
        }
      },
    }
</script>

<style scoped>

</style>

<template>
  <section class="tm-section-7 tm-section-mb" id="products">
    <div class="row px-3">
      <div class="col-12 text-center pb-3">
        <h3>
          Продукция
        </h3>
      </div>
      <client-only placeholder="Loading...">
        <carousel-3d :width="160" :height="200" :space="300"  :controls-visible="true" :clickable="true">
          <slide v-for="(product, i) in products" :index="i" :key="i">
            <div class="text-center">
              <img  class="img-thumbnail img-fluid mw-pr" :src="product.images.thumbnail">
              <nuxt-link class="text-white font-weight-bold" :to="'/product/'+product.slug">
                {{product.name}}
              </nuxt-link>
            </div>
          </slide>
        </carousel-3d>
      </client-only>
    </div>
  </section>
</template>

<script>
    export default {
        props: ['products']
    }
</script>

<style scoped>

</style>

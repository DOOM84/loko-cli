<template>
  <section class="tm-section-5 tm-section-5-mb" id="partners">
    <div class="row">
      <div class="col-12 text-center pb-3">
        <h3>
          Наши партнеры
        </h3>
      </div>
    </div>
    <div class="row px-3">
      <div v-for="(partner, i) in partners" :key="i" class="col-xl-3 col-lg-3 col-md-6 col-sm-12 pb-lg-5 pb-xl-5 pb-md-3 pb-sm-1">
        <div class="image fit">
          <img class="img-fluid"  :src="partner.images.thumbnail" >
        </div>
      </div>
    </div>

  </section>
</template>

<script>
    export default {
        props: ['partners']
    }
</script>

<style scoped>

</style>

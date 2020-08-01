<template>
  <section id="main" >
    <div class="px-0 col-lg-12 tm-slider-col">
      <div class="tm-img-slider">
        <client-only>
          <slick-slide class="px-0"
            ref="slick"
            :options="slickOptions">
            <div v-for="(slide, i) in slides" class="tm-img-slider-item" >
              <img :src="slide.images.original" alt="Image" class="tm-slider-img">
            </div>
          </slick-slide>
        </client-only>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        props: ['slickOptions', 'slides']
    }
</script>

<style scoped>

</style>

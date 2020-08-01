<template>
  <section class="tm-section-4 tm-section-mb" id="services">
    <div class="row px-3">
      <div class="col-12 text-center pb-3">
        <h3>
          Услуги
        </h3>
      </div>
      <div class="col-12">
        <div v-html="text_content"></div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        props: ['text_content']
    }
</script>

<style scoped>

</style>

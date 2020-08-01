<template>
  <section class="tm-section-3 tm-section-mb" id="about">
    <div class="row px-3">
      <div class="col-12 text-center pb-3">
        <h3>
          О предприятии
        </h3>
      </div>
      <div class="col-12">
        <div v-html="text_content"></div>
        <ul class="list-group bg-transparent">
          <li v-for="(file, i) in files" :key="i"  class="list-group-item bg-transparent border-0">
            <a :href="file.file" target="_blank">{{file.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        props: ['text_content', 'files']
    }
</script>

<style scoped>

</style>

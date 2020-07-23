<template>
  <div>
    <section class="row" id="main">
      <div class="col-lg-12 tm-slider-col">
        <div class="tm-img-slider">
          <client-only>
            <slick-slide
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
    <section class="tm-section-2 tm-section-mb" id="info">
      <div class="row px-3">
        <div class="col-12 text-center pb-3">
          <h3>
            Информация
          </h3>
        </div>
        <div class="col-12">
          <div v-html="info.text_content"></div>
        </div>
      </div>
    </section>
    <section class="tm-section-3 tm-section-mb" id="about">
      <div class="row px-3">
        <div class="col-12 text-center pb-3">
          <h3>
            О предприятии
          </h3>
        </div>
        <div class="col-12">
          <div v-html="description.text_content"></div>
          <ul class="list-group bg-transparent">
            <li v-for="(file, i) in files" :key="i"  class="list-group-item bg-transparent border-0">
              <a :href="file.file" target="_blank">{{file.name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
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
    <section class="tm-section-4 tm-section-mb" id="services">
      <div class="row px-3">
        <div class="col-12 text-center pb-3">
          <h3>
            Услуги
          </h3>
        </div>
        <div class="col-12">
          <div v-html="service.text_content"></div>
        </div>
      </div>
    </section>
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

    </div>

</template>

<script>
  export default {
    data() {
      return {
        info:'',
        description:'',
        service:'',
        files:'',
        partners:'',
        products: '',
        slides: '',
        slickOptions: {
          arrows: true,
          autoplay: true,
          fade: true,
          speed: 800,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      };
    },
    async asyncData({store}) {
      try {
        const {
          info,
          description,
          service, files,
          partners,
          products,
          slides
        } = await store.dispatch('front/index');

        return {
          info,
          description,
          service,
          files,
          partners,
          products,
          slides,
        }
      } catch (err) {
        console.log(err.response);
        if(err.response.status === 404){
          //error({statusCode: 404, message: "Design not found"})
        }
      }
    }
  }
</script>

<style lang="scss">

  .carousel-3d-container figure {
    margin:0;
  }

  .carousel-3d-slide {
    border: none;
    background-color: rgba(191, 23, 23, 0);
  }

  /*.carousel-3d-container figcaption {
    position: absolute;

    bottom: 0;
    position: absolute;
    bottom: 0;
    padding: 15px;
    font-size: 12px;
    min-width: 100%;
    box-sizing: border-box;
  }*/
  .next, .prev {
    width: 60px;
    position: absolute;
    z-index: 1010;
    font-size: 60px;
    height: 60px;
    line-height: 60px;
    color: #9fcdff !important;
    -webkit-user-select: none;}

  .carousel-3d-slider {
    width: 100%;

  }

</style>

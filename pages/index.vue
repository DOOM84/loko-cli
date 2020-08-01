<template>
  <div>
    <app-main :slickOptions="slickOptions" :slides="slides" />
    <app-info  :text_content="info.text_content" />
    <app-about  :text_content="description.text_content" :files="files" />
    <app-products  :products="products" />
    <app-services  :text_content="service.text_content" />
    <app-partners  :partners="partners" />
  </div>

</template>

<script>
  import AppMain from '~/components/sections/appMain';
  import AppInfo from '~/components/sections/appInfo';
  import AppAbout from '~/components/sections/appAbout';
  import AppProducts from '~/components/sections/appProducts';
  import AppServices from '~/components/sections/appServices';
  import AppPartners from '~/components/sections/appPartners';
  export default {
    components: {AppMain, AppInfo, AppAbout, AppProducts, AppServices, AppPartners},
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
    border: none !important;
    background-color: transparent !important;
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

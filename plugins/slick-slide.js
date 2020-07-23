import Vue from 'vue';
import Slick from 'vue-slick';
//import 'slick-carousel/slick/slick.css'

const SlickSlide = {
  install(Vue, options) {
    Vue.component('slick-slide', Slick)
  }
};

Vue.use(SlickSlide);
export default SlickSlide;

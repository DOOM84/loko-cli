<template>
  <div>
    <div id="loader-wrapper">
      <div id="loader"></div>
      <div class="loader-section section-left"></div>
      <div class="loader-section section-right"></div>
    </div>
    <div class="container">
      <div class="row" style="position: fixed; z-index: 100000;">
        <notifications group="foo" animation-name="v-fade-left" position="top left" />
      </div>
      <section class="tm-section-head" id="top">
        <header id="header" class="text-center tm-text-gray">
          <nuxt-link to="/">
            <img class="img-fluid" src="/img/logo_top.png" alt="">
          </nuxt-link>

        </header>

        <nav class="navbar narbar-light ">
          <button @click.prevent="showMenu = !showMenu" type="button" id="nav-toggle" class="navbar-toggler collapsed" aria-expanded="false"
                  aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <i class="fa fa-navicon tm-fa-toggler-icon"></i>
                    </span>
          </button>
          <transition name="slide-fade">
          <div v-if="showMenu" id="mainNav" class="navbar-collapse tm-bg-white pt-0">

            <ul  class="navbar-nav ml-auto">
              <li class="nav-item">
                <nuxt-link class="nav-link tm-text-gray" to="/">
                Главная
                </nuxt-link>
              </li>

              <li class="nav-item">
                <a href="#"  class="nav-link tm-text-gray"
                           @click.prevent="moveToHash('#info')"
                >
                  Информация
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link tm-text-gray"
                           @click.prevent="moveToHash('#about')"
                >
                  О предприятии
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link tm-text-gray"
                           @click.prevent="moveToHash('#products')"
                >
                  Продукция
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link tm-text-gray"
                           @click.prevent="moveToHash('#services')"
                >
                  Услуги
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link tm-text-gray"
                           @click.prevent="moveToHash('#partners')"
                >
                  Наши партнеры
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link tm-text-gray"
                           @click.prevent="moveToHash('#contacts')"
                >
                  Контакты
                </a>
              </li>
            </ul>

          </div>
          </transition>

        </nav>
      </section>
    <Nuxt />
      <section class="tm-section-6" id="contacts">
        <div class="row px-3">
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div v-html="$store.getters['front/contact']"></div>
            <div class="text-center">
              <img src="/img/footer_logo.png" alt="">
            </div>

          </div>
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">

            <div class="text-center" >
              <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1326.5465914396254!2d39.94528318962936!3d48.3202895997736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x411e3d3ad866dd33%3A0x714f8db128a44e57!2z0JvQvtC60L7QvNC-0YLQuNCyLdCh0LXRgNCy0LjRgSDQoNC-0YHRgtC-0LI!5e0!3m2!1sru!2sua!4v1594143362853!5m2!1sru!2sua" width="600" height="450" frameborder="0" style="border:0; width: 100%; height: 300px" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center">
            <span>Copyright © 2020 {{siteName}}</span>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    head () {
      return {
        bodyAttrs: {
          class: this.loaded ? 'loaded' : ''
        }
      }
    },
    data() {
      return {
        showMenu: false,
        loaded: false,
      }
    },
    methods: {
      scrollToHash () {
        let hash=$nuxt.$route.hash
        this.$nextTick(() => {
          this.$scrollTo(hash, 800)
        })
      },
      moveToHash(hash){
        try {
          if(document.getElementById(hash.substr(1))){
            this.$scrollTo(hash, 800)
          }else{
            this.$router.push({ path: '/', hash: hash})
          }

        }catch (e) {
          console.log(e);
        }
      }
    },
    computed: {
      siteName() {
        return process.env.SITE_NAME;
      },
    },
    watch: {
      '$route.path': function() {
        this.showMenu = false;
      }
    },

    mounted() {
      if ($nuxt.$route.hash) {
        this.scrollToHash()
      }
      /*if (process.browser) {
        window.onNuxtReady((app) => {
          console.log('Nuxt ready!')
        })
      }*/
      this.loaded = true;
    }
  }
</script>

<style>

</style>

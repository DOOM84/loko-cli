<template>
<div>
  <nav class="navbar navbar-expand navbar-dark bg-dark" style="z-index: 1000000">
    <a @click.prevent="showMenu" href="#" id="menu-toggle" class="navbar-brand pl-3">
      <span class="navbar-toggler-icon"></span>
    </a>
    <div class="collapse navbar-collapse" id="navbarsExample02">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active"> <nuxt-link class="nav-link" to="/">{{siteName}} </nuxt-link> </li>

      </ul>
      <a href="#" @click.prevent="logout" class="text-white">Выход</a>
    </div>
  </nav>
  <div class="row" style="position: fixed; z-index: 1000000000;">
    <notifications group="foo" animation-name="v-fade-left" position="top left" />
  </div>
  <div id="wrapper" ref="wrapper" >
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
      <ul class="sidebar-nav">
        <li class="sidebar-brand ">
          <nuxt-link to="/" class="text-white font-weight-bold">
            <small><strong>{{siteName}}</strong></small>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin">
            <i class="fa fa-home pr-1"></i>
            Главная
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/info">
            <i class="fa fa-info pr-1"></i>
            Информация
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/about">
            <i class="fa fa-info-circle pr-1"></i>
            О предприятии
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/services">
            <i class="fa fa-industry pr-1"></i>
            Услуги
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/files">
            <i class="fa fa-file pr-1"></i>
            Файлы
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/products">
            <i class="fa fa-train pr-1"></i>
            Продукция
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/details">
            <i class="fa fa-wrench pr-1"></i>
            Детали
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/partners">
            <i class="fa fa-briefcase pr-1"></i>
            Партнеры
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/slides">
            <i class="fa fa-image pr-1"></i>
            Слайды
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/contacts">
            <i class="fa fa-at pr-1"></i>
            Контакты
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/users">
            <i class="fa fa-user pr-1"></i>
            Пользователи
          </nuxt-link>
        </li>
        <li class="sidebar-brand ">
          <a @click.prevent="logout" href="#" class="text-white font-weight-bold">
            <small>Выход</small>
          </a>
        </li>
      </ul>
    </div> <!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper">
      <div class="container" style="font-size: .875rem;">
        <nuxt />
      </div>
    </div> <!-- /#page-content-wrapper -->
  </div>
</div>
</template>

<script>
  export default {
      middleware: 'auth',
      methods: {
        logout(){
          this.$auth.logout()
        },
        showMenu(){
          this.$refs['wrapper'].classList.toggle('toggled');
        }
        },
    computed: {
      siteName() {
        return process.env.SITE_NAME;
      },
    },
      watch: {
        '$route.path': function() {
          this.$refs['wrapper'].classList.toggle('toggled');
        }
      },
    }
</script>

<style lang="scss">
  #wrapper {
    padding-left: 0;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }

  #wrapper.toggled {
    padding-right: 250px;
  }

  #sidebar-wrapper {
    z-index: 1000;
    position: fixed;
    left: 0px;
    width: 0;
    height: 100%;
    margin-right: -250px;
    overflow-y: auto;
    background: #000;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }

  #wrapper.toggled #sidebar-wrapper {
    width: 250px;
  }

  #page-content-wrapper {
    width: 100%;
    position: absolute;
    padding: 15px;
  }

  #wrapper.toggled #page-content-wrapper {
    position: absolute;
    margin-right: 0px;
  }


  /* Sidebar Styles */

  .sidebar-nav {
    position: absolute;
    top: 0;
    width: 250px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .sidebar-nav li {
    text-indent: 20px;
    line-height: 40px;
  }

  .sidebar-nav li a {
    display: block;
    text-decoration: none;
    color: #999999;
  }

  .sidebar-nav li a:hover {
    text-decoration: none;
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
  }

  .sidebar-nav li a:active, .sidebar-nav li a:focus {
    text-decoration: none;
  }
  .sidebar-brand {
    display: none;
  }

  .sidebar-nav>.sidebar-brand {
    height: 65px;
    font-size: 18px;
    line-height: 60px;
  }

  .sidebar-nav>.sidebar-brand a {
    color: #999999;
  }

  .sidebar-nav>.sidebar-brand a:hover {
    color: #fff;
    background: none;
  }


  @media (max-width: 768px) {
    .sidebar-brand {
      display: block;
    }

    .navbar-header {
      float: none;
    }
    .navbar-toggle {
      display: block;
    }
    .navbar-collapse {
      border-top: 1px solid transparent;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .navbar-collapse.collapse {
      display: none!important;
    }
    .navbar-nav {
      float: none!important;
      margin: 7.5px -15px;
    }
    .navbar-nav>li {
      float: none;
    }
    .navbar-nav>li>a {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .navbar-text {
      float: none;
      margin: 15px 0;
    }
    /* since 3.1.0 */
    .navbar-collapse.collapse.in {
      display: block!important;
    }
    .collapsing {
      overflow: hidden!important;
    }
  }
  .mod-but {
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    min-width: 140px;
    margin-top: 8px;
    color: black;
    cursor: pointer;
    border: 1px solid #1f2328;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;

    .mod-but:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }
  .hgt{
    min-height: 500px !important;
  }

  .mod-btn {
    background-color: white;
    border-color: gray;
    border-radius: 0;
    color: #666666;
    font-size: 1rem;
    margin-top: 5px;
    padding: 10px 20px;
  }

</style>

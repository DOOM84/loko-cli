<template>
<div>
  <div>
    <div class="row pb-5">
      <div class="col-12 py-4">
        <h5 class="text-center">Вход</h5>
        <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" v-model="email" class="form-control" id="email">
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input type="password" v-model="password" class="form-control" id="password">
        </div>
        <div class="form-group text-right">
          <button
            type="submit"
            class="mod-but btn btn-success"
            @click.prevent="login">
            Войти
          </button>
          <button
            type="button"
            class="mod-but btn btn-outline-dark"
            @click.prevent="showRestore = !showRestore">
            Забыл пароль
          </button>
        </div>
        </form>
        <template v-if="showRestore">
          <div class="form-group">
            <label for="restoreEmail">E-mail</label>
            <input type="email" v-model="restoreEmail" class="form-control" id="restoreEmail">
          </div>
          <div class="form-group text-right">
            <button
              type="button"
              class="mod-but btn btn-info"
              @click.prevent="restore">
              Восстановить
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>

</div>
</template>

<script>
    export default {
      middleware: 'guest',
      data(){
        return {
          restoreEmail: '',
          showRestore: false,
          email:'',
          password: '',
        }
      },
      methods: {
        async login(){
          try {
            const formData = {
              email: this.email,
              password: this.password
            };
            await this.$auth.loginWith('local', {data: formData});

          }catch (e) {
            const message = e.response.data.errors;
            for (const key of Object.keys(message)) {
              this.$notify({
                type: 'error',
                group: 'foo',
                text: message[key][0]
              });
              break;
            }
          }
        },
        async restore(){
          try {
            const {success} = await this.$store.dispatch('adminUser/restore', {email: this.restoreEmail});
            this.showRestore = false;
            this.restoreEmail= '';
            this.$notify({
              type: 'success',
              group: 'foo',
              text: success
            });
          } catch (e) {
            const message = e.response.data.errors;
            for (const key of Object.keys(message)) {
              this.$notify({
                type: 'error',
                group: 'foo',
                text: message[key][0]
              });
              break;
            }
          }
        }
      }
    }

</script>

<style>

</style>

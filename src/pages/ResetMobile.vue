<template>
      <main class="bg_innuendo">

  <q-page>
    <div class="row justify-center" style="padding-top: 50px;">
        <div class="" style="display:inline-block;">
            <img src="~/assets/logo.png" alt="innuendo logo">
        </div>
        <div class="" style="display:inline-block;">
            <h2 style="color: white">Innuendo</h2>
        </div>
    </div>
    <div class="q-mb-md q-mx-md">
      <q-card style="max-width: 400px;" class="q-mx-auto">
          <q-card-section>
          <q-form @submit="resetPassword">
            <q-input
              v-model="password"
              label="Nouveau mot de passe"
              :type="passwordVisible ? 'text' : 'password'"
              :rules="[val => val.length >= 8 || 'Le mot de passe doit avoir au moins 8 caractères']"
            >
              <template v-slot:append>
                <q-toggle v-model="passwordVisible" label="Afficher" color="primary" dense />
              </template>
            </q-input>
            <q-input
              v-model="confirmPassword"
              label="Confirmer le mot de passe"
              :type="confirmPasswordVisible ? 'text' : 'password'"
              :rules="[val => val === password || 'Les mots de passe ne correspondent pas']"
            >
              <template v-slot:append>
                <q-toggle v-model="confirmPasswordVisible" label="Afficher" color="primary" dense />
              </template>
            </q-input>
            <q-btn
              type="submit"
              label="Modifier le mot de passe"
              color="primary"
              class="q-mt-md"
            ></q-btn>
          </q-form>
        </q-card-section>
        <q-card-section v-if="passwordMismatch" class="text-red text-h6">
          Les mots de passe ne correspondent pas.
        </q-card-section>
      </q-card>
    </div>
    <div class="col-sm-6">
              <img
                class="logo1"
                src="~/assets/mobile_reset.svg"
                alt="infos illustration"
              />
            </div>
  </q-page>
      </main>
</template>

<script>
import axios from 'axios';
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      passwordMismatch: false,
      passwordVisible: false,
      confirmPasswordVisible: false,
    };
  },
  methods: {

    async resetPassword() {
      const code = urlParams.get('code');
      if (this.password === this.confirmPassword) {
        let data = JSON.stringify({
        "code": parseInt(code),
        "password": this.password
      });

    let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://innuendo-api-6c549.ondigitalocean.app/user/password/reset',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  this.$router.push('/mobileResetOK')
})
.catch((error) => {
  console.log(error);
});

      }
    },
    togglePassword(field) {
      if (field === 'password') {
        this.passwordVisible = !this.passwordVisible;
      } else if (field === 'confirmPassword') {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
      }
    },
  },
};
</script>


<style lang="postcss" scoped>
.bg_innuendo {
    background: #776ccb;
}

.logo1 {
  margin-bottom: 150px;
  width: 40%;
}
</style>

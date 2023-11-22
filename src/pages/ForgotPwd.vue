<template>
  <main class="bg_innuendo">
    <q-page>
      <!-- Logo -->
      <div class="">
        <div class="row justify-center relative">
          <img
            src="~/assets/logo.png"
            alt="innuendo logo"
            style="width: 15rem"
          />
        </div>
        <div class="row absolute-center relative">
          <div class="row justify-center relative">
            <h4 class="titleStyle">
              Veuillez entrer l'adresse mail liée à votre compte.
            </h4>
            <form
              ref="formulaire"
              @submit.prevent="resetPwd"
              class="q-gutter-md"
            >
              <!-- input mail -->
              <q-input
                id="inputmail"
                name="mail"
                filled
                label-color="white"
                v-model="mail"
                label="Adresse mail"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Champ obligatoire',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" color="white" />
                </template>
              </q-input>
              <div>
                <!-- confirmation button -->
                <q-btn
                  label="Réinitialiser mon mot de passe"
                  type="submit"
                  color="white"
                  text-color="primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </q-page>
    <!-- Popup d'erreur -->
    <q-dialog v-model="errorDialog">
      <q-card class='text-center' style="width: 300px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <q-card-section>
          <p class="errorText">L'adresse e-mail n'existe pas ou est incorrecte.</p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="OK" color="primary" @click="errorDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </main>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      mail: ref(null),
      emailFound: ref(false),
      errorDialog: ref(false),
    };
  },

  methods: {
    async resetPwd() {
      var data = JSON.stringify({ email: this.mail });
      const mail = await axios.get('https://innuendo-webapi.herokuapp.com/pro/all');
      console.log(mail.data);
      for (const element of mail.data) {
        if (element.email == this.mail) {
          this.emailFound = true;
          var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://innuendo-webapi.herokuapp.com/pro/forgotten_password',
            headers: {
              'Content-Type': 'application/json',
            },
            data: data,
          };
          axios(config)
            .then(function (response) {
              console.log('rep = ', JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
              return;
            });
          this.$router.push('/validation');
          break;
        }
      }
      if (!this.emailFound) {
        this.errorDialog = true;
        this.mail = ''
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.bg_innuendo {
  background: #776ccb;
}
.titleStyle {
  color: white;
  display: inline-block;
}
.errorText {
  color: #534b91;
  font-weight: bold;
}
</style>

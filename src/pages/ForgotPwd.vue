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
                <!-- <p v-show="!emailFound" class="errorText">L'adresse e-mail est incorrecte.</p> -->

              </div>
            </form>
          </div>
        </div>
      </div>
    </q-page>
  </main>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      mail: ref(null),
      emailFound : ref(false)
    };
  },

    methods: {
        async resetPwd() {
            var data = JSON.stringify({'email': this.mail});
            const mail = await axios.get('https://innuendo-webapi.herokuapp.com/pro/all')
            console.log(mail.data)
            for (const element of mail.data) {
              if (element.email == this.mail) {
                this.emailFound = true
                var config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://innuendo-webapi.herokuapp.com/pro/forgotten_password',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                };
                    axios(config)
                    .then(function (response) {
                        console.log('rep = ', JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                        return
                    });
                    this.$router.push('/validation')
                    break; // Si on trouve l'e-mail, on peut sortir de la boucle
              }
            }
            if (this.emailFound == false) {
              console.log("erreur adresse mail)")
              this.$router.push('/')
            }
        }
        },
    }
</script>


<style lang="postcss" scoped>
.bg_innuendo {
    background: #776ccb;
}
.titleStyle {
  color: white;
  display: inline-block;
}
</style>

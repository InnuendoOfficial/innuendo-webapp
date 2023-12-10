<template>
  <main class="bg_innuendo">
    <q-page>
      <div class="">
        <div>
            <q-btn class="back-button" @click="retourPagePrecedente" style="color: #776ccb; background-color: white;">
                <span class="arrow">←</span> Retour
            </q-btn>
        </div>
      <div class="row justify-center relative">
          <img
            src="~/assets/logo.png"
            alt="innuendo logo"
            style="width: 15rem"
          />
        </div>

        <div class="row window-height justify-center relative">
          <!-- formulaire-->
          <form
            ref="formulaire"
            @submit.prevent="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <!--type -->
            <div class="q-pa-md text-white">
              <div class="q-gutter-md row items-start">
                <label style="color: white; font-size: larger"
                  >Je suis ...</label
                >
              </div>
              <div class="q-gutter-sm row justify-around">
                <q-radio
                  id="radio1"
                  name="type"
                  dark
                  v-model="type"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  color="white"
                  val="particulier"
                  label="Indépendant"
                />
                <q-radio
                  id="radio2"
                  name="type"
                  dark
                  v-model="type"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  color="white"
                  val="hopital"
                  label="Groupe hospitalier"
                />
              </div>
            </div>

            <!--nom / prenom -->
            <div class="q-gutter-md row items-start justify-start">
              <q-input
                id="inputnom"
                name="nom"
                filled
                label-color="white"
                v-model="nom"
                label="Nom *"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Champ obligatoire',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="badge" color="white" />
                </template>
              </q-input>
              <q-input
                id="inputprenom"
                name="prenom"
                filled
                label-color="white"
                v-model="prenom"
                label="Prénom *"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Champ obligatoire',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="badge" color="white" />
                </template>
              </q-input>
            </div>

            <!-- age / profession -->
            <div class="q-gutter-md row items-start">
              <q-input
                name="age"
                filled
                label-color="white"
                type="number"
                v-model="age"
                label="Âge *"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || 'Champ obligatoire',
                  (val) => (val > 0 && val < 100) || 'Champ obligatoire',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="cake" color="white" />
                </template>
              </q-input>
              <q-input
                name="profession"
                filled
                label-color="white"
                v-model="pro"
                label="Profession *"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Champ obligatoire',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="work" color="white" />
                </template>
              </q-input>
            </div>

            <!--mail -->
            <div class="q-gutter-md">
              <q-input
                name="mail"
                filled
                label-color="white"
                v-model="mail"
                label="Adresse email *"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Champ obligatoire',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" color="white" />
                </template>
              </q-input>
            </div>

            <!--telephone -->
            <div class="q-gutter-md">
              <q-input
                type="tel"
                name="telephone"
                filled
                label-color="white"
                v-model="tel"
                label="Numéro de téléphone"
                mask = "#### ## ## ##"
              >
                <template v-slot:prepend>
                  <q-icon name="call" color="white" />
                </template>
              </q-input>
            </div>

            <!--licence -->
            <div class="q-gutter-md">
              <q-input
                name="licence"
                filled
                v-model="licence"
                label-color="white"
                label="Nombre de licence souhaité *"
                type="number"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || 'Champ obligatoire',
                  (val) => (val > 0 && val < 100) || 'Champ obligatoire',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="pin" color="white" />
                </template>
              </q-input>
            </div>

            <!--type abo -->
            <div class="q-pa-md text-white">
              <label style="color: white; font-size: larger"
                >Type d'abonnement</label
              >
              <div class="q-gutter-sm row justify-around">
                <q-radio
                  id="radio3"
                  name="abo"
                  dark
                  v-model="abo"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  color="white"
                  val="mensuel"
                  label="Mensuel"
                />
                <q-radio
                  id="radio4"
                  name="abo"
                  dark
                  v-model="abo"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  color="white"
                  val="annuel"
                  label="Annuel"
                />
              </div>
            </div>

            <div class="row justify-center">
              <q-btn
                label="Envoyer ma demande"
                type="submit"
                color="white"
                text-color="primary"
              />
              <q-btn
                label="Effacer"
                type="reset"
                text-color="white"
                flat
                class="q-ml-sm"
              />
            </div>
          </form>
        </div>
      </div>
    </q-page>
  </main>
</template>

<style lang="postcss" scoped>
.bg_innuendo {
  background: #776ccb;
}
.center {
  margin: auto;
  height: 50%;
  padding: 10px;
}
</style>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      type: ref('Particulier'),
      nom: ref(null),
      prenom: ref(null),
      age: ref(null),
      pro: ref(null),
      mail: ref(null),
      tel: ref(null),
      licence: ref(null),
      abo: ref('Mensuel'),
    };
  },


  methods: {
    onSubmit(e) {
      var date = new Date();
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0');
      var yyyy = date.getFullYear();
      date = dd + '/' + mm + '/' + yyyy;

      let data = JSON.stringify({
      "type": "subscription",
      "text": 'Le '+ date + '\n\n | Statut : ' + this.type + '\n\n | ' + this.nom + ' ' + this.prenom + '\n\n | Contacts : \n\nEmail : ' + this.mail + '\n | Numéro de téléphone : ' + this.tel + '\n | Nombre de licences désiré : ' + this.licence + '\n\n | Type d\'abonnement souhaité : ' + this.abo
    });
      var config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://innuendo-api-6c549.ondigitalocean.app/mail/send/team',
          headers: { 
              'Content-Type': 'application/json'
          },
          data : data
          };
        
      axios(config)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
          console.log(error);
          return
      });
      this.$router.push('/validation');
    },
    retourPagePrecedente() {
            this.$router.push('/')
        },

    onReset() {
      this.nom = null;
      this.age = null;
      this.prenom = null;
      this.pro = null;
      this.mail = null;
      this.tel = null;
      this.licence = null;
      this.abo = 'mensuel';
      this.type = 'particulier';
    },
  },
};
</script>

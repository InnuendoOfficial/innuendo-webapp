<template>
  <main class="bg_innuendo">
    <q-page>
      <div class="">
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
                name="telephone"
                filled
                label-color="white"
                v-model="tel"
                label="Numéro de téléphone"
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
import emailjs from 'emailjs-com';
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

  created() {
    this.insertDemande();
  },

  methods: {
    async insertDemande() {
      console.log('insert demande called');
      var sql =
        "INSERT INTO demande_Pro VALUES ('" +
        this.nom +
        "', '" +
        this.prenom +
        "', '" +
        this.pro +
        "', '" +
        this.age +
        "', '" +
        this.tel +
        "', '" +
        this.mail +
        "', '" +
        this.type +
        "', '" +
        this.abo +
        "'," +
        this.licence +
        ', CURDATE());';
      await axios.post('http://localhost:5000/demande', {
        data: { sql: sql },
      });
    },

    onSubmit(e) {
      var date = new Date();
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0');
      var yyyy = date.getFullYear();
      date = dd + '/' + mm + '/' + yyyy;
      this.insertDemande();
      this.$router.push('/validation');
      try {
        emailjs.sendForm(
          'service_ebnk84t',
          'template_cfr63fc',
          e.target,
          'OU7dvnG78nmA7UwHX',
          {
            type: this.type,
            nom: this.nom,
            prenom: this.prenom,
            age: this.age,
            profession: this.profession,
            mail: this.mail,
            telephone: this.telephone,
            licence: this.licence,
            abo: this.abo,
            date: date,
          }
        );
      } catch (error) {
        console.log({ error });
      }
    },

    onReset() {
      console.log(this.nom);
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

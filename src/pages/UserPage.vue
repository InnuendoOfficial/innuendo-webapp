<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      <!-- HEADER -->
      <q-header elevated style="height: 100px">
        <q-toolbar>
          <!-- Logo and name -->
          <q-avatar size="90px">
            <img src="~/assets/logo.png" alt="innuendo logo" />
          </q-avatar>
          <q-toolbar-title class="justify-center" style="font-size: xx-large"
            >InnuendoPro
          </q-toolbar-title>
          <!-- Settings -->
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <q-breadcrumbs-el label="Accueil" icon="home" @click="home" />
            <q-breadcrumbs-el
              label="Mes patientes"
              icon="list"
              @click="patiente"
            />
            <q-breadcrumbs-el
              label="Paramètres"
              icon="person"
              @click="params"
            />
            <q-breadcrumbs-el icon="logout" @click="logout" />
          </q-breadcrumbs>
        </q-toolbar>
      </q-header>
      <!-- END HEADER -->

      <!-- CONTENT -->
      <q-page-container>
        <q-page>
          <div class="row window-height">
            <div
              class="col-sm-6 bg-white row justify-center items-center"
              style="text-align: center"
            >
              <!-- Personnal information -->
              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <h4>Mes informations personnelles</h4>
                <!-- Full name -->
                <q-input clearable filled v-model="name" label="Prénom" />
                <q-input clearable filled v-model="surname" label="Nom" />
                <!-- Mail -->
                <q-input clearable filled v-model="mail" label="Adresse mail" />
                <!-- Adress -->
                <q-input clearable filled v-model="adresse" label="Adresse" />
                <!-- Phone number -->
                <q-input
                  clearable
                  filled
                  v-model="tel"
                  label="Numéro de téléphone"
                  mask = "#### ## ## ##"
                />

                <!-- New pwd button -->
                <div style="text-align: center">
                  <q-btn
                    label="Demander un nouveau mot de passe"
                    @click="resetPwd"
                    color="primary"
                  />
                </div>

                <!-- Subscription management -->
                <div class="q-gutter-sm" style="text-align: center">
                  <label style="color: Black; font-size: larger"
                    >Type d'abonnement :
                  </label>
                  <q-radio
                    id="radio1"
                    name="abo"
                    v-model="abo"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="monthly"
                    label="Mensuel"
                  />
                  <q-radio
                    id="radio2"
                    name="abo"
                    v-model="abo"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="annual"
                    label="Annuel"
                  />
                  <!-- Paiement management -->
                  <p>Dernier paiement effectué : {{last_date }}</p>
                  <p>Prochain paiement à venir : {{ next_date }}</p>
                </div>

                <!-- Save information button -->
                <div style="text-align: center">
                  <q-btn
                    label="Enregistrer mes informations"
                    type="submit"
                    color="primary"
                  />
                </div>
                <div>
                  <q-btn @click="showPopupResil = true" label="Résillier mon abonnement" color="orange" />
                  <div v-if="showPopupResil" class="popup-container">
                    <div class="popup-content">
                      <p>Vous êtes sur le point de résillier votre abonnement. Vous pourrez effectuer une nouvelle demande d'abonnement quand vous le shouaitez.</p>
                      <p>Êtes-vous sûr.e de vouloir continuer ?</p>
                      <q-btn color="green" @click="confirmactionabo">Oui, résillier mon abonement</q-btn>
                      <q-btn color= "red" @click="showPopupResil = false">Annuler</q-btn>
                    </div>
                  </div>
                </div>
                <div>
                  <q-btn @click="showPopup = true" label="Supprimer mon compte" color="red" />

                <!-- Fenêtre popup -->
                  <div v-if="showPopup" class="popup-container">
                    <div class="popup-content">
                      <p>Vous êtes sur le point de supprimer définitivement votre compte. Cette action est irréversible.</p>
                      <p>Êtes-vous sûr.e de vouloir continuer ?</p>
                      <q-btn color="green" @click="confirmAction">Oui, supprimer mon compte</q-btn>
                      <q-btn color= "red" @click="showPopup = false">Annuler</q-btn>
                    </div>
                  </div>
                </div>
              </q-form>
            </div>
            <div class="col-sm-6">
              <img
                class="logo1"
                src="~/assets/info.svg"
                alt="infos illustration"
              />
            </div>
          </div>
        </q-page>
      </q-page-container>

      <!-- FOOTER -->
      <q-footer elevated>
        <q-toolbar>
          <div style="text-align: center">
            <QSpace> </QSpace>
            <a
              target="_blank"
              href="https://www.instagram.com/innuendo_official/"
              ><img
                src="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph.png"
                width="20"
                height="20"
                class="center"
            /></a>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100076102473105"
              ><img
                src="https://www.edigitalagency.com.au/wp-content/uploads/facebook-icon-white-png.png"
                width="20"
                height="20"
                class="center"
            /></a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/innuendoeip/"
              ><img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-app-white-icon.png"
                width="20"
                height="20"
                class="center"
            /></a>
            <q-btn flat @click="contact">Nous contacter</q-btn>
          </div>
          <q-toolbar-title></q-toolbar-title>
        </q-toolbar>
      </q-footer>
      <!-- END FOOTER -->
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { updatePro, formatFrenchDate } from '/src/data/userScript.js';



export default {
  data() {
    return {
      showPopup: false,
      showPopupResil: false,
    };
  },
  setup() {
    return {
      name: ref(null),
      surname: ref(null),
      mail: ref(null),
      adresse: ref('1 rue des Deux'),
      tel: ref(null),
      abo: ref(null),
      last_date: ref('Inconnue'),
      next_date: ref('Inconnue'),
    };
  },

  methods: {
    resetPwd() {
            var data = JSON.stringify({'email': this.mail});
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://innuendo-api-6c549.ondigitalocean.app/pro/forgotten_password',
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
        },
      async  confirmAction() {

          let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: 'https://innuendo-api-6c549.ondigitalocean.app/pro',
            headers: { 
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          };
          axios.request(config)
          .then((response) => {
            this.$router.push('/suppok')
          })
          .catch((error) => {
            console.log(error);
          });

          // Fermez la fenêtre popup
          this.showPopup = false;
          this.logout()
    },
      async  confirmactionabo() {
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'https://innuendo-api-6c549.ondigitalocean.app/stripe/subscription',
        headers: { 
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.$router.push('/resi_va')
      })
      .catch((error) => {
        console.log("une erreur est survenue")
        console.log(error);
      });

  },
    params() {
      this.$router.go();
    },
    logout() {
            const specialItem = localStorage.getItem('first_co');
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key !== 'first_co') {
                ('item removed')
                localStorage.removeItem(key);
                }
            }
            if (specialItem !== null) {
                localStorage.setItem('first_co', specialItem);
            }
            //localStorage.clear()
            this.$router.push('/');
        },
    patiente() {
      this.$router.push('/patiente');
    },
    contact() {
      this.$router.push('/contact');
    },
    onSubmit() {
            updatePro([this.name, this.surname, this.mail, this.adresse, this.tel, this.abo])
    },
    home() {
      this.$router.push('/home');
    },
    async proData() {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      };
      const _data = await axios.get(
        'https://innuendo-api-6c549.ondigitalocean.app/pro',
        config
      );
      localStorage.setItem('proData', JSON.stringify(_data.data));
      let data = JSON.parse(localStorage.getItem('proData'));
      this.name =
        data.first_name[0].toUpperCase() + data.first_name.substring(1);
      this.surname =
        data.last_name[0].toUpperCase() + data.last_name.substring(1);
      this.mail = data.email;
      this.tel = data.phone;
      //next payement date
      if (data.next_payment_date) {
        const originalNextDate = new Date(data.next_payment_date);
        this.next_date = formatFrenchDate(originalNextDate);
      }
      //last payement date
      if (data.last_payment_date) {
      const originalLastDate = new Date(data.last_payment_date);
      this.last_date = formatFrenchDate(originalLastDate);
      }

      data.subscription_type == 'monthly'
        ? (this.abo = 'monthly')
        : (this.abo = 'annual');
    },
  },

  beforeMount() {
    this.proData();
  },
};
</script>

<style lang="postcss" scoped>
.bg_innuendo {
  background: #776ccb;
}

.logo1 {
  margin-top: 150px;
  width: 90%;
}

.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fond semi-transparent pour obscurcir le reste de la page */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Assurez-vous qu'elle est au-dessus du reste du contenu */
}

.popup-content {
  background: white;
  border-radius: 5px;
  padding: 20px;
  width: 400px;
  height: 200px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}
</style>

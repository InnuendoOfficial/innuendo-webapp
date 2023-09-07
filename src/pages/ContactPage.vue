<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      <q-header elevated style="height: 100px">
        <q-toolbar>
          <q-avatar size="90px">
            <img src="~/assets/logo.png" alt="innuendo logo" />
          </q-avatar>
          <q-toolbar-title class="justify-center" style="font-size: xx-large"
            >InnuendoPro</q-toolbar-title
          >
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <q-breadcrumbs-el label="Accueil" icon="home" @click="home" />
            <q-breadcrumbs-el
              label="Mes patientes"
              icon="list"
              @click="patiente"
            />
            <q-breadcrumbs-el label="Paramètres" icon="person">
              <q-menu transition-show="flip-right" transition-hide="flip-left">
                <q-list style="min-width: 100px">
                  <q-separator />
                  <q-item clickable @click="params">
                      <q-item-section>Paramètres</q-item-section>
                  </q-item>
                </q-list>
              </q-menu> </q-breadcrumbs-el
            >/>
            <q-breadcrumbs-el icon="logout" @click="logout" />
          </q-breadcrumbs>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page style="" class="q-pa-md">
          <div class="row absolute-center">
            <!-- formulaire-->
            <form
              ref="formulaire"
              @submit.prevent="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <label
                class="text-center"
                style="font-size: xx-large; color: darkslateblue"
                >Formulaire de contact</label
              >

              <!--type -->
              <div>
                  
                <div class="row justify-evenly">
                  <q-radio
                    id="radio1"
                    name="type"
                    v-model="type"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    color="black"
                    val="abonnement"
                    label="Abonnement"
                  />
                  <q-radio
                    id="radio2"
                    name="type"
                    v-model="type"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    color="black"
                    val="bug"
                    label="Bug"
                  />
                  <q-radio
                    id="radio3"
                    name="type"
                    v-model="type"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    color="black"
                    val="autre"
                    label="Autre"
                  />
                </div>
              </div>
              <label class="text-style">Titre de la demande</label>
              <q-input
                name="titre"
                outlined
                v-model="titre"
                label="Une brève description de votre message"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Champ obligatoire',
                ]"
              />

              <label class="text-style">Votre message</label>
              <q-input
                name="msg"
                v-model="msg"
                filled
                type="textarea"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Champ obligatoire',
                ]"
                label="Entrez ici votre message"
              />
              <label class="text-style"
                >Souhaitez vous être contacté par mail ou par téléphone ?</label
              >
              <div class="q-gutter-sm row justify-evenly">
                <q-radio
                  id="radio4"
                  name="type_contact"
                  v-model="type_contact"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  color="black"
                  val="mail"
                  label="Mail"
                />
                <q-radio
                  id="radio5"
                  name="type_contact"
                  v-model="type_contact"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  color="black"
                  val="telephone"
                  label="Téléphone"
                />
              </div>
              <div class="row justify-center">
                <q-btn
                  label="Envoyer ma demande"
                  type="submit"
                  text-color="primary"
                />
                <q-btn
                  label="Effacer"
                  type="reset"
                  text-color="black"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </form>
          </div>
        </q-page>
      </q-page-container>

      <!-- <FooterPage></FooterPage> -->
      <q-footer elevated>
        <q-toolbar>
          <div style="text-align: center">
            <a
              target="_blank"
              href="https://www.instagram.com/innuendo_official/"
              ><img
                src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/instagram-icon-256.png"
                width="20"
                height="20"
                class="center"
            /></a>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100076102473105"
              ><img
                src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/instagram-icon-256.png"
                width="20"
                height="20"
                class="center"
            /></a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/innuendoeip/"
              ><img
                src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/linkedin-icon-18-256.png"
                width="20"
                height="20"
                class="center"
            /></a>
            <q-btn flat @click="contact">Nous contacter</q-btn>
          </div>
          <q-toolbar-title></q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import axios from 'axios'

let user_info = JSON.parse(localStorage.getItem('proData'));

export default {

  
    data() {
    return {
        type: 'abonnement',
        titre: null,
        msg: null,
        type_contact: 'mail',
        nom: user_info.first_name[0].toUpperCase() + user_info.first_name.substring(1),
        prenom: user_info.last_name[0].toUpperCase() + user_info.last_name.substring(1),
        mail: user_info.email,
        telephone: user_info.phone,
    };
    },
    mounted() {
    //----------TRACKING-------------
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-XXXXXXXX-X');
    //----------TRACKING-------------
  }, 

    methods: {
        logout() {
          const specialItem = localStorage.getItem('first_co');
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key !== 'first_co') {
              localStorage.removeItem(key);
            }
          }
          if (specialItem !== null) {
            localStorage.setItem('first_co', specialItem);
          }
          //localStorage.clear()
          this.$router.push('/');
        },
        backHome() {
            this.$router.push('/contact_validation');
        },
        contact() {
            this.$router.go()
        },
        patiente() {
            this.$router.push('/patiente')
        },
        home() {
            this.$router.push('/home')
        },
        params() {
            this.$router.push('/params')
        },
        onSubmit(e) {
            var date = new Date();
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0');
            var yyyy = date.getFullYear();
            date = dd + '/' + mm + '/' + yyyy;
                
            let data = JSON.stringify({
            "type": "contact",
            "text": 'Le '+ date + '\n\n | Sujet : ' + this.type + '\n\n | ' + this.titre + ' | ' + this.nom + ' ' + this.prenom  + '\n\n | Contacts : \n\nEmail : ' + this.mail + '\n | Numéro de téléphone : ' + this.telephone + '\n | Préférence de contact : ' + this.type_contact + '\n\n | Message : ' + this.msg
          });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://innuendo-webapi.herokuapp.com/mail/send/team',
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

        onReset() {
            this.type = 'abonnement'
            this.titre = null;
            this.msg = null;
            this.type_contact = 'mail';
        }
    },
}

</script>

<style lang="postcss" scoped>
.bg_innuendo {
  background: #776ccb;
}
.circle {
  border-radius: 100%;
  width: 150px;
  height: 150px;
  padding: 10px;
  background: #fff;
  border: 10px solid #776ccb;
  color: #000000;
  text-align: center;
  font: 32px Arial, sans-serif;
}

.text-style {
  color: black;
  font-size: larger;
}
</style>

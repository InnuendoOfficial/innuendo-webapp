<template>
    <div class="q-pa-md">
        <q-layout view="lHh lpr lFf"  class="shadow-2 rounded-borders">
            <!-- HEADER -->
            <q-header elevated style="height: 100px">
                <q-toolbar>
                    <q-avatar size="90px">
                        <img src="~/assets/logo.png" alt="innuendo logo" >
                    </q-avatar>
                    <q-toolbar-title class="justify-center" style="font-size: xx-large;">InnuendoPro</q-toolbar-title>
                    <q-breadcrumbs active-color="white" style="font-size: 16px">
                        <q-breadcrumbs-el label="Accueil" icon="home" @click='home' />
                        <q-breadcrumbs-el label="Mes patientes" icon="list" @click='patiente'/>
                        <q-breadcrumbs-el label="Paramètres" icon="person">
                            <q-menu
                            transition-show="flip-right"
                            transition-hide="flip-left"
                            >
                            <q-list style="min-width: 100px">
                                <q-separator />
                                <q-item clickable @click="params">
                                    <q-item-section>Paramètres</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                        </q-breadcrumbs-el>/>
                        <q-breadcrumbs-el icon="logout" @click="logout"/>
                    </q-breadcrumbs>
                </q-toolbar>
            </q-header>
            <!-- END HEADER -->
            <q-page-container>
                <q-page>
                    <div class="row window-height">
                        <div class="col-sm-6 bg-white row justify-center items-center" style="text-align: center;">
                            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" >
                                <h4>Mes informations personnelles</h4>
                            <q-input clearable filled v-model="name" label="Prénom"/>
                            <q-input clearable filled v-model="surname" label="Nom"/>
                            <q-input clearable filled v-model="mail" label="Adresse mail"/>
                            <q-input clearable filled v-model="adresse" label="Adresse"/>
                            <q-input clearable filled v-model="tel" label="Numéro de téléphone"/>
                            <div style="text-align: center;">
                                <q-btn label="Demander un nouveau mot de passe"  @click="resetPwd" color="primary"/>
                            </div>
                            <div class="q-gutter-sm" style="text-align: center;">
                                <label style="color:Black;font-size: larger;">Type d'abonnement : </label>
                                <q-radio id="radio1" name="abo" v-model="abo" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="monthly" label="Mensuel" />
                                <q-radio id="radio2" name="abo" v-model="abo" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="annual" label="Annuel" />
                                <p> Dernier paiement effectué : 01/01/2023 </p>
                                <p> Prochain paiement à venir : 01/02/2023 </p>
                                
                            </div>
                            <div style="text-align: center;">
                                <q-btn label="Enregistrer mes informations" type="submit" color="primary"/>
                            </div>
                            </q-form>
                        </div>
                        <div class="col-sm-6">
                            <img class="logo1" src="~/assets/info.svg" alt="infos illustration">
                        </div>
                    </div>
                </q-page>
            </q-page-container>

            <!-- FOOTER -->
            <q-footer elevated>
                <q-toolbar>
                    <div style="text-align: center">
                        <QSpace>
                            
                        </QSpace>
                        <a target="_blank" href="https://www.instagram.com/innuendo_official/"><img src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/instagram-icon-256.png" width="20" height="20" class="center"/></a>
                        <a target="_blank" href="https://www.facebook.com/profile.php?id=100076102473105"><img src="https://www.clipartmax.com/png/full/416-4169142_facebook-logo-facebook-white-icon-png-2018.png" width="20" height="20" class="center" /></a>
                        <a target="_blank" href="https://www.linkedin.com/company/innuendoeip/"><img src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/linkedin-icon-18-256.png" width="20" height="20" class="center"/></a>
                        <q-btn flat @click='contact'>Nous contacter</q-btn>
                    </div>
                    <q-toolbar-title></q-toolbar-title>
                </q-toolbar>
            </q-footer>
            <!-- END FOOTER -->

        </q-layout>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import {updatePro} from '/src/data/userScript.js'

    export default {
        setup () {
        return {
            name: ref(null),
            surname: ref(null),
            mail: ref(null),
            adresse: ref('1 rue des Deux'),
            tel: ref(null),
            abo: ref(null),
        }},
        

    methods: {

        resetPwd() {
            var data = JSON.stringify({"email": this.mail});
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://innuendo-webapi.herokuapp.com/pro/forgotten_password',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
                };
            console.log(data)
            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                return
            });
        },
        params() {
            this.$router.go()
        },
        logout() {
            const specialItem = localStorage.getItem('first_co');
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key !== 'first_co') {
                console.log('item removed')
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
            console.log('clicked')
            console.log(this)
            updatePro([this.name, this.surname, this.mail, this.adresse, this.tel, this.abo])
            console.log(this.name, this.surname, this.mail, this.adresse, this.tel, this.abo)
        },
        home() {
            this.$router.push('/home')
        },
        async proData() {
            const config = {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            }
            const _data = await axios.get('https://innuendo-webapi.herokuapp.com/pro', config)
            localStorage.setItem('proData', JSON.stringify(_data.data))
            console.log(localStorage.getItem('proData'))
            let data = JSON.parse(localStorage.getItem('proData'))
            this.name=data.first_name[0].toUpperCase() + data.first_name.substring(1);
            this.surname=data.last_name[0].toUpperCase() + data.last_name.substring(1);
            this.mail = data.email
            this.tel = data.phone
            data.subscription_type == 'monthly' ? this.abo = 'monthly' : this.abo = 'annual'
        }
    },

    beforeMount() {
        this.proData()
    },
}
</script>


<style lang="postcss" scoped>
.bg_innuendo {
    background: #776ccb;
}

.logo1 {
    margin-top: 150px;
    width:90%;
}

</style>

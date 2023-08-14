<template>
    <main class="bg_innuendo">
        <q-page>
            <div class="row justify-center window-height window-width" style="padding-top: 50px;">
                <img class="logo1" src="~/assets/admin.svg" alt="img1" />
                <div class="" style="display:inline-block;">
                    <img src="~/assets/logo.png" alt="innuendo logo">
                </div>
                <div class="" style="display:inline-block;">
                    <h2 style="color: white">Innuendo Admin</h2>
                </div>
                <div class="row absolute-center relative">
                    <!-- formulaire-->
                    <form ref="formulaire" @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">

                        <!--nom / prenom -->
                        <div class="q-gutter-md row items-start">
                            <q-input id="inputnom" name="nom" filled label-color="white" v-model="nom" label="Nom" lazy-rules :rules="[ val => val && val.length > 0 || 'Champ obligatoire']">
                                <template v-slot:prepend>
                                    <q-icon name="badge" color="white"/>
                                </template>
                            </q-input>
                            <q-input id="inputprenom" name="prenom" filled label-color="white" v-model="prenom" label="Prénom" lazy-rules :rules="[ val => val && val.length > 0 || 'Champ obligatoire']">
                                <template v-slot:prepend>
                                    <q-icon name="badge" color="white"/>
                                </template>
                            </q-input>
                        </div>

                        <!-- age / profession --> 
                        <q-input name="age" filled label-color="white" type="number" v-model="age" label="Âge">
                            <template v-slot:prepend>
                                <q-icon name="cake" color="white"/>
                            </template>
                        </q-input>

                        <!--mail -->
                        <q-input name="mail" filled label-color="white" v-model="mail" label="Adresse email" lazy-rules :rules="[ val => val && val.length > 0 || 'Champ obligatoire']">
                            <template v-slot:prepend>
                                <q-icon name="mail" color="white"/>
                            </template>
                        </q-input>

                        <!--telephone -->
                        <q-input name="telephone" filled label-color="white" v-model="tel" label="Numéro de téléphone">
                            <template v-slot:prepend>
                                <q-icon name="call" color="white"/>
                            </template>
                        </q-input>

                        <!--licence -->
                        <q-input name="profession" filled label-color="white" v-model="profession" label="Profession" lazy-rules :rules="[ val => val && val.length > 0 || 'Champ obligatoire']">
                            <template v-slot:prepend>
                                <q-icon name="work" color="white"/>
                            </template>
                        </q-input>

                        <!--type abo -->
                        <div class="q-pa-md text-white">
                            <label style="color:white;font-size: larger;">Type d'abonnement souhaité </label>
                            <div class="q-gutter-sm">
                                <q-radio id="radio3" name="abo" dark v-model="abo" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" color="white" val="mensuel" label="Mensuel" />
                                <q-radio id="radio4" name="abo" dark v-model="abo" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" color="white" val="annuel" label="Annuel" />
                            </div>
                        </div>

                        <div>
                            <q-btn label="Créer le compte" type="submit" color="white" text-color="primary"/>
                            <q-btn label="Effacer" type="reset"  text-color="white" flat class="q-ml-sm" />
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

.logo1 {
    position: absolute;
    bottom: 75px;
    left: 75px;
    width: 30%;
}


</style>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    data() {
        return {
            mail : ref(null),
            abo : ref(null),
            profession : ref(null),
            tel : ref(null),
            age : ref(null),
            prenom : ref(null),
            nom : ref(null),

        };
    },
    methods: {
        async onSubmit() {
            console.log(this.mail, this.abo, this.profession, this.tel, this.age, this.prenom, this.nom, typeof(this.tel))
            const res = await axios.post('https://innuendo-webapi.herokuapp.com/pro', {
                    'first_name': this.prenom,
                    'last_name': this.nom,
                    'email': this.mail,
                    'phone': parseInt(this.tel),
                    'subscription_type': this.abo
            })
            console.log(res)
            setTimeout( () => this.$router.push('/'), 5000);
        },
        checkAdmin(){
            if (localStorage.getItem('admin') != 'ok') {
                alert('Restricted access');
                this.$router.push('/');
            }
            else {
                localStorage.setItem('admin', 'ko')
            }
        }
    },
    beforeMount() {
        this.checkAdmin()
    }
}
</script>
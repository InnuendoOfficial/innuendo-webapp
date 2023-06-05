<template>
    <main class="bg_innuendo">
        <q-page>
            <div class="row justify-center window-height window-width" style="padding-top: 50px;">
                <div class="" style="display:inline-block;">
                    <img src="~/assets/logo.png" alt="innuendo logo">
                </div>
                <div class="" style="display:inline-block;">
                    <h2 style="color: white">Innuendo</h2>
                </div>
                <div class="row absolute-center relative">
                    
                        <h4 style="color: white; display: inline-block;">Veuillez entrer l'adresse mail liée à votre compte.</h4>
                        <form ref="formulaire"  @submit.prevent="resetPwd" class="q-gutter-md">
                            <q-input id="inputmail" name="mail" filled label-color="white" v-model="mail" label="Adresse mail" lazy-rules :rules="[ val => val && val.length > 0 || 'Champ obligatoire']">
                                <template v-slot:prepend>
                                    <q-icon name="mail" color="white"/>
                                </template>
                            </q-input>
                            <div>
                                <q-btn label="Réinitialiser mon mot de passe" type="submit" color="white" text-color="primary"/>
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
</style>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    data() {
        return {
            mail : ref(null)
        };
    },
    methods: {
        async resetPwd() {
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
                console.log("rep = ", JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                return
            });
            this.$router.push('/validation')
        }
        }
    }
</script>


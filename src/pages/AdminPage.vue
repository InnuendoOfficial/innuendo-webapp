<template>
    <main class="bg_innuendo">
        <q-page>
            <div class="row justify-center window-height window-width" style="padding-top: 50px;">
                <div class="" style="display:inline-block;">
                    <img src="~/assets/logo.png" alt="innuendo logo">
                </div>
                <div class="" style="display:inline-block;">
                    <h2 style="color: white">Innuendo Admin</h2>
                </div>
                <div class="row absolute-center relative">
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

export default {
    data() {
        return {
            mail : ref(null)
        };
    },
    methods: {
        resetPwd() {
            console.log(this.mail)
        }
    }
}
</script>
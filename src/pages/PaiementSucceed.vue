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
                <div class="row justify-center window-height window-width items-center absolute-center relative" style="text-align: center; color:#584f95">
                    <q-card class="my-card">
                        <q-card-section>
                            <h5>Nous confirmons que nous avons bien reçu votre paiement sécurisé en ligne.
                                <br>Merci de faire confiance à Innuendo.
                                <br>Vous allez être redirigé vers la page d'accueil.
                            </h5>
                        </q-card-section>
                    </q-card>
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
    export default {
        created(){
            setTimeout( () => this.$router.push('/'), 10000);
        }
    }
</script>
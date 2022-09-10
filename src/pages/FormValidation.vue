<template>
    <main class="bg_innuendo">
        <q-page>
            <div class="">
                <div class="" style="display:inline-block;">
                    <img src="~/assets/logo.png" alt="innuendo logo">
                </div>
                <div class="" style="display:inline-block;">
                    <h2 style="color: white">Innuendo</h2>
                </div>
                <div class="row window-height absolute-center relative text-white">
                    <h5>Votre demande a bien été prise en compte, nous reviendrons vers vous dans les plus proches délais. Vous allez être rediriger vers la page d'accueil</h5>
                </div>
                </div>
        </q-page>
    </main>
</template>

<style lang="postcss" scoped>
    .bg_innuendo {
        background: #776ccb;
    }
    .action {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .center {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 5px solid #FFFF00;
    }
    </style>

<script>
import router from 'src/router';

    export default {
        created(){
        setTimeout( () => this.$router.push('/login'), 15000);
        }
    }
</script>
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
                                <q-item clickable>
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
            <!-- <HeaderPage></HeaderPage> -->
            <q-page-container>
                <q-page style="" class="q-pa-md">
                    <div class="q-pa-md">
                    <q-table title="Patientes" :rows="rows" :columns="columns" row-key="id" :filter="filter" :loading="loading" >

                    <template v-slot:top>
                        <q-space />
                        <q-input  dense debounce="300" color="primary" v-model="filter">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                        </q-input>
                    </template>

                    </q-table>
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
import {getPatiente} from 'src/data/patienteScript'
//import HeaderPage from 'src/components/organisms/HeaderPage.vue'
const data = localStorage.getItem('patientes')
console.log("token from patiente : " + localStorage.getItem('token'))
    
        const columns = [

    { name: 'nom', align: 'center', label: 'Nom', field: 'nom', sortable: true },
    { name: 'prenom', align: 'center', label: 'Prénom', field: 'prenom', sortable: true },
    { name: 'telephone', label: 'Téléphone', field: 'telephone'},
    { name: 'mail', label: 'Adresse mail', field: 'mail' },
    { name: 'endoscore', label: 'Endoscore', field: 'endoscore' , sortable:true},
    ]

    const originalRows = getPatiente()

    export default {
        //components : {HeaderPage},


    setup () {
    const loading = ref(false)
    const filter = ref('')
    const rowCount = ref(10)
    const rows = ref([...originalRows])
    return {
        columns,
        rows,
        loading,
        filter,
        rowCount
    }},

    methods: {
        logout() {
            this.$router.push('/');
        },
        contact() {
            this.$router.push('/contact');
        },
        home() {
            this.$router.push('/home')
        },
    },
}
</script>


<style lang="postcss" scoped>
    .bg_innuendo {
        background: #776ccb;
    }
</style>

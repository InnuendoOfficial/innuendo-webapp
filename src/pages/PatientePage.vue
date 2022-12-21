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
                        <q-breadcrumbs-el label="Dr Martens" icon="person">
                            <q-menu
                            transition-show="flip-right"
                            transition-hide="flip-left"
                            >
                            <q-list style="min-width: 100px">
                                <q-item clickable>
                                    <q-item-section>Crazy for transitions</q-item-section>
                                </q-item>
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

            <p>codeString</p>
            <q-page-container>
                <q-page style="" class="q-pa-md">
                    <q-btn flat round dense size="20px" @click="connect" class="q-mr-sm">Connect to bdd</q-btn>
                    <p>oui</p>
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
                        <a target="_blank" href="https://www.instagram.com/innuendo_official/"><img src="https://javiscomputers.com/wp-content/uploads/2020/06/toppng.com-white-instagram-icon-instagram-logo-instagram-instagram-icon-white-306x304-1.png" width="20" height="20" class="center"/></a>
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
    
        const columns = [

    { name: 'nom', align: 'center', label: 'Nom', field: 'nom', sortable: true },
    { name: 'prenom', align: 'center', label: 'Prénom', field: 'prenom', sortable: true },
    { name: 'telephone', label: 'Téléphone', field: 'telephone'},
    { name: 'mail', label: 'Adresse mail', field: 'mail' },
    { name: 'endoscore', label: 'Endoscore', field: 'endoscore' , sortable:true},
    ]

    const originalRows = [
    {
        nom: 'EOZ',
        prenom: 'Zoé',
        telephone: '0839428439',
        mail: 'ez@mail.com',
        endoscore: 1,
    },
    {
        nom: 'EIRAM',
        prenom: 'Marie',
        telephone: '473294819',
        mail: 'em@mail.com',
        endoscore: 9,
    },
    {
        nom: 'UL',
        prenom: 'Lu',
        telephone: '4783478232',
        mail: 'ul@mail.com',
        endoscore: 4.3,
    },
    {
        nom: 'ENNAEJ',
        prenom: 'Jeanne',
        telephone: '2345345643',
        mail: 'ej@mail.com',
        endoscore: 2.9,
    },
    {
        nom: 'ELLIMAC',
        prenom: 'Camille',
        telephone: '54378253',
        mail: 'ec@mail.com',
        endoscore: 7.7,
    },
    {
        nom: 'ECARG',
        prenom: 'Grace',
        telephone: '1121212112',
        mail: 'eg@mail.com',
        endoscore: 10,
    },
    {
        nom: 'MIN',
        prenom: 'Nim',
        telephone: '7774878484',
        mail: 'mn@mail.com',
        endoscore: 3.8,
    },
    {
        nom: 'ASIL',
        prenom: 'Lisa',
        telephone: '43437389',
        mail: 'al@mail.com',
        endoscore: 5.2,
    },
    {
        nom: 'ANIN',
        prenom: 'Nina',
        telephone: '93829832',
        mail: 'an@mail.com',
        endoscore: 8.5,
    },
    {
        nom: 'ENIDNAMA',
        prenom: 'Amandine',
        telephone: '93829383',
        mail: 'ea@mail.com',
        endoscore: 6.6,
    }
    ]

    export default {

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
            console.log('clicked')
            this.$router.push('/login');
        },
        contact() {
            this.$router.push('/contact');
        },
        home() {
            this.$router.push('/')
        },

        connect() {
            console.log("connexion")
            // const { Client } = pg
            // const client = new Client({
            // user: 'aiyxkkhkyzbzcj',
            // host: 'ec2-44-205-177-160.compute-1.amazonaws.com',
            // database: 'aiyxkkhkyzbzcj',
            // password: 'be3732393f80c2f2cfa73adcc21d2a2a30ea81c6854c4ff6882384d70535e624',
            // port: 5432,
            // })
            // console.log("trying to connect")
            // client.connect(function(err) {
            // if (err) throw err;
            // console.log("Connected!");
            // });
        }
    },
}
</script>


<style lang="postcss" scoped>
    .bg_innuendo {
        background: #776ccb;
    }
</style>
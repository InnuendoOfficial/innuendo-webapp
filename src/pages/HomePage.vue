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
                        <q-breadcrumbs-el label="Dr Bourgeois" icon="person">
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

            <!-- CONTENT-->
            <q-page-container>
                <q-page style="" class="q-pa-md">
                    <label style="font-size:x-large;color:darkslateblue">Votre patiente : Mlle Rachel GLIEM, 23 ans</label>
                    <div class="container column">
                        <div class="main col row">
                                <div class="main-left col-1 mr-10 column"></div>
                                <div class="middle col column" style="">
                                    <canvas class="w-100 h-200 mx-auto my-auto " style="text-align: center;" id="myChart"></canvas>
                                </div>
                                <div class="main-left col-1 mr-10 column"></div>
                            <div class="main-right col-2 inner">
                                <div>
                                    <q-btn outline rounded label="Count down"/>
                                </div>
                                <label style="font-size:medium;">Douleur</label>
                                <!-- @update:model-value="test_select()" -->
                                <q-select id="symptome" outlined name="symptome" v-model="symptome" :options="douleur" :labels="douleur_label" label="Sélectionnez le type de symptôme"/>
                                <!-- <label style="font-size:medium;">Autre symptôme</label> -->
                                <!-- <q-select id="autre" outlined v-model="liste_autre" :options="autres" label="Sélectionnez un autre symptôme"/> -->
                                <q-btn @click="actualisation">ACTUALISER LE GRAPHIQUE</q-btn>
                                <label style="font-size:medium;">Choisissez une date</label>
                                <div class="q-pa-md">
                                    <q-date v-model="model" range />
                                </div>
                            </div>
                        </div>
                    </div>
                </q-page>
                <QPage>
                    <div class="main-left col-1 mr-10 column"></div>
                    <div>
                        <q-splitter v-model="splitterModel" style="height: 450px" >
                        
                        <template v-slot:before>
                            <div class="q-pa-md">
                                <q-date
                                v-model="date_sympt"
                                :events="events"
                                event-color="red"
                                />
                            </div>
                        </template>
                        
                        <template v-slot:after>
                            <q-tab-panels v-model="date_sympt" animated transition-prev="jump-up" transition-next="jump-up" >
                            <q-tab-panel name="2022/12/01">
                                <div class="text-h4 q-mb-md">Symptômes du 2022/12/01</div>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                            </q-tab-panel>

                            <q-tab-panel name="2022/12/05">
                                <div class="text-h4 q-mb-md">Symptômes du 2022/12/05</div>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                            </q-tab-panel>

                            <q-tab-panel name="2022/12/06">
                                <div class="text-h4 q-mb-md">Symptômes du 2022/12/06</div>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                            </q-tab-panel>
                        </q-tab-panels>
                    </template>
                </q-splitter>
            </div>
            </QPage>
            <QPage>
            <p></p>
                <div class="container">
                    <div class="main col row">
                            <div class="circle" >{{moyenne_endo}}</div>
                            <p>L'endoscore correspond à un “indice d'endométriose” qui permet à la patiente de savoir si elle a une prédisposition à l'endométriose en fonction de plusieurs paramètres tels de l'évolution de son flux, de ses douleurs et des symptômes récurrents au cours de son cycle. Il leur est vivement conseillé de consulter un spécialiste lorsque le score est constamment supérieur à 5.</p>
                            <div class="middle col column" style="">
                                    <canvas class="w-50 h-100 " style="text-align: center;" id="endoChart"></canvas>
                            </div>
                    </div>
                </div>
                <p></p>
                <q-icon name="medication" class="text-primary" style="font-size: 32px;"></q-icon>
                <label style="font-size:large;color:darkslateblue">Contraception.s utilisée.s : {{ actual_contra }}</label>
                <p></p>
                <div class="main col row">
                        <q-list bordered class="rounded-borders">
                        <q-expansion-item
                            icon="history"
                            label="Contraception.s passée.s"
                            caption="Voir l'historique"
                        >
                            <q-card>
                                <q-card-section>
                                    <div class="q-pa-md">
                                        <q-table title="Historique de contraception" :rows="rows" :columns="columns_contraceptions" row-key="id" />
                                    </div>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                        </q-list>
                </div>
                <p></p>
                <p></p>
                <p></p>
                <q-icon name="medical_services" class="text-primary" style="font-size: 32px;"></q-icon>
                <label style="font-size:large;color:darkslateblue">Prise de médicament</label>
                <p></p>
                <div class="q-pa-md">
                    <q-table title="Médicaments" :rows="rows_med" :columns="columns_med" row-key="id"/>
                </div>

            </QPage>
        </q-page-container>
        <!-- END CONTENT-->

        <!-- <FooterPage></FooterPage> -->

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
    import Chart from 'chart.js/auto';
    import { ref } from 'vue'
    import {getContraception, getMedication, moyenneEndo, getEndo, dateSymptome} from 'src/data_we/dataScript';
    import {getSymptome} from 'src/data_we/chartScript.js'
    const data = JSON.parse(localStorage.getItem('data'))
    
   // import FooterPage from 'src/components/organisms/FooterPage.vue';

    const columns_contraceptions = [
    { name: 'nom', align: 'center', label: 'Type de contraception', field: 'nom', sortable: true },
    { name: 'debut', align: 'center', label: 'Date de début', field: 'debut', sortable: true },
    { name: 'fin', aligne: 'center', label: 'Date de fin', field: 'fin', sortable:true},
    ]

    const columns_med = [
    { name: 'nom_med', align: 'center', label: 'Médicament', field: 'nom_med', sortable: true },
    { name: 'prise', align: 'center', label: 'Nombre de prise', field: 'prise', sortable: true },
    { name: 'date', label: 'Date de prise', field: 'date'},
    ]

    const contraception = getContraception(data)
    const rows_med = getMedication(data)
    const rows_contraceptions = contraception[0]
    const d_menstru = getSymptome('Menstruelle')
    const list_endo = getEndo(data)

    
    var dataConfig = {
        labels: d_menstru[1],
        datasets: [{
        label: 'Douleur Menstruelle',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: d_menstru[0],
        }],
        
    };

    var dataConfigEndo = {
        labels: list_endo[1],
        datasets: [{
        label: 'Evolution de l\'endoscore',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: list_endo[0],
        }],
        pointStyle: 'circle',
    };

    var defaultType = 'line'

    export default {
    setup() {
    const rowCount = ref(4)
    const rows = ref([...rows_contraceptions])
    return {
        rows,
        rows_med,
        rowCount,
            symptome: ref(null),
            liste_autre: ref(null),
            douleur: [
                'Menstruelle',
                'Dysmenorrhée',
                'Digestion',
                'Défécation',
                'Urinaire',
                'Pelvienne',
                'Abdominale',
               // 'Flux',
                'Fatigue'
            ],
            autres: ['Flux', 'Fatigue'],
            date_sympt: ref('2022/12/01'),
            events: dateSymptome(data),
            splitterModel: ref(50),
            model: ref({ from: '2022/01/01', to: '2022/12/31' }),
        };
    },
    data() {
        return {
            endoChart: undefined,
            myChart: undefined,
            dataLoaded: {},
            test: null,
            moyenne_endo: moyenneEndo(list_endo[0]),
            actual_contra: contraception[1]
        };
    },
    methods: {
        actualisation() {
            const dataset = getSymptome(this.symptome)
            console.log(dataset[0])
            this.myChart.destroy();
            dataConfig.datasets[0].data = dataset[0]
            let cnv = document.getElementById('myChart')
            let ctx = cnv.getContext('2d')
            this.myChart = new Chart(ctx, {type: defaultType,
                                            data: dataConfig,
                                            options: {}});

        },
        logout() {
            this.$router.push('/login');
        },
        contact() {
            this.$router.push('/contact');
        },
        patiente() {
            this.$router.push('/patiente');
        },
        home() {
            this.$router.push('/')
        },
        changeData() {
            console.log(graph.value)
            console.log(list_dys)
            this.myChart.data.datasets[0].data = list_dys
            this.myChart.update()
        }
    },
    mounted() {
        let myChart = document.getElementById('myChart');
        let endoChart = document.getElementById('endoChart');
        const graph = document.getElementById("symptome")
        graph.addEventListener('change', this.actualisation)
        this.myChart = new Chart(myChart, { type: defaultType, data: dataConfig, options: {} });
        this.endoChart = new Chart(endoChart, { type: defaultType, data: dataConfigEndo, options: {} });
    },
    //components: { FooterPage }
}
</script>


<style lang="postcss" scoped>
    .bg_innuendo {
        background: #776ccb;
    }
    .circle {
        border-radius: 100%;
        width:150px ;
        height: 150px;
        padding: 10px;
        background: #fff;
        border: 10px solid #776ccb;
        color: #000000;
        text-align: center;
        font: 32px Arial, sans-serif;
    }
</style>
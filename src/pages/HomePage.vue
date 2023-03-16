<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      
      <!-- HEADER -->
      <q-header elevated style="height: 100px">
        <q-toolbar>
          <!-- Logo and name -->
          <q-avatar size="90px">
            <img src="~/assets/logo.png" alt="innuendo logo" />
          </q-avatar>
          <q-toolbar-title class="justify-center" style="font-size: xx-large">
            InnuendoPro
          </q-toolbar-title>
          <!-- Manage new patient -->
          <div class="main-right col-2 inner">
            <q-btn outline rounded label="Nouvelle patiente" @click="toCode" />
          </div>
          <!-- Settings -->
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <q-breadcrumbs-el label="Accueil" icon="home" @click="home" />
            <q-breadcrumbs-el
              label="Mes patientes"
              icon="list"
              @click="patiente"
            />
            <q-breadcrumbs-el label="Dr Bourgeois" icon="person">
              <q-menu transition-show="flip-right" transition-hide="flip-left">
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section>Crazy for transitions</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <q-item-section>Paramètres</q-item-section>
                  </q-item>
                </q-list>
              </q-menu> </q-breadcrumbs-el
            >
            <q-breadcrumbs-el icon="logout" @click="logout" />
          </q-breadcrumbs>
        </q-toolbar>
      </q-header>
      <!-- END HEADER -->

      <!-- CONTENT-->
      <q-page-container>
        <q-page style="" class="q-pa-md">
          <label class="title-style">Mlle Natalie MILLER</label>
          <label class="text-style"><br />23 ans</label>
          <div class="container column">
            <div class="main col row">
              <div class="main-left col-1 mr-10 column"></div>
              <!-- Symptom chart -->
              <div class="middle col column">
                <canvas
                  class="mx-auto my-auto chartStyle"
                  id="myChart"
                ></canvas>
              </div>
              <div class="main-left col-1 mr-10 column"></div>
              <!-- Symptom selection -->
              <div class="main-right col-2 inner" style="margin-right: 5%">
                <label style="font-size: medium">Douleur</label>
                <q-select
                  multiple
                  id="symptome"
                  outlined
                  name="symptome"
                  stack-label
                  use-chips
                  v-model="symptome"
                  :options="douleur"
                  :labels="douleur_label"
                  style="width: 15vw"
                  label="Sélectionnez le type de symptôme"
                />
                <br />
                <!-- Chart refresh button -->
                <div class="row justify-center">
                  <q-btn outline rounded @click="actualisation">
                    ACTUALISER LE GRAPHIQUE
                  </q-btn>
                </div>
                <!-- Symptom calendar -->
                <div>
                  <br />
                  <label style="font-size: medium">Choisissez une date</label>
                </div>
                <div class="q-pa-md row justify-start">
                  <q-date
                    v-model="selected_date"
                    range
                    style="width: 30rem; height: 25rem"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-page>

        <!-- Symptoms part -->
        <QPage>
          <div class="main-left col-1 mr-10 column">
            <q-splitter v-model="splitterModel" style="height: 450px">
              <template v-slot:before>
                <div class="col">
                    <div class="q-pa-md symptomStyle">
                      <q-date
                        v-model="date_sympt"
                        :events="events"
                        event-color="red"
                        style="width: 50rem; height: 30rem"
                      />
                    </div>
                  </div>
                  </template>

                  <template v-slot:after>
                    <div class="col">
                      <div class="text-h4 q-mb-md symptomStyle">Symptômes du {{ date_sympt }}</div>
                      <div class="text-h7 q-mb-md symptomStyle" style="white-space: pre-line">
                        {{ this.sympt[date_sympt] }}.
                      </div>
                      <div class="text-h5 q-mb-md symptomStyle">
                        Symptômes les plus récurrents:
                      </div>
                      <div class="text-h7 q-mb-md symptomStyle" style="white-space: pre-line">
                        {{ this.occ }}
                      </div>
                    </div>
                  </template>
                </q-splitter>
          </div>
        </QPage>
        
        <QPage>
          <!-- Endoscore part -->
          <div class="container">
            <div class="main row ">
              <div class="col">
                <div class="row justify-center" style="padding-top: 5%;">
                  <!-- Endorscore -->
                  <div class="circle">{{ moyenne_endo }}</div>
                  <p class="endoTextCenter text-style">
                    L'endoscore correspond à un “indice d'endométriose” qui
                    permet à la patiente de savoir si elle a une prédisposition
                    à l'endométriose en fonction de plusieurs paramètres tels de
                    l'évolution de son flux, de ses douleurs et des symptômes
                    récurrents au cours de son cycle. Il leur est vivement
                    conseillé de consulter un spécialiste lorsque le score est
                    constamment supérieur à 5.
                  </p>
                  <!-- Endoscore chart -->
                  <div class="chartStyle">
                    <canvas
                      class=""
                      style="text-align: center;"
                      id="endoChart"
                    >
                    </canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Medication part -->
          <div class="row justify-center">
            <div class="col">
              <!-- Contraception -->
              <div class="row justify-center">
                <q-icon
                  name="medication"
                  class="text-primary"
                  style="font-size: 32px"
                ></q-icon>
                <label class="title-style">
                  Contraception.s utilisée.s : {{ actual_contra }}
                </label>
              </div>

              <!-- Last contraception -->
              <div class="row justify-center">
                <div class="main row">
                  <q-list bordered class="rounded-borders">
                    <q-expansion-item
                      icon="history"
                      label="Contraception.s passée.s"
                      caption="Voir l'historique"
                      style="width: 50rem"
                    >
                      <q-card>
                        <q-card-section>
                          <div class="q-pa-md">
                            <q-table
                              title="Historique de contraception"
                              :rows="rows"
                              :columns="columns_contraceptions"
                              row-key="id"
                            />
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </q-list>
                </div>
              </div>
            </div>

            <!-- Medicine -->
            <div class="col">
              <div class="row justify-center">
                <q-icon
                  name="medical_services"
                  class="text-primary"
                  style="font-size: 32px"
                ></q-icon>
                <label class="title-style"> Prise de médicament </label>
              </div>
              <div class="row justify-center">
                <div class="q-pa-md">
                  <q-date
                    v-model="date_sympt"
                    :events="events"
                    event-color="red"
                    style="width: 50rem; height: 30rem"
                  />
                </div>
              </div>
            </div>
          </div>
        </QPage>
      </q-page-container>
      <!-- END CONTENT-->

      <!-- <FooterPage></FooterPage> -->

      <!-- FOOTER -->
      <q-footer elevated>
        <q-toolbar>
          <div style="text-align: center">
            <QSpace> </QSpace>
            <a
              target="_blank"
              href="https://www.instagram.com/innuendo_official/"
              ><img
                src="https://www.clipartmax.com/png/small/6-65693_dinner-and-a-cruise-experience-instagram-icon-white-transparent-back.png"
                width="20"
                height="20"
                class="center"
            /></a>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100076102473105"
              ><img
                src="https://www.clipartmax.com/png/full/416-4169142_facebook-logo-facebook-white-icon-png-2018.png"
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
      <!-- END FOOTER -->
    </q-layout>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { ref } from 'vue';
import {
  getContraception,
  getMedication,
  moyenneEndo,
  getEndo,
  dateSymptome,
  getMonth,
  occurenceSympt,
} from 'src/data/dataScript';
import { getSymptome } from 'src/data/chartScript.js';
const data = JSON.parse(localStorage.getItem('data'));
// import FooterPage from 'src/components/organisms/FooterPage.vue';

const columns_contraceptions = [
  {
    name: 'nom',
    align: 'center',
    label: 'Type de contraception',
    field: 'nom',
    sortable: true,
  },
  {
    name: 'debut',
    align: 'center',
    label: 'Date de début',
    field: 'debut',
    sortable: true,
  },
  {
    name: 'fin',
    aligne: 'center',
    label: 'Date de fin',
    field: 'fin',
    sortable: true,
  },
];

const columns_med = [
  {
    name: 'nom_med',
    align: 'center',
    label: 'Médicament',
    field: 'nom_med',
    sortable: true,
  },
  {
    name: 'prise',
    align: 'center',
    label: 'Nombre de prise',
    field: 'prise',
    sortable: true,
  },
  { name: 'date', label: 'Date de prise', field: 'date' },
];

const contraception = getContraception(data.data);
const rows_med = getMedication(data.data);
const rows_contraceptions = contraception[0];
const d_menstru = getSymptome(['Menstruelle'], '2022/08/15', '2022/09/15');
const list_endo = getEndo(data.data);
const daily_sympt = dateSymptome(data.data);

var labels = ['January', 'February', 'March', 'April', 'May', 'June'];

var dataConfig = {
  labels: d_menstru[0][1],
  datasets: [
    {
      label: 'Douleur Menstruelle',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: d_menstru[0][0],
    },
  ],
};

var dataConfigEndo = {
  labels: list_endo[1],
  datasets: [
    {
      label: "Evolution de l'endoscore",
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: list_endo[0],
    },
  ],
  pointStyle: 'circle',
};

var defaultType = 'line';

export default {
  setup() {
    const rowCount = ref(4);
    const rows = ref([...rows_contraceptions]);
    return {
      sympt: daily_sympt[1],
      occ: occurenceSympt(daily_sympt[1], data.data.length),
      rows,
      rows_med,
      rowCount,
      symptome: ref(['Menstruelle']),
      liste_autre: ref(null),
      douleur: [
        'Menstruelle',
        'Dysmenorrhée',
        'Digestion',
        'Défécation',
        'Urinaire',
        'Pelvienne',
        'Abdominale',
        'Flux',
        'Fatigue',
      ],
      autres: ['Flux', 'Fatigue'],
      date_sympt: ref(daily_sympt[0][0]),
      month_sympt: ref(getMonth(daily_sympt[0][0])),
      events: daily_sympt[0],
      splitterModel: ref(50),
      selected_date: ref({ from: '2022/08/15', to: '2022/09/15' }),
    };
  },
  data() {
    return {
      endoChart: undefined,
      myChart: undefined,
      dataLoaded: {},
      test: null,
      moyenne_endo: moyenneEndo(list_endo[0]),
      actual_contra: contraception[1],
    };
  },
  methods: {
    actualisation() {
      const dataset = getSymptome(
        this.symptome,
        this.selected_date.from,
        this.selected_date.to
      );
      console.log(this.symptome);
      this.myChart.destroy();
      var dataConfig = {
        labels: dataset[0][1],
        datasets: [],
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
          },
        },
      };
      var datasets = [];
      for (var i = 0; i != dataset.length; i++) {
        const newDataset = {
          label: this.symptome[i],
          data: dataset[i][0],
        };
        if (this.symptome[i] == 'Flux') {
          newDataset.yAxisID = 'y1';
        }
        datasets.push(newDataset);
      }
      dataConfig.datasets = datasets;
      let cnv = document.getElementById('myChart');
      let ctx = cnv.getContext('2d');
      this.myChart = new Chart(ctx, {
        type: defaultType,
        data: dataConfig,
        options: {},
      });
    },
    logout() {
      this.$router.push('/login');
    },
    toCode() {
      this.$router.push('/code');
    },
    contact() {
      this.$router.push('/contact');
    },
    patiente() {
      this.$router.push('/patiente');
    },
    home() {
      this.$router.push('/home');
    },
    changeData() {
      console.log(graph.value);
      console.log(list_dys);
      this.myChart.data.datasets[0].data = list_dys;
      this.myChart.update();
    },
  },
  mounted() {
    let myChart = document.getElementById('myChart');
    let endoChart = document.getElementById('endoChart');
    const graph = document.getElementById('symptome');
    graph.addEventListener('change', this.actualisation);
    this.myChart = new Chart(myChart, {
      type: defaultType,
      data: dataConfig,
      options: {},
    });
    this.endoChart = new Chart(endoChart, {
      type: defaultType,
      data: dataConfigEndo,
      options: {},
    });
  },
  //components: { FooterPage }
};
</script>

<style lang="postcss" scoped>
.bg_innuendo {
  background: #776ccb;
}
.circle {
  border-radius: 100%;
  width: 150px;
  height: 150px;
  background: #fff;
  border: 10px solid #776ccb;
  color: #000000;
  font: 32px Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-style {
  font-size: large;
  color: darkslateblue;
}
.title-style {
  font-size: x-large;
  color: darkslateblue;
  padding-bottom: 2%;
}
.endoTextCenter {
  position: relative;
  top: 50%;
  padding: 2%;
}

.chartStyle {
  width: 60vi;
  height: 40vi;
}

.symptomStyle {
  margin-left: 25%;
}
</style>

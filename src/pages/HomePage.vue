<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <!-- HEADER -->
      <!-- <q-layout view="hHh Lpr lff" container style="height: 300px" class="shadow-2 rounded-borders"> -->
      <q-header elevated style="height: 100rem; width: 15rem; position: fixed;">
        <q-toolbar style="position: fixed; top: 0; z-index: 1000;">
          <div class="col">
            <div class="row">
              <!-- Logo and name -->
              <q-avatar size="90px">
                <img src="~/assets/logo.png" class="logo-innuendo shepherd-target" alt="innuendo logo" />
              </q-avatar>
            </div>
            <div class="row">
              <q-toolbar-title class="justify-center" style="font-size: xx-large">
                Innuendo <br> PRO
              </q-toolbar-title>
            </div>
            <div class="row">
              <!-- Manage new patient -->
              <div class="main-right">
                <q-btn class="new_btn" outline rounded label="Nouvelle patiente" @click="toCode" />
              </div>
            </div>
            <!-- Settings -->
            <q-breadcrumbs active-color="white" style="font-size: 16px">
              <div class="row">
                <q-breadcrumbs-el label="Accueil" icon="home" @click="home" />
              </div>
              <div class="row">
                <q-breadcrumbs-el
                  class = "patiente_btn"
                  label="Mes patientes"
                  icon="list"
                  @click="patiente"
                />
              </div>
              <div class="row">
                <q-breadcrumbs-el
                  class = "params_btn"
                  label="Paramètres"
                  icon="person"
                  @click="params"
                />
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <q-breadcrumbs-el class = "logout_btn" icon="logout" @click="logout" />
                </div>
              </div>
            </q-breadcrumbs>
            <div style="text-align: center">
              <div class="row">
                <q-btn flat id="contacBtn" @click="contact">Nous contacter</q-btn>
              </div>
              <div class="row">
                <q-btn flat @click="tuto">Rejouer le tutoriel</q-btn>
              </div>
              <div class="row">
                <QSpace> </QSpace>
                <div class="col">
                  <a
                  target="_blank"
                  href="https://www.instagram.com/innuendo_official/"
                  ><img
                    src="src/assets/insta.png"
                    width="20"
                    height="20"
                    class="center"
                  />
                  </a>
                </div>
                <div class="col">
                  <a
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=100076102473105"
                    ><img
                      src="src/assets/fb.png"
                      width="20"
                      height="20"
                      class="center"
                  /></a>
                </div>
                <div class="col">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/innuendoeip/"
                    ><img
                      src="src/assets/lk.png"
                      width="20"
                      height="20"
                      class="center"
                  /></a>
                </div>
              </div>
            </div>
          </div>
        </q-toolbar>
      </q-header>
      <!-- END HEADER -->
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
      <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>

          </q-list>
        </q-scroll-area>
      </q-drawer>
      
      <!-- CONTENT-->
      <q-page-container>
        <q-page style="" class="q-pa-md">
          <div class="container column">
            <label class="title-style"> {{this.p_name}} {{this.p_sname}}</label>
            <label class="text-style"><br />{{this.has_endo}}<br /><br /></label>
          </div>
          <div class="container column">
            <div class="main col row">
              <div class="main-left col-1 mr-10 column"></div>
              <!-- Symptom chart -->
              <div class="q-pa-md row items-start q-gutter-md">
                <q-card class="my-card">
                  <q-card-section>
                    <div class="middle col column">
                      <canvas
                        class="mx-auto my-auto chartStyle first_graph"
                        id="myChart"
                      ></canvas>
                    </div>
                    <div class="main-left col-1 mr-10 column"></div>
                  </q-card-section>
                </q-card>
              </div>
              <!-- Symptom selection -->
              <div class="main-right col-2 inner" style="margin-right: 5%">
                <label style="font-size: medium">Douleur</label>
                <q-select class="symptom_btn"
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
                  <q-btn id="graphBtn" class="actu_btn" outline rounded @click="actualisation">
                    ACTUALISER LE GRAPHIQUE
                  </q-btn>
                </div>
                <!-- Symptom calendar -->
                <div>
                  <br />
                  <label style="font-size: medium">Choisissez une date</label>
                </div>
                <div class="q-pa-md row justify-start">
                  <q-date class="symptom_calendar"
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
                      <q-date class="daily_calendar"
                        v-model="date_sympt"
                        :events="events"
                        event-color="red"
                        style="width: 50rem; height: 30rem"
                      />
                    </div>
                  </div>
                  </template>

                  <template v-slot:after>
                      <div class="symptome_journalier col ">
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
                <div class="q-pa-md row items-start q-gutter-md">
                  <q-card class="my-card">
                    <q-card-section>
                      <!-- Endorscore -->
                      <div class="row align-items-center">
                        <div class="col">
                          <label class="title-style row">
                            Endoscore
                          </label>
                        </div>
                        <div class="col">
                          <div class="endo_circle circle">{{ moyenne_endo }}</div>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
                <!-- Endorscore -->
                <!-- <label class="title-style row justify-center" style="padding-top: 5%;">
                  Moyenne d'endoscore
                </label> -->
                <!-- <div class="row justify-center" >
                  <div class="endo_circle circle">{{ moyenne_endo }}</div>
                  <p class="endoTextCenter text-style">
                    L'endoscore correspond à un “indice d'endométriose” qui
                    permet à la patiente de savoir si elle a une prédisposition
                    à l'endométriose en fonction de plusieurs paramètres tels de
                    l'évolution de son flux, de ses douleurs et des symptômes
                    récurrents au cours de son cycle. Il leur est vivement
                    conseillé de consulter un spécialiste lorsque le score est
                    constamment supérieur à 5.
                  </p> -->
                  <!-- Endoscore chart -->
                  <!-- <div class="endo_chart chartStyle">
                    <canvas
                      class=""
                      style="text-align: center;"
                      id="endoChart"
                    >
                    </canvas>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
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
              <div class="histo_contra row justify-center">
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
            </div>
        </QPage>
      </q-page-container>
      <!-- END CONTENT-->

      <!-- FOOTER -->
      <!-- <q-footer elevated>
        <q-toolbar>
          <div style="text-align: center">
            <QSpace> </QSpace>
              <a
              target="_blank"
              href="https://www.instagram.com/innuendo_official/"
              ><img
                src="src/assets/insta.png"
                width="20"
                height="20"
                class="center"
            /></a>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100076102473105"
              ><img
                src="src/assets/fb.png"
                width="20"
                height="20"
                class="center"
            /></a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/innuendoeip/"
              ><img
                src="src/assets/lk.png"
                width="20"
                height="20"
                class="center"
            /></a>
            <q-btn flat id="contacBtn" @click="contact">Nous contacter</q-btn>
            <q-btn flat @click="tuto">Rejouer le tutoriel</q-btn>
          </div>
          <q-toolbar-title></q-toolbar-title>
        </q-toolbar>
      </q-footer> -->
      <!-- END FOOTER -->
    </q-layout>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { ref } from 'vue';
import {
  getContraception,
  moyenneEndo,
  getEndo,
  dateSymptome,
  getMonth,
  occurenceSympt,
} from 'src/data/dataScript';
import { getSymptome } from 'src/data/chartScript.js';
//import Shepherd from 'shepherd.js';
//import 'shepherd.js/dist/css/shepherd.css';

const data = JSON.parse(localStorage.getItem('data'));
//const endo = JSON.parse(localStorage.getItem('endo'));

//date picker default
const today = new Date();
const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 30);
const fromDate = formatDate(sevenDaysAgo);
const toDate = formatDate(today);
const dateRange = { from: fromDate, to: toDate };
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
}
//end date picker default

//liste symptômes autorisés
const uniqueSymptomNames = [];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

data.data.forEach(entry => {
  entry.symptoms.forEach(symptom => {
    const capitalizedSymptomName = capitalizeFirstLetter(symptom.symptom_type_name);
    if (!uniqueSymptomNames.includes(capitalizedSymptomName)) {
      uniqueSymptomNames.push(capitalizedSymptomName);
    }
  });
});

console.log('symp name= :', uniqueSymptomNames);
//fin

const contraception = getContraception(data.data);
var rows_contraceptions = [];
if (contraception.length > 0) {
  rows_contraceptions = contraception[0]
}
else {rows_contraceptions = []}
const d_menstru = getSymptome(['Menstruelle'], fromDate, toDate);
const list_endo = getEndo(data.last_endscore);
const daily_sympt = dateSymptome(data.data);

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
  }
];


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
    const rows = ref(rows_contraceptions);
    return {
      rows,
      p_name: '',
      p_sname: '',
      has_endo: undefined,
      sympt: daily_sympt[1],
      occ: occurenceSympt(daily_sympt[1], data.data.length),
      rowCount,
      symptome: ref(['Menstruelle']),
      liste_autre: ref(null),
      douleur: uniqueSymptomNames,
     // autres: ['Fatigue'],
      date_sympt: ref(daily_sympt.length > 0 ? daily_sympt[0][0] : null),
     // month_sympt: '01',   //ref(daily_sympt.length > 0 ? getMonth(daily_sympt[0][0]) : null),
      events: daily_sympt.length > 0 ? daily_sympt[0] : [],
      splitterModel: ref(50),
      selected_date: ref({ from: fromDate, to: toDate }),
    };
  },
  data() {
    return {
      showDisablePage: false,
      endoChart: undefined,
      myChart: undefined,
      dataLoaded: {},
      test: null,
      moyenne_endo: moyenneEndo(list_endo[0]),
      actual_contra: contraception[1],
    };
  },
  methods: {
    tuto() {
      localStorage.setItem('first_co', 'true')
      this.$router.go();
    },
    
    actualisation() {
      if (this.symptome.length == 0) {
        this.symptome.push('Menstruelle')
      }
      const dataset = getSymptome(
        this.symptome,
        this.selected_date.from,
        this.selected_date.to
      );
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
        // if (this.symptome[i] == 'Flux') {
        //   newDataset.yAxisID = 'y1';

        // }
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
      const specialItem = localStorage.getItem('first_co');
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== 'first_co') {
          localStorage.removeItem(key);
        }
      }
      if (specialItem !== null) {
        localStorage.setItem('first_co', specialItem);
      }
      //localStorage.clear()
      this.$router.push('/');
    },

    toCode() {
      localStorage.removeItem('data')
      localStorage.removeItem('profile')
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
    params() {
      this.$router.push('/params')
    },
    changeData() {
      this.myChart.data.datasets[0].data = list_dys;
      this.myChart.update();
    },
  },
  mounted() {
    
    let patiente = JSON.parse(localStorage.getItem('profile'))
    if (patiente.has_endometriosis == true) {
      this.has_endo = 'Votre patiente est atteinte d\'endométriose'
    }
    else if (patiente.has_endometriosis == false) {
      this.has_endo = 'Votre patiente n\'est pas atteinte d\'endométriose'
    }
    else 
    this.has_endo = 'Votre patiente n\'a pas encore été diagnostiquée pour l\'endométriose'
    if (patiente.hasOwnProperty("firstname")) {
      this.p_name = patiente.firstname
    }
    else {
      this.p_name = "Jane"
    }
    if (patiente.hasOwnProperty("lastname")) {
      this.p_sname = patiente.lastname
    }
    else {
      this.p_sname = "Doe"
    }
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
      options: { scales: {
      y: {
        beginAtZero: true,
      },
    },},
    });
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        //scrollTo: true,
        arrow: true,
        showCancelLink: true,
        classes: 'shadow-md bg-purple-dark',
        cancelIcon: {
          enabled: true
        }
      }
      });
      tour.addSteps(
        [
          {
            title: 'Bienvenue sur Innuendo Pro',
            text: 'Dans ce tutoriel, nous vous guiderons lors de votre première utilisation de la page de visualisation des données',
            attachTo: {
              on: 'center'
            },
            highlightClass: 'highlight',
            buttons: [ {
              text: 'Suivant',
              action: tour.next
            }
            ]
          },{
            title: 'Nouvelle patiente',
            text: 'En cliquant sur ce bouton, vous pourrez entrer un nouveau code lors de votre consultation avec une nouvelle patiente.',
            attachTo: {
              element: '.new_btn',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons: [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          },
          {
            title: 'Onglet \'Patientes\'',
            text: 'En cliquant sur cet onglet, vous accéderez à la liste de toutes vos patientes utilisant l\'application Innuendo. Vous aurez également accès à leur contacts ainsi qu\'à leur endoscore.',
            attachTo: {
              element: '.patiente_btn',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons:  [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          },{
            title: 'Onglet \'Paramètres\'',
            text: 'En cliquant sur cet onglet, vous accéderez à vos paramètres utilisateur où vous pourrez modifier vos informations personnels ainsi que demander à réinitialiser votre mot de passe.',
            attachTo: {
              element: '.params_btn',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons:  [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          }, {
            title: 'Icône \'Déconnexion\'',
            text: 'En cliquant sur l\'icône de déconnexion, vous serez déconnecté et redirigez vers la page de connection. Vous n\'aurez plus accès aux données de votre patientes actuelle.',
            attachTo: {
              element: '.logout_btn',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons:  [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          },{
            title: 'Graphiques des symptômes',
            text: 'Sur ce graphique, vous pouvez visualiser l\'évolution des différents symptômes de vos patientes. Vous pouvez en sélectionner plusieurs afin de les comparer mais ne vous recommandons de ne pas dépasser les 3.',
            attachTo: {
              element: '.first_graph',
              on: 'right'
            },
            highlightClass: 'highlight',
            buttons:  [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          },{
            title: 'Sélection des symptômes',
            text: 'Vous pouvez sélectionner et désélectionner les symptômes que vous souhaitez voir apparaître sur le graphique ici.',
            attachTo: {
              element: '.symptom_btn',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons: [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          },{
            title: 'Date du graphique',
            text: 'Avec ce calendrier, vous pouvez sélectionner la période sur laquelle vous souhaitez consulter les données de vos patientes.',
            attachTo: {
              element: '.symptom_calendar',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons:  [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          }, {
            title: 'Actualisation du graphique',
            text: 'Cliquez sur ce bouton pour mettre à jour le graphique avec les symptômes et/ou la période sélectioné.e.s.',
            attachTo: {
              element: '.actu_btn',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons:  [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          },
          {
            title: 'Calendrier des symptômes journaliers',
            text: 'En sélectionnant un jour sur ce calendrier, vous pourrez voir les autres symptômes que votre patiente a enregistré ce jour là.',
            attachTo: {
              element: '.daily_calendar',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons:  [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          }, {
            title: 'Symptômes journaliers',
            text: 'Vous pouvez voir ici les symptômes de votre patiente du jour sélectionné ainsi que les symptômes les plus récurrents.',
            attachTo: {
              element: '.symptome_journalier',
              on: 'bottom'
            },
            highlightClass: 'highlight',
            buttons:  [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          }, {
            title: 'Endoscore',
            text: 'L\'endoscore de vos patientes apparaît ici. Il est calculé régulièrement.',
            attachTo: {
              element: '.endo_circle',
              on: 'right'
            },
            highlightClass: 'highlight',
            buttons:  [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          }, 
          {
            title: 'Graphique de l\'endoscore',
            text: 'Ce graphique vous permet de suivre l\'évolution de l\'endoscore de votre patiente.',
            attachTo: {
              element: '.endo_chart',
              on: 'bottom'
            },
            highlightClass: 'highlight',
            buttons:  [ {
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Terminer',
              action: tour.next
            }
            ]
          },
          {
            title: 'Historique de contraception',
            text: 'Vous pouvez consulter ici l\'historique de contraception de votre patiente. Vous y trouverez la contraception, la date de début ainsi que la date de fin s\'il y en a une.',
            attachTo: {
              element: '.histo_contra',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons: [ {
              text: 'Suivant',
              action: tour.complete
            }
            ]
          }
        ]
      );
      tour.options.scrollToHandler = function (step) {
        const targetElement = document.querySelector(step.options.attachTo.element);
    targetElement.style.overflow = 'hidden';
    targetElement.scrollIntoView();
      };

      tour.on('complete', () => {
        localStorage.setItem('first_co', 'false')
      });

      if (localStorage.getItem('first_co') == 'true')
        tour.start();

  },



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
  display: flex;
  justify-content: center;
  align-items: center;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 9999;
}
/* Style pour mettre en valeur les éléments du tour */
.highlight {
  border: 2px solid #FDB813;
  box-shadow: 0px 0px 10px #FDB813;
}


</style>

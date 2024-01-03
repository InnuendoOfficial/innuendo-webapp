<template>
  <div>
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <!-- HEADER -->
      <q-drawer bordered show-if-above :breakpoint="400" :width="300" style="background-color: #776ccb; color: white;">
        <q-scroll-area class="fit">
          <q-list>
            <q-item v-ripple>
              <q-item-section avatar>
                <q-avatar>
                  <img src="~/assets/logo.png" class="logo-innuendo" alt="innuendo logo" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <div class="text-h6">Innuendo PRO</div>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-btn class="new_btn" outline rounded label="Nouvelle patiente" @click="toCode" />
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="home">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>Accueil</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="patiente" class="patiente_btn">
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>Mes patientes</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="params" class="params_btn">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Paramètres</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="logout" class="logout_btn">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>Déconnexion</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="chat" />
              </q-item-section>
              <q-item-section>Nous contacter</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="replay" />
              </q-item-section>
              <q-item-section>Rejouer le tutoriel</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="social-icons">
                  <a target="_blank" href="https://www.instagram.com/innuendo_official/">
                    <img src="src/assets/insta.png" class="social-icon" />
                  </a>
                  <a target="_blank" href="https://www.facebook.com/profile.php?id=100076102473105">
                    <img src="src/assets/fb.png" class="social-icon" />
                  </a>
                  <a target="_blank" href="https://www.linkedin.com/company/innuendoeip/">
                    <img src="src/assets/lk.png" class="social-icon" />
                  </a>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page class="q-gutter-md">
          <div class="title-style">
            <div class="text-h3">{{ p_name }} {{ p_sname }}</div>
          </div>
          <q-card class="dashboard-card">
            <q-card-section class="row justify-center items-center">
              <div class="card-content">
                <div class="text-h4">
                  Endoscore
                </div>
                <div class="circle endo_circle">{{ moyenne_endo }}</div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="dashboard-card">
            <q-card-section class="row justify-center">
              <div class="text-h4">
                Symptômes
              </div>
            </q-card-section>

            <q-card-section class="row justify-center items-center">
              <div class="q-pa-md symptomStyle">
                <q-date class="daily_calendar" v-model="date_sympt" :events="events" event-color="red" />
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-h6">
                Symptômes du {{ date_sympt }}
              </div>
              <div class="text-h7">
                {{ this.sympt[date_sympt] }}.
              </div>
            </q-card-section>
          </q-card>

          <q-card class="dashboard-card">
            <q-card-section class="row justify-center">
              <div class="text-h4">
                Contraception
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-pa-md">
                <q-table class="histo_contra" :rows="rows" :columns="columns_contraceptions" row-key="id" />
              </div>
            </q-card-section>
          </q-card>

          <q-card class="dashboard-card">
            <q-card-section class="row justify-center">
              <div class="text-h4">
                Evolution de l'endoscore
              </div>
            </q-card-section>
            <q-card-section>
              <canvas class="endo_chart" style="text-align: center;" id="endoChart">
              </canvas>
            </q-card-section>
          </q-card>

          <q-card class="dashboard-card">
            <q-card-section class="row justify-center">
              <div class="text-h4">
                Evolution des symptômes
              </div>
            </q-card-section>
            <q-card-section>
              <canvas class="mx-auto my-auto chartStyle symptomsChart" id="symptomsChart"></canvas>
            </q-card-section>
            <q-card-section>
              <q-select class="symptom_btn" multiple id="symptome" outlined name="symptome" stack-label use-chips
                v-model="symptome" :options="douleur" style="width: 15vw" label="Sélectionnez le type de symptôme" />
            </q-card-section>
            <q-card-section>
              <q-btn id="graphBtn" class="actu_btn" outline rounded @click="actualisation">
                ACTUALISER LE GRAPHIQUE
              </q-btn>
            </q-card-section>
            <q-card-section>
              <q-date class="symptom_calendar" v-model="selected_date" range style="width: 30rem; height: 25rem" />
            </q-card-section>

          </q-card>
        </q-page>
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>

import Chart from 'chart.js/auto';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { getSymptome } from 'src/data/chartScript.js';
import {
  dateSymptome,
  getContraception,
  getEndo,
  moyenneEndo
} from 'src/data/dataScript';
import { ref } from 'vue';

const data = JSON.parse(localStorage.getItem('data'));

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

const list_endo = getEndo(data.last_endscore);
const daily_sympt = dateSymptome(data.data);

const d_menstru = getSymptome(['Menstruelle'], fromDate, toDate);


const contraception = getContraception(data.data);
var rows_contraceptions = [];
if (contraception.length > 0) {
  rows_contraceptions = contraception[0]
}
else { rows_contraceptions = [] }

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

var dataConfigSymptoms = {
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

export default {
  setup() {
    const rowCount = ref(4);
    const rows = ref(rows_contraceptions);
    return {
      rows,
      rowCount,
      columns_contraceptions,
      sympt: daily_sympt[1],
      date_sympt: ref(daily_sympt.length > 0 ? daily_sympt[0][0] : null),
      events: daily_sympt.length > 0 ? daily_sympt[0] : [],
      symptome: ref(['Menstruelle']),
      douleur: uniqueSymptomNames,
      selected_date: ref({ from: fromDate, to: toDate }),
    };
  },
  data() {
    return {
      endoChart: undefined,
      symptomChart: undefined,
      moyenne_endo: moyenneEndo(list_endo[0]),
      s_name: '',
      p_name: '',
    };
  },
  methods: {
    tuto() {
      localStorage.setItem('first_co', 'true')
      this.$router.go();
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
      this.$router.push('/');
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
    toCode() {
      localStorage.removeItem('data')
      localStorage.removeItem('profile')
      this.$router.push('/code');
    },
    renderCharts() {
      let endoChart = document.getElementById('endoChart')
      this.endoChart = new Chart(endoChart, {
        type: "line",
        data: dataConfigEndo,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      const symptomsSelect = document.getElementById('symptome');
      symptomsSelect.addEventListener('change', this.actualisation);
      let symptomsChart = document.getElementById('symptomsChart')
      this.symptomsChart = new Chart(symptomsChart, {
        type: "line",
        data: dataConfigSymptoms,
        options: {},
      });
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
      this.symptomsChart.destroy();
      var dataConfigSymptoms = {
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
        datasets.push(newDataset);
      }
      dataConfigSymptoms.datasets = datasets;
      let cnv = document.getElementById('myChart');
      let ctx = cnv.getContext('2d');
      this.myChart = new Chart(ctx, {
        type: "line",
        data: dataConfigSymptoms,
        options: {},
      });
    },
    load_patiente() {
      let patiente = JSON.parse(localStorage.getItem('profile'))
      if (patiente.has_endometriosis == true) {
        this.has_endo = 'Votre patiente est atteinte d\'endométriose'
      }
      else if (patiente.has_endometriosis == false) {
        this.has_endo = 'Votre patiente n\'est pas atteinte d\'endométriose'
      }
      else
        this.has_endo = 'Votre patiente n\'a pas encore été diagnostiquée pour l\'endométriose'
      if (patiente.hasOwnProperty("firstname") && patiente.firstname) {
        this.p_name = patiente.firstname
      }
      else {
        this.p_name = "Jane"
      }
      if (patiente.hasOwnProperty("lastname") && patiente.lastname) {
        this.p_sname = patiente.lastname
      }
      else {
        this.p_sname = "Doe"
      }
    },
    tutorial() {
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
            buttons: [{
              text: 'Suivant',
              action: tour.next
            }
            ]
          }, {
            title: 'Nouvelle patiente',
            text: 'En cliquant sur ce bouton, vous pourrez entrer un nouveau code lors de votre consultation avec une nouvelle patiente.',
            attachTo: {
              element: '.new_btn',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons: [{
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
            buttons: [{
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          }, {
            title: 'Onglet \'Paramètres\'',
            text: 'En cliquant sur cet onglet, vous accéderez à vos paramètres utilisateur où vous pourrez modifier vos informations personnels ainsi que demander à réinitialiser votre mot de passe.',
            attachTo: {
              element: '.params_btn',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons: [{
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
            buttons: [{
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          }, {
            title: 'Graphiques des symptômes',
            text: 'Sur ce graphique, vous pouvez visualiser l\'évolution des différents symptômes de vos patientes. Vous pouvez en sélectionner plusieurs afin de les comparer mais ne vous recommandons de ne pas dépasser les 3.',
            attachTo: {
              element: '.symptomsChart',
              on: 'right'
            },
            highlightClass: 'highlight',
            buttons: [{
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          }, {
            title: 'Sélection des symptômes',
            text: 'Vous pouvez sélectionner et désélectionner les symptômes que vous souhaitez voir apparaître sur le graphique ici.',
            attachTo: {
              element: '.symptom_btn',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons: [{
              text: 'Précédent',
              action: tour.back
            }, {
              text: 'Suivant',
              action: tour.next
            }
            ]
          }, {
            title: 'Date du graphique',
            text: 'Avec ce calendrier, vous pouvez sélectionner la période sur laquelle vous souhaitez consulter les données de vos patientes.',
            attachTo: {
              element: '.symptom_calendar',
              on: 'left'
            },
            highlightClass: 'highlight',
            buttons: [{
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
            buttons: [{
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
            buttons: [{
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
            buttons: [{
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
            buttons: [{
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
            buttons: [{
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
            buttons: [{
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
  },
  mounted() {
    this.load_patiente();
    this.renderCharts();
    this.tutorial();
  },
};

</script>

<style lang="postcss" scoped>
.bg-innuendo {
  background-color: #776ccb;
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.social-icon {
  width: 30px;
  height: 30px;
}

.dashboard-card {
  width: auto;
  max-width: 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.daily_calendar {
  width: 50rem;
  height: 30rem;
}
</style>
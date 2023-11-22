<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      <!-- HEADER -->
      <q-header elevated style="height: 100px">
        <q-toolbar>
          <q-avatar size="90px">
            <img src="~/assets/logo.png" alt="innuendo logo" />
          </q-avatar>
          <q-toolbar-title class="justify-center" style="font-size: xx-large"
            >InnuendoPro</q-toolbar-title
          >
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <q-breadcrumbs-el label="Accueil" icon="home" @click="home" />
            <q-breadcrumbs-el
              label="Mes patientes"
              icon="list"
              @click="patiente"
            />
            <q-breadcrumbs-el
              label="Paramètres"
              icon="person"
              @click="params"
            />
            <q-breadcrumbs-el icon="logout" @click="logout" />
          </q-breadcrumbs>
        </q-toolbar>
      </q-header>
      <!-- END HEADER -->
      <!-- <HeaderPage></HeaderPage> -->
      <q-page-container>
        <q-page style="" class="q-pa-md">
          <div class="q-pa-md">
            <q-table
              title="Patientes"
              :rows="rows"
              :columns="columns"
              row-key="id"
              :filter="filter"
              :loading="loading"
            >
            <template v-slot:body-cell-endoscore="props">
      <q-td :props="props" :class="getClassForEndoscore(props.row.endoscore)">
        {{ props.row.endoscore }}
      </q-td>
    </template>
              <template v-slot:top>
                <q-space />
                <q-input dense debounce="300" color="primary" v-model="filter">
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
            <QSpace> </QSpace>
            <a
              target="_blank"
              href="https://www.instagram.com/innuendo_official/"
              ><img
                src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/instagram-icon-256.png"
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
import { ref } from 'vue';
import { getPatiente } from 'src/data/patienteScript';
let data = localStorage.getItem('patientes');
console.log('before', data)
console.log(typeof data)
data = JSON.parse(data)
data.forEach(item => {
  if (item.endoscores && item.endoscores.length > 0) {
    item.endoscores.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    item.endoscores = parseFloat(item.endoscores[0].score).toFixed(2);
  }
  else {
    item.endoscores = -1
  }
});

console.log('after', data)
const columns = [
  { name: 'nom', align: 'center', label: 'Nom', field: 'nom', sortable: true },
  { name: 'prenom', align: 'center', label: 'Prénom', field: 'prenom', sortable: true,},
  { name: 'telephone', label: 'Téléphone', field: 'telephone' },
  { name: 'mail', label: 'Adresse mail', field: 'mail' },
  { name: 'endoscore', label: 'Endoscore', field: 'endoscore', sortable: true },
];

const originalRows = getPatiente(data);


export default {

  setup() {
    const loading = ref(false);
    const filter = ref('');
    const rowCount = ref(10);
    const rows = ref([...originalRows]);
    return {
      columns,
      rows,
      loading,
      filter,
      rowCount,
    };
  },

    methods: {
        logout() {
          const specialItem = localStorage.getItem('first_co');
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key !== 'first_co') {
              console.log('item removed')
              localStorage.removeItem(key);
            }
          }
          if (specialItem !== null) {
            localStorage.setItem('first_co', specialItem);
          }
          //localStorage.clear()
          this.$router.push('/');
        },
        contact() {
            this.$router.push('/contact');
        },
        patiente() {
            this.$router.go()
        },
        home() {
            this.$router.push('/home')
        },
        params() {
            this.$router.push('/params')
        },
        getClassForEndoscore(endoscore) {
      const value = parseFloat(endoscore);

      if (value < 4 && value >= 0 ) {
        return 'text-green'; // Ajoutez ici votre classe CSS pour le texte vert
      } else if (value >= 4 && value < 7) {
        return 'text-orange'; // Ajoutez ici votre classe CSS pour le texte orange
      } else if (value >= 7) {
        return 'text-red'; // Ajoutez ici votre classe CSS pour le texte rouge
      } else 
        return 'text-transparent'
    },
    },
    contact() {
      this.$router.push('/contact');
    },
    home() {
      this.$router.push('/');
    },
  }
</script>

<style lang="postcss" scoped>
.bg_innuendo {
  background: #776ccb;
}

.text-green {
  color: green;
  font-weight: bold;
  font-size: x-large;
}

.text-orange {
  color: orange;
  font-weight: bold;
  font-size: x-large;
}

.text-red {
  color: rgba(228, 22, 22, 0.823);
  font-weight: bold;
  font-size: x-large;
}

.text-transparent {
  color: rgba(228, 22, 22, 0);
}

</style>

<template>
    <main class="bg_innuendo">
    <q-page>
        <div class="logo-container">
            <img src="~/assets/logo.png" alt="Votre Logo">
            <h1>Innuendo Admin</h1>
        </div>
        <div style="margin-left: 50px; margin-right: 50px;">

            <q-table-container>
                <q-table
                :rows="jsonData"
                :columns="tableColumns"
                row-key="email"
                separator="cell"
                >
                <template v-slot:top>
                    <q-toolbar>
                    <q-toolbar-title>Liste des utilisateurs</q-toolbar-title>
                    </q-toolbar>
                </template>
                <template v-slot:body-cell-is_subscription_valid="props">
                    <td v-bind:class="{'bg-positive': props.row.is_subscription_valid, 'bg-negative': !props.row.is_subscription_valid}" >
                    {{ props.row.is_subscription_valid }}
                    </td>
        </template>
            </q-table>
        </q-table-container>
    </div>
    </q-page>
</main>

</template>

<script>
import axios from 'axios';

export default {
    
    created() {
        axios.get('https://innuendo-webapi.herokuapp.com/pro/all')
            .then(response => {
                this.jsonData = response.data;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données de l\'API :', error);
            });
    },
    methods: {
        checkAdmin(){
            if (localStorage.getItem('admin') != 'ok') {
                alert('Restricted access');
                this.$router.push('/');
            }
        }
    },
    data() {
        return {
            jsonData: this.jsonData, 
            tableColumns: [
                {
                    name: "first_name",
                    required: true,
                    label: "Prénom",
                    align: "left",
                    field: "first_name",
                    sortable: true
                },
                {
                    name: "last_name",
                    required: true,
                    label: "Nom",
                    align: "left",
                    field: "last_name",
                    sortable: true
                },
                {
                    name: "email",
                    required: true,
                    label: "Email",
                    align: "left",
                    field: "email",
                    sortable: true
                },
                {
                    name: "phone",
                    required: true,
                    label: "Téléphone",
                    align: "left",
                    field: "phone",
                    sortable: true
                },
                {
                    name: "subscription_type",
                    required: true,
                    label: "Type d'abonnement",
                    align: "left",
                    field: "subscription_type",
                    sortable: true
                },
                {
                    name: "last_payment_date",
                    label: "Dernier paiement",
                    align: "left",
                    field: "last_payment_date",
                    sortable: true
                },
                {
                    name: "next_payment_date",
                    label: "Prochain paiement",
                    align: "left",
                    field: "next_payment_date",
                    sortable: true
                },
                {
                    name: "is_subscription_valid",
                    label: "Abonnement valide",
                    align: "left",
                    field: "is_subscription_valid",
                    sortable: true
                }
            ]
            };
        },
        beforeMount() {
        this.checkAdmin()
    },
    
}

</script>

<style scoped>

.logo-container {
  text-align: center;
}

img {
  max-width: 100px; /* Ajustez la largeur de votre logo selon vos besoins */
  height: auto;
}

h1 {
  font-size: 44px; /* Ajustez la taille de la police selon vos besoins */
  margin-top: 10px; /* Espace entre le logo et le nom */
  color:white
}
.bg_innuendo {
    background: #776ccb;
}

.bg-positive {
  background-color: #00ff00; /* Couleur verte personnalisée */
}

.bg-negative {
  background-color: rgba(255, 0, 0, 0.5); /* Couleur rouge avec opacité de 50% */
}


</style>
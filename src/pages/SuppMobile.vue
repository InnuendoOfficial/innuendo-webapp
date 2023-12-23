<template>
    <main class="bg_innuendo">

<q-page>
  <div class="row justify-center" style="padding-top: 50px;">
      <div class="" style="display:inline-block;">
          <img src="~/assets/logo.png" alt="innuendo logo">
      </div>
      <div class="" style="display:inline-block;">
          <h2 style="color: white">Innuendo</h2>
      </div>
  </div>
  <div class="q-mb-md q-mx-md">
    <q-card style="max-width: 500px;" class="q-mx-auto">
        <q-card-section class="q-pt-none">
        <q-card-title class="text-h6 q-mb-sm">
          Etes-vous sûr de vouloir supprimer votre compte?
        </q-card-title>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="negative" label="Oui" @click="deleteAccount" />
      </q-card-actions>
    </q-card>
  </div>
  <div v-if="showPopup" class="popup-container">
    <div class="popup-content">
      <p>Une erreur est survenue, veuillez reessayer ultérieurement.</p>
      <q-btn color= "orange" @click="showPopup = false">Ok</q-btn>
    </div>
                  </div>
  <div class="col-sm-6">
            <img
              class="logo1"
              src="~/assets/mobile_reset.svg"
              alt="infos illustration"
            />
          </div>
</q-page>
    </main>
</template>

<script>
import axios from 'axios';
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
console.log('token = ', token)
export default {
    data() {
    return {
        showPopup: false,
    };
  },
methods: {

  async deleteAccount() {
      let data = JSON.stringify({
      "desactivate": false,
    });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://innuendo-api-6c549.ondigitalocean.app/user/delete',
    headers: { 
    'Content-Type': 'application/json', 
    'Authorization' : 'Bearer ' + token
    },
    data : data
    };
    axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        this.$router.push('/mobileSuppOK')
    })
    .catch((error) => {
        console.log(error);
        this.showPopup = true
});

    }
  },
};
</script>


<style lang="postcss" scoped>
.bg_innuendo {
  background: #776ccb;
}

.logo1 {
margin-bottom: 150px;
width: 40%;
}

.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Fond semi-transparent pour obscurcir le reste de la page */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999; /* Assurez-vous qu'elle est au-dessus du reste du contenu */
  }
  
  .popup-content {
    background: white;
    border-radius: 5px;
    padding: 20px;
    width: 400px;
    height: 150px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  }
</style>

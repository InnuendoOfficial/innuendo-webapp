
    <template>
        <main class="bg_innuendo">
        <q-page>
            <div class="row justify-center window-height window-width" style="padding-top: 50px;">
            <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="display: inline-block;">
                <img src="~/assets/logo.png" alt="innuendo logo">
                </div>
                <div style="display: inline-block;">
                </div>
            </div>
            <div class="row justify-center window-height window-width items-center absolute-center relative" style="text-align: center; color:#584f95;">
                <div class="vertical-center">
                <q-card class="custom-card">
                    <h4 style="text-align: center;" v-if="!showCode">
                    Bienvenue sur Innuendo Pro, veuillez cliquer sur le bouton ci-dessous pour générer un code et tester notre application.
                    </h4>
                    <h4 style="text-align: center;" v-else>
                        Voici votre code : {{ code }}.<br>
                        Cliquez sur le bouton ci-dessous pour générer un nouveau code.
                    </h4>
                </q-card>
                <div style="margin-top: 20px;">
                    <q-btn class="bg-white" v-if="!showCode" @click="generateCode">Générer un code</q-btn>
                    <q-btn  class="bg-white" v-else @click="generateCode">Générer un nouveau code</q-btn>
                </div>
                </div>
            </div>
            </div>
        </q-page>
        </main>
    </template>


<script>

import axios from 'axios';

export default {
    data() {
        return {
            showCode: false,
            code: ''
        }
    },
    methods: {
        async generateCode() {
            const res = await axios.post('https://innuendo-webapi.herokuapp.com/auth/login', {
                email: 'miller.natalie@gmail.com',
                password: 'test'
            })
            let data = JSON.stringify({
            "preferences": [
                {
                "symptom_id": 1,
                "showable": true
                },
                {
                "symptom_id": 2,
                "showable": true
                }
            ]
            });

            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://innuendo-webapi.herokuapp.com/code',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + res.data.access_token
            },
            data : data
            };

            axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                this.code = response.data.code;
                this.showCode = true;
            })
            .catch((error) => {
                console.log(error);
            });

           
        }
        // axios.get('https://api.example.com/code') // Remplacez l'URL par votre endpoint de génération de code
        //     .then(response => {
        //     this.code = response.data.code;
        //     this.showCode = true;
        //     })
        //     .catch(error => {
        //     console.error(error);
        //     });
        // }
    }
};
</script>

<style lang="postcss" scoped>
.bg_innuendo {
  background: #776ccb;
}

.custom-card {
    width: 1200px;
    height: 200px;
  }
.vertical-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

</style>
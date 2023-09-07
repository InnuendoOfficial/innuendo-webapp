<template>
    <q-page>
        <div class="row window-height">
            <div class="col-12 col-sm-6 bg-white row justify-center items-center">
            <img src="~/assets/admin_access.svg" alt="login illustration">
            </div>
            <div class="col-12 col-sm-6 bg-primary row justify-center items-center">
            <div class="col-7 column">
                <h2 class="text-bold text-white" style="text-align: center;">Innuendo ADMIN</h2>
                <div class="password-form">
                    <q-input outlined  v-model="password" type="password" placeholder="Mot de passe"></q-input>
                    <q-btn style="background-color: #776ccb; color: white;" label="Valider" @click="submitPassword"></q-btn>
                </div>                
            </div>
            </div>
        </div>
    </q-page>
</template>

<script>

export default {
    name: 'PasswordPage',
    data() {
        return {
        password: '',
        };
    },
    methods: {
        submitPassword() {
        if (this.password === 'motdepasse') {
            localStorage.setItem('admin', 'ok')
            this.$router.push('/admin_home');
        } else {
            alert('Accès refusé');
            this.$router.push('/');
        }
        },
    },
};
</script>

<style scoped>
.password-page {
    background-color: #776ccb;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.password-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    justify-content: center;
    text-align: center;
}

</style>

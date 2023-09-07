<template>
    <q-page>
        <div class="row window-height">
            <div class="col-12 col-sm-6 bg-white row justify-center items-center">
                <div class="password-form">
                    <q-btn style="background-color: #776ccb; color: white; font-size:xx-large;" label="Récapitulatif utilisateur" @click="goRecap"></q-btn>
                </div> 
            <!-- <img src="~/assets/admin_access.svg" alt="login illustration"> -->
            </div>
            <div class="col-12 col-sm-6 bg-primary row justify-center items-center">
            <div class="col-7 column">
                <q-btn style="background-color: white; color: #776ccb; font-size:xx-large;" label="Création de compte"  @click="goCreate"></q-btn>
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
        };
    },
    methods: {
        goCreate() {
            this.$router.push('/acc');
        },
        goRecap() {
            this.$router.push('/admin_recap');
        },
        checkAdmin(){
            if (localStorage.getItem('admin') != 'ok') {
                alert('Restricted access');
                this.$router.push('/');
            }
        }
    },
    beforeMount() {
        this.checkAdmin()
    }
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

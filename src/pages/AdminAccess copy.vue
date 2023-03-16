<template>
    <div class="password-page">
        <img class="logo" src="https://www.pngkey.com/png/full/234-2348027_succ-transparent-kirby-cursed-gru.png" alt="Logo" />
        <img class="logo1" src=" https://www.freepnglogos.com/uploads/shrek-png/shrek-fnaf-tsucn-the-saltiest-ultimate-custom-night-25.png" alt="Logo" />
        <img class="logo2" src=" https://i.kym-cdn.com/photos/images/original/001/263/295/623.png" alt="Logo" />
        <img class="logo3" src=" https://media.tenor.com/7o342ll159cAAAAM/sonic-cursed.gif" alt="Logo" />
        <img class="logo4" src=" https://preview.redd.it/xootmxfxet181.gif?s=a6b98cf0b3a8aa5acadf36df08ff25e537afaa4b" alt="Logo" />
        <img class="logo5" src=" https://thumbs.gfycat.com/FemaleBoilingDassie-max-1mb.gif" alt="Logo" />
        <img class="logo6" src=" https://i.imgflip.com/4v8zwk.gif" alt="Logo" />
        <img class="logo7" src=" https://i.redd.it/yq9cvme8xde81.gif" alt="Logo" />
        <img class="logo8" src="https://i.gifer.com/origin/d5/d5b7a72ee058607a6c361c16c230a676_w200.gif" alt="Logo" />
        <img class="logo9" src="https://i.gifer.com/origin/a1/a1c785521fa27b19fb361dbfb134e7cb_w200.gif" alt="Logo" />
        <img class="logo10" src="https://i.ytimg.com/vi/oRY2VccByEY/maxresdefault.jpg" alt="Logo" />

    </div>
</template>

<script>

export default {
    name: "PasswordPage",
    data() {
        return {
        password: "",
        };
    },
    methods: {
        submitPassword() {
        if (this.password === "oui") {
            localStorage.setItem('admin', 'ok')
            this.$router.push('/acc');
        } else {
            alert("Mauvais mot de passe");
            this.$router.push('/');
        }
        },
    },
};
</script>

<style scoped>
.password-page {
    background-color: #000;
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
    align-items: center;
}
.logo {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 25%;
}

.logo1 {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 25%;
}
.logo2 {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 25%;
}
.logo3 {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 25%;
}
.logo4 {
    position:absolute;
    width: 25%;
}
.logo5 {
    position: absolute;
    right: 10px;
    width: 25%;
}

.logo6 {
    position: absolute;
    left: 10px;
    width: 20%;
}

.logo7{
    position: absolute;
    bottom: 10px;
    right: 400px;
    width: 20%;
}

.logo8{
    position: absolute;
    top: 10px;
    left: 400px;
    width: 20%;
}

.logo9{
    position: absolute;
    top: 10px;
    right: 500px;
    width: 10%;
}

.logo10{
    position: absolute;
    bottom: 10px;
    left: 500px;
    width: 30%;
}

</style>

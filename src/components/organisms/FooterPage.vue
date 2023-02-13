<template>
    <q-footer elevated>
            <q-toolbar>
                <div style="text-align: center">
                    <QSpace>
                        
                    </QSpace>
                    <a target="_blank" href="https://www.instagram.com/innuendo_official/"><img src="https://javiscomputers.com/wp-content/uploads/2020/06/toppng.com-white-instagram-icon-instagram-logo-instagram-instagram-icon-white-306x304-1.png" width="20" height="20" class="center"/></a>
                    <a target="_blank" href="https://www.facebook.com/profile.php?id=100076102473105"><img src="https://www.clipartmax.com/png/full/416-4169142_facebook-logo-facebook-white-icon-png-2018.png" width="20" height="20" class="center" /></a>
                    <a target="_blank" href="https://www.linkedin.com/company/innuendoeip/"><img src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/linkedin-icon-18-256.png" width="20" height="20" class="center"/></a>
                    <q-btn flat @click='contact'>Nous contacter</q-btn>
                </div>
                <q-toolbar-title></q-toolbar-title>
            </q-toolbar>
        </q-footer>
</template>

<script>

export default {

    contact() {
        this.$router.push('/contact')
    }
}
</script>
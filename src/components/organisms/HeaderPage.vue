<template>
    <q-header elevated style="height: 100px">
                <q-toolbar>
                    <q-avatar size="90px">
                        <img src="~/assets/logo.png" alt="innuendo logo" >
                    </q-avatar>
                    <q-toolbar-title class="justify-center" style="font-size: xx-large;">InnuendoPro</q-toolbar-title>
                    <q-btn label="Accueil" icon="home" @click="$emit('home')"></q-btn>
                    <q-breadcrumbs active-color="white" style="font-size: 16px">
                        <!-- <q-breadcrumbs-el label="Accueil" icon="home" @click='home' /> -->
                        <q-breadcrumbs-el label="Mes patientes" icon="list" @click='patiente'/>
                        <q-breadcrumbs-el label="Dr Bourgeois" icon="person">
                            <q-menu
                            transition-show="flip-right"
                            transition-hide="flip-left"
                            >
                            <q-list style="min-width: 100px">
                                <q-item clickable>
                                    <q-item-section>Crazy for transitions</q-item-section>
                                </q-item>
                                <q-separator />
                                <q-item clickable>
                                    <q-item-section>Paramètres</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                        </q-breadcrumbs-el>/>
                        <q-breadcrumbs-el icon="logout" @click="logout"/>
                    </q-breadcrumbs>
                </q-toolbar>
            </q-header>
</template>

<script>

export default {

    logout() {
        this.$router.push('/');
    },
    contact() {
        this.$router.push('/contact');
    },
    // home() {
    //     console.log("clicked")
    //     this.$router.push('/')
    // },
}
</script>
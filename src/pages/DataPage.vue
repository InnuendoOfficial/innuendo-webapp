<template>
    <div class="q-pa-md">
        <q-layout view="lHh lpr lFf"  class="shadow-2 rounded-borders">
            <q-header elevated style="height: 100px">
                <q-toolbar>
                    <q-avatar size="90px">
                        <img src="~/assets/logo.png" alt="innuendo logo" >
                    </q-avatar>
                    <q-toolbar-title class="justify-center" style="font-size: xx-large;">InnuendoPro</q-toolbar-title>
                    <label style="font-size: large;">Dr. Martens</label>
                    <q-btn flat round dense icon="account_circle" size="30px" class="q-mr-sm">
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
                    </q-btn>
                    <q-btn flat round dense icon="logout" size="20px" @click="logout"/>
                </q-toolbar>
            </q-header>
            <q-footer elevated>
                <q-toolbar>
                    <q-toolbar-title></q-toolbar-title>
                </q-toolbar>
            </q-footer>
            <q-page-container>
                <q-page style="" class="q-pa-md">
                    <div class="container column">
                        <div class="main col row">
                                <div class="main-left col-2 mr-10 column">
                                    <div class="q-pa-md q-gutter-sm">
                                        <q-btn label="Inscription" id="bar" color="primary" text-color="white" @click="updateChartRegister()"/>
                                        <q-btn label="QrCode" id="bar" color="primary" text-color="white" @click="updateChartQr()"/>
                                        <q-btn label="Cas contact notifiés" id="bar" color="primary" text-color="white" @click="updateChartContact()"/>
                                    </div>
                                    
                                </div>
                                <div class="main-left col-1 mr-10 column"></div>
                                <div class="middle col column" style="">
                                    <canvas class="w-100 h-200 mx-auto my-auto " style="text-align: center;" id="myChart"></canvas>
                                    <br>
                                </div>
                                <div class="main-left col-1 mr-10 column"></div>
                            <div class="main-right col-2 inner">
                                <div class="q-pa-md q-gutter-sm">
                                    <q-btn label="Barres" id="bar" color="white" text-color="primary" @click="updateChartType('bar')"/>
                                    <q-btn label="Linéaire" id="line" color="white" text-color="primary" @click="updateChartType('line')"/>
                                    <q-btn label="Bulle" id="bubble" color="white" text-color="primary" @click="updateChartType('bubble')"/>
                                    <q-btn label="Donut" id="donut" color="white" text-color="primary" @click="updateChartType('doughnut')"/>
                                    <q-btn label="Circulaire" id="pie" color="white" text-color="primary" @click="updateChartType('pie')"/>
                                    <q-btn label="Polaire" id="polar" color="white" text-color="primary" @click="updateChartType('polarArea')"/>
                                    <q-btn label="Radar" id="radar" color="white" text-color="primary" @click="updateChartType('radar')"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script>
    import Chart from 'chart.js/auto';
    import * as d3 from 'd3';

    
    var labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];

    var dataConfig = {
        labels: labels,
        datasets: [{
        label: 'Nombre de nouveaux utilisateurs',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };

    var date = [];
    var register = [];
    var qr = [];
    var notified = [];
    var defaultType = 'line';

    const config = {
        type: defaultType,
        data: dataConfig,
        options: {}
    };

    export default {

    data() {
        return {
            myChart: undefined,
            dataLoaded: {}
        }
    },

    methods: {
        logout() {
            console.log("clicked")
            this.$router.push('/login');
        },

        updateChartType(type) {
            // destroy the graph 
            this.myChart.destroy();

            //change the type of graph
            config.type = type

            //change labels of graph
            dataConfig.labels = date

            //change default type
            defaultType = type
            console.log(dataConfig.labels)

            //recreate graph with new config
            let cnv = document.getElementById("myChart")
            let ctx = cnv.getContext('2d')
            this.myChart = new Chart(ctx, {type: defaultType,
                                            data: dataConfig,
                                            options: {}});
        },

        updateChartQr() {
            // destroy the graph 
            this.myChart.destroy();

            //change labels of graph
            dataConfig.labels = date

            //change data 
            dataConfig.datasets[0].data = qr
            dataConfig.datasets[0].label = "Nombre de qrCode flashés"

            //recreate graph with new config
            let cnv = document.getElementById("myChart")
            let ctx = cnv.getContext('2d')
            this.myChart = new Chart(ctx, {type: defaultType,
                                            data: dataConfig,
                                            options: {}});
        },

        updateChartRegister() {
            // destroy the graph 
            this.myChart.destroy();

            //change labels of graph
            dataConfig.labels = date

            //change data 
            dataConfig.datasets[0].data = register
            dataConfig.datasets[0].label = "Nombre de nouveaux utilisateurs'"

            //recreate graph with new config
            let cnv = document.getElementById("myChart")
            let ctx = cnv.getContext('2d')
            this.myChart = new Chart(ctx, {type: defaultType,
                                            data: dataConfig,
                                            options: {}});
        },

        updateChartContact() {
            // destroy the graph 
            this.myChart.destroy();

            //change labels of graph
            dataConfig.labels = date

            //change data 
            dataConfig.datasets[0].data = notified
            dataConfig.datasets[0].label = "Nombre de cas contact notifiés"
            console.log("type contact : ", defaultType)
            //recreate graph with new config
            let cnv = document.getElementById("myChart")
            let ctx = cnv.getContext('2d')
            this.myChart = new Chart(ctx, {type: defaultType,
                                            data: dataConfig,
                                            options: {}});
        },


        async fetchData() {
            let data = await d3.csv("src/data/anticovid.csv")
            this.dataLoaded = data
            for (let i = 1; i < (this.dataLoaded.length - 1); i++) {
                let tmpDate = (this.dataLoaded[i].date).split("-", 2)
                date.push(tmpDate[0] + "-" + tmpDate[1])
                register.push(parseInt(this.dataLoaded[i].register) - parseInt(this.dataLoaded[i - 1].register))
                qr.push(parseInt(this.dataLoaded[i].qrCode) - parseInt(this.dataLoaded[i - 1].qrCode))
                notified.push(parseInt(this.dataLoaded[i].notified) - parseInt(this.dataLoaded[i - 1].notified))
            }
        }
    },

    mounted () {
        this.fetchData()
        let myChart = document.getElementById("myChart")
        this.myChart = new Chart(myChart, {type: defaultType,
                                            data: dataConfig,
                                            options: {}});

    }
}
</script>


<style lang="postcss" scoped>
    .bg_innuendo {
        background: #776ccb;
    }
</style>
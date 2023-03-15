function getContraception(data) {
    var historic = []
    var debut = []
    var fin = []
    var nom = []
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].symptoms.length; j++) {
            if ( data[i].symptoms[j].symptom_type_name == 'contraception') {
                if (nom.indexOf(data[i].symptoms[j].value) === -1) {
                    if (i == 0) {
                        nom.push(data[i].symptoms[j].value)
                        var test = new Date(data[i].date)
                        let MyDateString = ('0' + test.getDate()).slice(-2) + '/' + ('0' + (test.getMonth()+1)).slice(-2) + '/' + test.getFullYear();
                        debut.push(MyDateString)
                    }
                    else {
                        nom.push(data[i].symptoms[j].value)
                        var test = new Date(data[i].date)
                        let MyDateString = ('0' + test.getDate()).slice(-2) + '/' + ('0' + (test.getMonth()+1)).slice(-2) + '/' + test.getFullYear();
                        var test1 = new Date(data[i - 1].date)
                        let MyDateString1 = ('0' + test1.getDate()).slice(-2) + '/' + ('0' + (test1.getMonth()+1)).slice(-2) + '/' + test1.getFullYear();
                        
                        debut.push(MyDateString)
                        fin.push(MyDateString1)
                    }
                }
            }
        }
    }
    for (let i = 0; i < nom.length; i++) {
        if (i == nom.length -1) {
            historic.push({
                'nom':nom[i],
                'debut': debut[i],
                'fin': 'Prise en cours'
            })
        }
        else {
            historic.push({
                'nom':nom[i],
                'debut': debut[i],
                'fin': fin[i]
            })
        }
    }
    return [historic, historic[historic.length - 1].nom]
}

function getMedication(data) {
    var historic = []
    const prise = [1, 2, 3, 4]
    const med = ['Spasfon', 'Doliprane', 'Efferalgan', 'Smecta', 'Fervex', 'Advil'];
    const add_med = [0, 1, 2, 3]
    for (let i = 0; i < data.length; i++) {
        var add = Math.floor(Math.random() * add_med.length);
        if (add == 2) {
            var choosen_prise = Math.floor(Math.random() * prise.length);
            var choosen_med = Math.floor(Math.random() * med.length);
            if (med[choosen_med] != 'Rien') {
                var choosen_prise = Math.floor(Math.random() * prise.length);
                var test = new Date(data[i].date)
                let MyDateString = ('0' + test.getDate()).slice(-2) + '/' + ('0' + (test.getMonth()+1)).slice(-2) + '/' + test.getFullYear();
                historic.push({
                    'Médicament': med[choosen_med],
                    'Prise': choosen_prise,
                    'Date': MyDateString
                })
            }
        }
    }
    return historic
    
}

//nb = 1 -> 1 endo || nb == 2 -> en fonction du nombre 
function moyenneEndo(endoscore) {
    var sum = 0;
    endoscore.forEach(function (item) {
        sum += item;
    });
    var tot = (sum / endoscore.length).toFixed(2);
    return tot
}

function dateSymptome(data) {
    var dict = {}
    var date = []
    for (let i = 0; i < data.length; i++) {
        var test = new Date(data[i].date)
        let MyDateString = test.getFullYear() + '/' + ('0' + (test.getMonth()+1)).slice(-2) + '/' + ('0' + test.getDate()).slice(-2);
        var tmp_sympt = ''
        for (let j = 0; j < data[i].symptoms.length; j++) {
            var tmp = data[i].symptoms[j].symptom_type_name
            var value = data[i].symptoms[j].value
            if ( tmp == 'localisation douleur' || tmp == 'sang selles' || tmp == 'dyspareunie' || tmp == 'sang urine' || tmp == 'brulure urinaire' || tmp == 'diarrhee' || tmp == 'constipation' || tmp == 'pollakiurie' || tmp == 'dysurie') {
                date.push(MyDateString)
                if (tmp == 'localisation douleur') {
                    tmp_sympt += '\nLocalisation de la douleur : ' + data[i].symptoms[j].value + '| Douleur : ' + (getRandomInt(10) + 1).toString()
                } if (tmp == 'sang selles' && value > 0) {
                    tmp_sympt += '\nPrésence de sang dans les selles'
                } if (tmp == 'dyspareunie' && value > 0) {
                    tmp_sympt += '\nDouleur lors des rapports'
                } if (tmp == 'sang urine' && value > 0) {
                    tmp_sympt += '\nPrésence de sang dans les urines'
                } if (tmp == 'brulure urinaire' && value > 0) {
                    tmp_sympt += '\nBrûlures urinaires'
                } if (tmp == 'diarrhee' && value > 0) {
                    tmp_sympt += '\nDiarrhée'
                } if (tmp == 'constipation' && value > 0) {
                    tmp_sympt += '\nConstipation'
                } if (tmp == 'pollakiurie' && value > 0) {
                    tmp_sympt += '\nFréquente envie d\'uriner'
                } if (tmp == 'dysurie' && value > 0) {
                    tmp_sympt += '\nDysurie'
                }
            }
        }
        if (tmp_sympt.length > 0) {
            dict[MyDateString] = tmp_sympt
        }
    }
    date = removeDuplicates(date)
    return [date, dict]
}

function getEndo(data) {
    var endo = []
    var date = []
    for (let i = 0; i < data.length; i++) {
        var tmp = getRandomInt(10)
        tmp += Math.random()
        endo.push(tmp)
        var test = new Date(data[i].date)
        let day = test.getDate();
        let month = test.getMonth() + 1;
        let year = test.getFullYear();
        date.push( day + '/' + month + '/' + year)
    }
    date = removeDuplicates(date)
    return [endo, date]
}

function removeDuplicates(arr) {
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getMonth(month) {
    var nb = (month.split('/'))
    var fin = ''
    if (nb[1] == '01')
        fin =  'Janvier'
    if (nb[1] == '02')
        fin =  'Février'
    if (nb[1] == '03')
        fin =  'Mars'
    if (nb[1] == '04')
        fin =  'Avril'
    if (nb[1] == '05')
        fin =  'Mai'
    if (nb[1] == '06')
        fin =  'Juin'
    if (nb[1] == '07')
        fin =  'Juillet'
    if (nb[1] == '08')
        fin =  'Août'
    if (nb[1] == '09')
        fin =  'Septembre'
    if (nb[1] == '10')
        fin =  'Octobre'
    if (nb[1] == '11')
        fin =  'Novembre'
    if (nb[1] == '12')
        fin =  'Décembre'
    return [fin, nb[0]]
}

function occurenceSympt(data, size) {
    console.log(size)
    var sympt = ["Constipation", "Brûlures urinaires", "Présence de sang dans les urines", "Dysurie", "Fréquente envie d'uriner", "Localisation", "Diarrhée", "Douleur lors des rapports", "Présence de sang dans les selles"]
    var nb = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i != sympt.length; i++) {
        for (const [key, value] of Object.entries(data)) {
            var tmp = (value.split('\n'))
            for (let j = 1; j != tmp.length; j++) {
                if (i == 5 && tmp[j].includes('|')) {
                    nb[i] += 1
                }
                else {
                    if (tmp[j] == sympt[i])
                    nb[i] += 1
                }
            }
        }
    }
    var occ = ''
    // quotidien > 90% ||  70 < très fréquent < 90 || 50 < fréquent < 70
    for (let i = 0; i != sympt.length; i++) {
        if (sympt[i] == 'Localisation')
            sympt[i] = 'Autre douleur'
        if ((nb[i] * 100 / size) >= 90)
            occ += ('\n' + (sympt[i]) + ' : quotidien (présent dans au moins 90% des rapports)')
        if (((nb[i] * 100 / size) > 70) && ((nb[i] * 100 / size) < 90))
            occ += ('\n' + (sympt[i]) + ' : très fréquent (présent dans au moins 70% des rapports)')
        if (((nb[i] * 100 / size) > 30) && ((nb[i] * 100 / size) < 70))
            occ += ('\n' + (sympt[i]) + ' : fréquent (présent dans au moins 30% des rapports)')
    }
    return occ
}

export {getContraception, getMedication, moyenneEndo, getEndo, dateSymptome, getMonth, occurenceSympt}

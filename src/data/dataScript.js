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
                        debut.push(data[i].date)
                    }
                    else {
                        nom.push(data[i].symptoms[j].value)
                        debut.push(data[i].date)
                        fin.push(data[i - 1].date)
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
    const med = ["Spasfon", "Doliprane", "Efferalgan", "Smecta", "Fervex", "Advil"];
    const add_med = [0, 1, 2, 3]
    for (let i = 0; i < data.length; i++) {
        var add = Math.floor(Math.random() * add_med.length);
        if (add == 2) {
            var choosen_prise = Math.floor(Math.random() * prise.length);
            var choosen_med = Math.floor(Math.random() * med.length);
            if (med[choosen_med] != "Rien") {
                var choosen_prise = Math.floor(Math.random() * prise.length);
                historic.push({
                    'Médicament': med[choosen_med],
                    'Prise': choosen_prise,
                    'Date': data[i].date
                })
            }
        }
    }
    return historic
    
}

//nb = 1 -> 1 endo || nb == 2 -> en fonction du nombre 
function moyenneEndo(endoscore) {
    var sum = 0;
    endoscore.forEach(function (item, idx) {
        sum += item;
    });
    var tot = (sum / endoscore.length).toFixed(2);
    return tot
}

function dateSymptome(data) {
    var dict = {}
    var date = []
    var sympt = []
    for (let i = 0; i < data.length; i++) {
        var test = new Date(data[i].date)
        let MyDateString = test.getFullYear() + '/' + ('0' + (test.getMonth()+1)).slice(-2) + '/' + ('0' + test.getDate()).slice(-2);
        var tmp_sympt = ''
        for (let j = 0; j < data[i].symptoms.length; j++) {
            var tmp = data[i].symptoms[j].symptom_type_name
            if ( tmp == 'localisation douleur' || tmp == 'sang selles' || tmp == 'dyspareunie' || tmp == 'sang urine' || tmp == 'brulure urinaire' || tmp == 'diarrhee' || tmp == 'constipation' || tmp == 'pollakiurie' || tmp == 'dysurie') {
                date.push(MyDateString)
                if (tmp == 'localisation douleur') {
                    tmp_sympt += "\nLocalisation de la douleur : " + data[i].symptoms[j].value + '| Douleur : ' + (getRandomInt(10) + 1).toString()
                } if (tmp == 'sang selles') {
                    tmp_sympt += '\nPrésence de sang dans les selles'
                } if (tmp == 'dyspareunie') {
                    tmp_sympt += '\nDouleur lors des rapports'
                } if (tmp == 'sang urine') {
                    tmp_sympt += '\nPrésence de sang dans les urines'
                } if (tmp == 'brulure urinaire') {
                    tmp_sympt += '\nBrûlures urinaires'
                } if (tmp == 'diarrhee') {
                    tmp_sympt += '\nDiarrhée'
                } if (tmp == 'Constipation') {
                    tmp_sympt += '\nConstipation'
                } if (tmp == 'pollkiurie') {
                    tmp_sympt += '\nFréquente envie d\'uriner'
                } if (tmp == 'dysurie') {
                    tmp_sympt += '\nDysurie'
                }
            }
        }
        if (tmp_sympt.length > 0) {
            dict[MyDateString] = tmp_sympt
        }
    }
    date = removeDuplicates(date)
    //console.log(date, sympt)
    console.log(dict)
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
        date.push( day + "/" + month + "/" + year)
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

export {getContraception, getMedication, moyenneEndo, getEndo, dateSymptome}

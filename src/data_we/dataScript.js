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

    console.log(historic)
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
    console.log(tot)
    return tot
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
    console.log(date)
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

export {getContraception, getMedication, moyenneEndo, getEndo}

// {
//         Médicament: 'Efferalgan',
//         prise: '1',
//         Date: '01/01/2021',
// },
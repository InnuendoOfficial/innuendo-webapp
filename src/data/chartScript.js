//recupere les symptomes dans tous les rapports situés entre la date_f et date_f
function getSymptome(list_sympt, date_f, date_t) {
    //formatage de la date
    date_f = date_f.replaceAll('/', '-')
    date_t = date_t.replaceAll('/', '-')
    var list_dataset = []
    //recuperation de toutes les dates comprises entre date_f et date_t
    const date_range = getDaysArray(date_f, date_t)
    //pour chaque rapports
    for (var i = 0; i <= list_sympt.length; i++) {
        if (list_sympt[i] == 'Menstruelle')
            list_dataset.push(getData('douleur', date_range))
        if (list_sympt[i] == 'Dysmenorrhée')
            list_dataset.push(getData('dysménorrhée', date_range))
        if (list_sympt[i] == 'Digestion')
            list_dataset.push(getData('douleur digestion', date_range))
        if (list_sympt[i] == 'Défécation')
            list_dataset.push(getData('douleur defecation', date_range))
        if (list_sympt[i] == 'Urinaire')
            list_dataset.push(getData('douleur urinaire', date_range))
        if (list_sympt[i] == 'Pelvienne')
            list_dataset.push(getData('douleurs pelviennes', date_range))
        if (list_sympt[i] == 'Abdominale')
            list_dataset.push(getData('douleurs abdominales', date_range))
        if (list_sympt[i] == 'Fatigue')
            list_dataset.push(getData('fatigue', date_range))
    }
        return list_dataset
}

//creer un tableau contenant toutes les dates en str situées entre start et end
var getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        var new_Date = new Date(dt)
        let MyDateString = new_Date.getFullYear() + '/' + ('0' + (new_Date.getMonth()+1)).slice(-2) + '/' + ('0' + new_Date.getDate()).slice(-2);
        arr.push(MyDateString);
    }
    return arr;
};

//recuperation la valeur du symptome spécifié pour la range de date spécifiée
function getData(symptome, date_range) {
    const data = JSON.parse(localStorage.getItem('data')).data
    var user_data = []
    var date = []
    if (data.length > 0 ) {

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].symptoms.length; j++) {
                var test = new Date(data[i].date)
                let MyDateString = test.getFullYear() + '/' + ('0' + (test.getMonth()+1)).slice(-2) + '/' + ('0' + test.getDate()).slice(-2);
                if ( data[i].symptoms[j].symptom_type_name == symptome) {
                    if (date_range.includes(MyDateString)) {
                        user_data.push(data[i].symptoms[j].value)
                        date.push(MyDateString)
                    }
                }
            }
        }
        date = removeDuplicates(date)
        return [user_data, date]
    }
    return []
}

//used to remove duplicate value in an array
function removeDuplicates(arr) {
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
}

export {getData, getSymptome}
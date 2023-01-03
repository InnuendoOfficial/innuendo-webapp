function getSymptome(sympt) {
    if (sympt == 'Menstruelle')
        return getData('douleur menstruelle')
    if (sympt == 'Dysmenorrhée')
        return getData('dysmenorrhee')
    if (sympt == 'Digestion')
        return getData('douleur digestion')
    if (sympt == 'Défécation')
        return getData('douleur defecation')
    if (sympt == 'Urinaire')
        return getData('douleur urinaire')
    if (sympt == 'Pelvienne')
        return getData('douleurs pelviennes')
    if (sympt == 'Abdominale')
        return getData('douleur')
   // if (sympt == 'Flux')
   //     getData('douleur menstruelle')
    if (sympt == 'Fatigue')
        return getData('fatigue')
}

function getData(symptome) {
    console.log(symptome)
    const data = JSON.parse(localStorage.getItem('data'))
    var user_data = []
    var date = []
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].symptoms.length; j++) {
            if ( data[i].symptoms[j].symptom_type_name == symptome) {
                user_data.push(data[i].symptoms[j].value)
                var test = new Date(data[i].date)
                let MyDateString = test.getFullYear() + '/' + ('0' + (test.getMonth()+1)).slice(-2) + '/' + ('0' + test.getDate()).slice(-2);
                date.push(MyDateString)
            }
        }
    }
    date = removeDuplicates(date)
    return [user_data, date]
}

function removeDuplicates(arr) {
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
}

export {getData, getSymptome}
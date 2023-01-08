function getSymptome(sympt, date_f, date_t) {
    date_f = date_f.replaceAll('/', '-')
    date_t = date_t.replaceAll('/', '-')
    const date_range = getDaysArray(date_f, date_t)
    if (sympt == 'Menstruelle')
        return getData('douleur menstruelle', date_range)
    if (sympt == 'Dysmenorrhée')
        return getData('dysmenorrhee', date_range)
    if (sympt == 'Digestion')
        return getData('douleur digestion', date_range)
    if (sympt == 'Défécation')
        return getData('douleur defecation', date_range)
    if (sympt == 'Urinaire')
        return getData('douleur urinaire', date_range)
    if (sympt == 'Pelvienne')
        return getData('douleurs pelviennes', date_range)
    if (sympt == 'Abdominale')
        return getData('douleur', date_range)
   // if (sympt == 'Flux')
   //     getData('douleur menstruelle')
    if (sympt == 'Fatigue')
        return getData('fatigue', date_range)
}

var getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        var new_Date = new Date(dt)
        let MyDateString = new_Date.getFullYear() + '/' + ('0' + (new_Date.getMonth()+1)).slice(-2) + '/' + ('0' + new_Date.getDate()).slice(-2);
        arr.push(MyDateString);
    }
    return arr;
};

function getData(symptome, date_range) {
    const data = JSON.parse(localStorage.getItem('data'))
    var user_data = []
    var date = []
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].symptoms.length; j++) {
            var test = new Date(data[i].date)
            let MyDateString = test.getFullYear() + '/' + ('0' + (test.getMonth()+1)).slice(-2) + '/' + ('0' + test.getDate()).slice(-2);
            if ( data[i].symptoms[j].symptom_type_name == symptome && date_range.includes(MyDateString)) {
                user_data.push(data[i].symptoms[j].value)
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
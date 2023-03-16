 // 0 = null, 1 = Spotting, 2 = Léger, 3 = Moyen, 4 = Abondant, 5 = Très abondant
const flux = [0, 0, 0, 1, 3, 5, 4, 2, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 4, 2, 1, 3, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 3, 2, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 4, 5, 5, 3, 4, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 1, 3, 4, 5, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    3, 3, 3, 2, 2, 1, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 4, 4, 4, 5, 3, 1, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]


function getSymptome(list_sympt, date_f, date_t) {
    date_f = date_f.replaceAll('/', '-')
    date_t = date_t.replaceAll('/', '-')
    var list_dataset = []
    const date_range = getDaysArray(date_f, date_t)
    for (var i = 0; i <= list_sympt.length; i++) {
        if (list_sympt[i] == 'Menstruelle')
            list_dataset.push(getData('douleur menstruelle', date_range))
        if (list_sympt[i] == 'Dysmenorrhée')
            list_dataset.push(getData('dysmenorrhee', date_range))
        if (list_sympt[i] == 'Digestion')
            list_dataset.push(getData('douleur digestion', date_range))
        if (list_sympt[i] == 'Défécation')
            list_dataset.push(getData('douleur defecation', date_range))
        if (list_sympt[i] == 'Urinaire')
            list_dataset.push(getData('douleur urinaire', date_range))
        if (list_sympt[i] == 'Pelvienne')
            list_dataset.push(getData('douleurs pelviennes', date_range))
        if (list_sympt[i] == 'Abdominale')
            list_dataset.push(getData('douleur', date_range))
        if (list_sympt[i] == 'Flux')
            list_dataset.push([flux, date_range])
        if (list_sympt[i] == 'Fatigue')
            list_dataset.push(getData('fatigue', date_range))
    }

        console.log(list_dataset)
        return list_dataset
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
    const data = JSON.parse(localStorage.getItem('data')).data
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
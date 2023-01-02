function getMenstruelle(data) {
    var menst = []
    var date = []
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].symptoms.length; j++) {
            if ( data[i].symptoms[j].symptom_type_name == 'douleur menstruelle') {
                menst.push(data[i].symptoms[j].value)
                var test = new Date(data[i].date)
                let MyDateString = test.getFullYear() + '/' + ('0' + (test.getMonth()+1)).slice(-2) + '/' + ('0' + test.getDate()).slice(-2);
                date.push(MyDateString)
                var test = new Date(data[i].date)
                let day = test.getDate();
                let month = test.getMonth() + 1;
                let year = test.getFullYear();
                date.push( day + "/" + month + "/" + year)
            }
        }
    }
    date = removeDuplicates(date)
    return [menst, date]
}

function removeDuplicates(arr) {
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
}

export {getMenstruelle}
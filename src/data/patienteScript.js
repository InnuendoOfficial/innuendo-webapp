
//recupere les infos de toutes les patientes en localstorage
//genere un nuero de telephone random pour le moment
// si la patiente n'a âs de nom, l'inscrit sous le nom de jeanne doe pour le moment
function getPatiente(data) {
    //const data = JSON.parse(localStorage.getItem('patientes'))
    var patiente = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].firstname != null) {
            var phone = Math.floor(Math.random() * 9000000000) + 1000000000;
            patiente.push({nom: (data[i].firstname),
                prenom: data[i].lastname,
                telephone: phone,
                mail: data[i].email,
                endoscore: parseFloat(data[i].endoscores)})
        }
        else {
            patiente.push({nom: ('Doe'),
                prenom: 'Jeanne',
                telephone: Math.floor(Math.random() * 9000000000) + 1000000000,
                mail: data[i].email,
                endoscore: parseFloat(data[i].endoscores)})
        }
    }
    return patiente
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export {getPatiente}
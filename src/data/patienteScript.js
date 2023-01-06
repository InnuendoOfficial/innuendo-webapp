
function getPatiente() {
    const data = JSON.parse(localStorage.getItem('patientes'))
    var patiente = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].firstname != null) {
            var phone = Math.floor(Math.random() * 9000000000) + 1000000000;
            var endo = getRandomInt(10) + Math.random()
            patiente.push({nom: (data[i].firstname),
                prenom: data[i].lastname,
                telephone: phone,
                mail: data[i].email,
                endoscore: endo.toFixed(2),})
        }
    }
    return patiente
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export {getPatiente}
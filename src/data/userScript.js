import axios from 'axios'


//mise a jour des parametres utilisateur
async function updatePro(data) {
    var data = JSON.stringify({
        "first_name": data[0],
            "last_name": data[1],
            "email": data[2],
            "phone": data[4],
            "subscription_type": data[5]
      });
    var config = {
        method: 'put',
      maxBodyLength: Infinity,
        url: 'https://innuendo-webapi.herokuapp.com/pro',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.getItem('token'), 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

export {updatePro}
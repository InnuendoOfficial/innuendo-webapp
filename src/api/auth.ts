import axios from 'axios'
import * as fs from 'fs';


export default class APIAuth {
  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async login(login: string, pwd: string) {
    const res = await axios.post('https://innuendo-webapi.herokuapp.com/pro/login', {
      'email': login,
      'password': pwd,
  }
  )
    // throw new Error('Le mot de passe est incorrect.');
    console.log(login, pwd, res.data.access_token)

    localStorage.setItem('token', res.data.access_token)
    const config = {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
      }
      const _user = await axios.get('https://innuendo-webapi.herokuapp.com/pro', config)
      localStorage.setItem('name', _user.data.first_name);
      localStorage.setItem('surname', _user.data.last_name);
      if (localStorage.getItem('first_co') == null) {
        localStorage.setItem('first_co', 'true')
      }
  };

  

  public async verifyCode(code: string) {
    console.log(code)
    // throw new Error('Le code a expiré.');
    const config = {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
      params: {
        'code': code
      },
    }
    const config_patiente = {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
    console.log(config, config_patiente)
    const _data = await axios.get('https://innuendo-webapi.herokuapp.com/pro/patient/datas', config)
    localStorage.setItem('data', JSON.stringify(_data.data))
    const _profile = await axios.get('https://innuendo-webapi.herokuapp.com/pro/patient/profile', config)
    localStorage.setItem('profile', JSON.stringify(_profile.data))
    const _patientes = await axios.get('https://innuendo-webapi.herokuapp.com/pro/patients', config_patiente)
    localStorage.setItem('patientes', JSON.stringify(_patientes.data))
    console.log(_patientes.data)
  }

    private  = 'https://innuendo-webapi.herokuapp.com/';
};
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
    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('name', 'Tristan')
    localStorage.setItem('surname', 'Bourgeois')
  };

  public async verifyCode(code: string) {
    // throw new Error('Le code a expiré.');
    const config = {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
      params: {
        'code': code
      },
    }

    const config_patiente = {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
    
    const _data = await axios.get('https://innuendo-webapi.herokuapp.com/pro/patient/datas', config)
    localStorage.setItem('data', JSON.stringify(_data.data))
    const _profile = await axios.get('https://innuendo-webapi.herokuapp.com/pro/patient/profile', config)
    localStorage.setItem('profile', JSON.stringify(_profile.data))
    const _patientes = await axios.get('https://innuendo-webapi.herokuapp.com/pro/patients', config_patiente)
    localStorage.setItem('patientes', JSON.stringify(_patientes.data))
  }

    private baseUrl = 'https://innuendo-webapi.herokuapp.com/';
};
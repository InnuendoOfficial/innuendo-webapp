import axios from 'axios'

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
    this.token = res.data.access_token
    return {
      access_token: this.token,
      user: {
        firstName: 'Tristan',
        lastName: 'Dustier',
      }
    };
  };

  public async verifyCode(code: string) {
    // throw new Error('Le code a expiré.');
    const config = {
      headers: {'Authorization': 'Bearer ' + this.token},
      params: {
        'code': code
      },
    }
    const _res = await axios.get('https://innuendo-webapi.herokuapp.com/pro/patient/datas', config)
    this.data = _res.data
    return  this.data
  }

    private baseUrl = 'https://innuendo-webapi.herokuapp.com/';
    public token = '';
    public data = [];
};
import axios from 'axios'

export default class APIAuth {
  public constructor(baseUrl: string) {
   // this.baseUrl = baseUrl;
  }

    public async login(login: string, pwd: string) {
      const mail = await axios.get('https://innuendo-api-6c549.ondigitalocean.app/pro/all')
      let emailFound =  false
      for (const element of mail.data) {
        if (element.email == login) {
          emailFound = true;
          if (element.is_subscription_valid) {
            const res = await axios.post('https://innuendo-api-6c549.ondigitalocean.app/pro/login', {
              'email': login,
              'password': pwd,
              }
              )
            // throw new Error('Le mot de passe est incorrect.');

            localStorage.setItem('token', res.data.access_token)
            const config = {
              headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
              }
              const _user = await axios.get('https://innuendo-api-6c549.ondigitalocean.app/pro', config)
              localStorage.setItem('name', _user.data.first_name);
              localStorage.setItem('surname', _user.data.last_name);
              if (localStorage.getItem('first_co') == null) {
                localStorage.setItem('first_co', 'true')
              }
              return 0
          }
          if (!element.is_subscription_valid) {
            return 1  
          }
          else 
            return -1
        }
      }
      return -1
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
    const _data = await axios.get('https://innuendo-api-6c549.ondigitalocean.app/pro/patient/datas', config)
    localStorage.setItem('data', JSON.stringify(_data.data))
    const _profile = await axios.get('https://innuendo-api-6c549.ondigitalocean.app/pro/patient/profile', config)
    localStorage.setItem('profile', JSON.stringify(_profile.data))
    const _patientes = await axios.get('https://innuendo-api-6c549.ondigitalocean.app/pro/patients', config_patiente)
    localStorage.setItem('patientes', JSON.stringify(_patientes.data))
  }

    private  = 'https://innuendo-api-6c549.ondigitalocean.app/';
};
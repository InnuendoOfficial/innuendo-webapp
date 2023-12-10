import APIAuth from './auth';

class APIWrapper {
  
  public constructor(baseUrl: string) {
    this.auth = new APIAuth(baseUrl);
  }

  public auth: APIAuth;
};

export default new APIWrapper('https://innuendo-api-6c549.ondigitalocean.app/');
export default class APIAuth {
  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async login() {
    await new Promise(r => setTimeout(r, 1000));

    // throw new Error('Le mot de passe est incorrect.');
    return {
      access_token: 'tokeeen',
      user: {
        firstName: 'Allan',
        lastName: 'Dustier',
      }
    };
  };

  public async verifyCode() {
    await new Promise(r => setTimeout(r, 1000));

    // throw new Error('Le code a expiré.');
    return {
      code_session_token: 'tokenefnzrpifn',
    };
  };

  private baseUrl = '';
};
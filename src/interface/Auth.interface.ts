export type IUser = {
  accountType: 'user' | 'company';
  userInfo: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string
  companyname: string
  about: {
    headline: string;
    category: string;
    overview: string;
  };
};
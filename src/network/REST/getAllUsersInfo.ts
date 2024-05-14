import { getBaseUrl } from '../instance/config.ts';
import { IUserInfo } from './type.ts';

interface IGetUrl {
  url: string;
}
export const getUsersInfo = async (params: IGetUrl) => {
  const { url } = params;
  const response = await fetch( `${ getBaseUrl() }/${ url }`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Ошибка запроса');
  }
  const data: IUserInfo = await response.json();

  return data
};


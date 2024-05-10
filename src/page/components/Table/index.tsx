import { useEffect, useState } from 'react';
import { getBaseUrl } from '../../../network/instance/config.ts';
import { IUserInfo } from './type.ts';

export const Table = () => {
  const [data, setData] = useState<IUserInfo>()
  interface IGetUrl {
    url: string
  }

  const getAllUsersInfo = async (params: IGetUrl) => {
    const {url} = params
    const response = await fetch(getBaseUrl() + url,{
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Ошибка запроса');
    }
    const data:IUserInfo = await response.json()
    setData(data)
  };

  useEffect(() => {
    getAllUsersInfo({ url: '/api/?results=15' })
      .catch(error => console.error(error));
  }, []);


  if (!data) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>picture</th>
            <th>location</th>
            <th>email</th>
            <th>phone</th>
            <th>registered date</th>
          </tr>
        </thead>
        <tbody>
        {data && data.results.map((res, index) => (
          <tr key={index}>
            <td>{res.name.first + ' ' + res.name.last}</td>
            <td><img src={res.picture.thumbnail} alt="" /></td>
            <td>{res.location.state + ' ' + res.location.city}</td>
            <td>{res.email}</td>
            <td>{res.phone}</td>
            <td>{res.registered.date}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>

  );
};

export default Table;

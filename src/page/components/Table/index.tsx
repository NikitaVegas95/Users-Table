import { ChangeEvent, useEffect, useState } from 'react';
import { getBaseUrl } from '../../../network/instance/config.ts';
import { IUserInfo } from './type.ts';
import SearchButton from '../SearchButton';
import SearchInput from '../SearchInput';
import { debounce } from '../../../helpers/debounce.ts';

export const Table = () => {
  const [dataUserInfo, setDataUserInfo] = useState<IUserInfo>();
  const [inputValue, setInputValue] = useState('');

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    return setInputValue(event.target.value)
  }
  const onClick = () => {
    return setInputValue('')
  }

  interface IGetUrl {
    url: string;
  }

  const getAllUsersInfo = async (params: IGetUrl) => {
    const { url } = params;
    const response = await fetch( `${ getBaseUrl() }/${ url }`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Ошибка запроса');
    }
    const data: IUserInfo = await response.json();
    setDataUserInfo(data);
  };

  useEffect(() => {
    getAllUsersInfo({ url: 'api/?results=15' })
      .catch(error => console.error(error));
  }, []);

  if (!dataUserInfo) {
    return (
      <div>loading...</div>
    );
  }

  const userFilter = dataUserInfo.results.filter(name => {
    //фильтруем по имени исключая регистр и пробелы
    return (`${name.name.first} ${name.name.last}`).toLowerCase().includes(inputValue.toLowerCase().trim())
  });

  const tableBody = userFilter.map((results, uuid) => {
    //получаем список пользователей с возможностью фильтрации
    return (
      <tr key={uuid}>
        <td>{`${results.name.first} ${results.name.last}`}</td>
        <td><img src={results.picture.thumbnail} alt="аватар пользователя" /></td>
        <td>{`${results.location.state} ${results.location.city}`}</td>
        <td>{results.email}</td>
        <td>{results.phone}</td>
        <td>{results.registered.date}</td>
      </tr>
    )
  })

  return (
    <div>
      <form>
        <SearchInput placeholder={'Введите имя пользователя'} onChange={debounce(onChangeInputValue, 400)} type={'text'}/>
        <SearchButton text={'Кнопка'} type={'reset'} onClick={onClick}/>
      </form>
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
        <tbody>{tableBody}</tbody>
      </table>
      {tableBody.length === 0 && (
        <div>
          <p>Ничего не нашлось</p>
        </div>
      )}
    </div>
  );
};

export default Table;

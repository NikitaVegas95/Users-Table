import { ChangeEvent, useEffect, useState } from 'react';
import { IUserInfo } from '../../../../network/REST/type.ts';
import { debounce } from '../../../../helpers/debounce.ts';
import ToolTip from '../ToolTip';
import classes from './index.module.css';
import { dateTransform } from '../../../../helpers/dateTransform.ts';
import { uuidGenerator } from '../../../../helpers/uuidGenerator.ts';
import { getUsersInfo } from '../../../../network/REST/getAllUsersInfo.ts';
import SearchForm from '../SearchForm';
import Loader from '../Loader';

export const Table = () => {

  const [dataUserInfo, setDataUserInfo] = useState<IUserInfo>();
  const [inputValue, setInputValue] = useState('');

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    return setInputValue(event.target.value)
  }
  const onClick = () => {
    return setInputValue('')
  }

  useEffect(() => {
    getUsersInfo({ url: 'api/?results=15' })
      .then((data) => {
        setDataUserInfo(data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  if (!dataUserInfo) {
    return (
      <Loader/>
    );
  }

  const userFilter = dataUserInfo.results.filter(name => {
    //фильтруем по имени, исключая регистр и пробелы
    return (`${name.name.first} ${name.name.last}`).toLowerCase().includes(inputValue.toLowerCase().trim())
  });

  const tableBody = userFilter.map((results) => {
    // получаем список пользователей с возможностью фильтрации
    // uuidGenerator - генерация уникального ключа
    // dateTransform - получаем нужный формат даты
    return (
      <tr key={uuidGenerator()}>
        <td>{`${results.name.first} ${results.name.last}`}</td>
        <td
          className={classes.trPosition}
        >
          <img src={results.picture.thumbnail} alt="аватар пользователя" />
          <ToolTip imgLink={results.picture.medium} />
        </td>
        <td>{`${results.location.state} ${results.location.city}`}</td>
        <td><a href={`mailto:${results.email}`}>{results.email}</a></td>
        <td><a href={`tel:${results.phone}`}>{results.phone}</a></td>
        <td>{dateTransform(results.registered.date)}</td>
      </tr>
    )
  })

  return (
    <div>
      <SearchForm
        placeholder={'Введите имя пользователя'}
        onChange={debounce(onChangeInputValue, 400)}
        type={'text'}
        onClick={onClick}
        text={'Сбросить поиск'}
        typeButton={'reset'}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Picture</th>
            <th>Location</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Registered date</th>
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

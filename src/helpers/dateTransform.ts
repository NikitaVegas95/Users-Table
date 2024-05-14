interface IOptionsDate {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}

export const dateTransform = (params: string | number | Date) => {

  const options: IOptionsDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return new Date(params).toLocaleString("eu-US", options)
}

export const debounce = (callback: any, delay: number) => {
  let timer: any
  return (...arg: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...arg)
    }, delay)
  };
};

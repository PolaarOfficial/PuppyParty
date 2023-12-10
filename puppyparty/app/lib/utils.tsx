export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
  ) => {
    const date = new Date(dateStr);
    console.log("the date: ",date);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  };

  export const getTimeDifference = (
    dateStr:string,
    locale: string='en-US',
  ) => {
    const date = new Date(dateStr).getTime();
    const currentTime= new Date().getTime();
    const diff = currentTime-date;
    return Math.floor(diff / (1000 * 60));

  }
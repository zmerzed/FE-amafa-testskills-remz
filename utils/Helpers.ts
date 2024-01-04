import dayjs from 'dayjs';

const config = useRuntimeConfig();

function truncate(str: string, n = 75, ellipsis = '...'): string {
  return str.length > n ? `${str.substr(0, n - 1)}${ellipsis}` : str;
}

function capitalize(str: string): string {
  return str ? str.toString().charAt(0).toUpperCase() + str.slice(1) : '';
}

function capitalizeSentence(str: string): string {
  const sentence = str.split(' ');

  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = capitalize(sentence[i]);
  }

  return sentence.join(' ');
}

function sentence(arr: any, conjunction = 'and'): string {
  if (Array.isArray(arr)) {
    const tmpSentence = [...arr];
    if (tmpSentence.length <= 2) {
      return tmpSentence.join(` ${conjunction} `);
    }

    const last = tmpSentence.pop();
    return tmpSentence.join(', ') + ` ${conjunction} ` + last;
  }

  return arr;
}

function parseToSnakeCase(str: string): string {
  return str ? str.replace(/\s+/g, '_').toLowerCase() : '';
}

function parseToFormData(data: any, _formData?: FormData, parentKey?: any): FormData {
  let formData = _formData || new FormData();
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    /**
     * NOTE: Special case scenario for `File upload` objects
     * where we want to pass the file
     *
     * TODO: Better checker for it? Not just `file` var
     */
    if (data.file) {
      formData.append(parentKey, data.file);
    } else {
      Object.keys(data).forEach((key) => {
        formData = parseToFormData(data[key], formData, parentKey ? `${parentKey}[${key}]` : key);
      });
    }
  } else {
    const value = data == null ? '' : data;
    formData.append(parentKey, value);
  }

  return formData;
}

function isObject(value: any): boolean {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

function convertToSlug(str: string): string {
  return str
    .toLowerCase() // LowerCase
    .replace(/\s+/g, '-') // space to -
    .replace(/&/g, '-and-') // & to and
    .replace(/--/g, '-'); // -- to -
}

function cleanPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/[^0-9+]/g, '');
}

function removeSpaces(str: string): string {
  return str.replace(/\s/g, '');
}

function url (path: string) {
  const baseUrl = config.public.baseURL;

  // if path doesn't start with a slash, add one
  if (path[0] !== '/') {
    path = `/${path}`;
  }
  
  return `${baseUrl}${path}`;
}

function formatToDayAbbrv(day: string) {

  switch (day) {
    case 'monday':
      return 'Mon'
    case 'tuesday':
      return 'Tue'
    case 'wednesday':
      return 'Wed'
    case 'thursday':
      return 'Thu'
    case 'friday':
      return 'Fri'
    case 'saturday':
      return 'Sat'
    case 'sunday':
      return 'Sun'
  }

  return ''
}

function formatHourToFrom(schedule: object) {
  let now = dayjs()
  let nowFrom = dayjs(now.format('YYYY-MM-DD') + ' ' + schedule.from)
  let nowTo = dayjs(now.format('YYYY-MM-DD') + ' ' + schedule.to)
  return nowFrom.format('hh:mm a') + " - " + nowTo.format('hh:mm a');
}

export {
  capitalize,
  capitalizeSentence,
  truncate,
  sentence,
  parseToSnakeCase,
  parseToFormData,
  // isObject,
  convertToSlug,
  cleanPhoneNumber,
  removeSpaces,
  url,
  formatToDayAbbrv,
  formatHourToFrom
};

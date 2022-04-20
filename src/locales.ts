interface ILocale {
    [locale: string]: {
        [key: string]: string,
    }
}

const locales: ILocale = {
    'en-US': {
        'com.datepicker.month.1': 'January',
        'com.datepicker.month.2': 'February',
        'com.datepicker.month.3': 'March',
        'com.datepicker.month.4': 'April',
        'com.datepicker.month.5': 'May',
        'com.datepicker.month.6': 'June',
        'com.datepicker.month.7': 'July',
        'com.datepicker.month.8': 'August',
        'com.datepicker.month.9': 'September',
        'com.datepicker.month.10': 'October',
        'com.datepicker.month.11': 'November',
        'com.datepicker.month.12': 'December',
        'com.datepicker.weekDay.1': 'Mo',
        'com.datepicker.weekDay.2': 'Tu',
        'com.datepicker.weekDay.3': 'We',
        'com.datepicker.weekDay.4': 'Th',
        'com.datepicker.weekDay.5': 'Fr',
        'com.datepicker.weekDay.6': 'Sa',
        'com.datepicker.weekDay.7': 'Su',
        'com.datepicker.unit.year': ' ',
        'com.datepicker.pleaseInputYear': 'Please enter the first year',
        'com.datepicker.setToday': 'Set to today',

        'com.timepicker.setNow': 'Set Now',
        'com.timepicker.ok': 'OK',
    },
    'zh-TW': {
        'com.datepicker.month.1': '1月',
        'com.datepicker.month.2': '2月',
        'com.datepicker.month.3': '3月',
        'com.datepicker.month.4': '4月',
        'com.datepicker.month.5': '5月',
        'com.datepicker.month.6': '6月',
        'com.datepicker.month.7': '7月',
        'com.datepicker.month.8': '8月',
        'com.datepicker.month.9': '9月',
        'com.datepicker.month.10': '10月',
        'com.datepicker.month.11': '11月',
        'com.datepicker.month.12': '12月',
        'com.datepicker.weekDay.1': '一',
        'com.datepicker.weekDay.2': '二',
        'com.datepicker.weekDay.3': '三',
        'com.datepicker.weekDay.4': '四',
        'com.datepicker.weekDay.5': '五',
        'com.datepicker.weekDay.6': '六',
        'com.datepicker.weekDay.7': '日',
        'com.datepicker.unit.year': '年',
        'com.datepicker.pleaseInputYear': '請輸入西元年',
        'com.datepicker.setToday': '設定為今天',

        'com.timepicker.setNow': '現在',
        'com.timepicker.ok': '確定',
    },
    'zh-CN': {
        'com.datepicker.month.1': '1月',
        'com.datepicker.month.2': '2月',
        'com.datepicker.month.3': '3月',
        'com.datepicker.month.4': '4月',
        'com.datepicker.month.5': '5月',
        'com.datepicker.month.6': '6月',
        'com.datepicker.month.7': '7月',
        'com.datepicker.month.8': '8月',
        'com.datepicker.month.9': '9月',
        'com.datepicker.month.10': '10月',
        'com.datepicker.month.11': '11月',
        'com.datepicker.month.12': '12月',
        'com.datepicker.weekDay.1': '一',
        'com.datepicker.weekDay.2': '二',
        'com.datepicker.weekDay.3': '三',
        'com.datepicker.weekDay.4': '四',
        'com.datepicker.weekDay.5': '五',
        'com.datepicker.weekDay.6': '六',
        'com.datepicker.weekDay.7': '日',
        'com.datepicker.unit.year': '年',
        'com.datepicker.pleaseInputYear': '请输入西元年',
        'com.datepicker.setToday': '设定为今天',

        'com.timepicker.setNow': '此刻',
        'com.timepicker.ok': '确定',
    }
};




const translateI18n = (id: string, options?: {defaultMessage?: string, locale?: string}) => {
    const selectLocale = typeof options?.locale !== 'undefined' ? options.locale : 'en-US';
    const localeMap = locales[selectLocale] ? locales[selectLocale]: locales['en-US'];

    if(typeof localeMap !== 'undefined' && typeof localeMap[id] !== 'undefined'){
        return localeMap[id];
    }

    if(typeof options?.defaultMessage !== 'undefined'){
        return options?.defaultMessage;
    }

    return id;
}

export default translateI18n;

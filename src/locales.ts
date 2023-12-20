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
        'com.datepicker.today': 'Today',
        'com.datepicker.tomorrow': 'Tomorrow',
        'com.datepicker.twoDay': 'Two day',
        'com.datepicker.thisWeek': 'This Week',
        'com.datepicker.nextWeek': 'Next Week',

        'com.timepicker.time': 'Time',
        'com.timepicker.setNow': 'Now',
        'com.timepicker.ok': 'OK',
        'com.timepicker.start': 'Start',
        'com.timepicker.end': 'End',
        'com.timepicker.hour': 'H',
        'com.timepicker.minute': 'M',
        'com.timepicker.second': 'S',

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
        'com.datepicker.weekDay.1': '週一',
        'com.datepicker.weekDay.2': '週二',
        'com.datepicker.weekDay.3': '週三',
        'com.datepicker.weekDay.4': '週四',
        'com.datepicker.weekDay.5': '週五',
        'com.datepicker.weekDay.6': '週六',
        'com.datepicker.weekDay.7': '週日',
        'com.datepicker.unit.year': '年',
        'com.datepicker.pleaseInputYear': '請輸入西元年',
        'com.datepicker.setToday': '設定為今天',
        'com.datepicker.today': '今天',
        'com.datepicker.twoDay': '兩天',
        'com.datepicker.tomorrow': '明天',
        'com.datepicker.thisWeek': '這週',
        'com.datepicker.nextWeek': '下週',


        'com.timepicker.time': '時間',
        'com.timepicker.setNow': '現在',
        'com.timepicker.ok': '確定',
        'com.timepicker.start': '開始',
        'com.timepicker.end': '結束',
        'com.timepicker.hour': '時',
        'com.timepicker.minute': '分',
        'com.timepicker.second': '秒',
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
        'com.datepicker.weekDay.1': '週一',
        'com.datepicker.weekDay.2': '週二',
        'com.datepicker.weekDay.3': '週三',
        'com.datepicker.weekDay.4': '週四',
        'com.datepicker.weekDay.5': '週五',
        'com.datepicker.weekDay.6': '週六',
        'com.datepicker.weekDay.7': '週日',
        'com.datepicker.unit.year': '年',
        'com.datepicker.pleaseInputYear': '请输入西元年',
        'com.datepicker.setToToday': '设定为今天',
        'com.datepicker.setToday': '设定为今天',
        'com.datepicker.today': '今天',
        'com.datepicker.tomorrow': '明天',
        'com.datepicker.twoDay': '两天',
        'com.datepicker.thisWeek': '这周',
        'com.datepicker.nextWeek': '下周',

        'com.timepicker.time': '时间',
        'com.timepicker.setNow': '此刻',
        'com.timepicker.ok': '确定',
        'com.timepicker.start': '开始',
        'com.timepicker.end': '结束',
        'com.timepicker.hour': '时',
        'com.timepicker.minute': '分',
        'com.timepicker.second': '秒',
    },
    'ja-JP': {
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
        'com.datepicker.weekDay.1': '週一',
        'com.datepicker.weekDay.2': '週二',
        'com.datepicker.weekDay.3': '週三',
        'com.datepicker.weekDay.4': '週四',
        'com.datepicker.weekDay.5': '週五',
        'com.datepicker.weekDay.6': '週六',
        'com.datepicker.weekDay.7': '週日',
        'com.datepicker.unit.year': '年',
        'com.datepicker.pleaseInputYear': '西暦年を入力してください',
        'com.datepicker.setToToday': '今日に設定',
        'com.datepicker.setToday': '今日に設定',
        'com.datepicker.today': '今日',
        'com.datepicker.tomorrow': '明日',
        'com.datepicker.twoDay': '二日',
        'com.datepicker.thisWeek': '今週',
        'com.datepicker.nextWeek': '来週',

        'com.timepicker.time': '時間',
        'com.timepicker.setNow': '現在',
        'com.timepicker.ok': '確定',
        'com.timepicker.start': '開始',
        'com.timepicker.end': '終了',
        'com.timepicker.hour': '時',
        'com.timepicker.minute': '分',
        'com.timepicker.second': '秒',
    }
};




const useLocale = (locale?: string) => {
    const i18n = (id: string, options?: {def?: string}) => {
        const selectLocale = typeof locale !== 'undefined' ? locale : 'en-US';
        const localeMap = locales[selectLocale] ? locales[selectLocale]: locales['en-US'];

        if(typeof localeMap !== 'undefined' && typeof localeMap[id] !== 'undefined'){
            return localeMap[id];
        }

        if(typeof options?.def !== 'undefined'){
            return options?.def;
        }

        return id;
    };

    return {i18n};
};

export default useLocale;

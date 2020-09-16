export function formatTime() {
    let date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' +
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + 'Z';
}

//输入时间格式为：‘2019-05-05T15:52:19Z’
//将输入转为几分钟/几小时/几天。。。前
export default function timeMinus(UTCtime) {
    const T_pos = UTCtime.indexOf('T');
    const Z_pos = UTCtime.indexOf('Z');
    const year_month_day = UTCtime.substr(0, T_pos);
    const hour_minute_second = UTCtime.substr(T_pos + 1, Z_pos - T_pos - 1);
    const new_datetime = year_month_day + " " + hour_minute_second;

    const dateTime = new Date(new_datetime);

    const no1new = dateTime.valueOf();

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    dateTime.getSeconds();
    const now = new Date();
    const now_new = now.valueOf();  //typescript转换写法

    let milliseconds;
    let timeSpanStr;

    milliseconds = now_new - no1new;

    if (milliseconds <= 1000 * 60) {
        timeSpanStr = '刚刚';
    } else if (1000 * 60 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    } else if (1000 * 60 * 60 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
    } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }
    return timeSpanStr;
}

/**
 * 对小于10的数字前面补0
 * @param {String} num
 */
export const fixZero = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};

export const formatDate = (date, formatStr) => {
  const d = new Date(date);
  const years = d.getFullYear();
  const month = fixZero(d.getMonth() + 1);
  const day = fixZero(d.getDate());
  const hours = fixZero(d.getUTCHours() + 8); // 不用getHours是因为测试的模拟器时间错误 TAT
  const minutes = fixZero(d.getMinutes());
  const seconds = fixZero(d.getSeconds());

  // stupid code
  switch (formatStr) {
    case 'MM.dd':
      return `${month}.${day}`;
    case 'yyyy-MM-dd':
      return `${years}-${month}-${day}`;
    case 'HH:mm:ss':
      return `${hours}:${minutes}:${seconds}`;
    case 'yyyy-MM-dd HH:mm':
      return `${years}-${month}-${day} ${hours}:${minutes}`;
    default:
      return `${years}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
};

/**
 * 针对PPmoney返回的日期进行格式化
 * @param {number|string} date 20170202 20170102092236
 * @param {string} formatStr yyyy-MM-dd
 */
export const formatDate2 = (date, formatStr) => {
  const d = `${date}`;
  const years = d.substr(0, 4);
  const month = d.substr(4, 2);
  const day = d.substr(6, 2);
  const hours = d.substr(8, 2) || '00';
  const minutes = d.substr(10, 2) || '00';
  const seconds = d.substr(12, 2) || '00';

  // stupid code
  switch (formatStr) {
    case 'MM.dd':
      return `${month}.${day}`;
    case 'yyyy-MM-dd':
      return `${years}-${month}-${day}`;
    case 'yyyy/MM/dd':
      return `${years}/${month}/${day}`;
    case 'HH:mm:ss':
      return `${hours}:${minutes}:${seconds}`;
    case 'yyyy-MM-dd HH:mm':
      return `${years}-${month}-${day} ${hours}:${minutes}`;
    default:
      return `${years}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
};

export const formatHashTabId = (hash) => {
  if (!hash) return '';
  const tab = hash.substr(1); // 去掉开头的#号
  return tab;
};

export const randomString = (len = 32) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_$';
  for (let i = 0; i < len; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return `${text}`;
};

// 去处文本中的html标记
export const delHtmlTag = (html = '') => html.replace(/<[^>]+>/g, '');

/**
 * 信息收集
 * @param {string} eventID 事件id
 * @param {array} args 参数
 * @example webInfoCollect('eventId', 'key', 'value')
 * @example webInfoCollect('repay_next_click', 'type', 'normal', 'result', 'success')
 */
export const webInfoCollect = (eventID, name, ...args) => {
  let json = null;
  if (args.length > 1) {
    json = {};
    for (let i = 0; i <= args.length - 2; i += 2) {
      json[args[i]] = args[i + 1];
    }
  } else if (args.length === 1) {
    // eslint-disable-next-line
    console.warn(...args, 'will not send');
  }
  if (window.jsBridge && typeof window.jsBridge.webInfoCollectKeyValue === 'function' &&
    typeof window.jsBridge.webInfoCollectJson === 'function') {
    if (json) {
      window.jsBridge.webInfoCollectJson(eventID, name, JSON.stringify(json));
      return;
    }
    window.jsBridge.webInfoCollect(eventID, name);
  } else {
    if (json) {
      // eslint-disable-next-line
      console.log('数据收集v2', eventID, name, JSON.stringify(json));
      return;
    }
    // eslint-disable-next-line
    console.log('数据收集v2', eventID, name, ...args);
  }
};


// eslint-disable-next-line
export const getUrlKey = (name) => {
  // eslint-disable-next-line
  return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href) || [,""])[1].replace(/\+/g,'%20'))||null;
}

/* eslint-disable */

// 向右移位
function shiftRight(number, digit){
  digit = parseInt(digit, 10);
  var value = number.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + digit) : digit))
}
// 向左移位
function shiftLeft(number, digit){
  digit = parseInt(digit, 10);
  var value = number.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - digit) : -digit))
}

// 数字转大写
export const digitUpperCase = (n) => {
  var fraction = ['角', '分'];
  var digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(shiftRight(n,1+i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
      var p = '';
      for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(shiftLeft(n, 1));
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整');
};

// 获取当前日期
export const nowDate = () => {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
  const day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
  const dateStr = year + "-" + month + "-" + day;
  return dateStr;
};

/**
 * 字段隐藏规则
 */
export const fieldFormatRule = {
  // 身份证号（显示前六位后四位）
  document(idcardnum) {
    return idcardnum.replace(/(\d{6})\d+(\w{4})/, "$1********$2");
  },

  // 姓名（保留最后一个字）
  name(userName) {
    return `${'****'.slice(0, userName.length-1)}${userName.slice(-1)}`;
  },
  acName(userName) {
    return `${'****'.slice(0, userName.length-1)}${userName.slice(-1)}`;
  },
  repayUserName(userName) {
    return `${'****'.slice(0, userName.length-1)}${userName.slice(-1)}`;
  },

  // 银行卡号（显示前四位后四位）
  bankCard(bankAccount) {
    return bankAccount.replace(/(\d{4})\d+(\d{4})/, "$1 **** **** $2");
  },
  repayBankAccount(bankAccount) {
    return bankAccount.replace(/(\d{4})\d+(\d{4})/, "$1 **** **** $2");
  },

  // 手机号（显示前三位后四位）
  phone(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  }
};

  //格式化金额
export const outputdollars = (number) => {
if (number.length <= 3)
  return (number == '' ? '0' : number);
else {
  var mod = number.length % 3;
  var output = (mod == 0 ? '' : (number.substring(0, mod)));
  for (let i = 0; i < Math.floor(number.length / 3); i++) {
    if ((mod == 0) && (i == 0))
      output += number.substring(mod + 3 * i, mod + 3 * i + 3);
    else
      output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
  }
  console.log(milliFormat('11123123231.3213'));
  return output;
}
}

function outputmoney(number) {
  number = number.replace(/\,/g, "");
  if(isNaN(number) || number == "")return "";
  number = Math.round(number * 100) / 100;
    if (number < 0)
      return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
    else
      return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
}

function outputcents(amount) {
  amount = Math.round(((amount) - Math.floor(amount)) * 100);
  return (amount < 10 ? '.0' + amount : '.' + amount);
}
export const milliFormat = (s) => { //添加千位符
  if(/[^0-9\.]/.test(s)) return "invalid value";
  s=s.replace(/^(\d*)$/,"$1.");
  s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
  s=s.replace(".",",");
  var re=/(\d)(\d{3},)/;
  while(re.test(s)){
      s=s.replace(re,"$1,$2");
  }
  s=s.replace(/,(\d\d)$/,".$1");
  return s.replace(/^\./,"0.")
}

export const getTimeStamp = () => {
    return new Date().getTime();
}

export const getTime = () => {
    return Date.parse(new Date());
}

export const getNowTimestamp = () => {
  return Date.parse(new Date()) / 1000;
}

export const IsNumber = (data) => {
    const reg = new RegExp(/^\d+$/);
    return reg.test(data);
}

// 日期(年月日)转时间戳
export const DateToTimeStamp = (date) => {
    date = date.replace('年','-').replace('月','-').replace('日','');
    let timestamp2 = Date.parse(new Date(date));
    timestamp2 = timestamp2 / 1000;
    return timestamp2;
}

export const isChinese = (temp) => {
    if (escape(temp).indexOf( "%u" ) <0) {
        return false ;
    }
    return true;
}

export const assign = typeof Object.assign == 'function' ? Object.assign : function (target){
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
            for (var key in source) {
                if (hasOwn.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
}


export const bufferToString = function (buffer){
  let str = ''
  buffer.forEach(element => {
    str += String.fromCharCode(element)
  });
  return str;
}

export const isKsLoan = () => {
    if (/ks_loan/.test(navigator.userAgent)) {
        return true;
    }
    return false;
}

export const isIos = () => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        return true;
    }
    return false;
}

/*
  安卓下模拟paste操作
*/
export const androidPaste = {
  isContextMunue: false,
  isInput: false,
  inputChange(newvalue, oldvalue, pageEvent, logKey, Browser) {
    let isCopy = false;
    const newValue = newvalue;
    const oldValue = oldvalue;
    if (newValue.length > 0 && oldValue !== newValue) {
      this.isInput = true;
      if (this.isInput && this.isContextMunue) {
        isCopy = true;
        this.paste(pageEvent, logKey, Browser);
      }
    }
    return isCopy
  },
  contextMenue() {
    this.isContextMunue = true;
  },
  paste(pageEvent, logKey, Browser) {
    this.isContextMunue = false;
    this.isInput = false;
    const completeTime = new Date().getTime();
    let pasteName = ''
    switch (pageEvent.name) {
      case 'workUnit':
        pasteName = 'work_paste'
        break;
      case 'phoneNumber1':
        pasteName = 'contact1_phone_paste'
        break;
      case 'phoneNumber2':
        pasteName = 'contact2_phone_paste'
        break;
      case 'mail':
        pasteName = 'email_paste'
        break;
      case 'card':
        pasteName = 'credit_card_paste'
        break;
      case 'phone':
        pasteName = 'credit_card_phone_paste'
        break;
      case 'login_phone_paste':
        pasteName = 'login_phone_paste'
      break;
      default:
        break;
    }
    // 在app内就不用模拟paste
    if (Browser.name === 'ksLoan' || Browser.name === 'WpsMoffice') return;
    window.eventTracking({
      event: pasteName,
      content: pageEvent.con,
      isCopy: true,
    }, logKey);
    window.webInfoCollectJson({
      name: pasteName,
      content: pageEvent.con,
      completeTime,
      isCopy: true,
      userid: localStorage.userId
    })
  }
}

/*
  获取cookie
*/
export const getCookie = (cookie) => {
  const cookieArr = document.cookie.split(';');
  let obj = {};
  if (cookie) {
    for (let key in cookieArr) {
      let temp = cookieArr[key].split('=');
      obj[temp[0].replace(/\s+/g, '')] = temp[1];
    }
    if (Object.keys(obj).includes(cookie)) {
      return obj[cookie];
    } else {
      return false;
    }
  }
  return false;
}
/*
  设置cookie
*/
export const setCookie = (cookieName, cookieValue, daysToExpire) => {
  const date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
}
/*
  清楚cookie
*/
export const deleteCookie = (cookiename) => {
 document.cookie = cookiename + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}
export const utf8_to_b64 = (characteristic) => {
  return window.btoa(unescape(encodeURIComponent(characteristic))).replace(/[+]/g, '-').replace(/[/]/g, '_')
}
/*
  反显格式化手机号
*/
export const formatPhone = (phone) => {
  phone = phone.replace(/\D/g, '');
  phone = phone.startsWith('86') ? phone.substring(2) : phone;
  return phone;
}

export const wpsCloseWeb = () => {
  const data = JSON.parse(window.splash.jsGetDeviceInfo());
  const edition = '11.7.0';
  if (data.app_version >= edition) {
      // 11.7.0及以上
      wps.closeWeb();
      return ;
  }
  // 11.7以下
  window.splash.onBackPressed(true);
  return ;
}
/* 
  身份证号检验，长度18位数字最后一位允许字符X
*/
export const checkIDCard = (IDCard) => {
  const reg = /^\d{17}(\d|x|X)$/;
  return  reg.test(IDCard)
}

/* 
  姓名检验，只能是中文
*/
export const checkName = (name) => {
  const reg = /^[\u4e00-\u9fa5]+(·|-|●)?[\u4e00-\u9fa5]+$/;
  return  reg.test(name)
}
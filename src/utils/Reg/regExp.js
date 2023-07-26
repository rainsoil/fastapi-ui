export const regExp = {
	nsrsbh: /^.{1,20}$/, // 纳税人识别号
	truename: /^[\u4e00-\u9fa5]{2,6}$/, // 真实姓名
	username: /^1[1-9]\d{9}|superadmin$/, // 用户名（手机号）
	passwordSimple: /^(?![a-zA-Z]{6,16}$)(?![0-9]{6,16}$)[a-zA-Z0-9]{6,16}$/,  // 密码简单版本
	password: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*,%?])[A-Za-z0-9._~!@#$^&*,%?]{8,20}$/, // 密码：密码由8位以上字母、数字、特殊符号组成，区分大小写
	number: /^\d+(\.\d+)?$/, // 数字（带小数点）
  positiveNumber:/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,//正数（带小数点）
	url: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/, // 合法uri
	email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, // 邮箱
	phone: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, // 手机号码
	tel: /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/ // 座机号码
}

/* 身份证号*/
export function validateIdCard(idcard) {
	const Errors = ['true', '身份证号码位数不对，请重新填写!', '身份证号码出生日期超出范围或含有非法字符，请重新填写!', '身份证号码校验错误，请重新填写!', '身份证地区非法，请重新填写!']
	const area = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
	var Y, JYM, ereg
	var S, M
	const idcard_array = idcard.split('')
	// 地区检验
	if (area[parseInt(idcard.substr(0, 2))] == null) return Errors[4]
	// 身份号码位数及格式检验
	switch (idcard.length) {
		case 15:
			if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/// 测试出生日期的合法性
			} else {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/// 测试出生日期的合法性
			}
			if (ereg.test(idcard)) { return Errors[0] } else { return Errors[2] }
			break
		case 18:
			// 18位身份号码检测
			// 出生日期的合法性检查
			// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
			// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
			if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
				ereg = /^[1-9][0-9]{5}[1-2][0-9][0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/// 闰年出生日期的合法性正则表达式
			} else {
				ereg = /^[1-9][0-9]{5}[1-2][0-9][0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/// 平年出生日期的合法性正则表达式
			}
			if (ereg.test(idcard)) { // 测试出生日期的合法性
				// 计算校验位
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
					(parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
					(parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
					(parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
					(parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
					(parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
					(parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
					parseInt(idcard_array[7]) * 1 +
					parseInt(idcard_array[8]) * 6 +
					parseInt(idcard_array[9]) * 3
				Y = S % 11
				M = 'F'
				JYM = '10X98765432'
				M = JYM.substr(Y, 1) // 判断校验位
				if (M == idcard_array[17]) { return Errors[0] } // 检测ID的校验位
				else { return Errors[3] }
			} else { return Errors[2] }
			break
		default: return Errors[1]
			break
	}
}

/**
 * 校验地址码
 * @param addressCode
 */
 function checkAddressCode(addressCode) {
  const provinceAndCitys = {
    11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江',
    31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东',
    45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏',
    65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外',
  };
  const check = /^[1-9]\d{5}$/.test(addressCode);
  if (!check) return false;
  return !!provinceAndCitys[parseInt(addressCode.substring(0, 2))];
}

/**
 * 校验组织机构代码
 * @param value
 */
 function orgCodeValidate(value) {
  if (value != '') {
    const part1 = value.substring(0, 8);
    const part2 = value.substring(value.length - 1, 1);
    const ws = [3, 7, 9, 10, 5, 8, 4, 2];
    const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reg = /^([0-9A-Z]){8}$/;
    if (!reg.test(part1)) {
      return true;
    }
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      sum += str.indexOf(part1.charAt(i)) * ws[i];
    }
    let C9 = 11 - (sum % 11);
    let YC9 = part2 + '';
    if (C9 == 11) {
      C9 = '0';
    } else if (C9 == 10) {
      C9 = 'X';
    } else {
      C9 = C9 + '';
    }
    return YC9 != C9;
  } else {
    return false;
  }
}

/**
 * 校验纳税人识别号
 * @param value
 * 校验规则： 由数字和大写英文组成，长度为15位或17位或18或20位的字符串
 */
 export function validateTaxNumber(value) {
  if (value.trim() === '') {
    return '请输入统一社会信用代码格式';
  }

  // if(!/^[A-Z|0-9]{15}|[A-Z|0-9]{17}|[A-Z|0-9]{18}|[A-Z|0-9]{20}$/.test(value.trim())){
  //   callback('纳税人识别号不正确');
  // }
  let length = value.trim().length;
  if (length !== 15 && length !== 17 && length !== 18 && length !== 20) {
    return '统一社会信用代码格式不正确';
  }
  const addressCode = value.substring(0, 6);
  // 校验地址码
  let check = checkAddressCode(addressCode);
  if (!check) {
    return '请输入正确的统一社会信用代码(地址码)！';
  } else {
    // 校验组织机构代码
    const orgCode = value.substring(6, 9);
    check = orgCodeValidate(orgCode);
    if (!check) {
      return '请输入正确的统一社会信用代码(组织机构代码) ！'
    }
  }
	return 'true'
}
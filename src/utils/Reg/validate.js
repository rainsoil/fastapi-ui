import { regExp, validateIdCard, validateTaxNumber } from './regExp'

export const RULES = {
	// 纳税人识别号
	nsrsbh: function (rule, value, callback) {
		if (!regExp.nsrsbh.test(value)) {
			callback(new Error('请输入正确的纳税人识别号'))
		} else {
			callback()
		}
	},
	// 用户名
	username: function (rule, value, callback) {
		if (!regExp.username.test(value)) {
			callback(new Error('请输入正确手机号码'))
		} else {
			callback()
		}
	},
	// 真实姓名
	truename: function (rule, value, callback) {
		if (value && !(regExp.truename.test(value))) {
			callback(new Error('请输入正确姓名'))
		} else {
			callback()
		}
	},
	// 密码
	password: function (rule, value, callback) {
		if (value && !regExp.password.test(value)) {
			callback(new Error('密码由8位以上字母、数字、特殊符号组成，区分大小写'))
		} else {
			callback()
		}
	},
	// 数字带小数点
	number: function (rule, value, callback) {
		if (value &&!regExp.number.test(value)) {
			callback(new Error('请输入数字'))
		} else {
			callback()
		}
	},
  //正数带小数点
  positiveNumber: function (rule, value, callback) {
		if (value!==''&&!regExp.positiveNumber.test(value)) {
			callback(new Error('请输入正数'))
		} else {
			callback()
		}
	},
	// url
	url: function (rule, value, callback) {
		if (!regExp.url.test(value)) {
			callback(new Error('请输入正确的url'))
		} else {
			callback()
		}
	},
	// 邮箱
	email: function (rule, value, callback) {
		if (value && !regExp.email.test(value)) {
			callback(new Error('请输入正确的邮箱'))
		} else {
			callback()
		}
	},
	// 身份证号
	idCard: function (rule, value, callback) {
		if (value) {
			const message = validateIdCard(value)
			if (message !== 'true') {
				callback(new Error(message))
			} else {
				callback()
			}
		}
	},
	// 统一社会信用代码
	taxNum: function (rule, value, callback) {
		if (value) {
			const message = validateTaxNumber(value)
			if (message !== 'true') {
				callback(new Error(message))
			} else {
				callback()
			}
		}
	},
	// 手机号码
	phone: function (rule, value, callback) {
		if (value && !regExp.phone.test(value)) {
			callback(new Error('请输入正确的手机号码'))
		} else {
			callback()
		}
	},
	// 手机号码 vs 座机号码
	telphone: function (rule, value, callback) {
		if (value && !(regExp.phone.test(value) || regExp.tel.test(value))) {
			callback(new Error('请输入正确的号码'))
		} else {
			callback()
		}
	},
	// 输入大于0
	bigThan0: function (rule, value, callback) {
		if (value <= 0) {
			callback(new Error('输入数字必须大于0'))
		} else {
			callback()
		}
	},
	//角色标识
	validatorKey:function(rule, value, callback) {
		let acount = /^[A-Z_]+$/
		if (value && (!(acount).test(value))) {
			callback(new Error('请输入大写英文、下划线'))
		} else {
			if(value.length<3 || value.length>20){
				callback(new Error('长度在 3 到 20 个字符'))
			} else {
				callback()
			}
		}
	},
	// 角色名称和角色标识长度
	roleLen:function(rule,value,callback){
		if(value.length<3 || value.length>20){
			callback(new Error('长度在 3 到 20 个字符'))
		} else {
			callback()
		}
	}
}


export function REQUIRED(msg = '必填项', trigger = 'change') { // 如果是必填项在规则数组中加上REQUIRED()
	return {
		required: true,
		message: msg,
		trigger: trigger
	}
}


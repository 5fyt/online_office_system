/**
 * 验证是否为空或者空字符串
 */
 export function isBlank(s: string) {
	return s == null || s.length == 0;
}

/**
 * 验证邮箱
 */
export function isEmail(s: string) {
	return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
}

/**
 * 验证手机号码
 */
export function isPhone(s: string) {
	return /^1[1-9]\d{9}$/.test(s);
}

/**
 * 验证URL地址
 */
export function isURL(s: string) {
	return /^http[s]?:\/\/.*/.test(s);
}

/**
 * 验证用户名
 */
export function isUsername(s: string) {
	return /^[a-zA-Z0-9]{5,50}$/.test(s);
}

/**
 * 验证密码
 */
export function isPassword(s: string) {
	return /^[a-zA-Z0-9]{6,20}$/.test(s);
}

/**
 * 验证手机短信验证码
 */
export function isSendCode(s: string) {
	return /^\d{6}$/.test(s);
}

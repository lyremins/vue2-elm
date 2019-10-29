import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});


/**
 * 获取首页热门城市
 */

export const hotcity = () => fetch('/v1/cities', {
	type: 'hot'
});


/**
 * 获取首页所有城市
 */

export const groupcity = () => fetch('/v1/cities', {
	type: 'group'
});


/**
 * 获取当前所在城市
 */

export const currentcity = number => fetch('/v1/cities/' + number);


/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});


/**
 * 获取msite页面地址信息
 */

export const msiteAddress = geohash => fetch('/v2/pois/' + geohash);


/**
 * 获取msite页面食品分类列表
 */

export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
	geohash,
	group_type: '1',
	'flags[]': 'F'
});


/**
 * 获取msite商铺列表
 */

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
	let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
	let data = {
		latitude,
		longitude,
		offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
	};
	return fetch('/shopping/restaurants', data);
};


/**
 * 获取search页面搜索结果
 */

export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
	'extras[]': 'restaurant_activity',
	geohash,
	keyword,
	type: 'search'
});


/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category', {
	latitude,
	longitude
});


/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => fetch('/shopping/v1/restaurants/activity_attributes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取shop页面商铺详情
 */

export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
	latitude,
	longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
});



/**
 * 获取shop页面菜单列表
 */

export const foodMenu = restaurant_id => fetch('/shopping/v2/menu', {
	restaurant_id
});


/**
 * 获取商铺评价列表
 */

export const getRatingList = (shopid, offset, tag_name = '') => fetch('/ugc/v2/restaurants/' + shopid + '/ratings', {
	has_content: true,
	offset,
	limit: 10,
	tag_name
});


/**
 * 获取商铺评价分数
 */

export const ratingScores = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/scores');


/**
 * 获取商铺评价分类
 */

export const ratingTags = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/tags');


/**
 * 获取短信验证码
 */

export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
	mobile: phone,
	scene: 'login',
	type: 'sms'
}, 'POST');


/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch('/v1/captchas', {},'POST');


/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {
	[type]: checkNumber,
	type
});


/**
 * 发送帐号
 */

export const sendMobile = (sendData, captcha_code, type, password) => fetch('/v1/mobile/verify_code/send', {
	action: "send",
	captcha_code,
	[type]: sendData,
	type: "sms",
	way: type,
	password,
}, 'POST');


/**
 * 确认订单
 */

export const checkout = (geohash, entities, shopid) => fetch('/v1/carts/checkout', {
	come_from: "web",
	geohash,
	entities,
	restaurant_id: shopid,
}, 'POST');


/**
 * 获取快速备注列表
 */

export const getRemark = (id, sig) => fetch('/v1/carts/' + id + '/remarks', {
	sig
});


/**
 * 获取地址列表
 */

export const getAddress = (id, sig) => fetch('/v1/carts/' + id + '/addresses', {
	sig
});


/**
 * 搜索地址
 */

export const searchNearby = keyword => fetch('/v1/pois', {
	type: 'nearby',
	keyword
});


/**
 * 添加地址
 */

export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => fetch('/v1/users/' + userId + '/addresses', {
	address,
	address_detail,
	geohash,
	name,
	phone,
	phone_bk,
	poi_type,
	sex,
	tag,
	tag_type,
}, 'POST');


/**
 * 下订单
 */

export const placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
	address_id,
	come_from: "mobile_web",
	deliver_time: "",
	description,
	entities,
	geohash,
	paymethod_id: 1,
	sig,
}, 'POST');


/**
 * 重新发送订单验证码
 */

export const rePostVerify = (cart_id, sig, type) => fetch('/v1/carts/' + cart_id + '/verify_code', {
	sig,
	type,
}, 'POST');



/**
 * 下订单
 */

export const validateOrders = ({
	user_id,
	cart_id,
	address_id,
	description,
	entities,
	geohash,
	sig,
	validation_code,
	validation_token
}) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
	address_id,
	come_from: "mobile_web",
	deliver_time: "",
	description,
	entities,
	geohash,
	paymethod_id: 1,
	sig,
	validation_code,
	validation_token,
}, 'POST');


/**
 * 重新发送订单验证码
 */

export const payRequest = (merchantOrderNo, userId) => fetch('/payapi/payment/queryOrder', {
	merchantId: 5,
	merchantOrderNo,
	source: 'MOBILE_WAP',
	userId,
	version: '1.0.0',
});



/**
 * 获取服务中心信息
 */

export const getService = () => fetch('/v3/profile/explain');



/**
*兑换会员卡
*/

export const vipCart = (id, number, password) => fetch('/member/v1/users/' + id + '/delivery_card/physical_card/bind',{
	number,
	password
}, 'POST')



/**
 * 获取红包
*/

export const getHongbaoNum = id => fetch('/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0');



/**
 * 获取过期红包
*/


export const getExpired = id => fetch('/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0');


/**
 * 兑换红包
*/

export const exChangeHongbao = (id, exchange_code, captcha_code) => fetch('/v1/users/' + id + '/hongbao/exchange',{
	exchange_code,
	captcha_code,
}, 'POST');


/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});


/**
 * 手机号登录
 */

var sendLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
	code,
	mobile,
	validate_token
}, 'POST');


/**
 * 获取订单列表
 */

export const getOrderList = (user_id, offset) => fetch('/bos/v2/users/' + user_id + '/orders', {
	limit: 10,
	offset,
});


/**
 * 获取订单详情
 */

export const getOrderDetail = (user_id, orderid) => fetch('/bos/v1/users/' + user_id + '/orders/' + orderid + '/snapshot');


/**
*个人中心里编辑地址
*/

export const getAddressList = (user_id) => fetch('/v1/users/'+user_id+'/addresses')

/**
*个人中心里搜索地址
*/

export const getSearchAddress = (keyword) => fetch('v1/pois',{
	keyword:keyword,
	type:'nearby'
})

/**
* 删除地址
*/

export const deleteAddress = (userid, addressid) => fetch( '/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')



/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');


/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');


/**
 * 获取机务人员信息
 */

export const getPersonnel = () => fetch('/wcbz/getPersonnel');

/**
 * 获取机务人员数量
 */

export const getPersonnelCount = () => fetch('/wcbz/getPersonnelCount');

/**
 * 获取机务人员详细信息
 */

export const getPersonnelById = person_id => fetch('/wcbz/getPersonnel/' + person_id);

/**
 * 添加机务人员
 */

export const addPersonnel = (data) => fetch('/wcbz/addPersonnel',data, 'POST');

/**
 * 更新人员信息
 */

export const updatePersonnel = data => fetch('/wcbz/updatePersonnel', data, 'POST');


/**
 * 获取飞机信息
 */

export const getAirplane = () => fetch('/wcbz/getAirplane');

/**
 * 获取飞机数量
 */

export const getAirplaneCount = () => fetch('/wcbz/getAirplaneCount');

/**
 * 添加飞机
 */

export const addAirplane = (data) => fetch('/wcbz/addAirplane',data, 'POST');

/**
 * 获取装备数据详细信息
 */

export const getEquipById = equip_id => fetch('/wcbz/getEquip/' + equip_id);

/**
 * 获取装备数据信息
 */

export const getEquip = () => fetch('/wcbz/getEquip');

/**
 * 获取装备数据数量
 */

export const getEquipCount = () => fetch('/wcbz/getEquipCount');

/**
 * 添加装备数据信息
 */

export const addEquip = (data) => fetch('/wcbz/addEquip',data,'POST');

/**
 * 更新装备信息
 */

export const updateEquip = data => fetch('/wcbz/updateEquip', data, 'POST');

/**
 * 删除装备
 */

export const deleteEquip = equip_id => fetch('/wcbz/deleteEquip/' + equip_id, {}, 'DELETE');

/**
 * 获取保障数据详细信息
 */

export const getEnsureById = ensure_id => fetch('/wcbz/getEnsure/' + ensure_id);

/**
 * 获取保障数据信息
 */

export const getEnsure = () => fetch('/wcbz/getEnsure');

/**
 * 获取保障数据数量
 */

export const getEnsureCount = () => fetch('/wcbz/getEnsureCount');

/**
 * 添加保障数据信息
 */

export const addEnsure = (data) => fetch('/wcbz/addEnsure',data,'POST');

/**
 * 更新保障信息
 */

export const updateEnsure = data => fetch('/wcbz/updateEnsure', data, 'POST');

/**
 * 删除保障
 */

export const deleteEnsure = ensure_id => fetch('/wcbz/deleteEnsure/' + ensure_id, {}, 'DELETE');

/**
 * 获取器件数据详细信息
 */

export const getDeviceById = device_id => fetch('/wcbz/getDevice/' + device_id);

/**
 * 获取器件数据信息
 */

export const getDevice = () => fetch('/wcbz/getDevice');

/**
 * 获取器件数据数量
 */

export const getDeviceCount = () => fetch('/wcbz/getDeviceCount');

/**
 * 添加器件数据信息
 */

export const addDevice = (data) => fetch('/wcbz/addDevice',data,'POST');

/**
 * 更新器件信息
 */

export const updateDevice = data => fetch('/wcbz/updateDevice', data, 'POST');

/**
 * 删除器件
 */

export const deleteDevice = device_id => fetch('/wcbz/deleteDevice/' + device_id, {}, 'DELETE');

/**
 * 获取飞机状态
 */

export const getAirtate = () => fetch('/wcbz/getAirtate');

/**
 * 更新飞机状态
 */

export const updateAirtate = data => fetch('/wcbz/updateAirtate', data, 'POST');

/**
 * 获取飞机状态
 */

export const getTaskstate = () => fetch('/wcbz/getTaskstate');

/**
 * 更新飞机状态
 */

export const updateTaskstate = data => fetch('/wcbz/updateTaskstate', data, 'POST');

/**
 * 获取飞机状态
 */

export const getDevicestate = () => fetch('/wcbz/getDevicestate');

/**
 * 更新飞机状态
 */

export const updateDevicestate = data => fetch('/wcbz/updateDevicestate', data, 'POST');


/**
 * 获取车辆数据详细信息
 */

export const getVehicleById = vehicle_id => fetch('/wcbz/getVehicle/' + vehicle_id);

/**
 * 获取车辆数据信息
 */

export const getVehicle = () => fetch('/wcbz/getVehicle');

/**
 * 获取车辆数据数量
 */

export const getVehicleCount = () => fetch('/wcbz/getVehicleCount');

/**
 * 添加车辆数据信息
 */

export const addVehicle = (data) => fetch('/wcbz/addVehicle',data,'POST');

/**
 * 更新车辆信息
 */

export const updateVehicle = data => fetch('/wcbz/updateVehicle', data, 'POST');

/**
 * 删除车辆
 */

export const deleteVehicle = vehicle_id => fetch('/wcbz/deleteVehicle/' + vehicle_id, {}, 'DELETE');

/**
 * 获取科目数据详细信息
 */

export const getSubjectById = vehicle_id => fetch('/wcbz/getSubject/' + vehicle_id);

/**
 * 获取科目数据信息
 */

export const getSubject = () => fetch('/wcbz/getSubject');

/**
 * 获取科目数据数量
 */

export const getSubjectCount = () => fetch('/wcbz/getSubjectCount');

/**
 * 添加科目数据信息
 */

export const addSubject = (data) => fetch('/wcbz/addSubject',data,'POST');

/**
 * 更新科目信息
 */

export const updateSubject = data => fetch('/wcbz/updateSubject', data, 'POST');

/**
 * 删除科目
 */

export const deleteSubject = vehicle_id => fetch('/wcbz/deleteSubject/' + vehicle_id, {}, 'DELETE');

/**
 * 添加飞行任务
 */

export const addPlan = (data) => fetch('/wcbz/addPlan',data,'POST');

/**
 * 获取飞行计划
 */

export const getPlan = () => fetch('/wcbz/getPlan');

/**
 * 更新飞行计划
 */

export const updatePlan= data => fetch('/wcbz/updatePlan', data, 'POST');

/**
 * 更新飞机信息
 */

export const updateAirplane = data => fetch('/wcbz/updateAirplane', data, 'POST');

/**
 * 添加配置项
 */

export const addConfig = (data) => fetch('/wcbz/addConfig',data,'POST');

/**
 * 获取配置项
 */

export const getConfig = () => fetch('/wcbz/getConfig');

/**
 * 更新配置信息
 */

export const updateConfig = data => fetch('/wcbz/updateConfig', data, 'POST');

/**
 * 获取飞机数据详细信息
 */

export const getAirplaneById = airplane_id => fetch('/wcbz/getAirplane/' + airplane_id);

/**
 * 获取组织架构
 */

export const getOrganiz = () => fetch('/wcbz/getOrganiz');

/**
 * 获取故障详情
 */

export const getFault = () => fetch('/wcbz/getFault');

/**
 * 添加故障详情
 */

export const addFault = (data) => fetch('/wcbz/addFault',data,'POST');

/**
 * 获取弹药数据详细信息
 */

export const getAmmoById = ensure_id => fetch('/wcbz/getAmmo/' + ensure_id);

/**
 * 获取弹药数据信息
 */

export const getAmmo = () => fetch('/wcbz/getAmmo');

/**
 * 获取弹药数据数量
 */

export const getAmmoCount = () => fetch('/wcbz/getAmmoCount');

/**
 * 添加弹药数据信息
 */

export const addAmmo = (data) => fetch('/wcbz/addAmmo',data,'POST');

/**
 * 更新弹药信息
 */

export const updateAmmo = data => fetch('/wcbz/updateAmmo', data, 'POST');

/**
 * 删除弹药
 */

export const deleteAmmo = ensure_id => fetch('/wcbz/deleteAmmo/' + ensure_id, {}, 'DELETE');

/**
 * 获取飞机-有售器件数据详细信息
 */

export const getAirplaneDeviceById = ensure_id => fetch('/wcbz/getAirplaneDevice/' + ensure_id);

/**
 * 获取飞机-有售器件数据信息
 */

export const getAirplaneDevice = () => fetch('/wcbz/getAirplaneDevice');

/**
 * 获取飞机-有售器件数据数量
 */

export const getAirplaneDeviceCount = () => fetch('/wcbz/getAirplaneDeviceCount');

/**
 * 添加飞机-有售器件数据信息
 */

export const addAirplaneDevice = (data) => fetch('/wcbz/addAirplaneDevice',data,'POST');

/**
 * 更新飞机-有售器件信息
 */

export const updateAirplaneDevice = data => fetch('/wcbz/updateAirplaneDevice', data, 'POST');

/**
 * 删除飞机-有售器件
 */

export const deleteAirplaneDevice = ensure_id => fetch('/wcbz/deleteAirplaneDevice/' + ensure_id, {}, 'DELETE');

/**
 * 获取飞机-弹药数据详细信息
 */

export const getAirplaneAmmoById = ensure_id => fetch('/wcbz/getAirplaneAmmo/' + ensure_id);

/**
 * 获取飞机-弹药数据信息
 */

export const getAirplaneAmmo = () => fetch('/wcbz/getAirplaneAmmo');

/**
 * 获取飞机-弹药数据数量
 */

export const getAirplaneAmmoCount = () => fetch('/wcbz/getAirplaneAmmoCount');

/**
 * 添加飞机-弹药数据信息
 */

export const addAirplaneAmmo = (data) => fetch('/wcbz/addAirplaneAmmo',data,'POST');

/**
 * 更新飞机-弹药信息
 */

export const updateAirplaneAmmo = data => fetch('/wcbz/updateAirplaneAmmo', data, 'POST');

/**
 * 删除飞机-弹药
 */

export const deleteAirplaneAmmo = ensure_id => fetch('/wcbz/deleteAirplaneAmmo/' + ensure_id, {}, 'DELETE');

/**
 * 获取飞机-车辆数据详细信息
 */

export const getAirplaneCarById = ensure_id => fetch('/wcbz/getAirplaneCar/' + ensure_id);

/**
 * 获取飞机-车辆数据信息
 */

export const getAirplaneCar = () => fetch('/wcbz/getAirplaneCar');

/**
 * 获取飞机-车辆数据数量
 */

export const getAirplaneCarCount = () => fetch('/wcbz/getAirplaneCarCount');

/**
 * 添加飞机-车辆数据信息
 */

export const addAirplaneCar = (data) => fetch('/wcbz/addAirplaneCar',data,'POST');

/**
 * 更新飞机-车辆信息
 */

export const updateAirplaneCar = data => fetch('/wcbz/updateAirplaneCar', data, 'POST');

/**
 * 删除飞机-车辆
 */

export const deleteAirplaneCar = ensure_id => fetch('/wcbz/deleteAirplaneCar/' + ensure_id, {}, 'DELETE');
import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'


/**
 * 账号密码登录
 */
export const accountLogin = (username, password) => fetch('/v2/login', {username, password}, 'POST');


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
 * 根据ID查询飞行计划
 */

export const getPlanbyID= plan_id => fetch('/wcbz/getPlanbyID/' + plan_id);

/**
 * 删除飞行计划
 */

export const deletePlan = plan_id => fetch('/wcbz/deletePlan/' + plan_id, {}, 'DELETE');

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


// /**
//  * 获取日志数据详细信息
//  */

// export const getLogById = ensure_id => fetch('/wcbz/getLog/' + ensure_id);

// /**
//  * 获取日志数据信息
//  */

// export const getLog = () => fetch('/wcbz/getLog');

// /**
//  * 获取日志数据数量
//  */

// export const getLogCount = () => fetch('/wcbz/getLogCount');

// /**
//  * 添加日志数据信息
//  */

// export const addLog = (data) => fetch('/wcbz/addLog',data,'POST');

// /**
//  * 更新日志信息
//  */

// export const updateLog = data => fetch('/wcbz/updateLog', data, 'POST');

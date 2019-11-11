import App from '../App'

const index = r => require.ensure([], () => r(require('../page/wcbz/index')), 'index')
const person = r => require.ensure([], () => r(require('../page/wcbz/children/person')), 'person')
const addPerson = r => require.ensure([], () => r(require('../page/wcbz/children/addPerson')), 'addPerson')
const airPlane = r => require.ensure([], () => r(require('../page/wcbz/children/airPlane')), 'airPlane')
const addAirplane = r => require.ensure([], () => r(require('../page/wcbz/children/addAirplane')), 'addAirplane')
const ensure = r => require.ensure([], () => r(require('../page/wcbz/children/ensure')), 'ensure')
const ensureAdd = r => require.ensure([], () => r(require('../page/wcbz/children/ensureAdd')), 'ensureAdd')
const addEnsure = r => require.ensure([], () => r(require('../page/wcbz/children/addEnsure')), 'addEnsure')
const enquip = r => require.ensure([], () => r(require('../page/wcbz/children/enquip')), 'enquip')
const addEnquip = r => require.ensure([], () => r(require('../page/wcbz/children/addEnquip')), 'addEnquip')
const device = r => require.ensure([], () => r(require('../page/wcbz/children/device')), 'device')
const addDevice= r => require.ensure([], () => r(require('../page/wcbz/children/addDevice')), 'addDevice')
const state= r => require.ensure([], () => r(require('../page/wcbz/children/state')), 'state')
const situation= r => require.ensure([], () => r(require('../page/wcbz/children/situation')), 'situation')
const plan= r => require.ensure([], () => r(require('../page/wcbz/children/plan')), 'plan')
const showPlan= r => require.ensure([], () => r(require('../page/wcbz/children/showPlan')), 'showPlan')
const config= r => require.ensure([], () => r(require('../page/wcbz/children/config')), 'config')
const airDetail= r => require.ensure([], () => r(require('../page/wcbz/children/airDetail')), 'airDetail')
const personDetail= r => require.ensure([], () => r(require('../page/wcbz/children/personDetail')), 'personDetail')
const car= r => require.ensure([], () => r(require('../page/wcbz/children/car')), 'car')
const addCar= r => require.ensure([], () => r(require('../page/wcbz/children/addCar')), 'addCar')
const chat= r => require.ensure([], () => r(require('../page/wcbz/children/chat')), 'chat')
const data= r => require.ensure([], () => r(require('../page/wcbz/data')), 'data')
const planIndex= r => require.ensure([], () => r(require('../page/wcbz/planIndex')), 'planIndex')
const organiz= r => require.ensure([], () => r(require('../page/wcbz/children/organiz')), 'organiz')
const ammo= r => require.ensure([], () => r(require('../page/wcbz/children/ammo')), 'ammo')
const addAmmo= r => require.ensure([], () => r(require('../page/wcbz/children/addAmmo')), 'addAmmo')
const airSituation= r => require.ensure([], () => r(require('../page/wcbz/children/airSituation')), 'airSituation')
const carSituation= r => require.ensure([], () => r(require('../page/wcbz/children/carSituation')), 'carSituation')
const showPeopleStatus= r => require.ensure([], () => r(require('../page/wcbz/children/showPeopleStatus')), 'showPeopleStatus')
const deviceDetail= r => require.ensure([], () => r(require('../page/wcbz/children/deviceDetail')), 'deviceDetail')
const carDetail= r => require.ensure([], () => r(require('../page/wcbz/children/carDetail')), 'carDetail')
const airplaneDevice= r => require.ensure([], () => r(require('../page/wcbz/children/airplaneDevice')), 'airplaneDevice')
const airplaneAmmo= r => require.ensure([], () => r(require('../page/wcbz/children/airplaneAmmo')), 'airplaneAmmo')
const airplaneCar= r => require.ensure([], () => r(require('../page/wcbz/children/airplaneCar')), 'airplaneCar')
const showAirplaneDevice= r => require.ensure([], () => r(require('../page/wcbz/children/showAirplaneDevice')), 'showAirplaneDevice')
const showAirplaneDeviceState= r => require.ensure([], () => r(require('../page/wcbz/children/showAirplaneDeviceState')), 'showAirplaneDeviceState')
const showAirplaneAmmo= r => require.ensure([], () => r(require('../page/wcbz/children/showAirplaneAmmo')), 'showAirplaneAmmo')
const showAirplaneAmmoState= r => require.ensure([], () => r(require('../page/wcbz/children/showAirplaneAmmoState')), 'showAirplaneAmmoState')
const showAirplaneCar= r => require.ensure([], () => r(require('../page/wcbz/children/showAirplaneCar')), 'showAirplaneCar')
const editPlan= r => require.ensure([], () => r(require('../page/wcbz/children/editPlan')), 'editPlan')


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: 'index',
            component: index,
            children: [{
                path: 'persons', // 机务人员
                component: person
            }]
        },
        {
            path: 'persons',
            component: person
        },
        {
            path: 'addPerson',
            component: addPerson
        },
        {
            path: 'airPlane',
            component: airPlane
        },
        {
            path: 'addAirplane',
            component: addAirplane
        },
        {
            path: 'ensure',
            component: ensure
        },
        {
            path: 'addEnsure',
            component: addEnsure
        },
        {
            path: 'enquip',
            component: enquip
        },
        {
            path: 'addEnquip',
            component: addEnquip
        },
        {
            path: 'device',
            component: device
        },
        {
            path: 'addDevice',
            component: addDevice
        },
        {
            path: 'state',
            component: state
        },
        {
            path: 'situation',
            component: situation
        },
        {
            path: 'plan',
            component: plan
        },
        {
            path: 'showPlan',
            component: showPlan
        },
        {
            path: 'config',
            component: config
        },
        {
            path: 'airDetail',
            component: airDetail
        },
        {
            path: 'car',
            component: car
        },
        {
            path: 'addCar',
            component: addCar
        },
        {
            path: 'chat',
            component: chat
        },
        {
            path: 'data',
            component: data
        },
        {
            path: 'planIndex',
            component: planIndex
        },
        {
            path: 'organiz',
            component: organiz
        },
        {
            path: 'ammo',
            component: ammo
        },
        {
            path: 'addAmmo',
            component: addAmmo
        },
        {
            path: 'airSituation',
            component: airSituation
        },
        {
            path: 'carSituation',
            component: carSituation
        },
        {
            path: 'personDetail',
            component: personDetail
        },
        {
            path: 'deviceDetail',
            component: deviceDetail
        },
        {
            path: 'carDetail',
            component: carDetail
        },
        {
            path: 'airplaneDevice',
            component: airplaneDevice
        },
        {
            path: 'airplaneAmmo',
            component: airplaneAmmo
        },
        {
            path: 'airplaneCar',
            component: airplaneCar
        },
        {
            path: 'showAirplaneDevice',
            component: showAirplaneDevice
        },
        {
            path: 'showAirplaneAmmo',
            component: showAirplaneAmmo
        },
        {
            path: 'showAirplaneCar',
            component: showAirplaneCar
        },
        {
            path: 'editPlan',
            component: editPlan
        },
        {
            path: 'ensureAdd',
            component: ensureAdd
        },
        {
            path: 'showPeopleStatus',
            component: showPeopleStatus
        },
        {
            path: 'showAirplaneDeviceState',
            component: showAirplaneDeviceState
        },
        {
            path: 'showAirplaneAmmoState',
            component: showAirplaneAmmoState
        },
    ]
}]

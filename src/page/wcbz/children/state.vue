<template>
  	<div class="city_container">
        <head-top head-title="状态上报" go-back='true'>
        </head-top>
        <div class="tab">
            <i @click="showMenu('plane')" class="fa fa-plane" :class="{'selectTab': tab === 'plane'}" aria-hidden="true"></i>
            <i @click="showMenu('car')" class="fa fa-car" :class="{'selectTab': tab === 'car'}"  aria-hidden="true"></i>
            <i @click="showMenu('users')" class="fa fa-users" :class="{'selectTab': tab === 'users'}"  aria-hidden="true"></i>
        </div>
        <div v-show="tab === 'plane'">
        <p>选择飞机：</p>
            <select class="select" v-model="airModel">
                <option v-for="v in airPlaneData.data" :value="v.code">{{v.code}}</option>
            </select>
            <p>选择飞机状态态势：</p>
            <select class="select" v-model="sModel">
                <option v-for="v in stateModel" :value="v">{{v}}</option>
            </select>
            <p>选择飞机任务状态：</p>
            <select class="select" v-model="tModel">
                <option v-for="v in taskModel" :value="v">{{v}}</option>
            </select>
            <p>选择飞机进场状态：</p>
            <select class="select" v-model="enter">
                <option v-for="v in enterState" :value="v">{{v}}</option>
            </select>
            <p>填写起落次数：</p>
            <input v-model="airUpOrDown" placeholder="起落次数" class="select" type="text">
            <p>填写起落时间：</p>
            <input v-model="airTime" placeholder="起落时间" class="select" type="text">
            <p>填写飞行小时：</p>
            <input v-model="airHour" placeholder="飞行小时" class="select" type="text">
            <p>携弹类型：</p>
            <input placeholder="携弹类型" class="select" type="text">
            <p>发射次数：</p>
            <input placeholder="发射次数" class="select" type="text">
        </div>
        <div v-show="tab === 'car'">
            <p>车辆选择：</p>
            <div>
                <select class="select" v-model="vehicleName">
                    <option v-for="v in vehicleData.data" :value="v.name">{{v.name}}</option>
                </select>
                </div>
                <p>车辆状态上报：</p>
                <div>
                <select class="select" v-model="toolData">
                    <option v-for="v in deviceModel" :value="v">{{v}}</option>
                </select>
                <p>车辆任务状态上报：</p>
                <select class="select" v-model="carTask">
                    <option v-for="v in catTaskModel" :value="v">{{v}}</option>
                </select>
                <p>选择车辆进场状态：</p>
                <select class="select" v-model="carEnter">
                    <option v-for="v in enterState" :value="v">{{v}}</option>
                </select>
                </div>
        </div>
        <div v-show="tab === 'users'">
            <p>人员选择：</p>
            <select class="select" v-model="personnel">
                <option v-for="v in personnelData.data" :value="v.user_name">{{v.user_name}}</option>
            </select>
            <p>选择人员工作状态：</p>
            <select class="select" v-model="pModel">
                <option v-for="v in pStateModel" :value="v">{{v}}</option>
            </select>
            <p>选择人员工作内容：</p>
            <select class="select" v-model="planName">
                <option v-for="v in planData.data" :value="v.name">{{v.name}}</option>
            </select>
            <p>选择工作对象：</p>
            <select class="select" v-model="pObject">
                <option v-for="v in airPlaneData.data" :value="v.code">{{v.code}}</option>
            </select>
        </div>
        <div v-show="showFault" class="faultBox">
            发现人：<input type="text" v-model="faultData.user_name">
            故障类型：<input type="text" v-model="faultData.type">
            故障原因：<input type="text" v-model="faultData.reason">
            故障件名称：<input type="text" v-model="faultData.deviceName">
            故障件型号：<input type="text" v-model="faultData.model">
            故障描述：<input type="text" v-model="faultData.desc">
            生产厂：<input type="text" v-model="faultData.factory">
            装机日期：<input type="text" v-model="faultData.date">
            <div class="upload">
                <img v-if="!faultData.image_path" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569644026025&di=1b75af64541d4926c106ef20821432fc&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F21%2F02%2F16pic_2102530_b.jpg" alt="">
                <img v-else :src="'img/'+faultData.image_path" alt="">
            </div>
            <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
        </div>
        <button @click="submit()" class="button">上报数据</button>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    <footGuide></footGuide>
    </div>
</template>

<script>
    import { Progress } from 'mint-ui';
    import 'src/style/css/font-awesome.min.css'
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import mixin from '../../../mixin'

    import {
        getAirplane,
        getDevice,
        getAirtate,
        updateAirtate,
        getTaskstate,
        updateTaskstate,
        getDevicestate,
        updateDevicestate,
        updateAirplane,
        getVehicle,
        getConfig,
        updateVehicle,
        addFault,
        getFault,
        getPersonnel,
        getPlan,
        getAirplaneDevice,
        getAirplaneAmmo,
        updateAirplaneDevice,
        updateAirplaneAmmo} from '../../../service/getData';

    export default {
    	data(){
            return{
                airPlaneData: {},
                deviceData: {},
                airtateData: {},
                taskData: {},
                deviceStateData: {},
                stateModel: [],
                taskModel: [],
                deviceModel: [
                ],
                enterState: [
                    '进场',
                    '未进场'
                ],
                catTaskModel: [],
                toolData: '',
                carTask: '',
                airname: '',
                aircount: '',
                taskname: '',
                taskcount: '',
                devicename: '',
                devicecount: '',
                showAlert: false,
                alertText: '',
                planename: '',
                vehicleData: {},
                vehicleName: '',
                airModel: '',
                sModel: '',
                tModel: '',
                inputDevice: 0,
                progessNumber: 0,
                sDeivce: '',
                showFault: false,
                faultData: {
                    user_name: '', // 发现人
                    model: '', // 故障件型号
                    date: '', // 装机日期
                    reason: '', // 故障原因
                    image_path: '', // 故障照片
                    type: '', // 故障类型
                    deviceName: '', // 故障件名称,
                    desc: '', // 故障描述
                    factory: '', // 厂家
                },
                airUpOrDown: '',
                airTime: '',
                airHour: '',
                tab: 'plane',
                personnelData: {},
                personnel: '',
                pStateModel: [],
                pModel: '',
                planData: {},
                planName: '',
                pObject: '',
                airPlaneDevice: '',
                airPlaneAmmo: '',
                enter: '',
                carEnter: ''

            }
        },

        mounted(){
            this.initData();
        },
        components:{
            headTop,
            alertTip
        },
        mixins: [mixin],

        watch: {
            sModel(v) {
                if (v === '排故') {
                    this.showFault = true;
                } else {
                    this.showFault = false;
                }
            },
            tModel(v) {
                if (v === '排故') {
                    this.showFault = true;
                } else {
                    this.showFault = false;
                }
            },
            toolData(v) {
                if (v === '排故') {
                    this.showFault = true;
                } else {
                    this.showFault = false;
                }
            },
            carTask(v) {
                if (v === '排故') {
                    this.showFault = true;
                } else {
                    this.showFault = false;
                }
            }
        },

        methods:{
            async initData(){
                this.airPlaneData = await getAirplane();
                this.deviceData = await getDevice();
                this.airtateData = await getAirtate();
                this.taskData = await getTaskstate();
                this.deviceStateData = await getDevicestate();
                this.vehicleData = await getVehicle();
                this.personnelData = await getPersonnel();
                this.planData = await getPlan();
                const config = await getConfig();
                this.airPlaneDevice = await getAirplaneDevice();
                this.airPlaneAmmo = await getAirplaneAmmo();
                this.stateModel = config.data[0].stateModel.split(",");
                this.taskModel = config.data[0].taskModel.split(",");

                // 初始化数据
                this.airModel = this.airPlaneData.data[0].model;
                this.sModel = this.stateModel[0];
                this.tModel = this.taskModel[0];
                console.log
                this.vehicleName = this.vehicleData.data[0].name;
                this.deviceModel = config.data[0].carStateModel.split(",");
                this.catTaskModel = config.data[0].carTaskModel.split(",");
                this.pStateModel = config.data[0].pStatusModel.split(",");
                console.log(this.deviceModel);
                console.log(this.sDeivce);
            },

            async submit() {

                this.airPlaneData.data.forEach(element => {
                    console.log(element.model);
                    if (element.code === this.airModel) {
                        element['state'] = this.sModel;
                        element['task'] = this.tModel;
                        element['airUpOrDown'] = this.airUpOrDown;
                        element['airTime'] = this.airTime;
                        element['airHour'] = this.airHour;
                        element['enter'] = this.enter;
                        this.submitData(element);
                    }
                });

                this.vehicleData.data.forEach(element => {
                    if (element.name === this.vehicleName) {
                        element['state'] = this.toolData;
                        element['taskState'] = this.carTask;
                        element['enter'] = this.carEnter;
                        console.log(element);
                        this.submitVehicleData(element);
                    }
                });

                if (this.faultData) {
                    const res = await addFault(this.faultData);
                }

                const newAirPlane = [];
                this.airPlaneDevice.data.forEach(element => {
                    if (this.airModel === element.air_code) {
                        element.sm = parseInt(element.sm) - parseInt(this.airHour);
                        newAirPlane.push({
                            airplaneDevice_id: element.airplaneDevice_id,
                            air_code: element.air_code,
                            sm: element.sm
                        });
                    }
                });
                // console.log(newAirPlane);

                for (let iterator of newAirPlane) {
                    const res = await updateAirplaneDevice(iterator);
                    console.log(res);
                }

                this.showAlert = true;
                this.alertText = '上报成功';
                this.$router.push('situation');

            },
            closeTip() {
                this.showAlert = false;
            },
            async submitData(data) {
                const res = await updateAirplane(data);
                console.log(res);
            },
            async submitVehicleData (data) {
                const res = await updateVehicle(data);
                console.log(res);
            },
            format(percentage) {
                return percentage === 100 ? '满' : `${percentage}%`;
            },
            async uploadAvatar() {
                //上传头像
                    let input = document.querySelector('.profileinfopanel-upload')
                    let data = new FormData();
                    data.append('file', input.files[0]);
                    try {
                        let response = await fetch('v1/addimg/airplane', {
                            method: 'POST',
                            credentials: 'include',
                            body: data
                        })
                        let res = await response.json();
                        if (res.status == 1) {
                            this.faultData.image_path = res.image_path;
                        }
                    } catch (error) {
                        this.showAlert = true;
                        this.alertText = '上传失败';
                        throw new Error(error);
                    }
            },
            showMenu(index) {
                this.tab = index;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        padding-top: 2.35rem;
        font: 0.6rem/1.75rem "Microsoft YaHei";
        margin: 0 1rem;
        .button {
            background-color: #3190e8;
            color: #fff;
            padding: 0.5rem;
            width: 100%;
            margin-top: 0.6rem;
            margin-bottom: 2rem;
        }
        .select {
            width: 100%;
            background-color: #fff;
            font-size: 14PX;
            padding: 0.5rem;
        }
        .deviceBox {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            input {
                width: 40%;
                font-size: 12PX;
            }
        }
        .device {
            width: 50%;
        }
        .fa {
            font-size: 2rem;
            // color: #3792e5;
            // position: absolute;
            // left: 30%;
            // top: 40%;
        }
        .faultBox {
            input {
                width: 100%;
                background-color: #fff;
                font-size: 14PX;
                padding: 0.5rem;
            }
        }
        .upload {
            text-align: center;
            img {
                width: 2rem;
                margin-top: 1rem;
            }
        }
        .tab {
            display: flex;
            justify-content: space-between;
        }
        .selectTab {
            color: green;
        }
    }



</style>

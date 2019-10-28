<template>
  	<div class="city_container">
        <head-top head-title="添加飞行任务" go-back='true'>
        </head-top>
        <p>计划名称：</p>
        <input v-model="formData.name" placeholder="计划名称" class="select" type="text">
        <p>输入日期：</p>
        <input v-model="formData.dateTime" placeholder="飞行日期" class="select" type="text">
        <p>选择飞机：</p>

        <div class="radioBox" v-for="(value,index) in airPlaneData.data">
            <input class="radio" @change="changeSelect(index,value.isCheck)" v-model="value.isCheck" type="checkbox" :id="index" />
            <label :for="index">{{value.code}}</label>
            <div v-show="value.isCheck">
                <p>选择飞行科目：</p>
                <div class="deviceBox">
                    <select class="select" v-model="formData.airSubject">
                        <option v-for="v in fxSubject" :value="v">{{v}}</option>
                    </select>
                </div>
                <p>选择气象科目：</p>
                <div class="deviceBox">
                    <select class="select" v-model="formData.sceneSubject">
                        <option v-for="v in qxSubject" :value="v">{{v}}</option>
                    </select>
                </div>
                <p>设置起落次数：</p>
                <input v-model="formData.upDownNumber" placeholder="起落次数" class="select" type="text">
                <p>输入飞行任务时间：</p>
                <input v-model="formData.flightTime" placeholder="飞行任务时间" class="select" type="text">
                <p>输入进场时间：</p>
                <input v-model="formData.approachTime" placeholder="进场时间" class="select" type="text">
                <p>输入总人数：</p>
                <input v-model="formData.totalNumber" placeholder="总人数" class="select" type="text">
            </div>
        </div>

        <!-- <select v-model="formData.airName" class="select">
            <option v-for="v in airPlaneData.data" :value="v.code">{{v.code}}</option>
        </select> -->
        <!-- <p>选择保障车辆：</p>
        <div class="deviceBox">
            <select class="select device" @change="vehicleSelect($event)">
                <option v-for="v in vehicleData.data" :value="v.name">{{v.name}}</option>
            </select>
        </div> -->
        <button @click="submit()" class="button">创建计划</button>
        <button @click="bztask()" class="button">创建保障任务</button>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    <footGuide></footGuide>
    </div>
</template>

<script>
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
        getVehicle,
        getSubject,
        addPlan,
        getConfig
         } from '../../../service/getData';

    export default {
    	data(){
            return{
                airPlaneData: {},
                vehicleData: {},
                subjectData: {},
                taskData: {},
                deviceStateData: {},
                stateModel: {
                    'wh': '完好',
                    'dx': '大修',
                    'dj': '定检',
                    'pg': '排故',
                    'sf': '试飞',
                    'dty': '待退役'
                },
                taskModel: {
                    'fxq': '飞行前',
                    'zccd': '再次出动准备',
                    'fxh': '飞行后',
                    'pg': '排故',
                    'sc': '试车'
                },
                deviceModel: {
                    'jc': '进场',
                    'dm': '待命',
                    'zy': '作业'
                },
                airname: '',
                aircount: '',
                taskname: '',
                taskcount: '',
                devicename: '',
                devicecount: '',
                showAlert: false,
                alertText: '',
                taskName: '',
                dateTime: '',
                fxSubject: [],
                qxSubject: [],
                formData: {
                    name:'',
                    dateTime: '',
                    airName: '',
                    airSubject: '',
                    sceneSubject: '',
                    upDownNumber: '',
                    flightTime: ''
                },
                showContent: false,
                checked: false,
                subitem: {
                    isCheck: false
                }
            }
        },

        mounted(){
            this.initData();
        },
        mixins: [mixin],

        components:{
            headTop,
            alertTip
        },

        computed:{

        },

        methods:{
            async initData(){
                this.airPlaneData = await getAirplane();
                this.airPlaneData.data.forEach(element => {
                    element.isCheck = false;
                });
                console.log(this.airPlaneData);
                this.vehicleData = await getVehicle();
                this.subjectData = await getSubject();
                const config = await getConfig()
                this.fxSubject = config.data[0].subjectModel.split(",");
                this.qxSubject = config.data[0].sceneModel.split(",");
            },
            vehicleSelect(event) {
                this.airname = event.target.value;
            },
            subjectSelect(event) {
                this.taskname = event.target.value;
            },
            airplaneSelect(event) {
                this.devicename = event.target.value;
            },
            async submit() {
                console.log(this.formData);
                const res = await addPlan(this.formData);
                console.log(res);
                this.showAlert = true;
                this.alertText = '上报成功';

            },
            closeTip() {
                this.showAlert = false;
            },
            bztask() {
                this.$router.push('addEnsure');
            },
            changeSelect(index,type) {
                console.log(index,type);
                this.airPlaneData.data[index].isCheck = type;
                this.airPlaneData.data = Object.assign([],this.airPlaneData.data)
                console.log(this.airPlaneData.data);
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
        }
        .select {
            width: 100%;
            background-color: #e6e6e6;
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
            width: 100%;
        }
        .fa {
            color: #3792e5;
            position: absolute;
            left: 30%;
            top: 40%;
        }
        .radioBox {
            p {
                line-height: 20px;
            }
            .radio {
                zoom: 2;
            }
            label {
                font-size: 20px;
                vertical-align: text-bottom;
            }
        }
    }



</style>

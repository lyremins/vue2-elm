<template>
  	<div class="city_container">
        <head-top head-title="飞机状态" go-back='true'>
        </head-top>
        <div class="box">
            <div @click="toflyDetail(value.airplane_id)" class="boxData" v-for="(value,index) in airPlaneData.data" v-if="index !== '__v'">
                <p>{{value.code}}</p>
                <i class="fa fa-fighter-jet"></i>
                <span class="icon iconTsk" :class="{'wh': value.state === '完好',
                                        'fault': value.state === '定检' ||
                                        value.state === '大修' ||
                                        value.state === '排故',
                                        'try': value.state === '试飞' ||
                                        value.state === '待退役'}">{{value.state}}</span>
                <p>起落次数：{{value.airUpOrDown}}</p>
                <div v-show="nowIndex === value.airplane_id" class="floatBox">
                    <p style="">飞机型号：{{value.code}}</p>
                    <p style="">部队编号：{{value.army_id}}</p>
                    <p style="">单位：{{value.unit}}</p>
                    <p style="">起落：{{value.stageUpOrDown}}</p>
                    <p style="">时长：{{value.airHour}}</p>
            </div>
            </div>
        </div>
        <button @click="toPlan()" class="more">上报飞机状态</button>
        <!-- <p class="title">任务状态</p>
        <div class="box">
        <div class="boxData" v-for="(value,index) in taskData.data[0]" v-if="index !== '__v'">
            <i class="fa fa-tasks" aria-hidden="true"></i>
            <span class="icon">{{value}}</span>
            <p>{{taskModel[index]}}</p>
        </div>
        </div> -->
        <footGuide></footGuide>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import 'src/style/css/font-awesome.min.css'
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {
        getAirplane,
        getAirplaneCount,
        getDevice,
        getAirtate,
        updateAirtate,
        getTaskstate,
        updateTaskstate,
        getDevicestate,
        updateDevicestate,
        getVehicle,
        getPlan,
        getEnsure } from '../../../service/getData';
        import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                airPlaneData: {},
                deviceData: {},
                airtateData: {},
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
                    'sc': '试车',
                    'dj': '定检'
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
                planData: {},
                ensureData: {},
                airPlaneDataCount: '',
                totalQlNumber: 0,
                totalJcNumber: 0,
                atotalQlNumber: 0,
                carJcNumber: 0,
                carBzNumber: 0,
                nowIndex: '',
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
                this.airPlaneDataCount = await getAirplaneCount();
                this.deviceData = await getDevice();
                this.airtateData = await getAirtate();
                this.taskData = await getTaskstate();
                this.deviceStateData = await getVehicle();
                this.planData = await getPlan();
                console.log(this.planData);
                this.planData.data.forEach(element => {
                    this.totalQlNumber += parseInt(element.upDownNumber);
                    this.totalJcNumber += parseInt(element.totalNumber);
                });
                this.airPlaneData.data.forEach(element => {
                    this.atotalQlNumber += parseInt(element.airUpOrDown);
                });
                this.deviceStateData.data.forEach(element => {
                    if (element.taskState === '进场') {
                        this.carJcNumber += 1;
                    }
                });
                this.ensureData = await getEnsure();
            },
            airSelect(event) {
                this.airname = event.target.value;
                this.aircount = this.airtateData.data[0];
            },
            taskSelect(event) {
                this.taskname = event.target.value;
                this.taskcount = this.taskData.data[0];
            },
            deviceSelect(event) {
                this.devicename = event.target.value;
                this.devicecount = this.deviceStateData.data[0];
            },
            async submit() {
                console.log(this.aircount);
                let res = '';
                if (this.aircount) {
                    this.aircount[this.airname]++;
                    res = await updateAirtate(this.aircount);
                }
                if (this.taskcount) {
                    this.taskcount[this.taskname]++;
                    res = await updateTaskstate(this.taskcount);
                }
                if (this.devicecount) {
                    this.devicecount[this.devicename]++;
                    res = await updateDevicestate(this.devicecount);
                }
                this.showAlert = true;
                this.alertText = '上报成功';

            },
            closeTip() {
                this.showAlert = false;
            },
            toflyDetail(id) {
                this.nowIndex = id;
                // this.$router.push('airDetail?id='+id);
            },
            toPlan() {
                this.$router.push('showPlan');
            },
            toEnusre() {
                this.$router.push('ensure');
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        padding-top: 2.35rem;
        font: "Microsoft YaHei";
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
        .devicelist {
            font-size: 16PX;
                display: flex;
                justify-content: space-between;
                margin: 0 10%;
        }
        .box {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-bottom: 0.4rem;
            .boxData {
                position: relative;
            }
            .icon {
                position: absolute;
                font-size: 14PX;
                border-radius: 0.8rem;
                color: #fff;
                width: 0.8rem;
                height: 0.8rem;
                text-align: center;
                left: 70%;
                top: 20%;
            }
            .iconTsk {
                width: 1.6rem;
            }
            p {
                font-size: 16PX;
                text-align: left;
            }
            .floatBox {
                position: absolute;
                background-color: #fff;
                // top: 50%;
                padding: 15px;
                line-height: 2;
                width: 300PX;
            }
        }
        .fa {
            color: #3792e5;
            font-size: 64pX;
            margin: 0.6rem;
            // position: absolute;
            // left: 30%;
            // top: 40%;
        }
        .title {
            font-size: 14PX;
            margin: 0.2rem;
        }
        .wh {
            background-color: green;
        }
        .fault{
            background-color: red;
        }
        .try {
            background-color: grey;
        }
        .planTable {
            margin: 0.2rem;
            span {
                font-size: 14PX;
            }
            table {
                border: 1px solid #000;
                border-collapse: collapse;
                font-size: 14PX;
                td {
                    border: 1px solid #000;
                    width: 3.1rem;
                }
            }
        }
        .more {
            padding: 0.5rem;
            margin-top: 0.2rem;
            width: 100%;
            background-color: #3190e8;
            color: #fff;
        }
    }



</style>

<template>
  	<div class="city_container">
        <head-top head-title="飞机态势" go-back='true'>
        </head-top>
        <p class="title">飞行计划 - {{dayTime}} </p>
        <div class="planTable">
            <div>
                <span>总飞机数：{{totalPlane}}</span>
                <span>已进场飞机数：{{jcPlane}}</span>
            </div>
            <div>
                <span>总起落数：{{totalQlNumber}}</span>
                <span>已完成起落数：{{atotalQlNumber}}</span>
            </div>
            <div>
                <span>总进场人数：{{totalJcNumber}}</span>
                <span>已进场人数：{{totalJcNumber}}</span>
            </div>
            <!-- <table>
                <tr>
                   <td>飞机</td>
                   <td>飞机科目</td>
                   <td>气象科目</td>
                   <td>飞行时间</td>
               </tr>
                <tr v-for="v in planData.data">
                    <td>{{v.airName}}</td>
                    <td>{{v.airSubject}}</td>
                    <td>{{v.sceneSubject}}</td>
                    <td>{{v.flightTime}}</td>
                </tr>
            </table> -->
        </div>
        <button @click="toPlan()" class="more">更多</button>
        <p class="title">保障任务</p>
        <div class="planTable">
            <div>
                <span>总保障车辆数：{{totalEnsure}}</span>
                <span>总保障任务数：{{atotalEnsure}}</span>
            </div>
            <div>
                <span>进场车辆数：{{carJcNumber}}</span>
                <span>已保障任务数：{{carBzNumber}}</span>
            </div>
        </div>
        <button @click="toEnusre()" class="more">更多</button>
        <p class="title">飞机状态</p>
        <div class="box">
            <i class="fa fa-fighter-jet"></i>
            <button @click="location('airSituation')" class="more">查看飞机状态</button>
            <i class="fa fa-car"></i>
            <button @click="location('carSituation')" class="more">查看车辆状态</button>
            <i class="fa fa-binoculars"></i>
            <button @click="location('device')" class="more">查看有售器件状态</button>
            <i class="fa fa-ravelry"></i>
            <button @click="location('ammo')" class="more">查看弹药状态</button>
            <i class="fa fa-user"></i>
            <button class="more">查看人员状态</button>
        </div>
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
                dayTime: '',
                mapLists: {},
                totalPlane: 0,
                jcPlane: 0,
                totalEnsure:0,
                atotalEnsure: 0
            }
        },

        mounted(){
            var day2 = new Date();
            day2.setTime(day2.getTime());
            this.dayTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
            this.initData();
        },

        components:{
            headTop,
            alertTip
        },

        computed:{

        },
        mixins: [mixin],

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
                    if (element.dateTime === this.dayTime) {
                        this.mapLists[element.airName] || (this.mapLists[element.airName] = []);
                        this.mapLists[element.airName].push(element);
                        this.totalQlNumber += parseInt(element.upDownNumber);
                        // this.totalQlNumber += parseInt(element.upDownNumber);
                        // this.totalJcNumber += parseInt(element.totalNumber);
                    }
                });
                console.log(this.mapLists);
                Object.keys(this.mapLists).forEach((key,value) => {
                    this.totalPlane ++;

                });

                this.airPlaneData.data.forEach(element => {
                    console.log(element);
                    if (element.enter === '进场') {
                        this.jcPlane ++ ;
                        this.atotalQlNumber += parseInt(element.airUpOrDown);
                    }
                });
                this.deviceStateData.data.forEach(element => {
                    if (element.taskState === '进场') {
                        this.carJcNumber += 1;
                    }
                });
                this.ensureData = await getEnsure();
                const newEnsure = [];
                this.ensureData.data.forEach(element => {
                    element.filed3.forEach(i => {
                        newEnsure[i] || (newEnsure[i] = []);
                        newEnsure[i].push(i);
                    });
                    if (element.dateTime != this.dayTime) {
                        this.carBzNumber ++
                    }
                });
                Object.keys(newEnsure).forEach((key,value) => {
                    this.totalEnsure ++;
                });
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
                this.$router.push('airDetail?id='+id);
            },
            toPlan() {
                this.$router.push('showPlan');
            },
            toEnusre() {
                this.$router.push('ensure');
            },
            location(type) {
                this.$router.push(type);
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
            text-align: center;
            // display: flex;
            // flex-direction: row;
            // flex-wrap: wrap;
            margin-bottom: 2.4rem;
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
                text-align: center;
            }
        }
        .fa {
            color: #3792e5;
            font-size: 120px;
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

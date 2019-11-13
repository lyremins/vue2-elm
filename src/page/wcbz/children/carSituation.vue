<template>
  	<div class="city_container">
        <p @click="showCar1 = !showCar1" class="title">飞行计划保障车辆</p>
        <div v-show="showCar1" class="box">
            <div class="boxData" v-for="(value,index) in airData">
                <i class="fa fa-car" aria-hidden="true"></i>
                <span class="icon wh iconTsk">{{value[0].state}}</span>
                <p>{{index}}</p>
                <p>进场状态：{{value[0].enter}}</p>
                <p v-if="value[0].taskState">工作状态：{{value[0].taskState}}</p>
            </div>
        </div>
        <p @click="showCar2 = !showCar2" class="title">其他保障任务车辆</p>
        <div v-show="showCar2" class="box">
            <div class="boxData" v-for="(value,index) in otherData">
                <i class="fa fa-car" aria-hidden="true"></i>
                <span class="icon wh iconTsk">{{value[0].state}}</span>
                <p>{{index}}</p>
                <p>进场状态：{{value[0].enter}}</p>
                <p v-if="value[0].taskState">工作状态：{{value[0].taskState}}</p>
            </div>
        </div>
        <p @click="showCar3 = !showCar3" class="title">今日无任务车辆 {{se_data_number}}</p>
        <div v-show="showCar3" class="box">
            <div class="boxData" v-for="(value,index) in seData">
                <i class="fa fa-car" aria-hidden="true"></i>
                <span class="icon wh iconTsk">{{value.state}}</span>
                <p>{{value.name}}</p>
                <p>进场状态：{{value.enter}}</p>
                <p v-if="value.taskState">工作状态：{{value.taskState}}</p>
            </div>
        </div>
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
                airData: {},
                otherData: {},
                seData: {},
                showCar1: true,
                showCar2: false,
                showCar3: false,
                se_data_number: 0
            }
        },

        mounted(){
            var day2 = new Date();
            day2.setTime(day2.getTime());
            this.dayTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
            this.initData();
        },
        mixins: [mixin],

        components:{
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
                const air = [];
                const other = [];
                const total = [];
                this.ensureData.data.forEach(element => {
                    console.log(this.dayTime);
                    if (this.toTimeStamp(element.filed2) === this.toTimeStamp(this.dayTime)) {
                        element.filed3.forEach(i => {
                            i.car.forEach(element => {
                                total[element.name] || (total[element.name] = []);
                                total[element.name].push(element);
                            });
                            if (i.content === '飞行计划保障') {
                                i.car.forEach(element => {
                                    air[element.name] || (air[element.name] = []);
                                    air[element.name].push(element);
                                });
                            } else {
                                i.car.forEach(element => {
                                    other[element.name] || (other[element.name] = []);
                                    other[element.name].push(element);
                                });
                            }
                        });
                    }
                    // if (element.filed2 === this.dayTime) {
                    //     element.filed3.forEach(i => {
                    //         newEnsure[i] || (newEnsure[i] = []);
                    //         newEnsure[i].push(i);
                    //     });
                    // } else {
                    //         element.filed3.forEach(i => {
                    //         oldEnsure[i] || (oldEnsure[i] = []);
                    //         oldEnsure[i].push(i);
                    //     });
                    // }
                });
                    console.log(total);
                    this.airData = air;
                    this.other = other;
                    this.airData = Object.assign({},air)
                    this.otherData = Object.assign({},other)
                    const se_data = [];
                    this.deviceStateData.data.forEach(element => {
                       if (!total.hasOwnProperty(element.name))  {
                           se_data.push(element);
                           this.se_data_number ++;
                       }
                    });
                    console.log(se_data);
                    this.seData = se_data;
                    this.seData = Object.assign({},se_data)

                // console.log(newEnsure);
                // console.log(oldEnsure);
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
            toTimeStamp(time) {
                time = time.replace(/-/g, '/') // 把所有-转化成/
                let timestamp = new Date(time).getTime()
                return timestamp
            },
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        padding-top: 0.35rem;
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
                width: 43%;
                text-align: center;
                background-color: #e6e6e6;
                margin-right: 20PX;
                margin-bottom: 20PX;
                padding: 10px;
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
                font-size: 12PX;
                text-align: center;
            }
        }
        .fa {
            color: #3792e5;
            font-size: 50PX;
            margin: 0.6rem;
            // position: absolute;
            // left: 30%;
            // top: 40%;
        }
        .title {
            font-size: 16PX;
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

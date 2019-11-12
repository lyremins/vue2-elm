<template>
  	<div class="city_container">
        <p @click="showJoinPlan = !showJoinPlan" class="title1">参加计划的人员：</p>
        <div v-show="showJoinPlan" class="box">
            <div class="boxData" >
            <div v-for="v in enterArrayData[0]">
                <!-- {{v}} -->
                <div   v-for="(value,index) in airPlaneData.data" v-if="value.code === v.airName">
                    <div class="listBox">
                        <!-- <img class="flyIcon" src="../../../images/flyIcon.png">
                        <span class="icon iconTsk" :class="{'wh': value.state === '完好',
                                                'fault': value.state === '定检' ||
                                                value.state === '大修' ||
                                                value.state === '排故',
                                                'try': value.state === '试飞' ||
                                                value.state === '待退役'}">{{value.state}}</span>
                        <p>进场状态：{{value.enter || '未进场'}}</p>
                        <p>起落次数：{{value.airUpOrDown}}</p> -->
                        <!-- <p>飞机编号：{{value.code}}</p> -->
                        <div v-show="nowIndex === value.airplane_id" class="floatBox">
                            <p style="">飞机型号：{{value.code}}</p>
                            <p style="">部队编号：{{value.army_id}}</p>
                            <p style="">单位：{{value.unit}}</p>
                            <p style="">起落：{{value.stageUpOrDown}}</p>
                            <p style="">时长：{{value.airHour}}</p>
                        </div>
                    </div>
                    <div class="personList">
                        <div>飞机编号：{{value.code}}</div>
                        <!-- <p>机组人员</p> -->
                        <div @click="toUpload(v.user_name,v.person_id)" v-for="v in pp_name[value.code]">
                            人员名称：{{v.user_name}}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <p @click="showEnsure = !showEnsure" class="title1">参加保障任务的人员：</p>
        <div v-show="showEnsure" class="box">
            <div class="boxData" >
            <div
                v-for="(value,index) in ensureDdd"
                  >
                    <!-- {{v.airName}} - {{value.code}} -->
                    <div>
                    <div class="listBox">
                        <!-- <img class="flyIcon" src="../../../images/flyIcon.png">
                        <span class="icon iconTsk" :class="{'wh': value.state === '完好',
                                                'fault': value.state === '定检' ||
                                                value.state === '大修' ||
                                                value.state === '排故',
                                                'try': value.state === '试飞' ||
                                                value.state === '待退役'}">{{value.state}}</span>
                        <p>飞机编号：{{value.code}}</p>
                        <p>起落次数：{{value.airUpOrDown}}</p>
                        <div v-show="nowIndex === value.airplane_id" class="floatBox">
                            <p style="">飞机编号：{{value.code}}</p>
                            <p style="">部队编号：{{value.army_id}}</p>
                            <p style="">单位：{{value.unit}}</p>
                            <p style="">起落：{{value.stageUpOrDown}}</p>
                            <p style="">时长：{{value.airHour}}</p>
                        </div> -->
                    </div>
                    <div>
                        <div>飞机编号：{{value[0].code}}</div>
                        <div @click="toUpload(v.user_name,v.person_id)" v-for="v in pp_name[value[0].code]">
                            {{v.user_name}}
                        </div>
                    </div>
                    </div>
            </div>
            </div>
        </div>
        <p @click="showJoinNoPlan = !showJoinNoPlan" class="title1">无任务的人员：</p>
        <div v-show="showJoinNoPlan" class="box">
            <div class="total">未参加任务的人员总数：{{noDataL}}</div>
            <div class="boxData" >
            <div
                v-for="(value,index) in noData"
                  >
                    <!-- {{v.airName}} - {{value.code}} -->
                    <div>
                    <div class="listBox">
                        <!-- <img class="flyIcon" src="../../../images/flyIcon.png">
                        <span class="icon iconTsk" :class="{'wh': value.state === '完好',
                                                'fault': value.state === '定检' ||
                                                value.state === '大修' ||
                                                value.state === '排故',
                                                'try': value.state === '试飞' ||
                                                value.state === '待退役'}">{{value.state}}</span>
                        <p>飞机编号：{{value.code}}</p>
                        <p>起落次数：{{value.airUpOrDown}}</p>
                        <div v-show="nowIndex === value.airplane_id" class="floatBox">
                            <p style="">飞机编号：{{value.code}}</p>
                            <p style="">部队编号：{{value.army_id}}</p>
                            <p style="">单位：{{value.unit}}</p>
                            <p style="">起落：{{value.stageUpOrDown}}</p>
                            <p style="">时长：{{value.airHour}}</p>
                        </div> -->
                    </div>
                    <div>
                        <div style="">飞机编号：{{value.code}}</div>
                        <div @click="toUpload(v.user_name,v.person_id)" v-for="v in pp_name[value.code]">
                            人员名称：{{v.user_name}}
                        </div>
                    </div>
                    </div>
            </div>
            </div>
        </div>

        <button @click="toPlan()" class="more">上报人员状态</button>
        <!-- <p class="title">任务状态</p>
        <div class="box">
        <div class="boxData" v-for="(value,index) in taskData.data[0]" v-if="index !== '__v'">
            <i class="fa fa-tasks" aria-hidden="true"></i>
            <span class="icon">{{value}}</span>
            <p>{{taskModel[index]}}</p>
        </div>
        </div> -->
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
        getEnsure,
        getPersonnel } from '../../../service/getData';
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
                mapLists: {},
                dayTime: '',
                planIndex: [],
                newData: [],
                enterArrayData: [],
                showJoinPlan: true,
                showJoinNoPlan: false,
                showEnsure: false,
                noData: [],
                enterEnsureData: [],
                personnelData: {},
                pp_name: {},
                noDataL: 0,
                enterEnsureData: [],
                ensureDdd: []
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
                this.personnelData = await getPersonnel();
                const pp_name = [];
                this.personnelData.data.forEach(plan => {
                    this.pp_name[plan.bindAir] || (this.pp_name[plan.bindAir] = []);
                    this.pp_name[plan.bindAir].push(plan);
                });

                console.log("pp_namepp_namepp_name", this.pp_name);
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
                this.ensureData.data.forEach(element => {
                    if (this.toTimeStamp(element.filed2) === this.toTimeStamp(this.dayTime)) {
                        console.log("element.filed3element.filed3",element.filed3);
                        element.filed3.forEach(e => {
                            if (e.content === '飞行计划保障') {
                                console.log("飞行计划保障",e.plan[0].airData);
                                this.airPlaneData.data.forEach(aaa => {
                                    e.plan[0].airData.forEach(aaaa => {
                                        console.log("aaa.airName",aaaa.airName);
                                        if (aaa.code === aaaa.airName) {
                                            console.log("aaa.airName",aaaa.airName);
                                            console.log("aaa.code",aaa.code);
                                            this.enterEnsureData.push(aaa);
                                        }
                                    });
                                });
                            }
                            if (e.airplane.length) {
                                e.airplane.forEach(ee => {
                                    this.enterEnsureData.push(ee);
                                });
                            }
                        });
                    }
                });
                console.log("^^%%$$$$$$", this.enterEnsureData);
                const ensureddd = [];
                this.enterEnsureData.forEach(plan => {
                    ensureddd[plan.code] || (ensureddd[plan.code] = []);
                    ensureddd[plan.code].push(plan);
                });
                console.log("ensuredddensureddd",ensureddd);
                this.ensureDdd = ensureddd;
                this.ensureDdd = Object.assign({},ensureddd)

                this.enterArrayData = [];
                this.planData.data.forEach((element,index) => {
                    console.log('333333', element.dateTime);
                    console.log(element);
                    element.isShow = false;
                    if (this.toTimeStamp(element.dateTime) === this.toTimeStamp(this.dayTime)) {
                        this.enterArrayData.push(element.airData);
                    }
                });
                console.log("---------------", this.enterArrayData);
                Object.keys(this.mapLists).forEach((key) => {
                    this.planIndex.push(key);
                });
                console.log("33333", this.planIndex);
                const data = [];
                const noData = [];
                const name = [];
                if (this.enterArrayData.length) {
                    this.enterArrayData[0].forEach(plan => {
                        name[plan.airName] || (name[plan.airName] = []);
                        name[plan.airName].push(plan);
                    });
                    console.log('@@@@@@@@', name);
                }
                this.airPlaneData.data.forEach(airplane => {
                    if (!this.enterArrayData.length) {
                    this.noData.push(airplane);
                    } else if (!name.hasOwnProperty(airplane.code) && !ensureddd.hasOwnProperty(airplane.code)) {
                        this.noData.push(airplane);
                    }
                });
                console.log("test", this.pp_name);
                this.noData.forEach(element => {
                    if (this.pp_name.hasOwnProperty(element.code)) {
                        console.log('^^^^^^^^',this.pp_name[element.code].length )
                        this.noDataL +=this.pp_name[element.code].length;
                    }
                });
                console.log("%%%%%%%%%", this.noData);

                this.airPlaneData.data.filter ( item => {
                    console.log(name.indexOf(item.code));
                    name.indexOf(item.code) !== -1;
                })
                console.log('22222222', this.airPlaneData.data);
                // this.airPlaneData.data.forEach( airplane => {
                //     console.log(airplane.code);
                //     name.forEach(element => {
                //         if (airplane.code != element.airName) {
                //             console.log("%%%%%%%", airplane.code)
                //         }
                //     });
                // })
                // this.airPlaneData.data.filter((item.code) => this.enterArrayData[0].indexOf(item.code)==-1)
                console.log('!!!!!!!!!!!', noData);
                // this.planIndex.forEach(elements => {
                //     this.airPlaneData.data.forEach(element => {
                //         if (elements === element.code) {
                //             data
                //         }
                //     });
                // });
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
                this.$router.push('airDetail?id='+id);
            },
            toPlan() {
                android.toUpLoadData();
            },
            toEnusre() {
                this.$router.push('ensure');
            },
            toTimeStamp(time) {
                time = time.replace(/-/g, '/') // 把所有-转化成/
                let timestamp = new Date(time).getTime()
                return timestamp
            },
            toUpload(name,id) {
                console.log(name,id);
                // android.toUpLoadData();
                android.toUpLoadData(name,id);
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        padding-top: 0.35rem;
        font: "Microsoft YaHei";
        margin: 0 1rem;
        text-align: center;
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
            // display: flex;
            // justify-content: space-between;
            // align-items: center;
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
                // display: flex;
                // justify-content: space-between;
                margin: 0 10%;
        }
        .box {
            // display: flex;
            // flex-direction: row;
            // flex-wrap: wrap;
            margin-bottom: 0.4rem;
            // justify-content: space-between;
            .total {
                font-size: 14PX;
            }
            .boxData {
                position: relative;
                display: flex;
                flex-wrap: wrap;
                div {
                    width: 7rem;
                    font-size: 14PX;
                    margin-bottom: 10PX;
                }
                // width: 45%;
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
                font-size: 14PX;
                // text-align: center;
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
        .title1 {
            text-align: left;
            font-size: 16PX;
            padding: 10PX;
        }
        .flyIcon {
            width: 50%;
        }
        .listBox {
            // text-align: center;
            position: relative;
        }
        .noPlanBox {
            text-align: center;
        }
        .personList {
            font-size: 14PX;
        }
    }



</style>

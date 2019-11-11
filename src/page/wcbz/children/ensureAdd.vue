<template>
  	<div class="city_container">
        <p class="title">任务名称</p>
        <input v-model="formData.name" placeholder="任务名称" class="select" type="text">
        <p class="title">保障日期：</p>
        <input placeholder="请输入保障日期" type="date" class="select" v-model="formData.dateTime">
        <!-- <mt-field placeholder="请输入保障日期" type="date" v-model="formData.dateTime"></mt-field> -->
        <div class="radioBox" v-for="(value,index) in gzData" >
            <input class="radio" :value="value.content" @change="changeSelect(index)"  type="checkbox" :id="index" />
            <label  :for="index">保障类型：{{value.content}}</label>
            <div class="expandBox" v-show="value.isCheck">
                <div v-show="value.content === '飞行计划保障'">
                    <p class="subTitle">选择飞行计划：</p>
                    <div>
                    <div v-for="(plans,planIndex) in value.plan" @change="changePlanSelect(index,planIndex)" :value="plans.name">
                        <input :value="value.name" class="radio" type="checkbox"  :id="planIndex"   />
                            <label >计划名称：{{plans.name}}</label>
                        </div>
                    </div>
                </div>
                <div v-show="value.content != '飞行计划保障'">
                    <p class="subTitle">选择飞机：</p>
                    <div>
                    <div v-for="(airplane,planeindex) in value.airplane" @change="changeAirplaneSelect(index,planeindex)" :value="airplane.name">
                        <input :value="airplane.code"   class="radio" type="checkbox"   />
                            <label>飞机编号：{{airplane.code}}</label>
                        </div>
                    </div>
                </div>
                <div class="planTotalNumber" v-show="value.content === '飞行计划保障'">
                    总人数: {{totalNumber}}

                </div>
                <div v-show="value.content != '飞行计划保障'">
                    <p class="subTitle">人员类型选择：</p>
                    <div>
                        <div class="rowBox" v-for="(p,personindex) in value.person" :value="p">
                            <input v-model="p.isCheck" @change="changeCarSelect()"   class="radio" type="checkbox"   />
                            <label >{{p.name}}</label>
                            <div class="subMenu" v-show="p.isCheck">
                                <div class="rowBox" v-for="(v,iss) in p.person" :value="v">
                                <input v-model="v.isCheck" class="radio" type="checkbox"   />
                                    <label >{{v.user_name}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="subTitle">车辆类型选择：</p>
                <div>
                    <div class="rowBox" v-for="(ve,vehicleindex) in value.car" :value="ve">
                        <input v-model="ve.isCheck" @change="changeCarSelect()"   class="radio" type="checkbox"   />
                            <label >{{ve.name}}</label>
                            <div class="subMenu" v-show="ve.isCheck">
                                <div class="rowBox" v-for="(v,iss) in ve.vehicle" :value="v">
                                <input v-model="v.isCheck" class="radio" type="checkbox"   />
                                    <label >{{v.name}}</label>
                                </div>
                            </div>
                        <!-- <span> 数量</span>：<input v-model="vehicle.number"  value=""  class="carClass" type="number"> -->
                    </div>
                </div>
                <!-- <p>总人数：</p>
                <input v-model="value.total" placeholder="总人数" class="select" type="text"> -->
                <div v-show="value.content != '飞行计划保障'">
                    <p>输入进场时间：</p>
                    <input placeholder="进场时间" type="time" class="select" v-model="value.time">
                </div>
                <!-- <mt-field placeholder="飞行任务时间" type="time" v-model="formData.flightTime[index]"></mt-field> -->
                <!-- <p>携弹类型：</p>
                <div class="xd">
                    {{xdType}}
                    <div v-if="value.code === v.air_code" v-for="v in airplaneAmmoData.data" >
                        <input class="radio" :value="v" v-model="xdType"  type="checkbox" :id="index" />
                        <label :for="index">携弹名称：{{v.air_code}}_{{v.ammo_code}}</label>
                    </div>
                    <select class="select" v-model="xdType[index]">
                        <option v-if="value.code === v.air_code" v-for="v in airplaneAmmoData.data" :value="v">{{v.air_code}}_{{v.ammo_code}}</option>
                    </select>
                </div> -->
            </div>
        </div>

        <mt-popup
            v-model="popupVisible"
            position="bottom">
            <div class="box">
                <!-- {{newData}} -->
                <p>预览：</p>
                <div v-for="(item,index) in newData">
                    <div v-show="index === 0">
                        <p>计划名称： {{item.name}}</p>
                        <p>出厂日期： {{item.dateTime}}</p>
                        <p>总人数： {{item.totalNumber}}</p>
                        <p>进场时间：{{item.approachTime}}</p>
                    </div>
                    <p v-show="index === 0">绑定飞机：</p>
                    <div>
                        <p @click="showList(index)">飞机编号：{{item.airName}}</p>
                        <div class="viewBox" v-show="item.isShow">
                            <p>飞行科目：{{item.airSubject}}</p>
                            <p>气象科目：{{item.sceneSubject}}</p>
                            <p>起落次数：{{item.upDownNumber}}</p>
                            <p>飞行任务时间：{{item.flightTime}}</p>
                        </div>
                    </div>

                </div>
            </div>
            <button @click="save()" class="button">创建计划</button>
        </mt-popup>

        <!-- <select v-model="formData.airName" class="select">
            <option v-for="v in airPlaneData.data" :value="v.code">{{v.code}}</option>
        </select> -->
        <!-- <p>选择保障车辆：</p>
        <div class="deviceBox">
            <select class="select device" @change="vehicleSelect($event)">
                <option v-for="v in vehicleData.data" :value="v.name">{{v.name}}</option>
            </select>
        </div> -->
        <div class="buttonGroup">
           <button @click="bztask()" class="planButton">创建保障任务</button>
           <button @click="del()" class="planButton">删除保障任务</button>
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
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
        getConfig,
        getAirplaneAmmo,
        getPlan,
        getAirplaneToPlan,
        getPersonnel,
        addEnsure,
        getEnsure
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
                bzType: [],
                formData: {
                    name:'',
                    dateTime: '',
                    airName: '',
                    airSubject: [],
                    sceneSubject: [],
                    upDownNumber: [],
                    flightTime: [],
                    approachTime: ''
                },
                air: [
                ],
                showContent: false,
                checked: false,
                subitem: {
                    isCheck: false
                },
                optionList: [],
                popupVisible: false,
                newData: [],
                showView: [],
                device: this.$util.getUrlKey('device'),
                type: this.$util.getUrlKey('type'),
                lastIndex: '',
                nowIndex: '',
                airplaneAmmoData: {},
                xdType: [],
                gzData:[],
                dayTime: '',
                planData: {},
                todayAir:{},
                personData: {},
                a:{},
                dataArray: {
                    type:[],
                    plan:[]
                },
                ensureData: {},
                carType: [],
                pMajorModel:[],
                personNumber: [],
                carNumber: [],
                totalNumber: 0
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
            openPicker() {
                this.$refs.picker.open();
            },
            async initData(){
                this.ensureData = await getEnsure();
                console.log("1111", this.ensureData);
                this.airPlaneData = await getAirplane();
                console.log(this.airPlaneData);
                this.vehicleData = await getVehicle();
                this.subjectData = await getSubject();
                const config = await getConfig()
                this.carType = config.data[0].carTypeModel.split(",");
                this.pMajorModel = config.data[0].pMajorModel.split(",");
                this.fxSubject = config.data[0].subjectModel.split(",");
                this.qxSubject = config.data[0].sceneModel.split(",");
                this.bzType = config.data[0].ensureModel.split(",");
                this.bzType.forEach(element => {
                    this.gzData.push({
                        content: element,
                        isCheck: false
                    })
                });
                console.log("@#@#@#@#@2222", this.gzData);
                this.airplaneAmmoData = await getAirplaneAmmo();
                this.planData = await getPlan();
                this.todayAir = await getAirplaneToPlan();
                const planeData = []
                this.todayAir.data.forEach(element => {
                    element.isCheck = false;
                    planeData.push(Object.assign({},element));
                    // this.todayAir.data = Object.assign([],this.todayAir.data);
                });
                this.personData = await getPersonnel();
                this.gzData.forEach(element => {
                    // 飞机
                    let planeData = [];
                    this.airPlaneData.data.forEach(element => {
                        let n = 0;
                        this.todayAir.data.forEach(tair => {
                            if (element.code === tair.code ) {
                                n = 1 ;
                            }
                        });
                        if (n === 0) {
                            element.isCheck = false;
                            planeData.push(Object.assign({},element));
                        }
                    });
                    // 飞行计划
                    let planData = [];
                    this.planData.data.forEach(element => {
                        if (this.toTimeStamp(element.dateTime) >= this.toTimeStamp(this.dayTime)) {
                            element.isCheck = false;
                            planData.push(Object.assign({},element));
                        }
                    });
                    // 人员
                    let personData = [];
                    this.personData.data.forEach(element => {
                        element.isCheck = false;
                        personData.push(Object.assign({},element));
                    });

                    // 车辆
                    let vehicleData = [];
                    this.vehicleData.data.forEach(element => {
                        element.isCheck = false;
                        vehicleData.push(Object.assign({},element));
                    });
                    console.log("vehicleDatavehicleData", vehicleData);

                    let carT = [];
                    this.carType.forEach(e => {
                        let array = [];
                        vehicleData.forEach(element => {
                            if (element.model === e) {
                                array.push(element);
                            }
                        });
                        let data = {
                            isCheck: false,
                            name: e,
                            vehicle: array
                        };
                        carT.push(data);
                        // carT.push(Object.assign({},data));
                    });
                    console.log("catTcatTcatT",carT);

                    let personT = [];
                    this.pMajorModel.forEach(e => {
                        let array = [];
                        personData.forEach(element => {
                            if (element.major === e) {
                                array.push(element);
                            }
                        });
                        let data = {
                            isCheck: false,
                            name: e,
                            number: '',
                            person: array
                        };
                        personT.push(data);
                        // personT.push(Object.assign({},data));
                    });

                    console.log(personT);

                    element.airplane = planeData;
                    element.plan = planData;
                    element.person = personT;
                    element.car = carT;
                    element.total = 0;
                    element.time = 0;
                });
                console.log("gz!!!!gz", this.gzData);
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
            submit() {
                console.log("&&&&&&&&&@@@!!",this.gzData)
                this.newData = [];
                console.log("&&&&&&&&&", this.formData.sceneSubject);
                console.log(this.air);
                this.air.forEach((element,index) => {
                    console.log(element);
                    console.log(index);
                    const data = {
                        // name: this.formData.name,
                        // dateTime: this.formData.dateTime,
                        // totalNumber: this.formData.totalNumber,
                        // approachTime: this.formData.approachTime,
                        bzType: this.gzData[index].content,
                        // airSubject: this.formData.airSubject[index],
                        // sceneSubject: this.formData.sceneSubject[index],
                        // upDownNumber: this.formData.upDownNumber[index],
                        // flightTime: this.formData.flightTime[index],
                        // isShow: false
                    }
                    this.newData.push(data);
                });
                const data = {
                    name: this.formData.name,
                    dateTime: this.formData.dateTime,
                    airData: this.newData
                }
                console.log("##########", data);
                console.log(this.bzType);
                // this.air.forEach((element,index) => {
                //     element.subjectname = this.formData.air[index]
                // });
                console.log(this.air);
                this.popupVisible = true;

            },
            save () {
                // this.newData.forEach(element => {
                //     delete element.isShow;
                //     addPlan(element)
                // });
                const data = {
                    name: this.formData.name,
                    dateTime: this.formData.dateTime,
                    totalNumber: this.formData.totalNumber,
                    approachTime: this.formData.approachTime,
                    airData: this.newData
                }
                console.log(data);
                // addPlan(data);
                // this.showAlert = true;
                // this.alertText = '上报成功';
                // this.$router.push('showPlan');
            },
            closeTip() {
                this.showAlert = false;
            },
            bztask() {
                console.log("!!@@@!!!!!", this.gzData);
                // this.gzData.filter( item => {
                //     console.log(item.airplane);
                // })
                const newData = [];
                this.gzData.forEach(element => {
                    let data = [];
                    console.log(element.airplane);
                    if (element.isCheck) {
                        const dd = [];
                        element.car.forEach(s => {
                            s.vehicle.forEach(ss => {
                                if (ss.isCheck) {
                                    dd.push(ss)
                                }
                            });
                        });
                        const pp = [];
                        element.person.forEach(s => {
                            s.person.forEach(ss => {
                                if (ss.isCheck) {
                                    pp.push(ss)
                                }
                            });
                        });
                        console.log("dddddddddd",pp);
                        const d = {
                            content: element.content,
                            airplane: element.airplane.filter ( item => {return item.isCheck}),
                            plan: element.plan.filter ( item => {return item.isCheck}),
                            person: pp,
                            car: dd,
                            total: element.total,
                            time: element.time
                        }
                        newData.push(d);
                    }
                });
                console.log("!!!!!!!", newData);
                newData.forEach(element => {
                    console.log("!!!!!!!%%%####",element);
                });
                const data = {
                    filed1: this.formData.name,
                    filed2: this.formData.dateTime,
                    filed3: newData
                }
                addEnsure(data);
                this.$toast('创建成功');
                this.$router.push('ensure');
            },
            changeSelect(index) {
                this.nowIndex = index;
                this.gzData[index].isCheck = !this.gzData[index].isCheck;
                // this.gzData = Object.assign([],this.gzData)
            },
            changeCarSelect(i,index) {
                // console.log("checkcheckcheckcheckcheckcheck",this.gzData[i].car[index].isCheck)
                // this.nowIndex = index;
                // this.gzData[i].car[index].isCheck = !this.gzData[i].car[index].isCheck;
                // console.log("checkcheckcheck",this.gzData[i].car[index].isCheck)
                this.gzData = Object.assign([],this.gzData)
            },
            changePlanSelect(i,index) {
                this.totalNumber = 0;
                console.log(this.gzData[i].plan);
                this.gzData[i].plan[index].isCheck = !this.gzData[i].plan[index].isCheck;
                this.gzData[i].plan.forEach(element => {
                    if (element.isCheck && element.totalNumber) {
                        this.totalNumber += parseInt(element.totalNumber);
                    }
                });
                // this.gzData = Object.assign([],this.gzData)
            },
            changeAirplaneSelect(i,index) {
                console.log(i);
                this.gzData[i].airplane[index].isCheck = !this.gzData[i].airplane[index].isCheck;
                // this.gzData = Object.assign([],this.gzData)
            },
            changePersonSelect(i,index) {
                console.log(i);
                this.gzData[i].person[index].isCheck = !this.gzData[i].person[index].isCheck;
                // this.gzData = Object.assign([],this.gzData)
            },
            changeVehicleSelect(i,index) {
                console.log("~~~~~~~~", this.gzData[i]);
                this.gzData[i].car[index].isCheck = !this.gzData[i].car[index].isCheck;
                // this.gzData = Object.assign([],this.gzData)
            },
            showList(index) {
                this.newData[index].isShow = !this.newData[index].isShow;
                this.newData = Object.assign([],this.newData)
            },

            toTimeStamp(time) {
                time = time.replace(/-/g, '/') // 把所有-转化成/
                let timestamp = new Date(time).getTime()
                return timestamp
            },
            del() {

            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        // background-color: #eee;
        height: 100%;
        // padding-top: 2.35rem;
        font: 0.6rem/1.75rem "Microsoft YaHei";
        // margin: 0 1rem;
        padding: 0.5rem;
        margin-bottom: 6rem;
        .title {
            font-size: 16PX;
        }
        input {
            background-color: #fff;
        }
        .buttonGroup {
            position: fixed;
            left: 1px;
            bottom: 0px;
            width: 100%;
            background-color: #fff;
            padding: 10PX;
            text-align: center;
        }
        .planButton {
            background-color: #3190e8;
            color: #fff;
            padding: 0.5rem;
            width: 49%;
        }
        .button {
            background-color: #3190e8;
            color: #fff;
            padding: 0.5rem;
            width: 100%;
            margin-top: 0.6rem;
        }
        .planTotalNumber {
            // margin-top: -5PX;
        }
        .select {
            width: 100%;
            background-color: #fff;
            font-size: 14PX;
            padding: 0.5rem;
        }
        .selectTime {
            width: 70%;
            // background-color: #e6e6e6;
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
            .subTitle {
                margin-top: 0px;
            }
            p {
                // line-height: 20px;
            }
            .radio {
                zoom: 1.2;
            }
            label {
                font-size: 16px;
                vertical-align: super;
            }
        }
        .mint-popup-bottom {
                top: 15%;
                z-index: 2001;
                height: 20rem;
                overflow: scroll;
                .box {
                    width: 13rem;
                    padding: 20PX;
                    height: 17.6rem;
                    overflow: auto;
                    padding-bottom: 40PX;
                }
        }
        .viewBox {
            margin-left: 2rem;
        }
        .mint-field {
            // padding: 10PX;
        }
        .xd {
            margin-left: 1rem;
        }
        .expandBox {
            margin-left: 1rem;
            font-size: 16PX;
            label {
                font-size: 16PX;
            }
        }
        .rowBox {
            font-size: 16PX;
            display: flex;
            align-items: center;
            span {
                margin-left: 30px;
            }
            input {
                text-align: center;
            }
            // justify-content: space-between;
        }
        .carClass {
            border: 1px solid #614242;
            width: 50px;
        }
        .subMenu {
            margin-left: 20PX;
        }
    }



</style>

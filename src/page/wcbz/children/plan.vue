<template>
  	<div class="city_container">
        <p>计划名称：</p>
        <input v-model="formData.name" placeholder="计划名称" class="select" type="text">
        <p>计划日期：</p>
        <input placeholder="请输入出厂日期" type="date" class="select" v-model="formData.dateTime">
        <p>输入进场时间：</p>
        <!-- <input v-model="formData.approachTime" placeholder="进场时间" class="select" type="text"> -->
        <input placeholder="请输入进场时间" type="time" class="select" v-model="formData.approachTime">
        <!-- <mt-field placeholder="请输入进场时间" type="time" v-model="formData.approachTime"></mt-field> -->
        <div class="fix">
            <span>选定的飞机数量：{{airLength}}</span>
        </div>
        <!-- <mt-datetime-picker
            ref="picker"
            type="time"
            v-model="formData.approachTime">
        </mt-datetime-picker> -->
        <div class="radioBox" v-for="(value,index) in airPlaneData.data" >
            <input class="radio" :value="value" @change="changeSelect(index,value.code)"  v-model="air[index]" type="checkbox" :id="index" />
            <label :for="index">出厂号码：{{value.code}}</label>
            <div v-show="value.isCheck">
                <p>选择飞行科目：</p>
                <div class="deviceBox">
                    <select class="select"  v-model="formData.airSubject[index]">
                        <option v-for="v in fxSubject" :value="v">{{v}}</option>
                    </select>
                </div>
                <p>选择气象科目：</p>
                <div class="deviceBox">
                    <select class="select" v-model="formData.sceneSubject[index]">
                        <option v-for="v in qxSubject" :value="v">{{v}}</option>
                    </select>
                </div>
                <p>设置起落次数：</p>
                <input v-model="formData.upDownNumber[index]" placeholder="起落次数" class="select" type="number">
                <p>输入飞行任务时间：</p>
                <input v-model="formData.flightTime[index]" placeholder="飞行任务时间" class="selectTime" type="number"> 小时
                <!-- <mt-field placeholder="飞行任务时间" type="time" v-model="formData.flightTime[index]"></mt-field> -->
                <p>携弹类型：</p>
                <div class="xd">
                    <div v-for="v in value.xd" >
                        <input class="radio" :value="v" v-model="v.isCheck"  type="checkbox" :id="index" />
                        <label :for="index">携弹名称：{{v.air_code}}_{{v.ammo_code}}</label>
                        <input class="xd_number" v-model="v.number" type="number" name="" id="">
                    </div>
                    <!-- <select class="select" v-model="xdType[index]">
                        <option v-if="value.code === v.air_code" v-for="v in airplaneAmmoData.data" :value="v">{{v.air_code}}_{{v.ammo_code}}</option>
                    </select> -->
                </div>
            </div>
        </div>
        <p>输入总人数：</p>
        <input v-model="formData.totalNumber" placeholder="总人数" class="select" type="number">
        <p>默认人数</p>
        <span>{{reckon}}</span>

        <mt-popup
            v-model="popupVisible"
            position="bottom">
            <div class="box">
                <!-- {{newData}} -->
                <p>预览：</p>
                <div v-for="(item,index) in newData">
                    <div v-show="index === 0">
                        <p>计划名称： {{formData.name}}</p>
                        <p>出厂日期： {{formData.dateTime}}</p>
                        <p>总人数： {{formData.totalNumber}}</p>
                        <p>进场时间：{{formData.approachTime}}</p>
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
            <button v-if="planData.confirm !='确认'"  @click="submit()" class="planButton">预览计划</button>
            <button v-if="planData.confirm !='确认'"  @click="confirm()" class="planButton final">最终提交</button>
            <button class="planButton delButton" @click="deletePlan()">删除计划</button>
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
        getPersonnel,
        getPlan,
        getPlanbyID,
        updatePlan,
        deletePlan
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
                    dateTime: this.$util.getUrlKey('dateTime') || '',
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
                plan_id: this.$util.getUrlKey('plan_id'),
                lastIndex: '',
                nowIndex: '',
                airplaneAmmoData: {},
                xdType: [],
                personnelData: {},
                mapLists: {},
                reckon: 0,
                planData: {},
                airLength: 0
            }
        },

        mounted(){
            var day2 = new Date();
            day2.setTime(day2.getTime());
            this.dayTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
            console.log(this.dayTime);
            this.dayTime = this.dayTime.replace(/-/g, '/') // 把所有-转化成/
            let timestamp = new Date(this.dayTime).getTime()
            this.dayTime = timestamp;
            this.initData();
        },
        mixins: [mixin],

        components:{
            alertTip
        },

        computed:{

        },

        methods:{
            async edit() {
                if (this.plan_id) {
                    this.planData = await getPlanbyID(this.plan_id);
                    console.log("plan", this.planData);
                    this.formData.approachTime = this.planData.approachTime;
                    this.formData.dateTime = this.planData.dateTime;
                    this.formData.name = this.planData.name;
                    this.formData.totalNumber = this.planData.totalNumber;
                    // this.air = [true,null,true];
                    console.log("!!!!",this.formData.airSubject);
                    this.planData.airData.forEach(element => {
                        this.airPlaneData.data.forEach((value,index) => {
                            if (element.airName === value.code) {
                                console.log(value.code);
                                this.airPlaneData.data[index].isCheck = !this.airPlaneData.data[index].isCheck;
                                this.airPlaneData.data = Object.assign([],this.airPlaneData.data)
                                this.air[index] = true;
                                this.formData.airSubject[index] = element.airSubject;
                                this.formData.sceneSubject[index] = element.sceneSubject;
                                this.formData.upDownNumber[index] = element.upDownNumber;
                                this.formData.flightTime[index] = element.flightTime;
                                console.log('*****************',this.airPlaneData.data[index].xd);
                                console.log('********',element.xd);
                                // this.airPlaneData.data[index].xd.forEach(ss => {
                                //     if (ss.airplaneAmmo_id === element.)
                                // });
                                return ;
                            }
                        });
                            // this.air.push(false);
                    });
                    console.log("2222222", this.airPlaneData);
                }
            },
            openPicker() {
                this.$refs.picker.open();
            },
            async initData(){
                console.log(this.formData);
                // this.planData = await getPlan();
                this.personnelData = await getPersonnel();
                this.personnelData.data.forEach(element => {
                    if (element.bindAir && element.duty && element.duty === '是') {
                        this.mapLists[element.bindAir] || (this.mapLists[element.bindAir] = []);
                        this.mapLists[element.bindAir].push(element);
                    }
                });
                this.airPlaneData = await getAirplane();
                this.airplaneAmmoData = await getAirplaneAmmo();
                this.airPlaneData.data.forEach(e => {
                    e.isCheck = false;

                    let xd = [];
                    this.airplaneAmmoData.data.forEach(element => {
                        if (element.air_code === e.code) {
                            let data = {
                                isCheck: false,
                                airplaneAmmo_id: element.airplaneAmmo_id,
                                air_code: element.air_code,
                                ammo_code: element.ammo_code,
                                zsm: element.zsm,
                                number: ''
                            };
                            xd.push(data);
                        }
                    });
                    e.xd = xd

                });
                console.log("airplaneairplane", this.airPlaneData);
                this.vehicleData = await getVehicle();
                this.subjectData = await getSubject();
                const config = await getConfig()
                this.fxSubject = config.data[0].subjectModel.split(",");
                this.qxSubject = config.data[0].sceneModel.split(",");
                // if (this.type === 'edit') {
                //     this.formData.name = '计划1';
                //     this.formData.dateTime = '2019-11-05';
                //     this.formData.totalNumber = 12;
                //     this.formData.approachTime = '00:03'
                //     this.airPlaneData.data.forEach((element,index) => {
                //         if (element.code === 'A3') {
                //             this.air[index] = true;
                //         }
                //     });
                // }
                this.edit();
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
                console.log('!!!!!!!!', this.airPlaneData);
                this.newData = [];
                this.air.forEach((element,index) => {
                    console.log(element);
                    console.log(index);
                    if (element) {
                        const data = {
                            // name: this.formData.name,
                            // dateTime: this.formData.dateTime,
                            // totalNumber: this.formData.totalNumber,
                            // approachTime: this.formData.approachTime,
                            airName: this.airPlaneData.data[index].code,
                            airSubject: this.formData.airSubject[index],
                            sceneSubject: this.formData.sceneSubject[index],
                            upDownNumber: this.formData.upDownNumber[index],
                            flightTime: this.formData.flightTime[index],
                            xd: this.airPlaneData.data[index].xd.filter ( item => {return item.isCheck})
                            // isShow: false
                        }
                        this.newData.push(data);
                    }
                });
                console.log(this.newData);
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
                    plan_id: this.plan_id,
                    name: this.formData.name,
                    dateTime: this.formData.dateTime,
                    totalNumber: this.formData.totalNumber,
                    approachTime: this.formData.approachTime,
                    airData: this.newData
                }
                console.log(data);
                if (this.plan_id) {
                    updatePlan(data);
                } else {
                    addPlan(data);
                }
                this.showAlert = true;
                this.alertText = '上报成功';
                this.$router.push('showPlan');
            },
            closeTip() {
                this.showAlert = false;
            },
            bztask() {
                if (this.$util.isAndroid()) {
                    this.$router.push('ensureAdd?device=h5');
                } else {
                    this.$router.push('ensureAdd');
                }
            },
            changeSelect(index,code) {
                // console.log(code);
                let number = 0;
                let arrayNumber = [];
                arrayNumber = this.air;
                arrayNumber = Object.assign([],this.air);
                    // if (element === true) {
                    //     this.airLength ++;
                    //     console.log("222222", this.airLength);
                    // } else if (element === false) {
                    //     this.airLength --;
                    // }
                this.airLength = 0;
                arrayNumber.forEach((element,index) => {
                    console.log(arrayNumber);
                    console.log('循环',index);
                    if (arrayNumber[index] === true) {
                        console.log('增加' );
                        this.airLength ++;
                    }
                    if (element && this.mapLists.hasOwnProperty(this.airPlaneData.data[index].code)) {
                        number +=this.mapLists[this.airPlaneData.data[index].code].length;
                    }
                    // console.log(this.mapLists.hasOwnProperty(this.airPlaneData.data[index].code));
                    // console.log("!!!!", this.mapLists[this.airPlaneData.data[index].code].length);
                    // if (this.mapLists[this.airPlaneData.data[index]] !== undefined) {
                    //     if (element) {
                    //         number +=this.mapLists[this.airPlaneData.data[index].code].length;
                    //     }
                    // }
                });
                console.log(number);
                this.reckon = number;

                // if (!this.lastIndex) {
                //     this.lastIndex = index;
                // } else {
                //     this.formData.airSubject[index] = this.formData.airSubject[this.lastIndex];
                //     this.formData.airSubject = Object.assign([],this.formData.airSubject);
                // }
                // console.log("上一条索引",this.lastIndex);
                this.airPlaneData.data[index].isCheck = !this.airPlaneData.data[index].isCheck;
                this.airPlaneData.data = Object.assign([],this.airPlaneData.data)
                console.log(this.airPlaneData.data);
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
            confirm() {
                const data = {
                    plan_id: this.plan_id,
                    name: this.formData.name,
                    dateTime: this.formData.dateTime,
                    totalNumber: this.formData.totalNumber,
                    approachTime: this.formData.approachTime,
                    airData: this.newData,
                    confirm: '确认'
                }
                if (this.plan_id) {
                    updatePlan(data);
                } else {
                    addPlan(data);
                }
                this.$toast('确认成功,该计划将不能在修改');
                this.$router.push('showPlan');
            },
            deletePlan() {
                deletePlan(this.plan_id);
                this.$toast('删除成功');
                this.$router.push('showPlan');
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        // padding-top: 2.35rem;
        font: 0.6rem/1.75rem "Microsoft YaHei";
        margin: 0 1rem;
        padding-bottom: 6rem;
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
        .delButton {
            margin-top: 10PX;
            width: 100%;
        }
        .final {
            background-color: red;
        }
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
            font-size: 16PX;
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
            p {
                line-height: 20px;
            }
            .radio {
                zoom: 1.5;
                vertical-align: middle;
            }
            label {
                font-size: 18px;
                // vertical-align: super;
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
            .xd_number {
                width: 30px;
                border: 1px solid #e8e8e8;
                vertical-align: super;
                font-size: 18px;
                margin-left: 10px;
                text-align: center;
            }
        }
        .fix {
            position: fixed;
            top: 0px;
            left: 0px;
            background-color: #fff;
            width: 100%;
            z-index: 9999;
            text-align: center;
        }
    }



</style>

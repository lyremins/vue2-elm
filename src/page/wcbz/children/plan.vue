<template>
  	<div class="city_container">
        <p>计划名称：</p>
        <input v-model="formData.name" placeholder="计划名称" class="select" type="text">
        <p>计划日期：</p>
        <mt-field placeholder="请输入出厂日期" type="date" v-model="formData.dateTime"></mt-field>
        <p>输入总人数：</p>
        <input v-model="formData.totalNumber" placeholder="总人数" class="select" type="text">
        <p>输入进场时间：</p>
        <!-- <input v-model="formData.approachTime" placeholder="进场时间" class="select" type="text"> -->
        <mt-field placeholder="请输入进场时间" type="time" v-model="formData.approachTime"></mt-field>
        <!-- <mt-datetime-picker
            ref="picker"
            type="time"
            v-model="formData.approachTime">
        </mt-datetime-picker> -->
        <div class="radioBox" v-for="(value,index) in airPlaneData.data" >
            <input class="radio" :value="value" @change="changeSelect(index)"  v-model="air[index]" type="checkbox" :id="index" />
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
                <input v-model="formData.upDownNumber[index]" placeholder="起落次数" class="select" type="text">
                <p>输入飞行任务时间：</p>
                <input v-model="formData.flightTime[index]" placeholder="飞行任务时间" class="selectTime" type="text"> 小时
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
        <button @click="submit()" class="button">预览计划</button>
        <button @click="bztask()" class="button">创建保障任务</button>
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
        getAirplaneAmmo
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
            }
        },

        mounted(){
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
                console.log(this.formData);
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
                this.airplaneAmmoData = await getAirplaneAmmo();
                if (this.type === 'edit') {
                    this.formData.name = '计划1';
                    this.formData.dateTime = '2019-11-05';
                    this.formData.totalNumber = 12;
                    this.formData.approachTime = '00:03'
                    this.airPlaneData.data.forEach((element,index) => {
                        if (element.code === 'A3') {
                            this.air[index] = true;
                        }
                    });
                }
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
                this.newData = [];
                this.air.forEach((element,index) => {
                    console.log(element);
                    console.log(index);
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
                        // isShow: false
                    }
                    this.newData.push(data);
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
                    name: this.formData.name,
                    dateTime: this.formData.dateTime,
                    totalNumber: this.formData.totalNumber,
                    approachTime: this.formData.approachTime,
                    airData: this.newData
                }
                console.log(data);
                addPlan(data);
                this.showAlert = true;
                this.alertText = '上报成功';
                this.$router.push('showPlan');
            },
            closeTip() {
                this.showAlert = false;
            },
            bztask() {
                if (this.$util.isAndroid()) {
                    this.$router.push('addEnsure?device=h5');
                } else {
                    this.$router.push('addEnsure');
                }
            },
            changeSelect(index) {
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
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        // padding-top: 2.35rem;
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
        .selectTime {
            width: 70%;
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
    }



</style>

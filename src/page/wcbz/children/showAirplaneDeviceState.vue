<template>
    <div class="city_container">
        <!-- <head-top v-show="device !== 'h5'" head-title="飞机-有售器件关联" go-back='true'>
        </head-top> -->
        <!-- <div class="selectBox">

            <span class="seText">选择飞机：</span>
            <select v-model="selectAirplane">
                <option v-for="v in airPlane.data" :value="v.code">{{v.code}}</option>
            </select>
            <button @click="search()" class="search">查询</button>
            <button @click="searchAll()" class="search">查询全部</button>
        </div> -->
        <div>飞行计划类：</div>
            <div>
                <table>
                    <tr>
                        <td>名称</td>
                        <td>总寿命</td>
                        <td>余寿</td>
                        <td>操作</td>
                    </tr>
                    <tr v-if="planNowData.hasOwnProperty(v.air_code)" v-for="v in airPlaneData" >
                        <td>{{v.air_code}}_{{v.device_code}}</td>
                        <td>{{v.zsm}}</td>
                        <td>{{v.sm}} </td>
                        <td><span @click="changeNew(v)" class="changeButton" v-show="v.sm <=0">更换</span></td>
                    </tr>
                </table>
            </div>
        <div>保障任务类：</div>
            <div>
                <table>
                    <tr>
                        <td>名称</td>
                        <td>总寿命</td>
                        <td>余寿</td>
                        <td>操作</td>
                    </tr>
                    <tr v-if="ensureDdd.hasOwnProperty(v.air_code)"  v-for="v in airPlaneData">
                        <td>{{v.air_code}}_{{v.device_code}}</td>
                        <td>{{v.zsm}}</td>
                        <td>{{v.sm}} </td>
                        <td><span @click="changeNew(v)" class="changeButton" v-show="v.sm <=0">更换</span></td>
                    </tr>
                </table>
            </div>
        <div>无任务类：</div>
            <div>
                <table>
                    <tr>
                        <td>名称</td>
                        <td>总寿命</td>
                        <td>余寿</td>
                        <td>操作</td>
                    </tr>
                    <tr v-if="!ensureDdd.hasOwnProperty(v.air_code) && !planNowData.hasOwnProperty(v.air_code) "  v-for="v in airPlaneData">
                        <td>{{v.air_code}}_{{v.device_code}}</td>
                        <td>{{v.zsm}}</td>
                        <td>{{v.sm}} </td>
                        <td><span @click="changeNew(v)" class="changeButton" v-show="v.sm <=0">更换</span></td>
                    </tr>
                </table>
            </div>
        <!-- <img @click="toLocation()" class="icon" src="../../../images/addIcon.png"> -->
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <!-- <foot-guide :device="device"></foot-guide> -->
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {
        getAirplane,
        getAirplaneDevice,
        updateAirplaneDevice,
        getPlan,
        getEnsure
    } from '../../../service/getData';
    import {imgBaseUrl} from 'src/config/env'
    // import footGuide from 'src/components/footer/footer'

    export default {
        data() {
            return {
                formData: {
                    model: '',
                    code: '',
                    type: '',
                    army_id: '',
                    airHour: '',
                    yairHour: '',
                    airUpOrDown: '',
                    yairUpOrDown: '',
                    image_path: '',
                    factory: '',
                    stageUpOrDown: '',
                    engine_1: '',
                    engine_2: '',
                    state: '',
                    task: '',
                    stageUpOrDownTime: '',
                    repairNumber:'',
                    repairFactory:'',
                    unit: ''
                },
                showAlert: false,
                alertText: '',
                stateModel: [],
                taskModel: [],
                organizData: {},
                showOrganiz: false,
                airPlaneData: {},
                deviceData: {},
                checked: false,
                subitem: {
                    isCheck: false
                },
                air: [],
                newData: [],
                device: [],
                airplaneIndex: '',
                device: this.$util.getUrlKey('device'),
                airPlane: {},
                selectAirplane: '',
                oldPlaneData: {},
                planData: {},
                planNowData: [],
                dayTime: '',
                ensureData: {},
                enterEnsureData: [],
                ensureDdd: []
            }
        },

        mounted() {
            this.init();
        },

        components: {
            // headTop,
            // footGuide,
            alertTip,
        },

        computed: {

        },

        methods: {
            closeTip() {
                this.showAlert = false;
            },
            async init() {
                var day2 = new Date();
                day2.setTime(day2.getTime());
                this.dayTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();

                this.airPlaneData = await getAirplaneDevice();
                this.airPlane = await getAirplane();
                this.airPlaneData = this.airPlaneData.data;
                this.oldPlaneData = this.airPlaneData;
                this.planData = await getPlan();
                this.planData.data.forEach(element => {
                    if (this.toTimeStamp(element.dateTime) === this.toTimeStamp(this.dayTime)) {
                        element.airData.forEach(ee => {
                            this.planNowData[ee.airName] || (this.planNowData[ee.airName] = []);
                                this.planNowData[ee.airName].push(ee);
                        });
                    }
                });
                this.planNowData = Object.assign({},this.planNowData)
                console.log(this.planNowData);

                this.ensureData = await getEnsure();
                this.ensureData.data.forEach(element => {
                    if (this.toTimeStamp(element.filed2) === this.toTimeStamp(this.dayTime)) {
                        console.log("element.filed3element.filed3",element.filed3);
                        element.filed3.forEach(e => {
                            if (e.content === '飞行计划保障') {
                                console.log("飞行计划保障",e.plan[0].airData);
                                this.airPlane.data.forEach(aaa => {
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
                console.log(this.ensureDdd);
            },
            selectOrganiz(name) {
                console.log(name);
                this.formData.unit = name;
                this.showOrganiz = false;
            },
            changeSelect(index,type) {
                this.airplaneIndex = index;
                this.airPlaneData.data[index].isCheck = !this.airPlaneData.data[index].isCheck;
                this.airPlaneData.data = Object.assign([],this.airPlaneData.data)
            },
            changeDevice(index,type) {
                this.airPlaneData.data[this.airplaneIndex].device[index].isCheck = !this.airPlaneData.data[this.airplaneIndex].device[index].isCheck;
                this.airPlaneData.data = Object.assign([],this.airPlaneData.data);
                console.log(this.airPlaneData.data);
            },
            changeNew(value) {
                console.log(value);
                const newData = {
                    airplaneDevice_id: value.airplaneDevice_id,
                    sm: value.zsm
                }
                const res = updateAirplaneDevice(newData);
                this.showAlert = true;
                this.alertText = '更换成功';
            },
            search() {
                console.log(this.oldPlaneData);
                this.airPlaneData = this.oldPlaneData.filter(
                    item => item.air_code === this.selectAirplane
                )
                console.log(this.airPlaneData);

            },
            searchAll() {
                this.airPlaneData = this.oldPlaneData;
            },
            toLocation() {
                this.$router.push('airplaneDevice');
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
    .city_container {
        min-height: 700PX;
        // padding-top: 2.35rem;
        font: 0.6rem/1.75rem "Microsoft YaHei";
        margin: 0 1rem;
        button {
            @include sc(.5rem, #fff);
            font-family: Helvetica Neue, Tahoma, Arial;
            padding: .28rem .4rem;
            border: 1px;
            margin-top: 0.5rem;
            background-color: #3792e5;
            // width: 100%;
            margin-bottom: 2rem;
        }
        .profileinfopanel-upload {
            display: block;
            opacity: 0;
            top: 2.35rem;
            left: 0;
            @include wh(100%, 1.1rem);
        }
        .headportrait-div-top {
            @include wh(2rem, 2rem);
            @include borderRadius(50%);
            vertical-align: middle;
        }
        .upload {
            text-align: center;
            img {
                width: 2rem;
                margin-top: 1rem;
            }
        }
        .selcetOrganiz {
            background-color: #eee;
            height: 0.8rem;
            width: 8rem;
            font-size: 0.5rem;
            line-height: 0.8rem;
            padding-left: 0.2rem;
        }
        .showDevice {
            margin-left: 0.5rem;
        }
            table {
                text-align: center;
                border: 1px solid #000;
                border-collapse: collapse;
                font-size: 14PX;
                th {
                    border-collapse: collapse;
                }
                td {
                    border: 1px solid #000;
                    width: 5rem;
                }
                tr {
                    line-height: 0.8rem;
                }
            }
            .changeButton {
                padding: 5px;
                background-color: red;
                color: #fff;
            }
        .seText {
            display: inline-block;
            padding: 0px;
            @include sc(.9rem, #666);
            font-size: 18PX;
        }
        .selectBox {
                        display: flex;
    justify-content: space-between;
    align-items: baseline;
        }
        select {
            width: 3rem;
            height: 1rem;
        }
        .icon {
            position: fixed;
            width: 10%;
            bottom: 10%;
            right: 7%;
        }
    }

    .loginForm {
        background-color: #fff;
        margin-top: .6rem;
        .selectBox {
            select {
                display: inline-block;
                    width: 40%;
                    background-color: #eee;
                    font-size: 0.4rem;
                    padding: 0.5rem;
            }
        }
        .input_container {
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input {
                @include sc(.7rem, #666);
            }
            .right_phone_number {
                background-color: #4cd964;
            }
        }
        .input_container {
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input {
                @include sc(.7rem, #666);
            }
            .right_phone_number {
                background-color: #4cd964;
            }
        }
        .phone_number {
            padding: .3rem .8rem;
        }
        .captcha_code_container {
            height: 2.2rem;
            .img_change_img {
                display: flex;
                align-items: center;
                img {
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img {
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p {
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2) {
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
         .selectOrganiz {
            position: relative;
            display: flex;
            align-items: center;
            .listbox {
                font-size: 0.4rem;
                position: absolute;
                top: 74%;
                left: 26%;
                background-color: #e6e6e6;
                width: 57%;
                line-height: 20PX;
                z-index: 1;
                .l0 ,.l1,.l2 {
                    // padding: 0.2rem;
                    &:hover {
                        background-color: #4c95f5;
                        color: #fff;
                    }
                }
                .l0 {
                    padding-left: 10PX;
                }
                .l1 {
                    padding-left: 20PX;
                }
                .l2 {
                    padding-left: 40PX;
                }
            }
        }
    }
</style>

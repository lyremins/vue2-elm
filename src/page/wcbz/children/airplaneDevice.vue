<template>
    <div class="city_container">
        <head-top head-title="飞机-有售器件关联" go-back='true'>
        </head-top>
        <div class="radioBox" v-for="(value,index) in airPlaneData.data">
        <input class="radio" @change="changeSelect(index,value.isCheck)" v-model="air[index]" type="checkbox" :id="index" />
            <label :for="index">飞机编号：{{value.code}}</label>
            <div class="showDevice" v-show="value.isCheck">
                <div v-for="(v,i) in value.device">
                    <input @change="changeDevice(i,v.isCheck)" class="radio" type="checkbox" :id="i"  />
                    <label :for="i">有售器件编号：{{v.filed1}}</label>
                </div>
            </div>
        </div>
        <button @click="save()">保存信息</button>
        <button @click="show()">查看关联信息</button>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {
        addAirplaneDevice,
        getAirplane,
        getDevice
    } from '../../../service/getData';
    import {imgBaseUrl} from 'src/config/env'
    import footGuide from 'src/components/footer/footer'

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
                airplaneIndex: ''
            }
        },

        mounted() {
            this.init();
        },

        components: {
            headTop,
            alertTip,
            footGuide
        },

        computed: {

        },

        methods: {
            async save() {
                this.newData = [];
                // this.air.forEach((element,index) => {
                //     if (element === true) {
                //         console.log('1111');
                //         data = {
                //             name: this.airPlaneData.data[index].code,
                //         }
                //         console.log(data);
                //     }
                //     this.newData.push(data);
                // });
                this.airPlaneData.data.forEach((elements,index) => {
                    let data = [];
                    if (elements.isCheck) {
                        elements.device.forEach(element => {
                            if (element.isCheck) {
                                let l = {
                                    air_code: elements.code,
                                    device_code:  element.filed1,
                                    zsm:  element.filed6,
                                    sm:  element.filed6,
                                    yz: element.filed7
                                }
                                data.push(l)
                            }
                        });
                        this.newData.push(data);
                    }
                });
                console.log(this.newData);
                // this.newData.forEach(elements => {
                //     elements.forEach(element => {
                //         addAirplaneDevice(element);
                //     });
                // });
                for (let iterator of this.newData) {
                    for (let x of iterator) {
                        const res = await addAirplaneDevice(x);
                        console.log(res);
                    }
                    // const res = await addAirplaneDevice(iterator);
                    // console.log(res);
                }
                    this.showAlert = true;
                    this.alertText = '添加成功';
                // let result = addAirplaneDevice(this.formData);
                // if (result.status == 1) {
                //     this.showAlert = true;
                //     this.alertText = '添加成功';
                //     this.$router.push('/airplane');
                // } else {
                //     this.$message({
                //         type: 'error',
                //         message: result.message
                //     });
                //     this.showAlert = true;
                //     this.alertText = result.message;
                // }
                console.log(result)
            },
            closeTip() {
                this.showAlert = false;
            },
            async init() {
                this.airPlaneData = await getAirplane();
                this.deviceData = await getDevice();
                this.airPlaneData.data.forEach(elements => {
                    elements.isCheck = false;
                    let data = [];
                    this.deviceData.data.forEach(element => {
                        element.isCheck = false;
                        data.push(Object.assign({},element));
                    });
                    elements.device = Object.assign([],data);
                });
                // this.airPlaneData.data.forEach(elements => {
                //     let data = [];
                //     this.deviceData.data.forEach(element => {
                //         elements.push(element);
                //     });
                // });
                console.log(this.airPlaneData.data);
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
                console.log(this.airPlaneData.data[this.airplaneIndex].device[0].isCheck);
                console.log(this.airPlaneData.data[this.airplaneIndex].device[1].isCheck);
                this.airPlaneData.data[this.airplaneIndex].device[index].isCheck = !this.airPlaneData.data[this.airplaneIndex].device[index].isCheck;
                // this.airPlaneData.data = Object.assign([],this.airPlaneData.data);
                console.log(this.airPlaneData.data);
            },
            show() {
                this.$router.push('showAirplaneDevice');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container {
        padding-top: 2.35rem;
        font: 0.6rem/1.75rem "Microsoft YaHei";
        margin: 0 1rem;
        button {
            @include sc(.65rem, #fff);
            font-family: Helvetica Neue, Tahoma, Arial;
            padding: .28rem .4rem;
            border: 1px;
            margin-top: 0.5rem;
            background-color: #3792e5;
            width: 100%;
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
            font-size: 12PX;
            line-height: 0.8rem;
            padding-left: 0.2rem;
        }
        .showDevice {
            margin-left: 40PX;
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
                    font-size: 14PX;
                    padding: 0.5rem;
            }
        }
        .seText {
            display: inline-block;
            padding: .6rem .8rem;
            @include sc(.7rem, #666);
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
                font-size: 12PX;
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

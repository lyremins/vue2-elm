<template>
    <div class="city_container">
        <head-top head-title="添加保障计划" go-back='true'>
        </head-top>
        <form class="loginForm">
            <section class="input_container">
                <input type="text" placeholder="任务名称" name="filed6" v-model="formData.filed6">
            </section>
            <section class="input_container">
                <mt-field label="保障日期" placeholder="保障日期" type="date" v-model="formData.filed1"></mt-field>
            </section>
            <div class="deviceBox">
                <p class="seText">保障类型：</p>
                <select class="select" v-model="formData.filed2">
                    <option v-for="v in bzType" :value="v">{{v}}</option>
                </select>
            </div>
            {{formData}}
            <div class="deviceBox">
                <p class="seText">保障车辆选择：</p>
                <div v-for="v in carList.data" :value="v.name">
                    <input v-model="formData.filed3" :value="v.name"  class="radio" type="checkbox" :id="i"  />
                    <label :for="i">保障车辆：{{v.name}}</label>
                </div>
                <!-- <select class="select" v-model="formData.filed3">
                    <option v-for="v in carList.data" :value="v.name">{{v.name}}</option>
                </select> -->
            </div>
            <div class="deviceBox">
                <p class="seText">人员选择：</p>
                <div v-for="v in bzPerson.data" :value="v.name">
                    <input v-model="formData.filed4" :value="v.user_name"   class="radio" type="checkbox" :id="i"  />
                    <label :for="i">保障人员：{{v.user_name}}</label>
                </div>
                <!-- <p class="seText">保障人员：</p>
                <select class="select" v-model="formData.filed4">
                    <option v-for="v in bzPerson.data" :value="v.user_name">{{v.user_name}}</option>
                </select> -->
            </div>
            <div class="deviceBox">
                <p class="seText">飞行计划：</p>
                <div v-for="v in airPlaneData.data" :value="v.name">
                    <input v-model="formData.filed5" :value="v.code"   class="radio" type="checkbox" :id="i"  />
                    <label :for="i">飞机：{{v.code}}</label>
                </div>
                <!-- <select class="select" v-model="formData.filed5">
                    <option v-for="v in airPlaneData.data" :value="v.code">{{v.code}}</option>
                </select> -->
            </div>
            <div class="deviceBox">
            <p class="seText">输入进场时间：</p>
            <input v-model="formData.filed7" placeholder="进场时间" class="select" type="text">
            </div>
            <div class="deviceBox">
            <p class="seText">输入总人数：</p>
            <input v-model="formData.filed8" placeholder="总人数" class="select" type="text">
            </div>
        </form>
        <button @click="save()">保存信息</button>
        <footGuide></footGuide>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {
        addEnsure,
        getConfig,
        getPersonnel,
        getPlan,
        getVehicle,
        getAirplane
    } from '../../../service/getData';
    import {imgBaseUrl} from 'src/config/env'
    import mixin from '../../../mixin'

    export default {
        data() {
            return {
                formData: {
                    filed1: '',
                    filed2: '',
                    filed3: [],
                    filed4: [],
                    filed5: [],
                    filed6: '',
                    filed7: '',
                    filed8: ''
                },
                showAlert: false,
                alertText: '',
                bzType: [],
                bzCar: [],
                bzPerson: {},
                planData: {},
                carList: {},
                airPlaneData: {}
            }
        },
        mixins: [mixin],

        mounted() {
            this.init();
        },

        components: {
            headTop,
            alertTip
        },

        computed: {

        },

        methods: {
            async save() {
                let result = await addEnsure(this.formData);
                if (result.status == 1) {
                    this.showAlert = true;
                    this.alertText = '添加成功';
                    this.$router.push('/index');
                } else {
                    this.$message({
                        type: 'error',
                        message: result.message
                    });
                    this.showAlert = true;
                    this.alertText = result.message;
                }
                console.log(result)
            },
            closeTip() {
                this.showAlert = false;
            },
            async uploadAvatar() {
                //上传头像
                    let input = document.querySelector('.profileinfopanel-upload')
                    let data = new FormData();
                    data.append('file', input.files[0]);
                    try {
                        let response = await fetch('v1/addimg/ensure', {
                            method: 'POST',
                            credentials: 'include',
                            body: data
                        })
                        let res = await response.json();
                        if (res.status == 1) {
                            this.formData.image_path = res.image_path;
                        }
                    } catch (error) {
                        this.showAlert = true;
                        this.alertText = '上传失败';
                        throw new Error(error);
                    }
            },
            async init() {
                this.airPlaneData = await getAirplane();
                const config = await getConfig()
                this.carList = await getVehicle();
                this.bzType = config.data[0].ensureModel.split(",");
                this.bzCar = config.data[0].carTypeModel.split(",");
                this.bzPerson = await getPersonnel();
                this.planData = await getPlan();
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
        .seText {
            display: inline-block;
            padding: 0 .8rem;
            @include sc(.7rem, #666);
        }
        .selectBox {
            select {
                display: inline-block;
                    width: 60%;
                    background-color: #eee;
                    font-size: 14PX;
                    padding: 0.5rem;
            }
        }
        .deviceBox {
            div {
                padding-left: 40px;
            }
        }
        // .deviceBox {
        //     position: relative;
        //     display: flex;
        //     justify-content: space-between;
        //     align-items: center;
        //     input {
        //         width: 40%;
        //         font-size: 12PX;
        //     }
        // }
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
    }

    .loginForm {
        background-color: #fff;
        margin-top: .6rem;
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
    }
</style>

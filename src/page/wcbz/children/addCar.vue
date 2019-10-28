<template>
    <div class="city_container">
        <head-top head-title="添加车辆" go-back='true'>
        </head-top>
        <form class="loginForm">
            <div class="selectOrganiz">
                <p class="seText">单位：</p>
                <div @click="showOrganiz = !showOrganiz" class="selcetOrganiz">
                    {{formData.organiz}}
                </div>
                <div v-show="showOrganiz" class="listbox">
                    <div class="l0" v-if="v.level === 0" @click="selectOrganiz(v.organizName)"  v-for="v in organizData.data">
                        {{v.organizName}}
                    </div>
                    <div v-for="v in organizData.data">
                        <div class="l1" v-if="v.level === 1" @click="selectOrganiz(v.organizName)">
                            {{v.organizName}}
                        </div>
                        <div class="l2" v-if="v.organiz_id === vv.parentID" @click="selectOrganiz(vv.organizName)"  v-for="vv in organizData.data">
                            {{vv.organizName}}
                        </div>
                    </div>
                </div>
                <!-- <select v-model="formData.organiz">
                    <option v-for="v in organizData.data" :value="v.organizName">{{   v.organizName}}</option>
                </select> -->
            </div>
             <div class="selectBox">
                <p class="seText">选择车辆类型：</p>
                <select class="select" v-model="formData.model">
                    <option v-for="v in carTypeModel" :value="v">{{v}}</option>
                </select>
            </div>
            <section class="input_container">
                <input type="text" placeholder="车辆名称" name="name" v-model="formData.name">
            </section>
            <div class="selectBox">
                <p class="seText">绑定飞机</p>
                <select v-model="formData.service">
                    <option v-for="v in airPlaneData.data" :value="v.code">{{v.code}}</option>
                </select>
            </div>
            <section class="input_container">
                <input type="text" placeholder="出厂号码" name="code" v-model="formData.code">
            </section>
            <section class="input_container">
                <input type="text" placeholder="部队编号" name="armyId" v-model="formData.armyId">
            </section>
            <section class="input_container">
                <input type="text" placeholder="生产厂" name="product" v-model="formData.product">
            </section>
            <section class="input_container">
                <mt-field label="出厂日期" placeholder="请输入生产时间" type="date" v-model="formData.productTime"></mt-field>
            </section>
            <section class="input_container">
                <input type="text" placeholder="总寿命" name="life" v-model="formData.life">
            </section>
            <section class="input_container">
                <input type="text" placeholder="总里程" name="mileage" v-model="formData.mileage">
            </section>
            <section class="input_container">
                <input type="text" placeholder="阶段行驶里程" name="stageCourse" v-model="formData.stageCourse">
            </section>
            <section class="input_container">
                <input type="text" placeholder="大修次数" name="repairNumber" v-model="formData.repairNumber">
            </section>
            <div class="selectBox">
                <p class="seText">选择车辆任务状态：</p>
                <select class="select" v-model="formData.taskState">
                    <option v-for="v in carTaskModel" :value="v">{{v}}</option>
                </select>
            </div>
             <div class="selectBox">
                <p class="seText">选择车辆状态：</p>
                <select class="select" v-model="formData.state">
                    <option v-for="v in carStateModel" :value="v">{{v}}</option>
                </select>
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
        addVehicle,
        getConfig,
        getOrganiz,
        getAirplane
    } from '../../../service/getData';
    import {imgBaseUrl} from 'src/config/env'
    import mixin from '../../../mixin'

    export default {
        data() {
            return {
                formData: {
                    model: '',
                    name: '',
                    code: '',
                    state: '',
                    organiz: '',
                    service: '',
                    armyId: '',
                    product: '',
                    productTime: '',
                    life: '',
                    stageCourse: '',
                    repairNumber: '',
                    taskState: '',
                    state: '',
                    mileage: ''
                },
                showAlert: false,
                alertText: '',
                carStateModel: '',
                carTaskModel: '',
                organizData: {}, // 组织架构
                airPlaneData: {},
                showOrganiz: false,
                carTypeModel: ''
            }
        },
        mixins: [mixin],

        mounted() {
            this.initData();
        },

        components: {
            headTop,
            alertTip
        },

        computed: {

        },

        methods: {
            async save() {
                let result = await addVehicle(this.formData);
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
            async initData() {
                const config = await getConfig()
                this.organizData = await getOrganiz();
                this.airPlaneData = await getAirplane();
                this.carStateModel = config.data[0].carStateModel.split(",");
                this.carTaskModel = config.data[0].carTaskModel.split(",");
                this.carTypeModel = config.data[0].carTypeModel.split(",");
            },
            selectOrganiz(name) {
                console.log(name);
                this.formData.organiz = name;
                this.showOrganiz = false;
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
        .selcetOrganiz {
            background-color: #eee;
            height: 0.8rem;
            width: 8rem;
            font-size: 12PX;
            line-height: 0.8rem;
            padding-left: 0.2rem;
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
        .seText {
            display: inline-block;
            padding: .6rem .8rem;
            @include sc(.7rem, #666);
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

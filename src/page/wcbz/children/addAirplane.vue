<template>
    <div class="city_container">
        <head-top head-title="添加飞机" go-back='true'>
        </head-top>
        <form class="loginForm">
            <section class="input_container">
                <input type="text" placeholder="机型" name="type" v-model="formData.type">
            </section>
            <section class="input_container">
                <input type="text" placeholder="飞机型号" name="model" v-model="formData.model">
            </section>
            <section class="input_container">
                <input type="text" placeholder="出厂号码" name="code" v-model="formData.code">
            </section>
            <section class="input_container">
                <input type="text" placeholder="部队编号" name="army_id" v-model="formData.army_id">
            </section>
            <div class="selectOrganiz">
                <p class="seText">所属单位：</p>
                <div @click="showOrganiz = !showOrganiz" class="selcetOrganiz">
                    {{formData.unit}}
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
            </div>
            <section class="input_container">
                <input type="text" placeholder="制造厂" name="factory" v-model="formData.factory">
            </section>
            <section class="input_container">
                <mt-field label="出厂日期" placeholder="请输入出厂日期" type="date" v-model="formData.date"></mt-field>
            </section>
            <section class="input_container">
                <input type="text" placeholder="总飞行小时" name="airHour" v-model="formData.airHour ">
            </section>
            <section class="input_container">
                <input type="text" placeholder="已飞行小时" name="yairHour" v-model="formData.yairHour ">
            </section>
            <section class="input_container">
                <input type="text" placeholder="总飞行起落" name="airUpOrDown" v-model="formData.airUpOrDown">
            </section>
            <section class="input_container">
                <input type="text" placeholder="已飞行起落" name="yairUpOrDown" v-model="formData.yairUpOrDown">
            </section>
            <section class="input_container">
                <input type="text" placeholder="阶段飞行小时" name="stageUpOrDownTime" v-model="formData.stageUpOrDownTime">
            </section>
            <section class="input_container">
                <input type="text" placeholder="阶段起落" name="stageUpOrDown" v-model="formData.stageUpOrDown">
            </section>
            <section class="input_container">
                <input type="text" placeholder="发动机1小时数" name="engine_1" v-model="formData.engine_1">
            </section>
            <section class="input_container">
                <input type="text" placeholder="发动机2小时数" name="engine_2" v-model="formData.engine_2">
            </section>
            <section class="input_container">
                <input type="text" placeholder="大修次数" name="repairNumber" v-model="formData.repairNumber">
            </section>
            <section class="input_container">
                <input type="text" placeholder="大修厂" name="repairFactory" v-model="formData.repairFactory">
            </section>
            <div class="selectBox">
                <p class="seText">选择飞机状态态势：</p>
                <select class="select" v-model="formData.state">
                    <option v-for="v in stateModel" :value="v">{{v}}</option>
                </select>
            </div>
            <div class="selectBox">
                <p class="seText">选择飞机任务态势：</p>
                <select class="select" v-model="formData.task">
                    <option v-for="v in taskModel" :value="v">{{v}}</option>
                </select>
            </div>
            <div class="upload">
                <img v-if="!formData.image_path" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569644026025&di=1b75af64541d4926c106ef20821432fc&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F21%2F02%2F16pic_2102530_b.jpg" alt="">
                <img v-else :src="'img/'+formData.image_path" alt="">
            </div>
            <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
        </form>
        <button @click="save()">保存信息</button>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {
        addAirplane,
        getConfig,
        getOrganiz
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
                showOrganiz: false
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
                console.log(this.formData)
                let result = await addAirplane(this.formData);
                if (result.status == 1) {
                    this.showAlert = true;
                    this.alertText = '添加成功';
                    this.$router.push('/airplane');
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
                        let response = await fetch('v1/addimg/airplane', {
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
                const config = await getConfig()
                this.organizData = await getOrganiz();
                this.stateModel = config.data[0].stateModel.split(",");
                this.taskModel = config.data[0].taskModel.split(",");
            },
            selectOrganiz(name) {
                console.log(name);
                this.formData.unit = name;
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

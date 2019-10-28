<template>
    <div class="city_container">
        <head-top head-title="添加器件" go-back='true'>
        </head-top>
        <form class="loginForm">
            <section class="input_container">
                <input type="text" placeholder="机器名称" name="filed1" v-model="formData.filed1">
            </section>
            <section class="input_container">
                <input type="text" placeholder="型号" name="filed2" v-model="formData.filed2">
            </section>
            <section class="input_container">
                <input type="text" placeholder="机型" name="filed12" v-model="formData.filed12">
            </section>
            <section class="input_container">
                <input type="text" placeholder="制造厂" name="filed3" v-model="formData.filed3">
            </section>
            <section class="input_container">
                <input type="text" placeholder="总日历寿命" name="filed4" v-model="formData.filed4 ">
            </section>
            <section class="input_container">
                <input type="text" placeholder="总小时寿命" name="filed5" v-model="formData.filed5">
            </section>
            <section class="input_container">
                <input type="text" placeholder="总起落寿命" name="filed6" v-model="formData.filed6">
            </section>
            <section class="input_container">
                <input type="text" placeholder="报警阈值" name="filed7" v-model="formData.filed7">
            </section>
            <div class="selectBox">
                <p class="seText">绑定飞机</p>
                <select v-model="formData.filed8">
                    <option v-for="v in airPlaneData.data" :value="v.model">{{v.model}}</option>
                </select>
            </div>
            <section class="input_container">
                <mt-field label="装机日期" placeholder="装机日期" type="date" v-model="formData.filed9"></mt-field>
            </section>
            <section class="input_container">
                <input type="text" placeholder="飞行小时" name="filed10" v-model="formData.filed10">
            </section>
             <section class="input_container">
                <input type="text" placeholder="装机寿命" name="filed11" v-model="formData.filed11">
            </section>
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
        addDevice,
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
                    filed3: '',
                    filed4: '',
                    filed5: '',
                    filed6: '',
                    filed7: '',
                    filed8: '',
                    filed9: '',
                    filed10: '',
                    filed11: '',
                    filed12: ''
                },
                showAlert: false,
                alertText: '',
                airPlaneData: {}
            }
        },
        mixins: [mixin],

        mounted() {
            this.init()
        },

        components: {
            headTop,
            alertTip
        },

        computed: {

        },

        methods: {
            async save() {
                let result = await addDevice(this.formData);
                if (result.status == 1) {
                    this.showAlert = true;
                    this.alertText = '添加成功';
                    this.$router.push('/device');
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
                this.airPlaneData = await getAirplane()
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
            margin-bottom: 2rem;
            background-color: #3792e5;
            width: 100%;
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
    }

    .loginForm {
        background-color: #fff;
        margin-top: .6rem;
        .selectBox {
            select {
                display: inline-block;
                    width: 60%;
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

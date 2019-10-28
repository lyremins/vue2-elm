<template>
    <div class="city_container">
        <head-top head-title="添加机务人员" go-back='true'>
        </head-top>
        <form class="loginForm">
            <section class="input_container">
                <input type="text" placeholder="姓名" name="user_name" v-model="formData.user_name">
            </section>
            <section class="input_container">
                <input type="text" placeholder="性别" name="sex" v-model="formData.sex">
            </section>
            <section class="input_container">
                <input type="text" placeholder="分队" name="detachment" v-model="formData.detachment">
            </section>
            <section class="input_container">
                <input type="text" placeholder="职务" name="type" v-model="formData.type">
            </section>
            <section class="input_container">
                <input type="text" placeholder="联系方式" name="phone" v-model="formData.phone">
            </section>
            <!-- <section class="input_container">
                <input type="text" placeholder="创建时间" name="create_time" v-model="formData.create_time">
            </section> -->
            <!-- <section class="input_container">
                <input type="text" placeholder="备注" name="remark" v-model="formData.remark">
            </section> -->
            <section class="input_container">
                <input type="text" placeholder="籍贯" name="native" v-model="formData.native">
            </section>
            <!-- <section class="input_container">
                <input type="text" placeholder="单位" name="company" v-model="formData.company">
            </section> -->
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
                <p class="seText">专业</p>
                <select v-model="formData.major">
                    <option v-for="v in configData" :value="v">{{v}}</option>
                </select>
            </div>
            <section class="input_container">
                <input type="text" placeholder="等级" name="grade" v-model="formData.grade">
            </section>
            <div class="selectBox">
                <p class="seText">绑定飞机</p>
                <select v-model="formData.bindAir">
                    <option v-for="v in airPlaneData.data" :value="v.code">{{v.code}}</option>
                </select>
            </div>
            <section class="input_container">
                <mt-field label="入伍时间" placeholder="请输入入伍时间" type="date" v-model="formData.enlist"></mt-field>
            </section>
            <section class="input_container">
                <input type="text" placeholder="毕业院校" name="school" v-model="formData.school">
            </section>
            <section class="input_container">
                <input type="text" placeholder="执行重大任务" name="greatTask" v-model="formData.greatTask">
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
    import { addPersonnel,getOrganiz,getAirplane,getConfig } from '../../../service/getData';
    import mixin from '../../../mixin'

    export default {
        data() {
            return {
                formData: {
                    user_name: '',
                    sex: '',
                    detachment: '',
                    type: '',
                    phone: '',
                    create_time: '',
                    remark: '',
                    organiz: '',
                    native: '',
                    company: '',
                    row: '',
                    post: '',
                    major: '',
                    grade: '',
                    bindAir: '',
                    enlist: '',
                    school: '',
                    greatTask: '',
                },
                showAlert: false,
                alertText: '',
                organizData: {},
                airPlaneData: {},
                configData: {},
                showOrganiz: false
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
                console.log(this.formData);
                let result = await addPersonnel(this.formData);
                if (result.status == 1) {
                    this.showAlert = true;
                    this.alertText = '添加成功';
                    this.$router.push('/persons');
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
            closeTip(){
                this.showAlert = false;
            },
            async init() {
                this.organizData = await getOrganiz();
                this.airPlaneData = await getAirplane();
                this.configData = await getConfig();
                this.configData = this.configData.data[0].pMajorModel.split(',');
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
    }

    .loginForm {
        background-color: #fff;
        margin-top: .6rem;
        .selectBox {
            display: flex;
            align-items: center;
            select {
                display: inline-block;
                width: 60%;
                background-color: #eee;
                font-size: 14PX;
                padding: 0.5rem;
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

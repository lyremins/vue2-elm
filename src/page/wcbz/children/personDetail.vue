<template>
  	<div class="city_container">
        <head-top head-title="人员详情" go-back='true'>

        </head-top> 
        <p>姓名：<input type="text" v-model="formData.user_name"></p>
        <p>性别：<input type="text" v-model="formData.sex"></p>
        <p>分队：<input type="text" v-model="formData.detachment"></p>
        <p>联系方式：<input type="text" v-model="formData.phone"></p>
        <p>单位：<input type="text" v-model="formData.organiz"></p>
        <p>籍贯：<input type="text" v-model="formData.native"></p>
        <p>专业：<input type="text" v-model="formData.major"></p>
        <p>等级：<input type="text" v-model="formData.grade"></p>
        <p style="">绑定飞机：{{formData.bindAir}}</p>
        <p style="">入伍时间：<input type="text" v-model="formData.enlist"></p>
        <p style="">毕业院校：<input type="text" v-model="formData.school"></p>
        <p style="">重大任务：<input type="text" v-model="formData.greatTask"></p>

        <button @click="submit()" class="button">修改人员信息</button>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getPersonnelById,updatePersonnel } from '../../../service/getData';
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                PersonnelData: {},
                PersonnelCount: 0,
                imgBaseUrl: '/img/',
                formData: {
                    user_name: '',
                    sex: '',
                    detachment: '',
                    type: '',
                    phone: '',
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
            }
        },

        mounted(){
            this.initData();
        },
        mixins: [mixin],

        components:{
            headTop
        },

        computed:{

        },

        methods:{
            async initData(){
                console.log(this.$route.query.id);
                this.PersonnelData = await getPersonnelById(this.$route.query.id);
                this.formData = this.PersonnelData;
                console.log(this.formData.type);
            },
            async submit() {
                console.log(this.formData);
                const res = await updatePersonnel(this.formData);
                if (res.status === 1 ) {
                    this.$toast('修改成功');
                    this.initData();
                } else {
                    this.$toast('修改失败');
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        padding-top: 2.35rem;
        font: 0.6rem/1.75rem "Microsoft YaHei";
        margin: 0 1rem;
        input {
            font-size: 16PX;
        }
        .button {
            background-color: #3190e8;
            color: #fff;
            padding: 0.5rem;
            width: 100%;
            margin-top: 0.6rem;
            margin-bottom: 2rem;
        }
    }



</style>

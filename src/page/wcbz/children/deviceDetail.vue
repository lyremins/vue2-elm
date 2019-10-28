<template>
  	<div class="city_container">
        <head-top head-title="有寿器件详情" go-back='true'>

        </head-top> 
        <p>名称：<input type="text" v-model="formData.filed1"></p>
        <p>型号：<input type="text" v-model="formData.filed2"></p>
        <p>机型：<input type="text" v-model="formData.filed12"></p>
        <p>制造厂：<input type="text" v-model="formData.filed3"></p>
        <p>总日历：<input type="text" v-model="formData.filed4"></p>
        <p>总小时寿命：<input type="text" v-model="formData.filed5"></p>
        <p>总起落：<input type="text" v-model="formData.filed6"></p>
        <p>阈值：<input type="text" v-model="formData.filed7"></p>
        <p>飞机号：{{formData.filed8}}</p>
        <p>装机日期：{{formData.filed9}}</p>
        <p>飞行小时：<input type="text" v-model="formData.filed10"></p>
        <p>装机寿命：<input type="text" v-model="formData.filed11"></p>


        <button @click="submit()" class="button">修改有寿器件</button>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getDeviceById,updateDevice } from '../../../service/getData';
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                DeviceData: {},
                DeviceCount: 0,
                imgBaseUrl: '/img/',
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
                this.DeviceData = await getDeviceById(this.$route.query.id);
                this.formData = this.DeviceData;
                console.log(this.formData.type);
            },
            async submit() {
                console.log(this.formData);
                const res = await updateDevice(this.formData);
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

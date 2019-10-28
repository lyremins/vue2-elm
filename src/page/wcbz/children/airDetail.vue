<template>
  	<div class="city_container">
        <head-top head-title="飞机详情" go-back='true'>

        </head-top>
        <img :src="imgBaseUrl + airPlaneData.image_path" width="50" height="50" style="padding-top: 20px;overflow: hidden">  
        <p>机型：<input type="text" v-model="formData.type"></p>
        <p>飞机型号：<input type="text" v-model="formData.model"></p>
        <p>出厂号码：<input type ="text" v-model="formData.code"></p>
        <p>部队编号：<input type ="text" v-model="formData.army_id"></p>
        <p>单位：<input type ="text" v-model="formData.unit"></p>
        <p>生产厂家：<input type ="text" v-model="formData.factory"></p>
        <p>生产时间：{{airPlaneData.date}}</p>
        <p>最后操作时间：{{airPlaneData.create_time}}</p>
        <p>总飞行小时：<input type ="text" v-model="formData.airHour"></p>
        <p>已飞行小时：<input type ="text" v-model="formData.yairHour"></p>
        <p>总飞行起落：<input type ="text" v-model="formData.airUpOrDown"></p>
        <p>已飞行起落：<input type ="text" v-model="formData.yairUpOrDown"></p>
        <p>大修次数：<input type ="text" v-model="formData.repairFactory"></p>
        <p>大修厂<input type ="text" v-model="formData.repairNumber"></p>
        <p>阶段飞行小时：<input type ="text" v-model="formData.stageUpOrDownTime"></p>
        <p>发动机1小时数：<input type ="text" v-model="formData.engine_1"></p>
        <p>发动机2小时数：<input type ="text" v-model="formData.engine_2"></p>
        <p>飞机状态：{{airPlaneData.state}}</p>
        <p>任务状态：{{airPlaneData.task}}</p>
        <!-- <router-link to="addAirplane">
            <button class="button">添加飞机信息</button>
        </router-link> -->
        <button @click="submit()" class="button">修改飞机信息</button>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getAirplaneById,updateAirplane } from '../../../service/getData';
    import SheetList from 'src/components/common/SheetListAir.vue'
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                airPlaneData: {},
                airPlaneCount: 0,
                imgBaseUrl: '/img/',
                formData: {
                    model: '',
                    code: '',
                    type: '',
                    army_id: '',
                    airHour: '',
                    airUpOrDown: '',
                    image_path: '',
                    factory: '',
                    stageUpOrDown: '',
                    engine_1: '',
                    engine_2: '',
                    state: '',
                    task: '',
                    stageUpOrDownTime: '',
                    repairNumber:'',
                    unit: ''
                },
                newFormData: {}
            }
        },

        mounted(){
            this.initData();
        },
        mixins: [mixin],

        components:{
            headTop,
            SheetList
        },

        computed:{

        },

        methods:{
            async initData(){
                console.log(this.$route.query.id);
                this.airPlaneData = await getAirplaneById(this.$route.query.id);
                this.formData = this.airPlaneData;
                console.log(this.formData.type);
            },
            async submit() {
                console.log(this.formData);
                const res = await updateAirplane(this.formData);
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

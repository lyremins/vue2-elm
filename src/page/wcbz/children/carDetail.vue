<template>
  	<div class="city_container">
        <head-top head-title="飞机详情" go-back='true'>

        </head-top> 
        <p>型号：{{formData.model}}</p>
        <p>名称：<input type="text" v-model="formData.name"></p>
        <p>状态：{{formData.state}}</p>
        <p>任务状态：{{formData.taskState}}</p>
        <p>服务机型：{{formData.service}}</p>
        <p>出厂号码：<input type="text" v-model="formData.code"></p>
        <p>部队编号：<input type="text" v-model="formData.armyId"></p>
        <p>生产厂：<input type="text" v-model="formData.product"></p>
        <p>总寿命：<input type="text" v-model="formData.life"></p>
        <p>阶段行驶里程：<input type="text" v-model="formData.stageCourse"></p>
        <p>大修次数：<input type="text" v-model="formData.repairNumber"></p>

        <!-- <router-link to="addVehicle">
            <button class="button">添加飞机信息</button>
        </router-link> -->
        <button @click="submit()" class="button">修改车辆信息</button>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getVehicleById,updateVehicle } from '../../../service/getData';
    import SheetList from '../../../components/common/SheetListAir.vue'
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                VehicleData: {},
                VehicleCount: 0,
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
                this.VehicleData = await getVehicleById(this.$route.query.id);
                this.formData = this.VehicleData;
                console.log(this.formData.type);
            },
            async submit() {
                console.log(this.formData);
                const res = await updateVehicle(this.formData);
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

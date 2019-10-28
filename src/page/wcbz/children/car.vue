<template>
  	<div class="city_container">
        <head-top head-title="车辆管理" go-back='true'>

        </head-top>
        车辆数量:{{deviceCount.count}}
        <SheetList v-for="(item,index) in deviceData.data" :item="item"></SheetList>
        <router-link to="addCar">
            <button class="button">添加车辆</button>
        </router-link>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getVehicle,getVehicleCount } from '../../../service/getData';
    import SheetList from 'src/components/common/SheetListCar.vue'
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                deviceData: {},
                deviceCount: 0
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
                this.deviceCount = await getVehicleCount();
                this.deviceData = await getVehicle();
                console.log(this.deviceData);
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

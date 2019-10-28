<template>
  	<div class="city_container">
        <head-top head-title="飞机管理" go-back='true'>

        </head-top>
        飞机数量:{{airPlaneCount.count}}
        <SheetList v-for="(item,index) in airPlaneData.data" :item="item"></SheetList>
        <router-link to="addAirplane">
            <button class="button">添加飞机信息</button>
        </router-link>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getAirplane,getAirplaneCount } from '../../../service/getData';
    import SheetList from '../../../components/common/SheetListAir.vue'
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                airPlaneData: {},
                airPlaneCount: 0
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
                this.airPlaneCount = await getAirplaneCount();
                this.airPlaneData = await getAirplane();
                console.log(this.airPlaneData);
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
        }
    }



</style>

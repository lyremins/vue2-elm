<template>
  	<div class="city_container">
        <head-top head-title="查看飞行计划" go-back='true'>

        </head-top>
        <SheetList v-for="(item,index) in airPlaneData.data" :item="item"></SheetList>
        <router-link to="plan">
            <button class="button">添加飞行计划</button>
        </router-link>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getPlan } from '../../../service/getData';
    import SheetList from '../../../components/common/SheetListPlan.vue'
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

        components:{
            headTop,
            SheetList
        },

        computed:{

        },
        mixins: [mixin],

        methods:{
            async initData(){
                this.airPlaneData = await getPlan();
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

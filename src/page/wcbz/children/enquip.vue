<template>
  	<div class="city_container">
        <head-top head-title="装备管理" go-back='true'>

        </head-top>
        装备数量:{{deviceCount.count}}
        <SheetList v-for="(item,index) in deviceData.data" :item="item"></SheetList>
        <router-link to="addDevice">
            <button class="button">添加装备信息</button>
        </router-link>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getDevice,getDeviceCount } from '../../../service/getData';
    import SheetList from '../../../components/common/SheetListEquip.vue'
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

        components:{
            headTop,
            SheetList
        },

        computed:{

        },
        mixins: [mixin],

        methods:{
            async initData(){
                this.deviceCount = await getDeviceCount();
                this.deviceData = await getDevice();
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
        }
    }



</style>

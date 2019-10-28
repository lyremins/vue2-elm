<template>
  	<div class="city_container">
        <head-top head-title="弹药管理" go-back='true'>

        </head-top>
        <SheetList v-for="(item,index) in AmmoData.data" :item="item"></SheetList>
        <router-link to="addAmmo">
            <button class="button">添加弹药信息</button>
        </router-link>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getAmmo,getAmmoCount } from '../../../service/getData';
    import SheetList from 'src/components/common/SheetListAmmo.vue'
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                AmmoData: {},
                AmmoCount: 0
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
                this.AmmoCount = await getAmmoCount();
                this.AmmoData = await getAmmo();
                console.log(this.AmmoData);
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

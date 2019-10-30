<template>
  	<div class="city_container">
        <head-top v-show="device !== 'h5'" head-title="保障管理" go-back='true'>

        </head-top>
        <SheetList v-for="(item,index) in ensureData.data" :item="item"></SheetList>
            <button @click="toAddEnsure()"  class="button">添加保障信息</button>
        <footGuide :device="device"></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getEnsure,getEnsureCount } from '../../../service/getData';
    import SheetList from '../../../components/common/sheetListEnsure.vue'
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                ensureData: {},
                ensureCount: 0,
                device: this.$util.getUrlKey('device')
            }
        },

        mounted(){
            this.initData();
        },

        components:{
            headTop,
            SheetList
        },
        mixins: [mixin],

        computed:{

        },

        methods:{
            async initData(){
                this.ensureCount = await getEnsureCount();
                this.ensureData = await getEnsure();
                console.log(this.ensureData);
            },
            toAddEnsure() {
                console.log(this.$util.isAndroid());
                if (this.$util.isAndroid()) {
                    this.$router.push('addEnsure?device=h5');
                } else {
                    this.$router.push('addEnsure');
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
        .button {
            background-color: #3190e8;
            color: #fff;
            padding: 0.5rem;
            width: 100%;
            margin-top: 0.6rem;
        }
    }



</style>

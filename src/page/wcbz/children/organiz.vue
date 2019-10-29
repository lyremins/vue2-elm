<template>
  	<div class="city_container">
        <head-top v-show="device !== 'h5'" head-title="组织架构管理" go-back='true'>

        </head-top>
        <div class="list" v-for="v in organizData.data">
            <div class="l1" @click="showChild1 = !showChild1" v-if="v.level === 0">
               {{v.organizName}}
            </div>
            <div v-show="showChild1">
                <div @click="showChild2 = !showChild2" class="l1" v-if="v.level === 1">
                    {{v.organizName}}
                </div>
                <div v-show="showChild2">
                    <div  class="l2"  v-for="vv in organizData.data" v-if="v.organiz_id === vv.parentID">
                        {{vv.organizName}}
                    </div>
                </div>
                <!-- <div v-show="showChild2">
                    <div @click="showChild3 = !showChild3" class="l2" v-if="v.level === 2">
                        {{v.organizName}}
                    </div>
                    <div v-show="showChild3">
                        <div class="l3" v-if="v.level === 3">
                            {{v.organizName}}
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <footGuide :device="device"></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getOrganiz } from '../../../service/getData';
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                organizData: {},
                showChild1: false,
                showChild2: true,
                showChild3: true,
                device: this.$util.getUrlKey('device')

            }
        },

        mounted(){
            this.initData();
        },

        components:{
            headTop
        },

        computed:{

        },
        mixins: [mixin],

        methods:{
            async initData(){
                this.organizData = await getOrganiz();
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
        .l1 {
            margin-left: 0.5rem;
            cursor: pointer;
        }
        .l2 {
            margin-left: 1.2rem;
            cursor: pointer;
        }
        .l3 {
            margin-left: 1.5rem;
            cursor: pointer;
        }
        .list {
            background-color: #fff;
            border-bottom: 1px solid #e6e6e6;
        }
    }



</style>

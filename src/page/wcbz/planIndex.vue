<template>
  	<div class="city_container">
        <head-top head-title="保障管理" go-back='true'>

        </head-top>
        <div class="box">
            <section v-for="(value,index) in showDatas" :key="index">
                <!-- <p class="title">{{titleMap[index]}}</p> -->
                <div class="box">
                    <section class="list" v-for="vv in value">
                        <router-link :to="vv.link">
                            <i class="fa" :class="['fa-'+vv.icon,vv.icon]" aria-hidden="true"></i>
                            <p>{{vv.name}}</p>
                        </router-link>
                    </section>
                </div>
            </section>
        </div>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import 'src/style/css/font-awesome.min.css'
    import headTop from 'src/components/header/head'
    import mixin from '../../mixin'

    export default {
    	data(){
            return{
                showDatas: {
                    plan: {
                        // plan: {
                        //     name: '创建飞行任务',
                        //     icon: 'flask',
                        //     link: 'plan'
                        // },
                        addPlan: {
                            name: '飞行计划',
                            icon: 'fire',
                            link: 'showPlan'
                        },
                        guarantee: {
                            name: '保障任务',
                            icon: 'shield',
                            link: 'ensure'
                        },
                    },
                },
                icon: 'plane',
                titleMap: {
                    'plan': '飞行保障任务',
                    'situation': '综合态势',
                    'state': '数据上报',
                    'admin': '基础数据管理',
                    'analy': '数据分析',
                    'chat': '沟通'
                }
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
            initData(){

            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        padding-top: 2.35rem;
        .box {
            display: flex;
            // justify-content: space-between;
            flex-direction: row;
            flex-wrap: wrap;
            margin: 0.5rem;
            .list {
                margin: 0.4rem;
                text-align: center;
                font-size: 32PX;
            }
        }
    }
    .title {
        font-size: 14PX;
        margin: 0.3rem;
    }
    .fa {
        font-size: 60PX;
    }
    .plane {
        color: #1daaf1;
    }
    .list-alt {
        color: #FF9800;
    }
    .shield {
        color: #19C594;
    }
    .bell {
        color: #F1745E
    }
    .road {
        color: #5F97F4;
    }
    .television {
        color: #9C89B9;
    }
    .bookmark {
        color: #8BC34A;
    }
    .line-chart {
        color: #50AAF0
    }
    .comment {
        color: #9C89B9;
    }
    .fire {
        color: red;
    }
    .flask {
        color: blue;
    }
    .filter {
        color:#9C89B9;
    }
    .exchange {
        color: #F1745E;
    }
    .car {
        color: #8BC34A;
    }


</style>

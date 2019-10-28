<template>
  	<div class="city_container">
        <head-top head-title="基础数据管理" go-back='true'>

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

                    admin: {
                        airplane: {
                            name: '飞机管理',
                            icon: 'plane',
                            link: 'airplane'
                        },
                        person: {
                            name: '机务人员',
                            icon: 'list-alt',
                            link: 'persons'
                        },
                        device: {
                            name: '有寿器件',
                            icon: 'road',
                            link: 'device'
                        },
                        status: {
                            name: '状态管理',
                            icon: 'television',
                            link: 'config'
                        },
                        car: {
                            name: '车辆管理',
                            icon: 'car',
                            link: 'car'
                        },
                        ammo: {
                            name: '弹药管理',
                            icon: 'ravelry',
                            link: 'ammo'
                        },
                        organiz: {
                            name: '组织机构',
                            icon: 'asterisk',
                            link: 'organiz'
                        },
                        airDevice: {
                            name: '飞机-有寿器件',
                            icon: 'ravelry',
                            link: 'airplaneDevice'
                        },
                        airCar: {
                            name: '飞机-保障车辆',
                            icon: 'ravelry',
                            link: 'airplaneCar'
                        },
                        airAmmo: {
                            name: '飞机-弹药',
                            icon: 'ravelry',
                            link: 'airplaneAmmo'
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
        mixins: [mixin],

        components:{
            headTop
        },

        computed:{

        },

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
                font-size: 22PX;
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

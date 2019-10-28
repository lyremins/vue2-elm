<template>
  	<div class="city_container">
        <head-top head-title="外场保障指挥管理系统" go-back='true'>

        </head-top>
        <div class="topBg">

        </div>
        <div class="box">
            <section class="boxList" v-for="(value,index) in showDatas" :key="index">
                <!-- <p class="title">{{titleMap[index]}}</p> -->
                <div class="box">
                    <section class="list" v-for="vv in value">
                        <router-link :to="vv.link" v-if="vv.name !== '即时通讯'">
                            <i class="fa" :class="['fa-'+vv.icon,vv.icon]" aria-hidden="true"></i>
                            <p>{{vv.name}}</p>
                        </router-link>
                        <div v-else @click="toChat(vv.link)">
                            <i class="fa" :class="['fa-'+vv.icon,vv.icon]" aria-hidden="true"></i>
                            <p>{{vv.name}}</p>
                        </div>
                    </section>
                </div>
            </section>
        </div>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import 'src/style/css/font-awesome.min.css'
    import headTop from 'src/components/header/head'
    import footGuide from 'src/components/footer/footer'

    export default {
    	data(){
            return{
                showDatas: {
                    situation: {
                        situation: {
                            name: '综合态势',
                            icon: 'filter',
                            link: 'situation'
                        },
                    },
                    state: {
                        state: {
                            name: '状态上报',
                            icon: 'exchange',
                            link: 'state'
                        },
                    },
                    plan: {
                        // plan: {
                        //     name: '创建飞行任务',
                        //     icon: 'flask',
                        //     link: 'plan'
                        // },
                        addPlan: {
                            name: '保障计划',
                            icon: 'fire',
                            link: 'planIndex'
                        },
                        // guarantee: {
                        //     name: '保障任务',
                        //     icon: 'shield',
                        //     link: 'ensure'
                        // },
                    },
                    admin: {
                        airplane: {
                            name: '数据管理',
                            icon: 'plane',
                            link: 'data'
                        },
                        // person: {
                        //     name: '机务人员',
                        //     icon: 'list-alt',
                        //     link: 'persons'
                        // },
                        // equip: {
                        //     name: '装备管理',
                        //     icon: 'bell',
                        //     link: 'enquip'
                        // },
                        // device: {
                        //     name: '有寿器件',
                        //     icon: 'road',
                        //     link: 'device'
                        // },
                        // status: {
                        //     name: '状态管理',
                        //     icon: 'television',
                        //     link: 'config'
                        // },
                        // car: {
                        //     name: '车辆管理',
                        //     icon: 'car',
                        //     link: 'car'
                        // }
                    },
                    chat: {
                        chat: {
                            name: '即时通讯',
                            icon: 'comment',
                            link: 'http://172.20.10.4:2001/webdemo/h5/index.html#'
                        }
                    },
                    data: {
                        data: {
                            name: '数据分析',
                            icon: 'line-chart',
                            link: ''
                        }
                    }
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
            headTop,
            footGuide
        },

        computed:{

        },

        methods:{
            initData(){

            },
            toChat(link) {
                console.log(link);
                window.location.href = link;
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
            margin: 0.4rem;
            .list {
                margin: 0.4rem;
                text-align: center;
                font-size: 16PX;
            }
            .boxList {
                background-color: #fff;
                border: 1px solid #eee;
                border-radius: 10px;
                margin: 5px;
            }
        }
        .topBg {
                position: absolute;
                top: 0px;
                z-index: -1;
                height: 20rem;
                width: 100%;
                background-image: linear-gradient(0deg, #fff 4%, #2076f7 100%);
        }
    }
    .title {
        font-size: 14PX;
        margin: 0.3rem;
    }
    .fa {
        font-size: 40PX;
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

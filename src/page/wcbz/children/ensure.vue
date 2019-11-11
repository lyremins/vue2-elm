<template>
  	<div class="city_container">
        <!-- <head-top v-show="device !== 'h5'" head-title="保障管理" go-back='true'>

        </head-top> -->
        <div v-if="showTodayPlan && toTimeStamp(item.filed2) >= dayTime" v-for="(item,index) in ensureData.data" :item="item">
            <p class="title"  @click="change(index)">保障任务名称：{{item.filed1}}</p>
            <div class="content title" v-show="item.isCheck">
                <p>保障任务日期：{{item.filed2}}</p>
                <div v-for="(value,i) in item.filed3">
                    <span>保障类型：</span><span>{{value.content}}</span>
                    <div class="expand">
                        <div v-if="value.content !== '飞行计划保障'">
                            <span>参与飞机：</span>
                            <span v-for="(vv,ii) in value.airplane">
                                {{vv.code}}
                            </span>
                        </div>
                        <div v-if="value.content === '飞行计划保障'">
                            <span>参与飞机：</span>
                            <span v-for="(vv,ii) in nowPlane">
                                {{vv.airName}}
                            </span>
                        </div>
                        <div v-if="value.plan.length">
                            <span>飞行计划：</span>
                            <span v-for="(vv,ii) in value.plan">
                                {{vv.name}}
                            </span>
                        </div>
                        <div>
                            <span>保障车辆：</span>
                            <span v-for="(vv,ii) in value.car">
                                {{vv.name}}
                            </span>
                        </div>
                        <div v-if="value.content != '飞行计划保障'">
                            <span>保障人员：</span>
                            <span v-for="(vv,ii) in value.person">
                                {{vv.user_name}}
                            </span>
                        </div>
                        <div v-if="value.content != '飞行计划保障'">
                            <p>进场时间：{{value.time}}</p>
                            <p>总保障人数：{{value.person.length}}
                            </p>
                        </div>
                        <div v-if="value.content === '飞行计划保障'">
                            <p>进场时间：{{nowTime}}</p>
                            <p>总保障人数：{{nowTotal}}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="delButton">
                    <button @click="del(item.ensure_id)"  class="button del">删除保障信息</button>
                </div>
            </div>
        </div>
        <div v-if="showOldPlan && toTimeStamp(item.filed2) < dayTime" v-for="(item,index) in ensureData.data" :item="item">
            <p @click="change(index)">保障任务名称：{{item.filed1}}</p>
            <div class="content" v-show="item.isCheck">
                <p>保障任务日期：{{item.filed2}}</p>
                <p>保障类型：</p>
                <div v-for="(value,i) in item.filed3">
                    —— {{value.content}}
                    <div class="expand">
                        <div>
                            <span>参与飞机：</span>
                            <span v-for="(vv,ii) in value.airplane">
                                {{vv.code}}
                            </span>
                        </div>
                        <div>
                            <span>飞行计划：</span>
                            <span v-for="(vv,ii) in value.plan">
                                {{vv.name}}
                            </span>
                        </div>
                        <div>
                            <span>车辆：</span>
                            <span v-for="(vv,ii) in value.car">
                                {{vv.name}}
                            </span>
                        </div>
                        <div>
                            <span>人员：</span>
                            <span v-for="(vv,ii) in value.person">
                                {{vv.name}}
                            </span>
                        </div>
                        <div v-if="value.content != '飞行计划保障'">
                            <p>进场时间：{{value.time}}</p>
                            <p>总保障人数：{{getTotal(item.ensure_id)}}
                            </p>
                        </div>
                        <div v-if="value.content === '飞行计划保障'">
                            <p>进场时间：{{nowTime}}</p>
                            <p>总保障人数：{{nowTotal}}
                            </p>
                        </div>
                    </div>
                </div>
                <button @click="del(item.ensure_id)"  class="button del">删除保障任务</button>
            </div>
        </div>
        <!-- <SheetList v-for="(item,index) in ensureData.data" :item="item"></SheetList> -->
        <div class="buttonGroup">
            <button @click="toAddEnsure()"  class="button">添加保障任务</button>
            <button v-show="!showOldPlan" class="button" @click="showPlan()">查看往期任务</button>
            <button v-show="!showTodayPlan" class="button" @click="showPlan()">查看当日任务</button>
        </div>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getEnsure,getEnsureCount,deleteEnsure,getPlan } from '../../../service/getData';
    import SheetList from '../../../components/common/sheetListEnsure.vue'
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                ensureData: {},
                ensureCount: 0,
                device: this.$util.getUrlKey('device'),
                showTop: false,
                showTodayPlan: true,
                showOldPlan: false,
                dayTime: '',
                totals: 0,
                planData: {},
                planName: '',
                nowPlane: {},
                nowTime: '',
                nowTotal: ''

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
            getTotal(id) {
                console.log("222",this.ensureData.data);
                let number = 0;
                this.ensureData.data.forEach(element => {
                    if (element.ensure_id === id) {
                        element.filed3.forEach(e => {
                            e.person.forEach(y => {
                                if (y.number) {
                                    number+=parseInt(y.number);
                                }
                            });
                        });
                    }
                    console.log("111", number);
                });
                return number;
            },
            async initData(){
                var day2 = new Date();
                day2.setTime(day2.getTime());
                this.dayTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
                console.log(this.dayTime);
                this.dayTime = this.dayTime.replace(/-/g, '/') // 把所有-转化成/
                let timestamp = new Date(this.dayTime).getTime()
                this.dayTime = timestamp;

                this.ensureCount = await getEnsureCount();
                this.ensureData = await getEnsure();
                this.planData = await getPlan();
                this.ensureData.data.forEach(element => {
                    element.isCheck = false;
                    if (this.toTimeStamp(element.filed2) === this.dayTime) {
                        element.filed3.forEach(e => {
                            if (e.content === '飞行计划保障') {
                                this.planName = e.plan[0].name;
                            }
                        });
                    }
                });
                console.log(this.ensureData.data);
                this.planData.data.forEach(element => {
                    if (element.name === this.planName) {
                        this.nowPlane = element.airData;
                        this.nowTime = element.approachTime;
                        this.nowTotal = element.totalNumber;
                    }
                });
            },
            toAddEnsure() {
                console.log(this.$util.isAndroid());
                if (this.$util.isAndroid()) {
                    this.$router.push('ensureAdd?device=h5');
                } else {
                    this.$router.push('ensureAdd');
                }
            },
            change(index) {
                console.log(index);
                this.ensureData.data[index].isCheck = !this.ensureData.data[index].isCheck;
                this.ensureData = Object.assign([],this.ensureData)
            },
            del(id) {
                console.log(id);
                deleteEnsure(id);
                this.$toast('删除成功');
                this.initData();
            },
            toTimeStamp(time) {
                time = time.replace(/-/g, '/') // 把所有-转化成/
                let timestamp = new Date(time).getTime()
                return timestamp
            },
            showPlan() {
                this.showOldPlan = !this.showOldPlan;
                this.showTodayPlan = !this.showTodayPlan;
            },
            toTimeStamp(time) {
                time = time.replace(/-/g, '/') // 把所有-转化成/
                let timestamp = new Date(time).getTime()
                return timestamp
            },
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        padding-top: 0.35rem;
        font: 0.6rem/1.75rem "Microsoft YaHei";
        margin: 0 1rem;
        margin-bottom: 7rem;
        .title {
            font-size: 16PX;
        }
        .delButton {
            text-align: center;
        }
        .buttonGroup {
            position: fixed;
            left: 1px;
            bottom: 0px;
            width: 100%;
            background-color: #fff;
            padding: 10PX;
            text-align: center;
        }
        .button {
            background-color: #3190e8;
            color: #fff;
            padding: 0.4rem;
            width: 45%;
            margin-top: 0.6rem;
            font-size: 16px
        }
        .del {
            background-color: red;
        }
        .expand {
            // margin-left: 10PX;
        }
        .content {
            margin-left: 10PX;
        }
    }



</style>

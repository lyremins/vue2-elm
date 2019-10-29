<template>
  	<div class="city_container">
        <head-top head-title="查看飞行计划" go-back='true'>

        </head-top>
        <!-- {{mapLists}} -->
        <!-- <SheetList v-for="(item,index) in airPlaneData.data" :item="item"></SheetList> -->
        <div v-if="item[0].dateTime === dayTime" v-for="(item,index) in mapLists" >
            <div @click="changeList(item[0].name)" >——》计划名称：{{item[0].name}}</div>
            <div class="showList" v-show="item.isShow">
                <p style="">计划名称：{{item[0].name}}</p>
                <p style="">日期：{{item[0].dateTime}}</p>
                <p style="">飞机名称：{{item[0].airName}}</p>
                <p style="">总人数：{{item[0].totalNumber}}</p>
                <div class="airplane" v-for="(v,i) in item">
                    <p @click="changeSubList(i)" style="">-》飞机编号：{{v.airName}}</p>
                    <div class="airplaneContent" v-show="v.isShow">
                        <p style="">飞行科目：{{v.airSubject}}</p>
                        <p style="">气象科目：{{v.sceneSubject}}</p>
                        <p style="">飞行时间：{{v.flightTime}}</p>
                        <p style="">起落次数：{{v.upDownNumber}}</p>
                        <p style="">飞行时间：{{v.flightTime}}</p>
                        <p style="">进场时间：{{v.approachTime}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="oldButton" @click="showOld = !showOld">查看往期计划 -></div>
            <div v-show="showOld" v-if="item[0].dateTime != dayTime" v-for="(item,index) in mapLists" >
                <div @click="changeList(item[0].name)" >——》计划名称：{{item[0].name}}</div>
                <div class="showList" v-show="item.isShow">
                    <p style="">计划名称：{{item[0].name}}</p>
                    <p style="">日期：{{item[0].dateTime}}</p>
                    <p style="">飞机名称：{{item[0].airName}}</p>
                    <p style="">总人数：{{item[0].totalNumber}}</p>
                    <div class="airplane" v-for="(v,i) in item">
                        <p @click="changeSubList(i)" style="">-》飞机编号：{{v.airName}}</p>
                        <div class="airplaneContent" v-show="v.isShow">
                            <p style="">飞行科目：{{v.airSubject}}</p>
                            <p style="">气象科目：{{v.sceneSubject}}</p>
                            <p style="">飞行时间：{{v.flightTime}}</p>
                            <p style="">起落次数：{{v.upDownNumber}}</p>
                            <p style="">飞行时间：{{v.flightTime}}</p>
                            <p style="">进场时间：{{v.approachTime}}</p>
                        </div>
                    </div>
            </div>
        </div>
        </div>
        <router-link to="plan">
            <button class="button">添加飞行计划</button>
        </router-link>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getPlan } from '../../../service/getData';
    // import SheetList from '../../../components/common/sheetListPlan.vue'
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                airPlaneData: {},
                airPlaneCount: 0,
                showList: [],
                mapLists: {},
                listIndex: '',
                dayTime: '',
                showOld: false
            }
        },

        mounted(){
            var day2 = new Date();
            day2.setTime(day2.getTime());
            this.dayTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
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
                this.airPlaneData = await getPlan();
                this.airPlaneData.data.forEach((element,index) => {
                    element.isShow = false;
                    this.mapLists[element.name] || (this.mapLists[element.name] = []);
                    this.mapLists[element.name].push(element);
                });
                console.log(this.mapLists);
                // this.mapLists.forEach((element,index) => {
                //     element.index = false;
                // });
                Object.keys(this.mapLists).forEach((key) => {
                    this.mapLists[key].isShow = false
                });
                this.mapLists = Object.assign({},this.mapLists);
                // console.log(this.mapLists);
            },
            changeList(index) {
                this.listIndex = index
                console.log(this.mapLists[index]);
                this.mapLists[index].isShow = !this.mapLists[index].isShow;
                this.mapLists = Object.assign({},this.mapLists);
                console.log( this.mapLists);
            },
            changeSubList(index) {
                this.mapLists[this.listIndex][index].isShow = !this.mapLists[this.listIndex][index].isShow;
                this.mapLists = Object.assign({},this.mapLists);
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
            margin-bottom: 2rem;
        }
        .showList {
            margin-left: 20PX;
        }
        .airplane {
            margin-left: 30PX;
        }
        .airplaneContent {
            margin-left: 40PX;
        }
        .oldButton {
            border: 1px solid red;
            color: red;
            padding: 5px;
        }
    }



</style>

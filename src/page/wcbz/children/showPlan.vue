<template>
  	<div class="city_container">

        <!-- {{mapLists}} -->
        <!-- <SheetList v-for="(item,index) in airPlaneData.data" :item="item"></SheetList> -->
        <div @click="editPlan(item.plan_id)" class="showPlan" v-if="showTodayPlan && toTimeStamp(item.dateTime) >= dayTime" v-for="(item,index) in airPlaneData.data" >
           <i class="downIcon"> </i><div @click="changeList(index)" > 计划名称：{{item.name}}</div>
            <div class="showList" v-show="item.isShow">
                <p style="">计划名称：{{item.name}}</p>
                <p style="">计划日期：{{item.dateTime}}</p>
                <p style="">总人数：{{item.totalNumber}}</p>
                <p style="">进场时间：{{item.approachTime}}</p>
                <div class="airplane" v-for="(v,i) in item.airData">
                    <i class="downIcon"> </i><p @click="changeSubList(i)" style="">飞机编号：{{v.airName}}</p>
                    <div class="airplaneContent" v-show="v.isShow">
                        <p style="">飞行科目：{{v.airSubject}}</p>
                        <p style="">气象科目：{{v.sceneSubject}}</p>
                        <p style="">起落次数：{{v.upDownNumber}}</p>
                        <p style="">飞行时间：{{v.flightTime}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div v-show="!showOld" class="oldButton" @click="showOldPlan()">查看往期计划 -></div>
            <div v-show="!showTodayPlan" class="oldButton" @click="showOldPlan()">查看当日计划 -></div>
            <div @click="showAddPlan()" class="addButton">添加飞行计划 -></div>
            <div @click="editPlan(item.plan_id)" class="oldShow" v-show="showOld" v-if="toTimeStamp(item.dateTime) <= dayTime" v-for="(item,index) in airPlaneData.data" >
                <i class="downIcon"> </i><div @click="changeList(index)" >计划名称：{{item.name}}</div>
                <div class="showList" v-show="item.isShow">
                    <p style="">计划名称：{{item.name}}</p>
                    <input type="text" v-model="formData.name">
                    <p style="">计划日期：{{item.dateTime}}</p>
                    <p style="">总人数：{{item.totalNumber}}</p>
                    <div class="airplane" v-for="(v,i) in item.airData">
                        <i class="downIcon"> </i><p @click="changeSubList(i)" style="">飞机编号：{{v.airName}}</p>
                        <div class="airplaneContent" v-show="v.isShow">
                            <p style="">飞行科目：{{v.airSubject}}</p>
                            <p style="">气象科目：{{v.sceneSubject}}</p>
                            <p style="">起落次数：{{v.upDownNumber}}</p>
                            <p style="">飞行时间：{{v.flightTime}}</p>
                        </div>
                    </div>
            </div>
        </div>
        </div>
        <mt-popup
        v-model="popupVisible">
            <div class="viewDate">
                请选择创建计划的日期：<mt-field placeholder="计划日期" type="date" v-model="viewTime"></mt-field>
                <div @click="toAddPlan()" class="NewButton">创建</div>
            </div>
        </mt-popup>
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
                showOld: false,
                device: this.$util.getUrlKey('device'),
                showTodayPlan: true,
                popupVisible: false,
                dayTime: '',
                formData: {
                    name:'ddd',
                    dateTime: '',
                    airName: '',
                    airSubject: [],
                    sceneSubject: [],
                    upDownNumber: [],
                    flightTime: [],
                    approachTime: ''
                },
            }
        },

        mounted(){
            var day2 = new Date();
            day2.setTime(day2.getTime());
            this.dayTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
            console.log(this.dayTime);
            this.dayTime = this.dayTime.replace(/-/g, '/') // 把所有-转化成/
            let timestamp = new Date(this.dayTime).getTime()
            this.dayTime = timestamp;
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
                console.log(this.airPlaneData);
                this.airPlaneData.data.forEach(elements => {
                    elements.isShow = false;
                    elements.airData.forEach(element => {
                        element.isShow = false;
                    });
                });
                // this.formData = this.airPlaneData.data;
                // console.log("fffff", this.formData);
                console.log(this.airPlaneData);
                // this.airPlaneData.data.forEach((element,index) => {
                //     element.isShow = false;
                //     this.mapLists[element.name] || (this.mapLists[element.name] = []);
                //     this.mapLists[element.name].push(element);
                // });
                // console.log(this.mapLists);
                // // this.mapLists.forEach((element,index) => {
                // //     element.index = false;
                // // });
                // Object.keys(this.mapLists).forEach((key) => {
                //     this.mapLists[key].isShow = false
                // });
                // this.mapLists = Object.assign({},this.mapLists);
                // console.log(this.mapLists);
            },
            changeList(index) {
                this.listIndex = index;
                console.log(this.listIndex);
                console.log(this.airPlaneData.data[index]);
                this.airPlaneData.data[index].isShow = !this.airPlaneData.data[index].isShow;
                this.airPlaneData = Object.assign({},this.airPlaneData);
            },
            changeSubList(index) {
                this.airPlaneData.data[this.listIndex].airData[index].isShow = !this.airPlaneData.data[this.listIndex].airData[index].isShow;
                this.airPlaneData = Object.assign({},this.airPlaneData);
            },
            toAddPlan() {
                console.log('2222');
                let number = 0;
                if (this.dayTime === this.toTimeStamp(this.viewTime)) {
                    this.airPlaneData.data.forEach(element => {
                        if (this.toTimeStamp(element.dateTime) === (this.dayTime)) {
                            console.log(element.dateTime);
                            console.log(this.dayTime);
                            this.$toast({
                                message: '当日已存在飞行计划',
                                duration: 3000,
                                className: 'noticeError'
                            });
                            number = 1;
                        }
                    });
                }
                if (!number) {
                    this.$router.push('plan');
                }
            },
            showAddPlan() {
                this.popupVisible = true;
            },
            toTimeStamp(time) {
                time = time.replace(/-/g, '/') // 把所有-转化成/
                let timestamp = new Date(time).getTime()
                return timestamp
            },
            showOldPlan() {
                this.showOld = !this.showOld;
                this.showTodayPlan = !this.showTodayPlan;
            },
            editPlan(plan_id) {
                this.$router.push(`/editPlan?plan_id=${plan_id}`)
            }
        }
    }

</script>

<style lang="scss">
    @import 'src/style/mixin';
    .city_container{
        padding-top: 0.35rem;
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
            position: relative;
        }
        .airplaneContent {
            margin-left: 40PX;
        }
        .oldButton {
            border: 1px solid #3892e5;
            color: #3892e5;
            padding: 5px;
                position: fixed;
                bottom: 20%;
                width: 90%;
                text-align: center;
                left: 6%;
            background-color: #3892e5;
            color: #fff;
        }
        .addButton {
            border: 1px solid #3892e5;
            color: #3892e5;
            padding: 5px;
                position: fixed;
                bottom: 10%;
                width: 90%;
                text-align: center;
                left: 6%;
            background-color: #3892e5;
            color: #fff;
        }
        .NewButton {
            margin-top: 20PX;
            padding: 5px;
            background-color: #3892e5;
            color: #fff;
            text-align: center;
        }
        .showPlan {
            // height: 16rem;
            overflow: scroll;
        }
        .oldShow {
            // height: 16rem;
            overflow: scroll;
        }
        .downIcon {
            width: 0px;
            height: 10px;
            border: 10px solid;
            border-color:  #666 transparent transparent transparent;
            position: absolute;
            right: 20px;
            top: 20PX;
        }
        .noticeError {
            color: #fff!important;
        }
        .viewDate {
            padding: 1rem;
        }
    }
    .mint-toast {
        z-index: 3003!important;
    }



</style>

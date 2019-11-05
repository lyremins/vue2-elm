<template>
  	<div class="city_container">

        <!-- {{mapLists}} -->
        <!-- <SheetList v-for="(item,index) in airPlaneData.data" :item="item"></SheetList> -->
        <div class="showPlan" >
            <div class="showList">
                计划名称：<input v-model="airPlaneData.name" type="text" name="" id="">
                计划日期：<mt-field type="date" v-model="airPlaneData.dateTime"></mt-field>
                总人数：<input v-model="airPlaneData.totalNumber" type="text" name="" id="">
                进场时间：<mt-field type="time" v-model="airPlaneData.approachTime"></mt-field>
                <!-- <p style="">计划名称：{{airPlaneData.name}}</p>
                <p style="">计划日期：{{airPlaneData.dateTime}}</p>
                <p style="">总人数：{{airPlaneData.totalNumber}}</p>
                <p style="">进场时间：{{airPlaneData.approachTime}}</p> -->
                <div class="airplane" v-for="(v,i) in airPlaneData.airData">
                    <i class="downIcon"> </i><p @click="changeSubList(i)" style="">飞机编号：{{v.airName}}</p>
                    <div class="airplaneContent">
                        <p>选择飞行科目：</p>
                        <div class="deviceBox">
                            <select class="select"  v-model="airPlaneData.airData[i].airSubject">
                                <option v-for="v in fxSubject" :value="v">{{v}}</option>
                            </select>
                        </div>
                        <p>选择气象科目：</p>
                        <div class="deviceBox">
                            <select class="select" v-model="airPlaneData.airData[i].sceneSubject">
                                <option v-for="v in qxSubject" :value="v">{{v}}</option>
                            </select>
                        </div>
                        起落次数：<input type="text" v-model="airPlaneData.airData[i].upDownNumber">
                        飞行时间：<mt-field type="time" v-model="airPlaneData.airData[i].flightTime"></mt-field>
                    </div>
                </div>
            </div>
        </div>
         <div>
            <div class="sButton" @click="deletePlan()">删除当前计划</div>

            <div class="sButton"  @click="submitEdit()">保存当前修改</div>
        </div>
        <div>
        </div>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getPlan,getPlanbyID,getConfig,updatePlan,deletePlan } from '../../../service/getData';
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
                plan_id: this.$util.getUrlKey('plan_id'),
                showTodayPlan: true,
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
                fxSubject:[],
                qxSubject:[]
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
                this.airPlaneData = await getPlanbyID(this.plan_id);
                console.log(this.airPlaneData);

                const config = await getConfig()
                this.fxSubject = config.data[0].subjectModel.split(",");
                this.qxSubject = config.data[0].sceneModel.split(",");
                // this.airPlaneData.data.forEach(elements => {
                //     elements.isShow = false;
                //     elements.airData.forEach(element => {
                //         element.isShow = false;
                //     });
                // });
                // this.formData = this.airPlaneData.data;
                // console.log("fffff", this.formData);
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
                console.log(this.$util.isAndroid());
                if (this.$util.isAndroid()) {
                    this.$router.push('plan?device=h5');
                } else {
                    this.$router.push('plan');
                }
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
            submitEdit() {
                console.log(this.airPlaneData);
                updatePlan(this.airPlaneData);
                this.$toast('修改成功');
                this.$router.push('editPlan');
            },
            deletePlan() {
                deletePlan(this.plan_id);
                this.$toast('删除成功');
                this.$router.push('showPlan');
            }
        }
    }

</script>

<style lang="scss" scoped>
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
            // margin-left: 20PX;
            input {
                width: 100%;
                font: 0.6rem/1.75rem "Microsoft YaHei";
            }
        }
        .airplane {
            margin-left: 30PX;
            position: relative;
        }
        .airplaneContent {
            // margin-left: 40PX;
        }
        .oldButton {
            border: 1px solid #3892e5;
            color: #3892e5;
            padding: 5px;
                text-align: center;
            background-color: #3892e5;
            color: #fff;
            // margin-bottom: 10PX;
        }
        .newButton {
            border: 1px solid #3892e5;
            color: #3892e5;
            padding: 5px;
                text-align: center;
            background-color: #3892e5;
            color: #fff;
            margin-bottom: 20px;
        }
        .showPlan {
            // min-height: 16rem;
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
        .sButton {
            background-color: #3190e8;
            color: #fff;
            // padding: 0.5rem;
            width: 100%;
            margin-top: 0.6rem;
            margin-bottom: 1rem;
            text-align: center;
        }
    }



</style>

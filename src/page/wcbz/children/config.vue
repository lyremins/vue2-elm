<template>
  	<div class="city_container">
        <head-top head-title="状态配置" go-back='true'>
        </head-top>
        <p>飞机状态配置项：</p>
        <div class="textBox">
            {{a}}
            {{state}}
            <div v-for="(value,index) in a.state">
                <input v-model="a.state[index]">
                <i v-show="state[index]" @click="delTag(index)" >x</i>
            </div>
        </div>
        <input class="select" v-model="inputState" type="text" name="" id="" placeholder="添加一项飞机状态">
        <button @click="saveState()" class="button">暂存</button>

        <p>飞机任务配置项：</p>
        <div class="textBox">
            <div v-for="v in task">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputTask" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="saveTask()" class="button">暂存</button>

        <p>飞机故障配置项：</p>
        <div class="textBox">
            <div v-for="v in fault">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputFault" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="saveFault()" class="button">暂存</button>

        <p>飞机科目配置项：</p>
        <div class="textBox">
            <div v-for="v in subject">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputSubject" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="saveSubject()" class="button">暂存</button>

        <p>气象科目配置项：</p>
        <div class="textBox">
            <div v-for="v in scene">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputScene" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="saveScene()" class="button">暂存</button>

        <p>车辆状态配置项：</p>
        <div class="textBox">
            <div v-for="v in carState">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputCarState" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="saveCarState()" class="button">暂存</button>

        <p>车辆任务状态配置项：</p>
        <div class="textBox">
            <div v-for="v in carTask">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputCarTask" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="saveCarTask()" class="button">暂存</button>

        <p>车辆类型配置项：</p>
        <div class="textBox">
            <div v-for="v in carType">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputCarType" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="saveCarType()" class="button">暂存</button>

        <p>车辆故障配置项：</p>
        <div class="textBox">
            <div v-for="v in carFault">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputCarFault" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="saveCarFault()" class="button">暂存</button>

        <p>人员类别配置项：</p>
        <div class="textBox">
            <div v-for="v in pType">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputPType" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="savePType()" class="button">暂存</button>

        <p>人员专业配置项：</p>
        <div class="textBox">
            <div v-for="v in pMajor">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputPMajor" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="savePMajor()" class="button">暂存</button>

        <p>人员职务配置项：</p>
        <div class="textBox">
            <div v-for="v in pPost">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputPPost" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="savePPost()" class="button">暂存</button>

        <p>保障任务配置项：</p>
        <div class="textBox">
            <div v-for="v in ensure">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputEnsure" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="saveEnsure()" class="button">暂存</button>

        <p>人员工作状态配置项：</p>
        <div class="textBox">
            <div v-for="v in pStatus">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputPStatus" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="savePStatus()" class="button">暂存</button>

        <p>车辆工作状态配置项：</p>
        <div class="textBox">
            <div v-for="v in carWork">
                <span>{{v}}</span>
            </div>
        </div>
        <input class="select" v-model="inputCarWork" type="text" name="" id="" placeholder="添加一项任务状态">
        <button @click="saveCarWork()" class="button">暂存</button>

        <button @click="submit()" class="button buttonSize">确认提交</button>
        <footGuide></footGuide>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getConfig,updateConfig } from '../../../service/getData';
    import alertTip from 'src/components/common/alertTip'
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                configData: {},
                airModel: '',
                state: [],
                state_s: '',
                task: [],
                task_s: '',
                fault: [],
                fault_s: '',
                subject: [],
                subject_s: '',
                scene: [],
                scene_s: [],
                carState: [],
                carState_s: '',
                carTask: [],
                carTask_s: '',
                carType: [],
                carType_s: '',
                carFault: [],
                carFault_s: '',
                pType: [],
                pType_s: '',
                pMajor: [],
                pMajor_s: '',
                pPost: [],
                pPost_s: '',
                ensure: [],
                ensure_s: '',
                pStatus: [],
                pStatus_s: '',
                carWork: [],
                carWork_s: '',
                inputState: '',
                inputTask: '',
                inputFault: '',
                inputSubject: '',
                inputScene: '',
                inputCarState: '',
                inputCarTask: '',
                inputCarType: '',
                inputCarFault: '',
                inputPType: '',
                inputPMajor: '',
                inputPPost: '',
                inputEnsure: '',
                inputPStatus: '',
                inputCarWork: '',
                showAlert: false,
                alertText: '',
                a:{
                    state:[],
                },
            }
        },

        mounted(){
            this.initData();
        },
        mixins: [mixin],

        components:{
            headTop,
            alertTip
        },

        computed:{

        },

        methods:{
            async initData(){
                this.configData = await getConfig();
                this.state = this.configData.data[0].stateModel.split(",");
                this.a.state = this.configData.data[0].stateModel.split(",");
                console.log(this.a);
                this.task = this.configData.data[0].taskModel.split(",");
                this.fault = this.configData.data[0].faultModel.split(",");
                this.subject = this.configData.data[0].subjectModel.split(",");
                this.scene = this.configData.data[0].sceneModel.split(",");
                this.carState = this.configData.data[0].carStateModel.split(",");
                this.carTask = this.configData.data[0].carTaskModel.split(",");
                this.carType = this.configData.data[0].carTypeModel.split(",");
                this.carFault = this.configData.data[0].carFaultModel.split(",");
                this.pType = this.configData.data[0].pTypeModel.split(",");
                this.pMajor = this.configData.data[0].pMajorModel.split(",");
                this.pPost = this.configData.data[0].pPostModel.split(",");
                this.ensure = this.configData.data[0].ensureModel.split(",");
                this.pStatus = this.configData.data[0].pStatusModel.split(",");
                this.carWork = this.configData.data[0].carWorkModel.split(",");
            },
            saveState() {
                this.state_s = this.state + "," + this.inputState;
                this.state = this.state_s.split(",");
            },
            saveTask() {
                this.task_s = this.task + "," + this.inputTask;
                this.task = this.task_s.split(",");
            },
            saveFault() {
                this.fault_s = this.fault + "," + this.inputFault;
                this.fault = this.fault_s.split(",");
            },
            saveSubject() {
                this.subject_s = this.subject + "," + this.inputSubject;
                this.subject = this.subject_s.split(",");
            },
            saveScene() {
                this.scene_s = this.scene + "," + this.inputScene;
                this.scene = this.scene_s.split(",");
            },
            saveCarState() {
                this.carState_s = this.carState + "," + this.inputCarState;
                this.carState = this.carState_s.split(",");
            },
            saveCarTask() {
                this.carTask_s = this.carTask + "," + this.inputCarTask;
                this.carTask = this.carTask_s.split(",");
            },
            saveCarType() {
                this.carType_s = this.carType + "," + this.inputCarType;
                this.carType = this.carType_s.split(",");
            },
            saveCarFault() {
                this.carFault_s = this.carFault + "," + this.inputCarFault;
                this.carFault = this.carFault_s.split(",");
            },
            savePType() {
                this.pType_s = this.pType + "," + this.inputPType;
                this.pType = this.pType_s.split(",");
            },
            savePMajor() {
                this.pMajor_s = this.pMajor + "," + this.inputPMajor;
                this.pMajor = this.pMajor_s.split(",");
            },
            savePPost() {
                this.pPost_s = this.pPost + "," + this.inputPPost;
                this.pPost = this.pPost_s.split(",");
            },
            saveEnsure() {
                this.ensure_s = this.ensure + "," + this.inputEnsure;
                this.ensure = this.ensure_s.split(",");
            },
            savePStatus() {
                this.pStatus_s = this.pStatus + "," + this.inputPStatus;
                this.pStatus = this.pStatus_s.split(",");
            },
            saveCarWork() {
                this.carWork_s = this.carWork + "," + this.inputCarWork;
                this.carWork = this.carWork_s.split(",");
            },
            async submit() {
                const data = {
                    stateModel: this.state,
                    taskModel: this.task,
                    faultModel: this.fault,
                    subjectModel: this.subject,
                    sceneModel: this.scene,
                    carStateModel: this.carState,
                    carTaskModel: this.carTask,
                    carTypeModel: this.carType,
                    carFaultModel: this.carFault,
                    pTypeModel: this.pType,
                    pMajorModel: this.pMajor,
                    pPostModel: this.pPost,
                    ensureModel: this.ensure,
                    pStatusModel: this.pStatus,
                    carWorkModel: this.carWork,
                }
                const res = await updateConfig(data);
                this.showAlert = true;
                this.alertText = '上报成功';
                this.$router.push('index');
            },
            closeTip() {
                this.showAlert = false;
            },
            delTag(index) {
                this.a.state.splice(index,index);
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
            // width: 100%;
            margin-top: 0.6rem;
            margin-bottom: 2rem;
        }
        .buttonSize {
            width: 100%;
        }
        .select {
            width: 80%;
            background-color: #fff;
            font-size: 14PX;
            padding: 0.5rem;
        }
        .textBox {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            div {
                margin: 15px;
                position: relative;
            }
            input {
                width: 80PX;
            }
            i {
                position: absolute;
                left: 30px;
                top: -5px;
                color: red;
            }

        }
    }



</style>

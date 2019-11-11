<template>
    <div class="city_container">
        <div>
            <table>
                <tr>
                    <td>携弹类型</td>
                    <td>携弹数量</td>
                    <td>发射次数</td>
                    <td>发射数量</td>
                </tr>
                <tr v-for="v in dyData">
                    <td>{{v.air_code}}_{{v.ammo_code}}</td>
                    <td>{{v.zsm}}</td>
                    <td>{{v.fxcs}}</td>
                    <td>{{v.fxsl}}</td>
                    <!-- <td>{{v.sm}}</td> -->
                </tr>
            </table>
        </div>
        <!-- <img @click="toLocation()" class="icon" src="../../../images/addIcon.png"> -->
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {
        getAirplaneAmmo,
        getAirplane,
        getPlan,
        getWqState
    } from '../../../service/getData';
    import {imgBaseUrl} from 'src/config/env'

    export default {
        data() {
            return {
                formData: {
                    model: '',
                    code: '',
                    type: '',
                    army_id: '',
                    airHour: '',
                    yairHour: '',
                    airUpOrDown: '',
                    yairUpOrDown: '',
                    image_path: '',
                    factory: '',
                    stageUpOrDown: '',
                    engine_1: '',
                    engine_2: '',
                    state: '',
                    task: '',
                    stageUpOrDownTime: '',
                    repairNumber:'',
                    repairFactory:'',
                    unit: ''
                },
                showAlert: false,
                alertText: '',
                stateModel: [],
                taskModel: [],
                organizData: {},
                showOrganiz: false,
                ammoData: {},
                deviceData: {},
                checked: false,
                subitem: {
                    isCheck: false
                },
                air: [],
                newData: [],
                device: [],
                airplaneIndex: '',
                device: this.$util.getUrlKey('device'),
                airPlane: {},
                selectAirplane: '',
                oldPlaneData: {},
                wqData: {},
                dyData: [],
                mapLists: {}
            }
        },

        mounted() {
            var day2 = new Date();
            day2.setTime(day2.getTime());
            this.dayTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();

            this.init();
        },

        components: {
            alertTip,
        },

        computed: {

        },

        methods: {
            closeTip() {
                this.showAlert = false;
            },
            async init() {
                this.ammoData = await getAirplaneAmmo();
                this.airPlane = await getAirplane();
                this.ammoData = this.ammoData.data;
                this.oldPlaneData = this.ammoData;
                this.planData = await getPlan();
                this.planData.data.forEach(element => {
                    if (this.toTimeStamp(element.dateTime) === this.toTimeStamp(this.dayTime)) {
                        element.airData.forEach(ee => {
                            ee.xd.forEach(eee => {
                                eee.fxcs = 0;
                                eee.fxsl = 0;
                                this.dyData.push(eee)
                            });
                        });
                    }
                });
                this.wqData = await getWqState();
                const newWq = [];
                this.wqData.data.forEach(element => {
                    let data = {};
                    element.fsData.forEach(e => {
                        console.log(e.name);
                        data = {
                            name: `${element.name}_${e.name}`,
                            fxcs: e.fxcs,
                            fxsl: e.fxsl
                        }
                    newWq.push(data);
                    });
                });
                console.log("2222222", newWq);
                this.dyData.forEach(e2 => {
                    const name = `${e2.air_code}_${e2.ammo_code}`;
                    newWq.forEach(e1 => {
                        if (name === e1.name) {
                            e2.fxcs +=e1.fxcs
                            e2.fxsl +=e1.fxsl
                        }
                    });
                });
                console.log("22444%%%%%", this.dyData);
                this.dyData = Object.assign([],this.dyData);
                newWq.forEach(element => {
                        this.mapLists[element.name] || (this.mapLists[element.name] = []);
                        this.mapLists[element.name].push(element);
                });
                console.log(this.mapLists);
                const data = [];
                // this.dyData.forEach(element => {
                //     const name = `${element.air_code}_${element.ammo_code}`;
                //     console.log(name);
                //     if (this.mapLists.hasOwnProperty(name)) {
                //         Object.keys(this.mapLists).forEach((key,value) => {
                //             this.mapLists[key].forEach(element => {
                //                 console.log("this.mapLists[key]",element);
                //                 data[element.name] || (data[element.name] = [])
                //                 if (data[element.name]) {
                //                     console.log(element.fxcs);
                //                     parseInt(element.fxcs);
                //                 }
                //             });
                //         });
                //     }
                //     console.log(data);
                //     // if (this.mapLists.hasOwnProperty(name)) {
                //     //     console.log('happy');
                //     // }
                // });

            },
            selectOrganiz(name) {
                console.log(name);
                this.formData.unit = name;
                this.showOrganiz = false;
            },
            changeSelect(index,type) {
                this.airplaneIndex = index;
                this.airPlaneData.data[index].isCheck = !this.airPlaneData.data[index].isCheck;
                this.airPlaneData.data = Object.assign([],this.airPlaneData.data)
            },
            changeDevice(index,type) {
                this.airPlaneData.data[this.airplaneIndex].device[index].isCheck = !this.airPlaneData.data[this.airplaneIndex].device[index].isCheck;
                this.airPlaneData.data = Object.assign([],this.airPlaneData.data);
                console.log(this.airPlaneData.data);
            },
            search() {
                console.log(this.oldPlaneData);
                this.ammoData = this.oldPlaneData.filter(
                    item => item.air_code === this.selectAirplane
                )
                console.log(this.ammoData);

            },
            searchAll() {
                this.ammoData = this.oldPlaneData;
            },
            toLocation() {
                this.$router.push('airplaneAmmo');
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
    .city_container {
        padding-top: 0.35rem;
        font: 0.8rem/1.75rem "Microsoft YaHei";
        margin: 0 1rem;
        .icon {
            position: fixed;
            width: 10%;
            bottom: 10%;
            right: 7%;
        }
        button {
            @include sc(.25rem, #fff);
            font-family: Helvetica Neue, Tahoma, Arial;
            padding: .28rem .4rem;
            border: 1px;
            margin-top: 0.5rem;
            background-color: #3792e5;
            margin-bottom: 2rem;
        }
        .profileinfopanel-upload {
            display: block;
            opacity: 0;
            top: 2.35rem;
            left: 0;
            @include wh(100%, 1.1rem);
        }
        .headportrait-div-top {
            @include wh(2rem, 2rem);
            @include borderRadius(50%);
            vertical-align: middle;
        }
        .upload {
            text-align: center;
            img {
                width: 2rem;
                margin-top: 1rem;
            }
        }
        .selcetOrganiz {
            background-color: #eee;
            height: 0.8rem;
            width: 8rem;
            font-size: 12PX;
            line-height: 0.8rem;
            padding-left: 0.2rem;
        }
        .showDevice {
            margin-left: 40PX;
        }
            table {
                text-align: center;
                border: 1px solid #000;
                border-collapse: collapse;
                font-size: 12PX;
                th {
                    border-collapse: collapse;
                }
                td {
                    border: 1px solid #000;
                    width: 5rem;
                }
                tr {
                    line-height: 30PX;
                }
            }
            select {
                width: 3rem;
                height: 1.2rem;
                vertical-align: baseline;
            }
            .selectBox {
                button {
                    width: 3rem;
                }
            }
    }

    .loginForm {
        background-color: #fff;
        margin-top: .6rem;
        .selectBox {
            select {
                display: inline-block;
                    width: 40%;
                    background-color: #eee;
                    font-size: 14PX;
                    padding: 0.5rem;
            }
        }
        .seText {
            display: inline-block;
            padding: .6rem .8rem;
            @include sc(.7rem, #666);
        }
        .input_container {
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input {
                @include sc(.7rem, #666);
            }
            .right_phone_number {
                background-color: #4cd964;
            }
        }
        .input_container {
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input {
                @include sc(.7rem, #666);
            }
            .right_phone_number {
                background-color: #4cd964;
            }
        }
        .phone_number {
            padding: .3rem .8rem;
        }
        .captcha_code_container {
            height: 2.2rem;
            .img_change_img {
                display: flex;
                align-items: center;
                img {
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img {
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p {
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2) {
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
         .selectOrganiz {
            position: relative;
            display: flex;
            align-items: center;
            .listbox {
                font-size: 12PX;
                position: absolute;
                top: 74%;
                left: 26%;
                background-color: #e6e6e6;
                width: 57%;
                line-height: 20PX;
                z-index: 1;
                .l0 ,.l1,.l2 {
                    // padding: 0.2rem;
                    &:hover {
                        background-color: #4c95f5;
                        color: #fff;
                    }
                }
                .l0 {
                    padding-left: 10PX;
                }
                .l1 {
                    padding-left: 20PX;
                }
                .l2 {
                    padding-left: 40PX;
                }
            }
        }
    }
</style>

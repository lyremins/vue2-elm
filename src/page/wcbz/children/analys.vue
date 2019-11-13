<template>
    <div class="city_container">
        <div class="selectBox">
            <div class="dateSelect">
                开始日期：<input placeholder="计划日期" type="date" class="select" v-model="startTime">
            </div>
            <div class="dateSelect">
                结束日期：<input placeholder="计划日期" type="date" class="select" v-model="endTime">
            </div>
            <div class="selectBox">
                <span class="seText">选择统计类型：</span>
                <select class="select" v-model="type">
                    <option v-for="(value,index) in options" :value="value.value">{{value.label}}</option>
                </select>
            </div>
            <button @click="search()" class="planButton">查询</button>
            <table v-show="showType === '1'">
                <tr>
                    <td style="width: 120px">日期</td>
                    <td>飞行计划场数</td>
                    <td>保障任务完成场数</td>
                    <td>飞行计划起落次数</td>
                    <td>保障任务起落次数</td>
                </tr>
                <tr>
                    <td style="width: 120px">20191105</td>
                    <td>6</td>
                    <td>5</td>
                    <td>4</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td style="width: 120px">201911017</td>
                    <td>12</td>
                    <td>5</td>
                    <td>9</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td style="width: 120px">20191111</td>
                    <td>3</td>
                    <td>5</td>
                    <td>13</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td style="width: 120px">20191112</td>
                    <td>12</td>
                    <td>7</td>
                    <td>18</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td style="width: 120px">20191113</td>
                    <td>16</td>
                    <td>7</td>
                    <td>24</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td style="width: 120px">20191109</td>
                    <td>8</td>
                    <td>7</td>
                    <td>14</td>
                    <td>6</td>
                </tr>

            </table>
            <table v-show="showType === '2'">
                <tr>
                    <td style="width: 120px">日期</td>
                    <td>飞机编号</td>
                    <td>完成场数</td>
                    <td style="width: 120px">完成起落次数</td>
                </tr>
                <tr>
                    <td style="width: 120px">20191105</td>
                    <td>A1</td>
                    <td>8</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td style="width: 120px">201911017</td>
                    <td>A2</td>
                    <td>8</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td style="width: 120px">20191111</td>
                    <td>A3</td>
                    <td>5</td>
                    <td>9</td>
                </tr>
                <tr>
                    <td style="width: 120px">20191112</td>
                    <td>A4</td>
                    <td>8</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td style="width: 120px">20191113</td>
                    <td>A5</td>
                    <td>8</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td style="width: 120px">20191109</td>
                    <td>A6</td>
                    <td>18</td>
                    <td>8</td>
                </tr>

            </table>
            <table v-show="showType === '3'">
                <tr>
                    <td>飞机编号</td>
                    <td>飞机状态</td>
                    <td style="width: 120px">次数</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>完好</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>A2</td>
                    <td>完好</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>A3</td>
                    <td>定检</td>
                    <td>9</td>
                </tr>
                <tr>
                    <td>A4</td>
                    <td>完好</td>
                    <td>4</td>
                </tr>
                <tr>
                    <!-- <td style="width: 120px">20191113</td> -->
                    <td>A5</td>
                    <td>排故</td>
                    <td>4</td>
                </tr>
                <tr>
                    <!-- <td style="width: 120px">20191109</td> -->
                    <td>A6</td>
                    <td>大修</td>
                    <td>8</td>
                </tr>
                <tr>
                    <!-- <td style="width: 120px">20191109</td> -->
                    <td>A6</td>
                    <td>待退役</td>
                    <td>8</td>
                </tr>

            </table>
            <table v-show="showType === '4'">
                <tr>
                    <td style="width: 120px">飞行计划名称</td>
                    <td>飞机编号</td>
                    <td>弹药型号</td>
                    <td>发射次数</td>
                    <td>发射数量</td>
                </tr>
                <tr>
                    <td style="width: 120px">飞行计划20191101</td>
                    <td>A001</td>
                    <td>训练弹A</td>
                    <td>7</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td style="width: 120px">飞行计划20191102</td>
                    <td>A002</td>
                    <td>训练弹A</td>
                    <td>5</td>
                    <td>8</td>
                </tr>
                <tr>
                    <td style="width: 120px">飞行计划20191103</td>
                    <td>A004</td>
                    <td>训练弹A</td>
                    <td>2</td>
                    <td>17</td>
                </tr>
                <tr>
                    <td style="width: 120px">飞行计划20191106</td>
                    <td>A006</td>
                    <td>训练弹A</td>
                    <td>3</td>
                    <td>4</td>
                </tr>

            </table>
            <table v-show="showType === '5'">
                <tr>
                    <td>飞机编号</td>
                    <td>总寿命</td>
                    <td style="width: 120px">阈值</td>
                    <td>余寿</td>
                    <td>余寿百分比</td>
                </tr>
                <tr>
                    <td>A001</td>
                    <td>1000</td>
                    <td>50</td>
                    <td>5</td>
                    <td>3%</td>
                </tr>
                <tr>
                    <td>A002</td>
                    <td>1000</td>
                    <td>50</td>
                    <td>7</td>
                    <td>8%</td>
                </tr>
                <tr>
                    <td>A003</td>
                    <td>600</td>
                    <td>50</td>
                    <td>40</td>
                    <td>13%</td>
                </tr>
                <tr>
                    <td>A004</td>
                    <td>1000</td>
                    <td>50</td>
                    <td>12</td>
                    <td>8%</td>
                </tr>
                <tr>
                    <!-- <td style="width: 120px">20191113</td> -->
                    <td>A005</td>
                    <td>800</td>
                    <td>50</td>
                    <td>35</td>
                    <td>4%</td>
                </tr>
                <tr>
                    <!-- <td style="width: 120px">20191109</td> -->
                    <td>A006</td>
                    <td>1000</td>
                    <td>50</td>
                    <td>12</td>
                    <td>9%</td>
                </tr>
                <tr>
                    <!-- <td style="width: 120px">20191109</td> -->
                    <td>A007</td>
                    <td>1000</td>
                    <td>50</td>
                    <td>18</td>
                    <td>7%</td>
                </tr>

            </table>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                options: [{
                    value: '1',
                    label: '飞行计划/保障次数'
                }, {
                    value: '2',
                    label: '飞机飞行场次'
                }, {
                    value: '3',
                    label: '飞机状态统计'
                }, {
                    value: '4',
                    label: '弹药数据统计'
                }, {
                    value: '5',
                    label: '有寿器件统计'
                }],
                type:'',
                showType: ''
            }
        },

        mounted() {
            // this.init();
        },

        components: {

        },

        computed: {

        },

        methods: {
            search() {
                this.showType = this.type;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container {
        padding-top: 0.35rem;
        font: 0.6rem/1.75rem "Microsoft YaHei";
        margin: 0 1rem;
        table {
            border: 1px solid #000;
            border-collapse: collapse;
            font-size: 14PX;
            td {
                text-align: center;
                border: 1px solid #000;
                width: 3.1rem;
                line-height: 20px;
            }
        }
        .selectBox {
            text-align: center;
        }
        button {
            @include sc(.65rem, #fff);
            font-family: Helvetica Neue, Tahoma, Arial;
            padding: .28rem .4rem;
            border: 1px;
            margin-top: 0.5rem;
            background-color: #3792e5;
            width: 100%;
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
        .dateSelect {
            text-align: center;
        }
    }

    .loginForm {
        background-color: #fff;
        margin-top: .6rem;
        .selectBox {
            text-align: center;
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

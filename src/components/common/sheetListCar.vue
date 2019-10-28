<template>

    <div class="sheet-list">

        <div class="sheet-header" @click="toggleSheet">
            <i class="icon iconfont icon-enter" ref="toggleicon"></i>   <span class="sheet-header-span">车辆名称：{{data_item.name}} <span></span></span>
            <i class="sheet-header-i icon iconfont icon-setup" @click.stop="showSheetMenu(data_item.name)"></i>   </div>

        <div @click="location(data_item.vehicle_id)" v-if="showSheets" class="sheet-content">

            <div class="sheet-content-middle">

                <p style="">型号：{{data_item.model}}</p>
                <p style="">名称：{{data_item.name}}</p>
                <p style="">状态：{{data_item.state}}</p>
                <p style="">车辆任务状态：{{data_item.taskState}}</p>
                <p style="">出厂号码：{{data_item.code}}</p>
                <p style="">单位：{{data_item.organiz}}</p>
                <p style="">服务机型：{{data_item.service}}</p>
                <!-- <p style="">部队编号：{{data_item.armyId}}</p>
                <p style="">生产厂：{{data_item.product}}</p>
                <p style="">生产时间：{{data_item.productTime}}</p>
                <p style="">总寿命：{{data_item.life}}</p>
                <p style="">阶段行驶里程：{{data_item.stageCourse}}</p>
                <p style="">大修次数：{{data_item.repairNumber}}</p> -->

            </div>

            <i  class="icon iconfont icon-switch" @click.stop="showSheetMenu()"></i>
                </div>
        </div>
</template>


<script>
    import 'src/style/css/iconfont.css'

    export default { 
        components: {},
         props: { 
            item: { 
                type: Object 
            } 
        },
         data() { 
            return { 
                showSheets: false,
                data_item: {},
                imgBaseUrl: '/img/'
            } 
        },
         methods: {

            //向右的小图标动画
             
            toggleSheet: function(index) { 
                console.log(this.$refs); 
                this.$refs.toggleicon.style.transform = !this.showSheets ? 'rotate(90deg)' : 'rotate(0)'
                this.showSheets = !this.showSheets 
            },
             showSheetMenu: function() { 
            },
            location(id) {
                this.$router.push('carDetail?id='+id);
            }
        },
         created() {
            console.log(this.imgBaseUrl); 
            this.data_item = this.item; 
        },
    }
</script>


<style scoped>
    .sheet-list {
        clear: both;
    }

    .sheet-header {
        height: 30px;
        background: #e5e5e5;
        position: relative;
    }

    .sheet-header i:nth-child(1) {
        line-height: 30px;
        position: absolute;
        left: 10px;
        color: #666;
        transition: all 0.5s;
    }

    .sheet-header-i {
        line-height: 30px;
        position: absolute;
        right: 10px;
    }

    .sheet-header-span {
        left: 40px;
        font-size: 14px;
        position: absolute;
        line-height: 30px;
    }

    .sheet-content {
        position: relative;
        width: 100%;
        display: flex;
    }

    .sheet-content i {
        font-size: 26px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
    }

    .sheet-content-image {
        width: 60px;
        float: left;
        text-align: center;
    }

    .sheet-content-middle {
        position: relative;
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 10px;
        margin-top: 10px;
        margin-left: 10px;
    }

    .sheet-content-middle p {
        font-size: 16px;
        width: 70%;
        color: #666;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>

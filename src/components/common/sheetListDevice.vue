<template>

    <div class="sheet-list">

        <div class="sheet-header" @click="toggleSheet">
            <i class="icon iconfont icon-enter" ref="toggleicon"></i>   <span class="sheet-header-span">名称：{{data_item.filed1}} <span></span></span>
            <i class="sheet-header-i icon iconfont icon-setup" @click.stop="showSheetMenu(data_item.filed1)"></i>   </div>

        <div @click="location(data_item.device_id)" v-if="showSheets" class="sheet-content">

            <div class="sheet-content-middle">

                <p style="">名称：{{data_item.filed1}}</p>
                <p style="">型号：{{data_item.filed2}}</p>
                <p style="">机型：{{data_item.filed12}}</p>
                <p style="">制造厂：{{data_item.filed3}}</p>
                <p style="">总日历：{{data_item.filed4}}</p>
                <p style="">总小时寿命：{{data_item.filed5}}</p>
                <p style="">总起落：{{data_item.filed6}}</p>
                <p style="">阈值：{{data_item.filed7}}</p>

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
            } ,
            location(id) {
                this.$router.push('deviceDetail?id='+id);
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

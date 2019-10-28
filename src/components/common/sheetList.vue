<template>

    <div class="sheet-list">

        <div class="sheet-header" @click="toggleSheet">
            <i class="icon iconfont icon-enter" ref="toggleicon"></i>   <span class="sheet-header-span">姓名：{{data_item.user_name}} <span></span></span>
            <i class="sheet-header-i icon iconfont icon-setup" @click.stop="showSheetMenu(data_item.user_name)"></i>   </div>

        <div @click="location(data_item.person_id)" v-if="showSheets" class="sheet-content">

            <div class="sheet-content-image">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569637830871&di=9728de73cfc5208ac596754150427282&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F08%2F27%2F7f4e7bd3538f17d9ee834249b44c2a74.jpg" width="50" height="50" style="padding: 5px;overflow: hidden">   </div>

            <div class="sheet-content-middle">

                <p style="">性别：{{data_item.sex}}</p>
                <p style="">分队：{{data_item.detachment}}</p>
                <p style="">职务：{{data_item.type}}</p>
                <p style="">联系方式：{{data_item.phone}}</p>
                <p style="">单位：{{data_item.organiz}}</p>
                <p style="">籍贯：{{data_item.native}}</p>
                <p style="">专业：{{data_item.major}}</p>
                <p style="">等级：{{data_item.grade}}</p>
                <!-- <p style="">{{data_item.bindAir}}</p>
                <p style="">入伍时间：{{data_item.enlist}}</p>
                <p style="">毕业院校：{{data_item.school}}</p>
                <p style="">重大任务：{{data_item.greatTask}}</p> -->
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
                 data_item: {} 
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
                this.$router.push('personDetail?id='+id);
            }
        },
         created() { 
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

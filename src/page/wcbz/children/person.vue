<template>
  	<div class="city_container">
        <head-top head-title="机务人员" go-back='true'>

        </head-top>
        机务人员数:{{personCount.count}}
        <SheetList v-for="(item,index) in personData.data" :item="item"></SheetList>
        <router-link to="addPerson">
            <button class="button">添加机务人员</button>
        </router-link>
        <footGuide></footGuide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import { getPersonnel,getPersonnelCount } from '../../../service/getData';
    import SheetList from 'components/common/SheetList.vue'
    import mixin from '../../../mixin'

    export default {
    	data(){
            return{
                personData: {},
                personCount: 0
            }
        },

        mounted(){
            this.initData();
        },

        components:{
            headTop,
            SheetList
        },

        computed:{

        },
        mixins: [mixin],

        methods:{
            async initData(){
                this.personCount = await getPersonnelCount();
                this.personData = await getPersonnel();
                console.log(this.personData);
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
    }



</style>

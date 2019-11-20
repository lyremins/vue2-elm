<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<svg-icon></svg-icon>
    </div>
</template>

<script>
	import svgIcon from './components/common/svg';
  	export default {
    	components:{
            svgIcon
        },
  	}

</script>

<style lang="scss">
  	@import './style/common';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
        .mint-cell-wrapper {
            background-image: none!important;
            padding: 0px!important;

        }
        .mint-field .mint-cell-value {
            // height: 100PX;
        }
        .mint-cell:last-child {
            background-image: none!important;
        }
        .mint-field .mint-cell-value {
            width: 300PX;
        }
    .is-current {
        // border: 1px solid #3891e4;
        color: #3891e4;
    }
    .el-tree-node__content {
    border-bottom: 1px solid #e6e6e6;
    padding: 15px;
  }
</style>

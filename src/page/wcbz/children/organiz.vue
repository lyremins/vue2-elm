<template>
  	<div class="city_container">
       <div class="custom-tree-container">
        <div class="block">
            <!-- <p>使用 render-content</p>
            <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
            </el-tree> -->
        </div>
        <div class="block">
            <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span @click="() => selectData(node.label)" class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                <el-button
                    type="text"
                    size="mini"
                    @click="() => append(data)">
                    添加
                </el-button>
                <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)">
                    删除
                </el-button>
                </span>
            </span>
            </el-tree>
        </div>
        </div>
        <div class="inputClass">
            <input placeholder="在此输入单位名称" type="text" v-model="test">
        </div>
        <div class="buttonGroup">
            <button @click="save()"  class="button">保存</button>
            <button @click="saveComponay()" class="button">设为我的部门</button>
        </div>
    </div>
</template>

<script>
import { addOrganiz,getOrganiz,updateOrganiz,updatePersonOrganiz } from '../../../service/getData';
   let id = 1000;

  export default {
    data() {
      const data = [];
      return {
        test: '',
        popupVisible: false,
        orData:{},
        data: JSON.parse(JSON.stringify(data)),
        data: JSON.parse(JSON.stringify(data)),
        user_id: this.$util.getUrlKey('uid'),
        select: [],
        company: ''
      }
    },
    mounted() {
        this.getData();
    },

    methods: {
        selectData(data) {
            this.company = data;
        },
      async getData() {
        const data = await getOrganiz();
        this.orData = data.data;
        this.data = data.data[0].organizArray;
      },
      saveComponay() {
          updatePersonOrganiz({
              user_id: this.user_id,
              orgname: this.company
          })
          this.$toast('更新单位成功');
      },
      save() {
          updateOrganiz({
              organiz_id: this.orData[0].organiz_id,
              organizArray: this.data
          });
          this.$toast('保存成功');
      },
      inputText(data) {
          this.popupVisible = !this.popupVisible;
      },
      append(data) {
        if (!this.test) {
            this.$toast('请输入单位名称');
            return ;
        }
        const newChild = { id: id++, label: this.test, children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
        this.test = "";
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      renderContent(h, { node, data, store }) {
        return(
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      }
    }
  };

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container {
        margin-top: 20PX;
    }
    .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8PX;
  }
  .inputClass {
      text-align: center;
      input {
          width: 80%;
          height: 30PX;
          border: 1px solid #e8e8e8;
          padding: 5PX;
      }
  }
  .buttonBox {
      text-align: center;
      margin-top: 20PX;
  }
  .button {
      width: 100%;
      background-color: cadetblue;
      color: #fff;
      padding: 15PX;
      margin: 10PX auto;
  }
  .el-tree {
      background-color: #F5F5F5;
  }
  .el-tree-node {
    .is-current {
        background-color: red;
    }
  }
  .el-tree-node__content {
      &:hover {
          background-color: red!important;
      }
  }
  .buttonGroup {
        position: fixed;
        left: 1px;
        bottom: 0px;
        width: 100%;
        background-color: #fff;
        padding: 10PX;
        text-align: center;
        }
    .button {
        background-color: #3190e8;
        color: #fff;
        padding: 0.4rem;
        width: 45%;
        margin-top: 0.6rem;
        font-size: 16px
    }



</style>

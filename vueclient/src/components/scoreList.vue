<template>
  <div class="adminList main">
    <div class="input_box">
      <input v-model="Admin.name" class="myinput" type="text" placeholder="学生姓名">
      <input v-model="Admin.xid" class="myinput" type="text" placeholder="学生学号">
      <input v-model="Admin.math" class="myinput" type="text" placeholder="数学成绩">
      <input v-model="Admin.english" class="myinput" type="text" placeholder="英语成绩">
      <input v-model="Admin.chinese" class="myinput" type="text" placeholder="语文成绩">
      <button v-if="!editAdminObj" class="btn" @click="addAdmin()">
        <i class="fa fa-plus" aria-hidden="true"></i>添加
      </button>
      <button v-if="editAdminObj" class="btn" @click="saveEditAdmin()">
        <i class="fa fa-save" aria-hidden="true"></i>保存
      </button>
      <button style="opacity: 0.8;" v-if="editAdminObj" class="btn" @click="cancelEditAdmin()">
        <i class="fa fa fa-times-circle-o" aria-hidden="true"></i>取消
      </button>
    </div>
    <grid
      :listData="listData"
      :theadData="theadData"
      :ifEdit="true"
      :ifDelete="true"
      :ifpage="true"
      :pageInfo="pageInfo"
      @on-delete="deleteAdmin"
      @on-edit="editAdmin"
      @on-gopage="gopage"
    ></grid>
  </div>
</template>

<script>
var theadData = [
  {
    title: "姓名",
    keyname: "name"
  },

  {
    title: "学号",
    keyname: "xid"
  },
  {
    title: "数学",
    keyname: "math"
  },
  {
    title: "英语",
    keyname: "english"
  },
  {
    title: "语文",
    keyname: "chinese"
  }
];
import grid from "./grid.vue";
export default {
  name: "adminList",
  data() {
    return {
      listData: [],
      theadData: theadData,
      pageInfo: {},
      Admin: {
        //用户信息
        name: "",
        xid:"",
        math:"",
        english:"",
        chinese:"",
        id:"未填写",
        nation:"未填写",
        age:"未填写",
        sex:"未填写",
        phone:"未填写"
      },
    };
  },
  mounted: function() {
    this.getAdminList(1);
  },
  methods: {
    getAdminList(page) {
      //学生列表
      var _this = this;
      this.$reqs
        .post("/users/StudentList", {
          page: page
        })
        .then(function(result) {
          //成功
          _this.listData = result.data.data;
          console.log(_this.listData.total)
          _this.pageInfo.allpage = Math.ceil(result.data.total / 20);
        })
        .catch(function(error) {
          //失败
          console.log(error);
        });
    },
    addAdmin() {
      //添加用户
      if (!this.Admin.name ||   !this.Admin.xid ||  !this.Admin.math|| !this.Admin.english|| !this.Admin.chinese) {
        alert("不能为空");
        return false;
      }
      this.$reqs
        .post("/users/addss", this.Admin)
        .then(result => {
          //成功
          this.getAdminList();
          this.emptyAdmin();
        })
        .catch(function(error) {
          //失败
          console.log(error);
        });
    },
    editAdmin(item) {
      //编辑用户
      this.editAdminObj = item;
      this.Admin = JSON.parse(JSON.stringify(item));
    },
    saveEditAdmin() {
      if (!this.Admin.name ||   !this.Admin.xid ||  !this.Admin.math|| !this.Admin.english|| !this.Admin.chinese) {
        alert("不能为空");
        return false;
      }
      this.$reqs
        .post("/users/updatesss", this.Admin)
        .then(result => {
          //成功
          this.gopage(this.pageInfo.current);

          this.editAdminObj = null;
          this.emptyAdmin();
        })
        .catch(function(error) {
          //失败
          console.log(error);
        });
    },
    cancelEditAdmin() {
      this.editAdminObj = null;
      this.emptyAdmin();
    },
    emptyAdmin() {
      //清空输入框（多次使用，所以封装到这里）
      this.Admin.name = "";
      this.Admin.xid= "";
      this.Admin.math = "";
      this.Admin.english = "";
      this.Admin.chinese = "";
    },
    deleteAdmin(item) {
      this.$reqs
        .post("/users/deletesss", item)
        .then(result => {
          //成功
          this.gopage(this.pageInfo.current);
          this.emptyAdmin();
        })
        .catch(function(error) {
          //失败
          console.log(error);
        });
    },
    gopage(index) {
      this.pageInfo.current = index;
      //查询数据
      this.getAdminList(index);
    }
  },
  components: { grid }
};
</script>

<style scoped>
.main {
  border-radius: 4px;
  background: #fff;
  margin-top: 10px;
}

.input_box {
  padding: 0 10px;
}
.input_box .myinput {
  width: 15%;
}
</style>

<template>
  <div class="adminList main">
    <div class="input_box">
      <input v-model="Admin.name" class="myinput" type="text" placeholder="学生姓名">
      <input v-model="Admin.age" class="myinput" type="text" placeholder="学生年龄">
      <input v-model="Admin.sex" class="myinput" type="text" placeholder="学生性别">
      <input v-model="Admin.xid" class="myinput" type="text" placeholder="学生学号">
      <input v-model="Admin.id" class="myinput" type="text" placeholder="学生身份证号">
      <input v-model="Admin.nation" class="myinput" type="text" placeholder="学生民族">
      <input v-model="Admin.phone" class="myinput" type="text" placeholder="学生电话">
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
    title: "年龄",
    keyname: "age"
  },
  {
    title: "性别",
    keyname: "sex"
  },
  {
    title: "学号",
    keyname: "xid"
  },
  {
    title: "身份证号",
    keyname: "id"
  },
  {
    title: "民族",
    keyname: "nation"
  },
  {
    title: "手机号",
    keyname: "phone"
  }
];
import grid from "./grid.vue";
export default {
  name: "adminList",
  data() {
    return {
      listData: [],
      theadData: theadData,
      Admin: {
        //用户信息
        name: "",
        age:"",
        sex:"",
        xid:"",
        id:"",
        nation:"",
        phone:"",
        math:"未录入",
        english:"未录入",
        chinese:"未录入"
      },
      editAdminObj: null, //用于存放正在编辑的用户
      pageInfo: {}
    };
  },
  mounted: function() {
    this.getAdminList(1);
  },
  methods: {
    getAdminList(page) {
      var _this = this;

      this.$reqs
        .post("/users/StudentList", {
          page: page
        })
        .then(function(result) {
          //成功
          _this.listData = result.data.data;
          _this.pageInfo.allpage = Math.ceil(result.data.total / 20);
        })
        .catch(function(error) {
          //失败
          console.log(error);
        });
    },
    addAdmin() {
      //添加用户
      if (!this.Admin.name || !this.Admin.sex || !this.Admin.age|| !this.Admin.xid || !this.Admin.id 
      || !this.Admin.nation|| !this.Admin.phone){
        alert("不能为空");
        return false;
      }
      this.$reqs
        .post("/users/adds", this.Admin)
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
      if (!this.Admin.name || !this.Admin.sex || !this.Admin.age|| !this.Admin.xid || !this.Admin.id 
      || !this.Admin.nation|| !this.Admin.phone) {
        alert("不能为空");
        return false;
      }
      this.$reqs
        .post("/users/updates", this.Admin)
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
      this.Admin.age = "";
      this.Admin.sex = "";
      this.Admin.xid = "";
      this.Admin.id = "";
      this.Admin.nation = "";
      this.Admin.phone = "";
    },
    deleteAdmin(item) {
      this.$reqs
        .post("/users/deletess", item)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  width: 12%;
}
</style>
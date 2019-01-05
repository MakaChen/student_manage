<template>
  <div class="search_box">
    <div class="input_box">
      <input class="myinput" type="text" placeholder="学生姓名" v-model="name">
      <select class="myinput" v-model="age">
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
      </select>
      <select class="myinput" v-model="sex">
        <option value="男">男</option>
        <option value="女">女</option>
      </select>
      <input class="myinput" type="text" placeholder="学生学号" v-model="xid">
      <input class="myinput" type="text" placeholder="学生民族" v-model="nation">
      <input class="myinput" type="text" placeholder="数学成绩" v-model="math">
      <input class="myinput" type="text" placeholder="英语成绩" v-model="english">
      <input class="myinput" type="text" placeholder="语文成绩" v-model="chinese">
      <span class="search_btn" @click="find">查询</span>
    </div>
    <table border cellspacing cellpadding>
      <thead>
        <tr>
          <th v-for="(item,index) in theadData">{{item.title}}</th>
        </tr>
        <tr v-for="(item, index) in search_data">
          <td>{{item.name}}</td>
          <td>{{item.age}}</td>
          <td>{{item.sex}}</td>
          <td>{{item.xid}}</td>
          <td>{{item.nation}}</td>
          <td>{{item.math}}</td>
          <td>{{item.english}}</td>
          <td>{{item.chinese}}</td>
        </tr>
      </thead>
    </table>
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
    title: "民族",
    keyname: "nation"
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
export default {
  data() {
    return {
      search_data: [],
      theadData: theadData
    };
  },
  mounted: function() {
    this.getAdminList();
  },
  methods: {
    getAdminList() {
      //学生列表
      var _this = this; //区别this
      this.$reqs
        .post("/users/StudentList", {})
        .then(function(result) {
          //成功
          _this.listData = result.data.data;
        })
        .catch(function(error) {
          //失败
          console.log(error);
        });
    },
    //查询
    find() {
      var data = this.listData;
      var name = this.name;
      var age = this.age;
      var sex = this.sex;
      var xid = this.xid;
      var nation = this.nation;
      var math = this.math;
      var english = this.english;
      var chinese = this.chinese;
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        //循环一个结果无法实现多条件查询
        if (
          data[i].name == name ||
          data[i].age == age ||
          data[i].sex == sex ||
          data[i].xid == xid ||
          data[i].math == math ||
          data[i].english == english ||
          data[i].chinese == chinese||
          data[i].nation==nation
        ) {
          var s = data[i];
          arr.push(s);
        }
        this.search_data = arr;
      }
      this.empty();
    },
    empty() {
      //清空输入框
      this.name = "";
      this.age = "";
      this.sex = "";
      this.xid = "";
      this.nation = "";
      this.math = "";
      this.english = "";
      this.chinese = "";
    }
  }
};
</script>
<style>
.input_box {
  padding: 0 10px;
}
.input_box .myinput {
  width: 10%;
}
.search_box {
  margin: auto;
}
.search_btn {
  padding: 3px 10px;
  border: #ccc solid 1px;
  border-radius: 2px;
  color: #51555a;
  cursor: pointer;
  margin-left: 20px;
}
.search_btn:hover {
  color: #000;
}
table {
  border: none 0;
  border-collapse: collapse;
  color: #51555a;
  width: 100%;
  border-bottom: 1px solid #dfe3ea;
}
td,
th {
  padding: 10px 20px;
  text-align: left;
  border-width: 0;
}
thead tr,
tr:nth-of-type(even) {
  background: #f8f9fb;
}
tbody tr:hover {
  background: #f4f6fb;
}
td .fa {
  padding: 0 5px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
}
td .fa:first-child {
  margin-left: 10px;
}
tr:hover .fa {
  opacity: 1;
}
td .fa:hover {
  color: #4187db;
  transform: scale(1.2);
}
</style>

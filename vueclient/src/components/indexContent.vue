<template>
  <div class="main">
    <span class="copy_btn" @click="export2Excel">备份</span>
    <router-link to="/backIndex/searchIndex">
      <button class="search_btn">查询</button>
    </router-link>
    <table border cellspacing cellpadding>
      <thead>
        <tr>
          <th>序号</th>
          <th v-for="(item,index) in theadData">{{item.title}}</th>
        </tr>
        <tr v-if="!listData.length">
          <td>1</td>
          <td>没有数据 . . .</td>
          <td v-for="(item, index) in theadData" v-if="index<=theadData.length-2"></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listData">
          <td>{{index+1}}</td>
          <td>{{item.name}}</td>
          <td>{{item.age}}</td>
          <td>{{item.sex}}</td>
          <td>{{item.xid}}</td>
          <td>{{item.id}}</td>
          <td>{{item.nation}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.math}}</td>
          <td>{{item.english}}</td>
          <td>{{item.chinese}}</td>
          <td>{{ parseInt(item.math)+parseInt(item.english)+parseInt(item.chinese)}}</td>
          <td>{{ ((parseInt(item.math)+parseInt(item.english)+parseInt(item.chinese))/3).toFixed(1)}}</td>
        </tr>
      </tbody>
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
  },
  {
    title: "总分",
    keyname: "total"
  },
  {
    title: "平均分",
    keyname: "average"
  }
];

export default {
  data() {
    return {
      listData: [],
      theadData: theadData,
      // tableData:[{
      //   name:this.item.name,
      //   age:this.item.age,
      //   sex:this.item.sex,
      //   xid:this.item.xid,
      //   id:this.item.id,
      //   nation:this.item.nation,
      //   phone:this.item.phone,
      //   math:this.item.math,
      //   english:this.item.english,
      //   chinese:this.item.chinese
      // }]
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
    //备份
    export2Excel() {
      require.ensure([], () => {
        let { exportJsonToExcel } = require("@/vendor/Export2Excel");
        // 表头
        let tHeader = ["姓名", "年龄", "性别","学号","身份证号","民族","联系电话","数学","英语","语文"];
        //表头对应字段名，要和下面数据key对应
        let filterVal = ["name", "age", "sex","xid","id","nation","phone","math","english","chinese"];
        // 数据来源
        let list = this.listData;
        
        let data = this.formatJson(filterVal, list); //数据格式化
        var index1 = "资源列表"; //导出时文件名
        exportJsonToExcel(tHeader, data, index1); //导出文件
      });
    },
    // 数据格式化
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>

<style scoped>
.main {
  border-radius: 4px;
  background: #fff;
  margin-top: 10px;
}
.search_box {
  margin: 10px 20px;
  padding: 5px;
  border-radius: 1px;
  float: right;
}
.search_btn {
  float: right;
  margin: 5px 0px;
  padding: 8px 15px;
  cursor: pointer;
  background-color: #dfe3ea;
  border: #ccc solid 1px;
  border-radius: 5px;
  color: #51555a;
}
.search_btn:hover {
  color: #000;
}
.copy_btn:hover {
  color: #000;
}
.copy_btn {
  float: right;
  margin: 5px 20px;
  padding: 8px 15px;
  cursor: pointer;
  background-color: #dfe3ea;
  border: #ccc solid 1px;
  border-radius: 5px;
  color: #51555a;
}
.input_box {
  padding: 0 10px;
}
.input_box .myinput {
  width: 25%;
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

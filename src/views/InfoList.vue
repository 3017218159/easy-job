<template>
  <div class="info-square">
    <h1>招聘广场</h1>
    <el-row class="square-header">
      <el-dropdown @command="changeCate">
        <el-button type="primary">
          类别<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="全部">全部</el-dropdown-item>
          <el-dropdown-item command="销售">销售</el-dropdown-item>
          <el-dropdown-item command="人事">人事</el-dropdown-item>
          <el-dropdown-item command="技术">技术</el-dropdown-item>
          <el-dropdown-item command="金融">金融</el-dropdown-item>
          <el-dropdown-item command="教育">教育</el-dropdown-item>
          <el-dropdown-item command="运营">运营</el-dropdown-item>
          <el-dropdown-item command="服务业">服务业</el-dropdown-item>
          <el-dropdown-item command="后勤">后勤</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-input
        placeholder="请输入搜索内容"
        prefix-icon="el-icon-search"
        v-model="searchInput"
      >
      </el-input>
    </el-row>
    <ul class="info-list" v-if="users.status === 'STUDENT'">
      <li
        v-for="enterpriseInfo in enterpriseInfoList"
        :key="enterpriseInfo.content.id"
      >
        <info-card
          :type="users.status"
          :info="enterpriseInfo"
          @onToChat="toChat"
        />
      </li>
    </ul>
    <ul class="info-list" v-else>
      <li v-for="studentInfo in studentInfoList" :key="studentInfo.content.id">
        <info-card
          :type="users.status"
          :info="studentInfo"
          @onToChat="toChat"
        />
      </li>
    </ul>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalInfos"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from "vuex";
import InfoCard from "../components/InfoCard.vue";

export default {
  components: {
    InfoCard,
  },
  data() {
    return {
      enterpriseInfoList: [
        {
          user: {
            id: "1",
            avatar:
              "https://img2.baidu.com/it/u=294573518,3786263664&fm=26&fmt=auto&gp=0.jpg",
            name: "张三",
          },
          content: {
            id: "1",
            company: "田金大学",
            position: "安保人员",
            salary: "3k-5k",
            discribe:
              "1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx",
            requirenment: "1. xxxxx\n2. xxxxx\n3. xxxxx",
          },
        },
        {
          user: {
            id: "2",
            avatar:
              "https://img1.baidu.com/it/u=4124593859,2213805966&fm=26&fmt=auto&gp=0.jpg",
            name: "李四",
          },
          content: {
            id: "2",
            company: "金南派出所",
            position: "打字员",
            salary: "5k-6k",
            discribe:
              "1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx",
            requirenment: "1. xxxxx\n2. xxxxx\n3. xxxxx",
          },
        },
        {
          user: {
            id: "3",
            avatar:
              "https://img0.baidu.com/it/u=229157680,1590894473&fm=26&fmt=auto&gp=0.jpg",
            name: "王五",
          },
          content: {
            id: "3",
            company: "企鹅科技有限公司",
            position: "前端开发工程师",
            salary: "8k-10k",
            discribe:
              "1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx",
            requirenment: "1. xxxxx\n2. xxxxx\n3. xxxxx",
          },
        },
      ],
      studentInfoList: [
        {
          user: {
            id: "1",
            avatar:
              "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            name: "lichen",
            sex: "man",
            birth: "19980827",
          },
          content: {
            id: "1",
            school: "Tianjin University",
            major: "software engineer",
            position: "front end",
            skill:
              "1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx",
            experience: "1. xxxxx\n2. xxxxx\n3. xxxxx",
          },
        },
      ],
      searchInput: "",
      totalInfos: 0,
      currentPage: 1,
      pageSize: 10,
      currentCate: "全部",
    };
  },
  mounted() {
    this.getInfos(this.currentCate);
  },
  methods: {
    toChat(toUser) {
      // console.log("chat to", toUser);
      this.$router.push({ name: "ChatDetail", params: toUser });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getInfos(this.currentCate);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getInfos(this.currentCate);
    },
    changeCate(val = "全部") {
       this.currentCate = val;
       this.currentPage = 1;
       this.getInfos(val);
    },
    getInfos(val) {
      axios.get("/Square/getInfos", {
        params: {
          categary: val,
          userType: this.users.status,
          offset: this.currentPage,
          pageSize: this.pageSize
        }
      }).then((res) => {
        this.totalInfos = Number(res.data.message.total);
        this.enterpriseInfoList = res.data.message.data;
      }).catch(() => {
        this.$message.error("请求失败，请检查网络");
      })
    },
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
};
</script>

<style lang="scss">
.info-square {
  .square-header {
    text-align: right;
    .el-input {
      width: 200px;
      margin-left: 10px;
    }
  }
  .info-list {
    li {
      list-style-type: none;
      text-align: left;

      .box-card {
        margin-top: 20px;

        p {
          word-break: break-word;
        }
      }
      .username {
        margin-left: 10px;
      }
      .text {
        font-size: 14px;
      }

      .item {
        margin-bottom: 18px;
      }

      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both;
      }
    }
  }
}
</style>

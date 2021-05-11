<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <Avatar :imgUrl="info.user.avatar" style="float: left" />
      <span class="username" style="float: left; padding: 10px 10px">{{
        info.user.name
      }}</span>
      <el-button
        style="float: right; padding: 10px 0"
        type="text"
        @click="openDetail"
      >
        查看详情
      </el-button>
      <el-button
        style="float: right; padding: 10px 10px"
        type="text"
        @click="toChat"
      >
        聊天
      </el-button>
    </div>
    <template v-if="type === 'STUDENT'">
      <p class="text item">
        {{ "公司名称： " + info.content.company }}
      </p>
      <p class="text item">
        {{ "职位名称： " + info.content.position }}
      </p>
      <p class="text item">
        {{ "薪资： " + info.content.salary }}
      </p>
      <!-- <p class="text item">
        {{ "职位要求： " + info.content.requirenment }}
      </p> -->
    </template>
    <template v-else>
      <p class="text item">
        {{ "就读院校： " + info.content.school }}
      </p>
      <p class="text item">
        {{ "专业名称： " + info.content.major }}
      </p>
      <p class="text item">
        {{ "期望职位： " + info.content.position }}
      </p>
      <p class="text item">
        {{ "职业技能： " + info.content.skill }}
      </p>
      <p class="text item">
        {{ "个人经历： " + info.content.experience }}
      </p>
    </template>
    <el-dialog title="详情" :visible.sync="detailVisible">
      <h2>{{ info.content.position }}</h2>
      <span
        ><i class="el-icon-s-cooperation"></i>{{ info.content.company }}</span
      >
      <el-divider direction="vertical"></el-divider>
      <span><i class="el-icon-coin"></i>{{ info.content.salary }}</span>
      <p><i class="el-icon-time"></i>{{ formatTime }}</p>
      <el-divider></el-divider>
      <h3>职位描述</h3>
      <p>
        <template v-for="(p, index) in discribeList">
          {{ p }}<br :key="index" />
        </template>
      </p>
      <h3>职位需求</h3>
      <p>
        <template v-for="(p, index) in requirementList">
          {{ p }}<br :key="index" />
        </template>
      </p>
    </el-dialog>
  </el-card>
</template>

<script>
import Avatar from "./Avatar.vue";

export default {
  props: {
    type: String,
    info: Object,
  },
  data() {
    return {
      detailVisible: false,
      formatTime: "",
      discribeList: [],
      requirementList: [],
    };
  },
  mounted() {},
  components: {
    Avatar,
  },
  methods: {
    toChat() {
      // console.log(this.info);
      this.$emit("onToChat", {
        userId: this.info.user.userId,
        name: this.info.user.name,
        avatar: this.info.user.avatar,
      });
    },
    openDetail() {
      this.detailVisible = true;
      const d = new Date(this.info.content.datetime);
      this.formatTime =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      this.discribeList = this.info.content.discribe.split("\n");
      this.requirementList = this.info.content.requirement.split("\n");
    },
  },
};
</script>

<style></style>

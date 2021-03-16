<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <Avatar :imgUrl="info.user.avatar" />
      <span class="username" v-if="type === 'STUDENT'">{{ info.user.name }}</span>
      <span class="username" v-else>{{ info.user.name + " " + info.user.sex + " " + info.user.birth }}</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="toChat"
      >
        沟通一下
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
        {{ "职位描述： " + info.content.discribe }}
      </p>
      <p class="text item">
        {{ "职位要求： " + info.content.requirenment }}
      </p>
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
  </el-card>
</template>

<script>
import Avatar from "./Avatar.vue";

export default {
  props: {
    type: String,
    info: Object,
  },
  components: {
    Avatar,
  },
  methods: {
    toChat() {
      this.$emit("onToChat", this.info.user.id);
    },
  },
};
</script>

<style></style>

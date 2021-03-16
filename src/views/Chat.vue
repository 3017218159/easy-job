<template>
  <div>
    <el-table
      :data="chatList"
      :show-header="false"
      @row-click="toChatDetail"
      style="width: 100%">
      <el-table-column
        prop="avatar"
        width="60">
        <template slot-scope="scope">
          <Avatar :imgUrl="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        width="100">
      </el-table-column>
      <el-table-column
        prop="content">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Avatar from '../components/Avatar.vue';

export default {
  components: { Avatar },
  data() {
    return {
      chatList: [
        {
          avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "lichen",
          content: "hello",
        },
        {
          avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          name: "lichen",
          content: "hello",
        }
      ]
    }
  },
  methods: {
    toChatDetail(row) {
      this.$router.push({ path: "/chat/detail", query: { toName: row.name } });
    },
  },
};
</script>

<style></style>

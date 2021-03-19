<template>
  <div class="info-square">
    <h1>招聘广场</h1>
    <ul class="info-list" v-if="users.status === 'STUDENT'">
      <li
        v-for="enterpriseInfo in enterpriseInfoList"
        :key="enterpriseInfo.content.id"
      >
        <info-card :type="users.status" :info="enterpriseInfo" @onToChat="toChat" />
      </li>
    </ul>
    <ul class="info-list" v-else>
      <li
        v-for="studentInfo in studentInfoList"
        :key="studentInfo.content.id"
      >
        <info-card :type="users.status" :info="studentInfo" @onToChat="toChat" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import InfoCard from '../components/InfoCard.vue';

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
              "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            name: "lichen",
          },
          content: {
            id: "1",
            company: "bytedance",
            position: "front end",
            discribe: "1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx",
            requirenment: "1. xxxxx\n2. xxxxx\n3. xxxxx",
          },
        },
        {
          user: {
            id: "2",
            avatar:
              "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            name: "lichen",
          },
          content: {
            id: "2",
            company: "bytedance",
            position: "front end",
            discribe: "1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx",
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
            skill: "1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx1. xxxxx\n2. xxxxx\n3. xxxxx",
            experience: "1. xxxxx\n2. xxxxx\n3. xxxxx",
          },
        }
      ]
    };
  },
  methods: {
    toChat(id) {
      console.log("chat to" ,id);
      this.$router.push("/chat");
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

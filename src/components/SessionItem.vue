<template>
  <div :class="'session-item' + className" v-if="isMine">
    <div class="chat-pop">
      <p>
        <template v-for="(p, index) in content">
          {{ p }}<br :key="index" />
        </template>
      </p>
    </div>
    <Avatar :imgUrl="fromAvatar" />
  </div>
  <div :class="'session-item' + className" v-else>
    <Avatar :imgUrl="toAvatar" />
    <div class="chat-pop">
      <p>
        <template v-for="(p, index) in content">
          {{ p }}<br :key="index" />
        </template>
      </p>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";

export default {
  props: {
    fromAvatar: String,
    toAvatar: String,
    isMine: Boolean,
    content: Array,
  },
  components: {
    Avatar,
  },
  data() {
    return {
      className: this.isMine ? " mine" : "",
    };
  },
};
</script>

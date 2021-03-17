<template>
  <div :class="'session-item' + className" v-if="isMine">
    <div class="chat-pop">
      <p>{{ content }}</p>
    </div>
    <Avatar :imgUrl="fromAvatar" />
  </div>
  <div :class="'session-item' + className" v-else>
    <Avatar :imgUrl="toAvatar" />
    <div class="chat-pop">
      <p>{{ content }}</p>
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
    content: String,
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

<template>
  <div
    @click="$emit('btn-click')"
    class ="button"
    :id="id"
  >
    <div class="button-icon"></div>
    <div class="button-text">{{ buttonText }}</div>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    id: String,
    subClass: String,
    buttonText: String,
  },
};
</script>

<style>
</style>
<template>
  <div class="component">

    {{ time }}
  </div>
</template>

<script>
export default {
  name: 'content',
  props: {
    content: {
      type: Object,
      default () {
        return {}
      }
    },
    time: {
      type: String
    }
  },
  async created () {
    let res = await this.$http({ url: '/findNow', data: { time: this.time }, method: 'POST' })
    console.log(res)
  }
}
</script>

<style lang="less" scoped>

</style>

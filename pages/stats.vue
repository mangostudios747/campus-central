<template>
<div>
  <graph-line-dateblock
    :width="600"
    :height="400"
    :axis-min="0"
    :axis-max="100"
    :axis-reverse="false"
    :axis-format="'HH:mm'"
    :axis-interval="1000 * 60 * 60 * 8"
    :labels="keys"
    :values="values">
    <note :text="'Line Chart'"></note>
  </graph-line-dateblock>
</div>
</template>

<script>
export default {
  name: 'stats',
  async asyncData({ $axios }) {
    const datums =  await $axios.$get('/api/user-count/log')
    datums.keys = datums.keys.map(a=>new Date(+a))
    return datums
  }
}
</script>

<style scoped>

</style>

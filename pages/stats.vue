<template>
<div >
  <graph-line-dateblock
    :width="1500"
    :height="400"
    :axis-min="Math.floor((Math.min(...values)-2)/5)*5"
    :axis-max="Math.ceil((Math.max(...values)+1)/5)*5"
    :axis-reverse="false"
    :axis-format="'HH:mm'"
    :axis-interval="1000 * 60 * 60"

    :labels="keys"
    :values="values">
    <note :text="'User Count'"></note>
  </graph-line-dateblock>
</div>
</template>

<script>
export default {
  name: 'stats',
  async asyncData({ $axios }) {
    const datums =  await $axios.$get('/cc/api/user-count/log')
    datums.keys = datums.keys.map(a=>new Date(+a))
    return datums
  }
}
</script>

<style scoped>

</style>

<template>
  <section class="offerIntro">
    <section class="house-info">
      <ul class="table-items" v-for="(itemList,index) in tableData" :key="index">
        <li class="tab_sty_item" v-for="item in itemList" :key="item.id" v-show="item.value !== null && item.value !== ''">
          <span class="label">{{item.label}}</span>
          <span class="value">{{item.value}}</span>
        </li>
      </ul>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    tableData: {
      default: () => {},
      type: [Object, Array]
    }
  }
}
</script>
<style lang="sass" scoped>
  .offerIntro
    .house-info
      .table-items
        border-bottom: 1px solid #F3F4F5
        width: 100%
        padding: 1.25em 3.75em
        .tab_sty_item
          display: flex
          justify-content: space-between
          align-items: center
          height: 48px
          span
            flex: 0 0 50%
            // width: 50
          .label
            font-size: 1.4375em
            color: #444
          .value
            font-size: 1.1875em
            color: #444
      .house
        border-bottom: none
</style>

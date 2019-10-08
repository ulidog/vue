<template>
  <section class="section-potential">
    <h3 class="section-potential-title">
      <span v-if="detailData.releaseType === 3">Potential Buyers</span>
      <span v-else>Potential Renters</span>
    </h3>
    <section class="section-potential-list">
      <el-row class="table-part" :gutter="20" v-if="potentialData.length">
        <el-col v-for="(item, index) in potentialData" :key="index" :xs="24" :sm="24" :lg="12">
          <router-link class="table-item" :to="{path: '/requestDetail', query: {id: item.id}}">
            <div class="table-item-row">
              <div class="table-item-row-full">
                <div class="table-item-row-middle">
                  <img :src="item.userHeadUrl" alt="" class="table-item-avatar">
                </div>
                <div class="table-item-row-middle">
                  <p>
                    <span class="table-item-name">{{item.contactName}}</span>
                    <span class="table-item-time">{{item.addTimeFormatDate}}</span>
                  </p>
                </div>
              </div>
              <div class="table-item-row-middle">
                <p class="table-item-price">
                  ${{item.priceMin | priceFormat}}-{{item.priceMax | priceFormat}}
                  <span v-if="item.releaseType === 1">/ mo</span>
                </p>
              </div>
            </div>
            <div class="table-item-row">
              <div class="bedroom param-item">
                <img src="/static/img/listing/icons/bed.png" />
                {{item.bedroom}}
                <span v-if="parseInt(item.bedroom)">bds</span>
              </div>
              <div class="bathroom param-item">
                <img src="/static/img/listing/icons/bath.png" />
                {{item.bathroom}}
                <span>ba</span>
              </div>
              <div class="sqft param-item">
                <img src="/static/img/listing/icons/Sqft.png" />
                {{item.livingSqlfMax}}
                <span>sqft</span>
              </div>
            </div>
            <div class="table-item-row label-group">
              <template v-if="item.labelId">
                <div class="label-item" v-for="(labelItem, labelIndex) in item.labelId.split(',')" :key="labelIndex">
                  {{labelItem}}
                </div>
              </template>
            </div>
            <div class="table-item-footer">
              <div class="table-item-row">
                <div class="table-item-row-middle">
                  <img src="/static/img/common/header/location.png">
                </div>
                <span class="table-item-localtion">{{item.cityName}}, {{item.stateName}}</span>
              </div>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    potentialData: {
      type: Array,
      default () {
        return []
      }
    },
    detailData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    gotoDetail (_item) {
      this.$router.push({
        path: '/rentInRequestDetail',
        query: {id: _item.id}
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.section-potential
  margin-top: 4em
.section-potential-title
  color: #444
  font-size: 2.6em
  line-height: 3em
  text-align: center
.table-part
  margin-bottom: 50px
  display: flex
  flex-wrap: wrap
  .el-col
    margin-bottom: 20px
    width: calc(50% - 10px)
    .table-item
      cursor: pointer
      border-radius: 3px
      padding: 30px 30px 0
      border: 1px solid #E9EAED
      background-color: #fff
      transition: 0.2s all
      display: inline-block
      width: 100%
      color: #444
      &:hover
        transform: translateY(-5px)
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2)
      .table-item-row
        display: flex
        margin-bottom: 20px
        &:only-child
          margin: 0
        &.label-group
          min-height: 40px
          flex-wrap: wrap
          margin-bottom: 10px
        .table-item-row-full
          display: flex
          flex: 1
        .table-item-row-middle
          display: flex
          flex-direction: column
          justify-content: center
          &:not(:last-child)
            margin-right: 10px
          .table-item-avatar
            width: 50px
            height: 50px
            border-radius: 50%
            overflow: hidden
          .table-item-name
            font-size: 20px
          .table-item-time
            font-size: 15px
            color: #999999
          .table-item-price
            color: #F48A42
            font-size: 20px
        .param-item
          &:not(:last-child)
            margin-right: 30px
        .label-item
          font-size: 14px
          height: 30px
          line-height: 30px
          color: #1281FC
          background-color: #DDF1FE
          border-radius: 15px
          padding: 0 20px
          margin-bottom: 10px
          &:not(:last-child)
            margin-right: 10px
      .table-item-footer
        font-size: 18px
        height: 60px
        line-height: 60px
        border-top: 1px solid #ECECEC
        img
          height:
          vertical-align: middle
</style>

<template>
  <section class="container-table">
    <el-row class="table-part" :gutter="20">
      <el-col v-for="(item, index) in listData" :key="index" :xs="24" :sm="24" :lg="12">
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
                ${{item.priceMin|priceFormat}} - {{item.priceMax|priceFormat}}
                <span v-if="item.releaseType === 1">/ mo</span>
                <span v-if="item.releaseType === 2">/ mo</span>
              </p>
            </div>
          </div>
          <div class="table-item-row">
            <div class="bedroom param-item">
              <img src="/static/img/listing/icons/bed.png" />
              <span v-if="item.bedroom !== 'studio'">{{item.bedroom}}&nbsp;bds</span>
              <span v-else>&nbsp;Studio</span>
            </div>
            <div class="bathroom param-item">
              <img src="/static/img/listing/icons/bath.png" />
              {{item.bathroom}}
              <span> &nbsp;ba</span>
            </div>
            <div class="sqft param-item">
              <img src="/static/img/listing/icons/Sqft.png" />
              {{item.livingSqlfMax}}
              <span> &nbsp;sqft</span>
            </div>
          </div>
          <div class="table-item-row label-group">
            <div class="label-item" v-for="(labelItem, labelIndex) in item.labelId" :key="labelIndex">
              {{labelItem}}
            </div>
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
    <div class="page-part">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="dataTotal"
        @current-change="pageTurn">
      </el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    pageSize: {
      type: Number,
      default: 20
    },
    listData: {
      type: Array,
      default () {
        return []
      }
    },
    dataTotal: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    gotoDetail (_detailInfo) {
      this.$router.push({
        'path': '/requestDetail',
        'query': {id: _detailInfo.id}
      })
    },
    pageTurn (_num) {
      this.$emit('pageTurn', _num)
    }
  }
}
</script>

<style lang="sass" scoped>
.container-table
  margin: 80px auto
  .page-part
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
        transition: all .5s ease
        display: inline-block
        width: 100%
        color: #444
        &:hover
          box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.3)
          transform: scale(1.02)
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
            display: flex
            align-items: center
            img
              margin-right: 5px
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

<template>
  <section class="nullViews">
  </section>
</template>
<script>
export default {
  data () {
    return {
      loading: null,
      params: null,
      houseInfo: {
        state: 1
      },
      other: {
        tryInner: false,
        denialReason: null
      },
      timer: null,
      thisRole: null
    }
  },
  watch: {
    'houseInfo.state': function (val, oldVal) {
      this.goPage()
    }
  },
  methods: {
    getbuyState (_val) {
      const _this = this
      let prs
      if (_val.oldState) {
        prs = {saleHouseOrderId: _val.id, state: _val.oldState}
      } else {
        prs = {saleHouseOrderId: _val.id}
      }
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: prs})
        .then(res => {
          if (res.data.success) {
            // console.info(res.data)
            _this.thisRole = res.data.data.thisRole
            _this.houseInfo = res.data.data.saleHouseOrderInfo
            // 针对特殊状态值做指定处理
            try {
              if (res.data.data.tryInner !== undefined) {
                _this.other.tryInner = res.data.data.tryInner
              }
              if (res.data.data.saleHouseOrderRecordingInfo !== undefined) {
                if (res.data.data.saleHouseOrderRecordingInfo.denialReason !== undefined) {
                  _this.other.denialReason = res.data.data.saleHouseOrderRecordingInfo.denialReason
                } else {
                  _this.other.denialReason = null
                }
              }
              if (res.data.data.saleHouseOrderRecordingInfoTwo !== undefined) {
                if (res.data.data.saleHouseOrderRecordingInfoTwo.denialReason !== undefined) {
                  _this.other.denialReason = res.data.data.saleHouseOrderRecordingInfoTwo.denialReason
                } else {
                  _this.other.denialReason = null
                }
              }
              if (res.data.data.orderDickerInfo !== undefined) {
                if (res.data.data.orderDickerInfo.reduceReason !== undefined) {
                  _this.other.denialReason = res.data.data.orderDickerInfo.reduceReason
                } else {
                  _this.other.denialReason = null
                }
              }
            } catch (err) {
              _this.backMainChange({})
              console.info('tag', err)
            }
            _this.goPage()
            // console.log(_this.getStateUrlName({thisRole: res.data.data.thisRole, state: _this.houseInfo.state}))
          } else {
            _this.backMainChange({})
          }
        })
    },
    getleaseState (_val) {
      const _this = this
      let prs
      if (_val.oldState) {
        prs = {rentHouseOrderId: _val.id, state: _val.oldState}
      } else {
        prs = {rentHouseOrderId: _val.id}
      }
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: prs})
        .then(res => {
          if (res.data.success) {
            // console.info(res.data)
            _this.thisRole = res.data.data.thisRole
            _this.houseInfo = res.data.data.rentHouseOrderInfo
            // 针对特殊状态值做指定处理
            try {
              if (res.data.data.tryInner !== undefined) {
                _this.other.tryInner = res.data.data.tryInner
              }
              if (res.data.data.rentHouseOrderRecordingInfo !== undefined) {
                if (res.data.data.rentHouseOrderRecordingInfo.denialReason !== undefined) {
                  _this.other.denialReason = res.data.data.rentHouseOrderRecordingInfo.denialReason
                } else {
                  _this.other.denialReason = null
                }
              }
              if (res.data.data.rentHouseOrderDeductionInfo !== undefined) {
                if (res.data.data.rentHouseOrderDeductionInfo.deductionReason !== undefined) {
                  _this.other.denialReason = res.data.data.rentHouseOrderDeductionInfo.deductionReason
                } else {
                  _this.other.denialReason = null
                }
              }
            } catch (err) {
              console.info('tag', err)
            }
            _this.goPage()
            // console.log(_this.getStateUrlName({thisRole: res.data.data.thisRole, state: _this.houseInfo.state}))
          } else {
            _this.backMainChange({})
          }
        })
    },
    getStateUrlName (val) {
      let URL_NAME
      // 购买还是租赁
      if (Number(this.params.types) === 0) {
        switch (Number(this.params.type)) {
          // SFT
          case 0:
            // 是否买家 卖家区分 thisRole： 1 买家
            if (Number(val.thisRole) === 1) {
              switch (Number(val.state)) {
                case 1:
                  URL_NAME = 'buy-steps-01'
                  break
                case 2:
                  URL_NAME = 'buy-steps-02'
                  break
                case 3:
                case 4:
                  URL_NAME = 'buy-steps-03'
                  break
                case 5:
                case 6:
                  URL_NAME = 'buy-steps-04'
                  break
                case 7:
                  URL_NAME = 'buy-steps-04-view-reason'
                  break
                case 8:
                  if (this.other.denialReason !== null) {
                    URL_NAME = 'common-steps-08'
                  } else {
                    URL_NAME = 'buy-steps-05'
                  }
                  break
                case 9:
                  URL_NAME = 'buy-steps-06'
                  break
                case 10:
                  if (this.other.denialReason !== null) {
                    URL_NAME = 'buy-steps-05-view-reason'
                  } else {
                    URL_NAME = 'buy-steps-04'
                  }
                  break
                case 11:
                  URL_NAME = 'buy-steps-07'
                  break
                case 12:
                  URL_NAME = 'common-steps-01'
                  break
                case 13:
                  URL_NAME = 'buy-steps-09'
                  break
                case 14:
                  URL_NAME = 'buy-steps-13'
                  break
                case 15:
                  URL_NAME = 'buy-steps-11'
                  break
                case 16:
                  URL_NAME = 'common-steps-01'
                  break
                case 17:
                  URL_NAME = 'buy-steps-14'
                  break
                case 18:
                  URL_NAME = 'common-steps-01'
                  break
                case 19:
                  URL_NAME = 'buy-steps-16'
                  break
                case 20:
                  URL_NAME = 'buy-steps-20'
                  break
                case 21:
                  URL_NAME = 'buy-steps-19'
                  break
                case 22:
                  URL_NAME = 'buy-steps-21'
                  break
                case 23:
                  URL_NAME = 'buy-steps-22'
                  break
                case 194:
                  URL_NAME = 'buy-steps-23'
                  break
                case 192:
                  URL_NAME = 'buy-steps-24'
                  break
                case 24:
                  URL_NAME = 'buy-steps-26'
                  break
                case 25:
                  if (this.other.denialReason !== null) {
                    URL_NAME = 'buy-steps-28'
                  } else {
                    URL_NAME = 'buy-steps-27'
                  }
                  break
                case 26:
                  URL_NAME = 'buy-steps-27'
                  break
                case 281:
                  URL_NAME = 'buy-steps-29-base'
                  break
                case 27:
                case 28:
                  URL_NAME = 'buy-steps-29'
                  break
                case 191:
                  URL_NAME = 'common-steps-04'
                  break
                default:
                  URL_NAME = 'common-steps-05'
              }
            } else {
              switch (Number(val.state)) {
                case 1:
                case 2:
                  URL_NAME = 'sell-step-01'
                  break
                case 3:
                  URL_NAME = 'sell-step-02'
                  break
                case 4:
                case 5:
                  URL_NAME = 'sell-step-03'
                  break
                case 6:
                  URL_NAME = 'sell-step-04'
                  break
                case 7:
                  URL_NAME = 'sell-step-04-refuse'
                  break
                case 8:
                  if (this.other.denialReason !== null) {
                    URL_NAME = 'sell-step-base-05'
                  } else {
                    URL_NAME = 'sell-step-05'
                  }
                  break
                case 9:
                  URL_NAME = 'sell-step-05'
                  break
                case 10:
                  URL_NAME = 'sell-step-06'
                  break
                case 11:
                  URL_NAME = 'sell-step-07'
                  break
                case 12:
                  URL_NAME = 'common-steps-01'
                  break
                case 13:
                  URL_NAME = 'sell-step-08'
                  break
                case 14:
                  URL_NAME = 'sell-step-09'
                  break
                case 15:
                  URL_NAME = 'common-steps-01'
                  break
                case 16:
                case 17:
                  if (this.other.denialReason !== null) {
                    URL_NAME = 'sell-step-12'
                  } else {
                    URL_NAME = 'sell-step-11'
                  }
                  break
                case 18:
                  if (this.other.denialReason !== null) {
                    URL_NAME = 'sell-step-15'
                  } else {
                    URL_NAME = 'sell-step-13'
                  }
                  break
                case 19:
                  URL_NAME = 'sell-step-14'
                  break
                case 20:
                case 21:
                  if (this.other.denialReason !== null) {
                    URL_NAME = 'sell-step-16-refuse'
                  } else {
                    URL_NAME = 'sell-step-17'
                  }
                  break
                case 22:
                  URL_NAME = 'common-steps-01'
                  break
                case 23:
                  URL_NAME = 'sell-step-18'
                  break
                case 194:
                  URL_NAME = 'common-steps-01'
                  break
                case 192:
                  URL_NAME = 'sell-step-18'
                  break
                case 24:
                  URL_NAME = 'sell-step-18'
                  break
                case 25:
                  if (this.other.denialReason !== null) {
                    URL_NAME = 'sell-step-22'
                  } else {
                    URL_NAME = 'sell-step-18'
                  }
                  break
                case 26:
                case 27:
                  URL_NAME = 'sell-step-20'
                  break
                // case 27:
                //   URL_NAME = 'common-steps-01'
                //   break
                  // if (this.other.denialReason !== null) {
                  //   URL_NAME = 'sell-step-22'
                  // } else {
                  //   URL_NAME = 'sell-step-20'
                  // }
                  // break
                case 281:
                  URL_NAME = 'sell-step-25'
                  break
                case 28:
                  URL_NAME = 'sell-step-23'
                  break
                case 190:
                  URL_NAME = 'common-steps-04'
                  break
                default:
                  URL_NAME = 'common-steps-05'
              }
            }
            break
          // 普通交易
          default:
            console.log('普通交易')
            // 是否买家 卖家区分 thisRole： 1 买家
            if (Number(val.thisRole) === 1) {
              switch (Number(val.state)) {
                case 1:
                  URL_NAME = 'buy-steps-01'
                  break
                case 2:
                  URL_NAME = 'buy-steps-02'
                  break
                case 3:
                case 4:
                  URL_NAME = 'buy-steps-03'
                  break
                case 5:
                case 6:
                  URL_NAME = 'buy-steps-04'
                  break
                case 7:
                  URL_NAME = 'buy-steps-04-view-reason'
                  break
                case 8:
                  URL_NAME = 'buy-steps-05'
                  break
                case 9:
                  URL_NAME = 'buy-steps-06'
                  break
                // 准备开始移交表
                case 10:
                  if (this.other.denialReason !== null) {
                    URL_NAME = 'buy-steps-05-view-reason'
                  } else {
                    URL_NAME = 'buy-steps-07-wait'
                  }
                  break
                // 移交表
                case 11:
                  URL_NAME = 'buy-steps-07'
                  break
                case 22:
                  URL_NAME = 'buy-steps-21'
                  break
                // 退款
                case 196:
                  URL_NAME = 'common-steps-06'
                  break
                case 197:
                  URL_NAME = 'buy-steps-19'
                  break
                case 23:
                  URL_NAME = 'buy-steps-22'
                  break
                case 194:
                  URL_NAME = 'buy-steps-23'
                  break
                case 192:
                  URL_NAME = 'buy-steps-24'
                  break
                case 24:
                  URL_NAME = 'buy-steps-26'
                  break
                case 25:
                case 26:
                  URL_NAME = 'buy-steps-27'
                  break
                case 281:
                  URL_NAME = 'buy-steps-29-base'
                  break
                case 27:
                case 28:
                  URL_NAME = 'buy-steps-29'
                  break
                case 191:
                  URL_NAME = 'common-steps-04'
                  break
                default:
                  URL_NAME = 'common-steps-05'
              }
            } else {
              switch (Number(val.state)) {
                case 1:
                case 2:
                  URL_NAME = 'sell-step-01'
                  break
                case 3:
                  URL_NAME = 'sell-step-02'
                  break
                case 4:
                case 5:
                  URL_NAME = 'sell-step-03'
                  break
                case 6:
                  URL_NAME = 'sell-step-04'
                  break
                case 7:
                  URL_NAME = 'sell-step-04-refuse'
                  break
                case 8:
                case 9:
                  URL_NAME = 'sell-step-05'
                  break
                case 22:
                  URL_NAME = 'common-steps-06'
                  break
                case 23:
                  URL_NAME = 'sell-step-18'
                  break
                case 194:
                case 24:
                case 25:
                  URL_NAME = 'sell-step-27'
                  break
                case 192:
                  URL_NAME = 'sell-step-18'
                  break
                case 26:
                  URL_NAME = 'sell-step-20'
                  break
                case 27:
                  URL_NAME = 'sell-step-20'
                  break
                case 281:
                  URL_NAME = 'sell-step-25'
                  break
                case 28:
                  URL_NAME = 'sell-step-23'
                  break
                case 190:
                  URL_NAME = 'common-steps-04'
                  break
                // 检查服务点击退款
                case 196:
                case 197:
                  if (this.other.denialReason !== null) {
                    URL_NAME = 'sell-step-16-refuse'
                  } else {
                    URL_NAME = 'sell-step-17'
                  }
                  break
                // 移交表部分
                case 10:
                  URL_NAME = 'sell-step-06'
                  break
                case 11:
                  URL_NAME = 'sell-step-07'
                  break
                case 12:
                  URL_NAME = 'common-steps-01'
                  break
                case 13:
                  URL_NAME = 'sell-step-08'
                  break
                case 14:
                  URL_NAME = 'sell-step-09'
                  break
                default:
                  URL_NAME = 'common-steps-05'
              }
            }
        }
      } else {
        console.info('租赁')
        // 是否买家 卖家区分 thisRole： 1 买家
        if (Number(val.thisRole) === 1) {
          switch (Number(val.state)) {
            case 1:
              URL_NAME = 'steps-01'
              break
            case 2:
              URL_NAME = 'steps-02'
              break
            case 3:
            case 4:
              URL_NAME = 'steps-03'
              break
            case 5:
            case 6:
              URL_NAME = 'steps-04'
              break
            case 7:
              URL_NAME = 'steps-04-view-reason'
              break
            case 8:
              URL_NAME = 'steps-05'
              break
            case 9:
              URL_NAME = 'steps-06'
              break
            case 10:
              URL_NAME = 'steps-09'
              break
            case 11:
              URL_NAME = 'steps-07'
              break
            case 12:
            case 184:
              URL_NAME = 'steps-08'
              break
            // case 188:
              // URL_NAME = 'steps-10-checkout'
              // break
            // 提交提前退房原因后 等待房东确认退房
            case 14:
            case 15:
            case 188:
              URL_NAME = 'steps-11-checkout'
              break
            // 等待房东检查房屋完整度
            case 186:
              URL_NAME = 'steps-11-checkout-base'
              break
            // 扣款项确认
            case 185:
            case 16:
            // case 187:
              URL_NAME = 'steps-12-checkout'
              break
            // 等待房东重新提交扣款项
            case 1866:
              URL_NAME = 'steps-14-checkout'
              break
            // 确认扣款项后 上传付款凭证
            case 17:
            case 18:
            case 1844:
            case 1833:
            // case 176:
            // case 175:
              URL_NAME = 'steps-15-checkout'
              break
            // 租客查看原因 重新上传付款凭证
            case 1822:
              URL_NAME = 'steps-16-view-reason'
              break
            case 19:
              URL_NAME = 'common-steps-07'
              break
            case 20:
              URL_NAME = 'steps-19-checkout'
              break
            case 221:
              URL_NAME = 'steps-25-checkout'
              break
            case 21:
              URL_NAME = 'steps-22-checkout'
              // URL_NAME = 'steps-25-checkout'
              break
            case 22:
              URL_NAME = 'steps-23-checkout'
              break
            case 193:
              URL_NAME = 'steps-26-checkout'
              break
            case 189:
              URL_NAME = 'steps-27-checkout'
              break
            case 192:
              if (this.other.denialReason !== null) {
                URL_NAME = 'steps-27-checkout-base'
              } else {
                URL_NAME = 'steps-27-checkout'
              }
              break
            // 合同前一个月
            case 197:
              URL_NAME = 'steps-28-checkout-base'
              break
            case 24:
            case 29:
            case 179:
              URL_NAME = 'steps-28-checkout'
              break
            // 时间到期
            case 196:
            case 195:
            case 34:
              if (this.other.denialReason !== null) {
                URL_NAME = 'common-steps-07'
              } else {
                URL_NAME = 'steps-28-checkout'
              }
              break
            case 32:
              URL_NAME = 'steps-29-checkout'
              break
            case 26:
            case 33:
              URL_NAME = 'steps-31-checkout'
              break
            case 25:
            case 183:
              URL_NAME = 'steps-33-checkout'
              break
            case 175:
            case 176:
            case 178:
            case 177:
              URL_NAME = 'steps-34-checkout'
              break
            case 181:
              URL_NAME = 'steps-37-checkout'
              break
            case 180:
              URL_NAME = 'steps-35-checkout'
              break
            case 191:
              URL_NAME = 'common-steps-04'
              break
            default:
              URL_NAME = 'common-steps-05'
            // case 22:
            //   URL_NAME = 'steps-22-checkout'
            //   break
          }
        } else {
          switch (Number(val.state)) {
            case 1:
            case 2:
              URL_NAME = 'step-01'
              break
            case 3:
              URL_NAME = 'step-02'
              break
            case 4:
            case 5:
              URL_NAME = 'step-03'
              break
            case 6:
              URL_NAME = 'step-04'
              break
            case 7:
              URL_NAME = 'step-04-refuse'
              break
            case 8:
            case 9:
              URL_NAME = 'step-05'
              break
            case 10:
              URL_NAME = 'step-06'
              break
            case 11:
              URL_NAME = 'step-07'
              break
            case 12:
            case 193:
            case 192:
              if (this.other.denialReason !== null) {
                URL_NAME = 'common-steps-07'
              } else {
                URL_NAME = 'step-15-checkout'
              }
              break
            case 189:
              URL_NAME = 'step-20-checkout'
              break
            case 184:
              URL_NAME = 'step-21-checkout'
              break
            // 房东查看提前退款原因页面
            case 14:
            case 188:
              URL_NAME = 'step-08-checkout'
              break
            // 房东选择有损并填写原因页面
            case 186:
              URL_NAME = 'step-09-checkout'
              break
            case 15:
              if (this.other.denialReason !== null) {
                URL_NAME = 'step-11-checkout'
              } else {
                URL_NAME = 'step-09-checkout'
              }
              break
            // 房东填写扣款项后等待页面
            case 16:
            case 185:
              URL_NAME = 'step-10-checkout'
              break
            // 房东查看租客拒绝扣款项的原因
            case 1866:
              URL_NAME = 'step-11-checkout'
              break
            // 租客确认扣款凭证后 房东等待租客上传凭证页面
            case 1844:
              URL_NAME = 'step-10-checkout-base'
              break
            case 17:
            // case 186:
              URL_NAME = 'common-steps-07'
              // URL_NAME = 'step-11-checkout'
              break
            // 房东查看租客上传的付款凭证
            case 18:
            case 1833:
              URL_NAME = 'step-12-checkout'
              break
            // 房东等待租客重新上传付款凭证
            case 1822:
              URL_NAME = 'step-10-checkout-base'
              break
            case 19:
              if (this.other.denialReason !== null) {
                URL_NAME = 'step-18-checkout'
              } else {
                URL_NAME = 'step-16-base-checkout'
              }
              break
            case 20:
              URL_NAME = 'step-17-checkout'
              break
            case 221:
              URL_NAME = 'step-19-checkout-reason'
              break
            case 21:
              URL_NAME = 'step-19-checkout'
              break
            case 22:
              URL_NAME = 'step-19-checkout'
              break
            // 提前一个月收租或者退房
            case 197:
              URL_NAME = 'step-35-checkout'
              break
            case 24:
            case 29:
            case 179:
              URL_NAME = 'step-36-checkout'
              break
            case 195:
            case 196:
              URL_NAME = 'step-25-checkout'
              break
            // 到期hou
            case 27:
            case 34:
            case 32:
              if (this.other.denialReason !== null) {
                URL_NAME = 'step-27-checkout'
              } else {
                URL_NAME = 'step-26-checkout'
              }
              break
            case 28:
              URL_NAME = 'step-26-checkout'
              break
            case 26:
            case 33:
              URL_NAME = 'step-29-checkout'
              break
            case 25:
            case 183:
              if (this.other.denialReason !== null) {
                URL_NAME = 'step-27-checkout'
              } else {
                URL_NAME = 'step-28-checkout'
              }
              break
            case 176:
            case 178:
              URL_NAME = 'common-steps-07'
              break
            case 175:
            case 177:
              URL_NAME = 'step-31-checkout'
              break
            case 181:
            case 180:
              if (this.other.denialReason !== null) {
                URL_NAME = 'step-34-checkout'
              } else {
                URL_NAME = 'step-33-checkout'
              }
              break
            case 190:
              URL_NAME = 'common-steps-04'
              break
            default:
              URL_NAME = 'common-steps-05'
          }
        }
      }
      return URL_NAME
    },
    backMainChange (val) {
      if (val.types === undefined || val.type === undefined) {
        this.$router.push({
          path: '/userCenter/contract',
          query: null
        })
      }
    },
    goPage () {
      const _this = this
      _this.$router.push({
        name: _this.getStateUrlName({thisRole: _this.thisRole, state: _this.params.oldState ? _this.params.oldState : _this.houseInfo.state}),
        query: {ebuyhouse: _this.$base64.encode(JSON.stringify(Object.assign({}, _this.params, _this.houseInfo)))},
        params: Object.assign({}, _this.params, _this.houseInfo)
      })
    },
    fetchAllState () {
      // if (this.params.types === undefined) {
      //   alert('参数丢失！')
      //   return
      // }
      if (Number(this.params.types) === 0) {
        this.getbuyState(this.params)
      } else {
        this.getleaseState(this.params)
      }
    }
  },
  beforeCreate () {
    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    // 关闭主组件 （footer）
    this.$emit('configInfo', {
      showProcess: false,
      isFullScreen: true
    })
  },
  mounted () {
    console.log('\n\n------ begin: $route ------')
    // console.log(this.$base64.decode(this.$route.query.ebuyhouse))
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.backMainChange(this.params)
    this.fetchAllState()
    // this.setTimer()
    console.log('------ end: $route ------\n\n')
  },
  destroyed () {
    this.$loading().close()
    // 打开主组件 （footer）
    this.$emit('configInfo', {
      showProcess: true,
      isFullScreen: false
    })
  }
}
</script>

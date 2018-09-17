/**
 * 全局状态管理字段的 操作
 */

const mutations = {
  subtractGoods (state, parameters) {
    state.goodsSelectedCount.forEach((item, index) => {
      if (parameters.id === item.infor.id) {
        if (state.goodsSelectedCount[index].count === 1) {
          state.goodsSelectedCount.splice(index, 1)
          state.goodsSelected.splice(index, 1)
        } else {
          state.goodsSelectedCount[index].count = state.goodsSelectedCount[index].count - 1
        }
      }
    })
  },
  addGoods (state, parameters) {
    var flag = false
    state.goodsSelected.forEach(e => {
      if (e.id === parameters.id) {
        flag = true
      }
    })
    if (flag) {
      state.goodsSelectedCount.forEach((item, index) => {
        if (parameters.id === item.infor.id) {
          state.goodsSelectedCount[index].count = state.goodsSelectedCount[index].count + 1
        }
      })
    } else {
      state.goodsSelected.push(parameters)
      state.goodsSelectedCount.push({
        count: 1,
        infor: parameters
      })
    }
  },
  clearGoods (state, parameters) {
    state.goodsSelected = []
    state.goodsSelectedCount = []
  },
  totalCart (state, parameters) {
    state.goodsSelected = [...parameters]
    parameters.forEach((e, index) => {
      state.goodsSelectedCount.push({
        count: e.count,
        infor: e
      })
    })
    // state.goodsSelectedCount.push({
    //   count: parameters.num,
    //   infor: parameters.goods
    // })
  }
}

export default mutations

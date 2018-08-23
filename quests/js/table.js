// 表格的数据处理逻辑
$(function initVMTable(params) {
  // 将分钟数值转为字符时间表示
  var dealTime = function (getMin) {
    var hour = parseInt(getMin / 60, 10);
    var hourText = '' + hour;
    var min = getMin % 60;
    var minText = '' + min;
    if (hour < 1) {
      hourText = '00';
    } else if (hour < 10) {
      hourText = '0' + hour;
    }
    if (min < 10) {
      minText = '0' + min;
    }
    return hourText + ':' + minText
  }
  // 计算每小时产量
  var dealHours = function (total, time) {
    return ((total * 60) / time).toFixed(2)
  }
  // 遍历对象数组，寻找是否含目标键值
  var filterObjArray = function (ary, key, value) {
    for (var i = 0; i < ary.length; i += 1) {
      if (ary[i][key] === value) {
        return true
      }
    }
    return false
  }
  // 初始化后勤列表
  var initList = function (ary) {
    var resList = []
    for (var i = 0; i < ary.length; i += 1) {
      var target = ary[i];
      var time = target.time;
      var timeText = dealTime(time);
      var manpowerHours = dealHours(target.manpower, time)
      var ammunitionHours = dealHours(target.ammunition, time)
      var rationsHours = dealHours(target.rations, time)
      var sparePartHours = dealHours(target.sparePart, time)
      resList.push(Object.assign(
        {
          timeText: timeText,
          manpowerHours: manpowerHours,
          ammunitionHours: ammunitionHours,
          rationsHours: rationsHours,
          sparePartHours: sparePartHours,
          total: target.manpower + target.ammunition + target.rations + target.sparePart,
        },
        target
      ))
    }
    return resList
  }
  var bubble = function (arr, filterFunc) {
    if (!arr || !(arr instanceof Array)) {
      throw new Error('bubble is required')
    } else if (!filterFunc || typeof filterFunc !== 'function') {
      throw new Error('filterFunc is required')
    }
    var newAry = arr.concat([])
    var i = newAry.length, j;
    var tempExchangVal;
    while (i > 0) {
      for (j = 0; j < i - 1; j++) {
        if (
          filterFunc(newAry[j], newAry[j + 1])
        ) {
          tempExchangVal = newAry[j];
          newAry[j] = newAry[j + 1];
          newAry[j + 1] = tempExchangVal;
        }
      }
      i--;
    }
    return newAry;
  }
  var vmTable = avalon.define({
    $id: "table",
    resource: window.DB.resource,
    extra: window.DB.extra,
    baseList: initList(window.DB.quest),
    filter: false,
    filterList: [],
    $computed: {
      list: {
        get: function () {
          if (vmTable.filter) {
            return vmTable.filterList;
          }
          return vmTable.baseList;
        },
      },
    },
    // 咸鱼表单相关数据
    sf_time: 1440, // 预计时长（分钟）
    sf_res: ['manpower', 'ammunition', 'rations', 'sparePart'],
    sf_extra: [],
    // 咸鱼表单数据格式化
    sf_res_format: function (e) {
      // 无选择时返回空数组
      var value = e.target.value
      if (!value) {
        vmTable.sf_res = []
      }
    },
    // 筛选后勤列表
    filterSf: function () {
      var baseList = vmTable.list.concat([])
      var time = vmTable.sf_time
      var res = vmTable.sf_res
      var extra = vmTable.sf_extra
      return baseList.filter(function (ele) {
        var ifReturn = false
        if (ele.time <= time) {
          ifReturn = true
        } else {
          return false
        }
        // 资源筛选
        for (var i = 0; i < res.length; i += 1) {
          if (parseInt(ele[res[i]], 10) > 0) {
            ifReturn = true
          } else {
            return false
          }
        }
        // 道具筛选
        for (var j = 0; j < extra.length; j += 1) {
          if (filterObjArray(ele.extra, '_id', extra[j])) {
            ifReturn = true
          } else {
            return false
          }
        }
        return ifReturn
      })
    },
    // 计算咸鱼后勤序列
    sfCount: function () {
      // 根据时间、资源、额外道具筛选后勤列表
      var filterList = vmTable.filterSf()
      console.log(filterList.map(function (d) {
        return '[' + d.code + ']' + '\n'
        + '|' + d.manpower + '-' + d.ammunition + '-' + d.rations + '-' + d.sparePart + '\n'
        + '|' + d.extra.map(function (e) {
          return e.name
        }).join(' ')
      }).join('\n------\n\n'))
      console.log(filterList.length)
      // 排列组合
      // 生成最优方案
    },
    filterRes: function (target, value) {
      if (!target) {
        vmTable.filter = false
        return
      } else if (target === 'produce') {
        // 资源产量排序, target = produce
        vmTable.filter = { type: target, value: value }
        vmTable.filterList = bubble(
          vmTable.baseList,
          function (tar, tarPlus) {
            return parseFloat(tar[value], 2) < parseFloat(tarPlus[value], 2)
          }
        )
      } else if (target === 'extra') {
        // 额外道具产能排序，target = extra，将同额外道具的产能最高的排序在前面
        vmTable.filter = { type: target, value: value }
        vmTable.filterList = bubble(
          vmTable.baseList,
          function (tar, tarPlus) {
            var need = true
            var extra = tar.extra
            if (extra && extra.length) {
              var ifTarHaveValue = filterObjArray(extra, '_id', value)
              if (ifTarHaveValue) {
                var ifTarPlusHaveValue = filterObjArray(tarPlus.extra, '_id', value)
                if (ifTarPlusHaveValue) {
                  need = tar.time > tarPlus.time
                } else {
                  need = false
                }
              }
            }
            return need
          }
        )
      }
    },
  })
})
// 表格的数据处理逻辑
$(function initVMTable(params) {
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
  var dealHours = function (total, time) {
    return ((total * 60) / time).toFixed(2)
  }
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
  var bubble = function (arr, key) {
    var i = arr.length, j;
    var tempExchangVal;
    while (i > 0) {
      for (j = 0; j < i - 1; j++) {
        if (
          parseFloat(arr[j][key], 2) < parseFloat(arr[j + 1][key], 2)
        ) {
          tempExchangVal = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tempExchangVal;
        }
      }
      i--;
    }
    return arr;
  }
  var vmTable = avalon.define({
    $id: "table",
    resource: window.DB.resource,
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
    filterRes: function (target, type) {
      let filterType
      if (type === 'total') {
        filterType = target
        vmTable.filter = true
      } else if (type === 'hours') {
        filterType = target + 'Hours'
        vmTable.filter = true
      } else {
        vmTable.filter = false
      }
      vmTable.filterList = bubble(vmTable.baseList.concat([]), filterType)
    },
  })
})
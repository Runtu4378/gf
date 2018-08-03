// 表格的数据处理逻辑
$(function initVMTable(params) {
  var dealTime = function (getMin) {
    var hour = getMin / 60;
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
  var vmTable = avalon.define({
    $id: "table",
    resource: window.DB.resource,
    $computed: {
      list: function () {
        var baseList = window.DB.quest;
        var resList = []
        for (var i = 0; i < baseList.length; i += 1) {
          var target = baseList[i];
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
      },
    },
  })
})
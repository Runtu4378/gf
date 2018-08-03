// 后勤数据库
$(function initDB(params) {
  // 资源资料库
  var resource = [
    { _id: 'res-01', name: 'manpower', label: '人力', icon: './dist/img/60px-Icon_manpower.png' },
    { _id: 'res-02', name: 'ammunition', label: '弹药', icon: './dist/img/60px-Icon_ammo.png' },
    { _id: 'res-03', name: 'rations', label: '口粮', icon: './dist/img/60px-Icon_ration.png' },
    { _id: 'res-04', name: 'sparePart', label: '零件', icon: './dist/img/60px-Icon_parts.png' },
  ]
  // 额外道具库
  var extraDB = [
    { _id: 'e01', name: '快速建造契约' },
    { _id: 'e02', name: '快速修理契约' },
    { _id: 'e03', name: '人形契约' },
    { _id: 'e04', name: '装备契约' }
  ];

  var BATTLE_NAME_ZERO = '第零战役'
  // 第零战役
  var battle_zero = [
    {
      _id: '0-1', battleName: BATTLE_NAME_ZERO, name: '应援训练', code: '0-1', time: 50,
      manpower: 0, ammunition: 145, rations: 145, sparePart: 0,
      extra: [ extraDB[0], extraDB[1] ], captainLevel: 40, requiredPeople: 4
    },
    {
      _id: '0-2', battleName: BATTLE_NAME_ZERO, name: '梯队集训', code: '0-2', time: 180,
      manpower: 550, ammunition: 0, rations: 0, sparePart: 350,
      extra: [ extraDB[2] ], captainLevel: 45, requiredPeople: 5
    },
    {
      _id: '0-3', battleName: BATTLE_NAME_ZERO, name: '特种支援', code: '0-3', time: 720,
      manpower: 900, ammunition: 900, rations: 900, sparePart: 250,
      extra: [ extraDB[1], extraDB[3] ], captainLevel: 45, requiredPeople: 5
    }
  ];

  // 后勤总集
  var questDataBase = battle_zero.concat([])

  window.DB = {
    quest: questDataBase,
    extra: extraDB,
    resource: resource,
  }
})

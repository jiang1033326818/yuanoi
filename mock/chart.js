import moment from 'moment';

// mock data
const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}
const salesTypeData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

const salesTypeDataOnline = [
  {
    x: '家用电器',
    y: 244,
  },
  {
    x: '食用酒水',
    y: 321,
  },
  {
    x: '个护健康',
    y: 311,
  },
  {
    x: '服饰箱包',
    y: 41,
  },
  {
    x: '母婴产品',
    y: 121,
  },
  {
    x: '其他',
    y: 111,
  },
];

const salesTypeDataOffline = [
  {
    x: '家用电器',
    y: 99,
  },
  {
    x: '食用酒水',
    y: 188,
  },
  {
    x: '个护健康',
    y: 344,
  },
  {
    x: '服饰箱包',
    y: 255,
  },
  {
    x: '其他',
    y: 65,
  },
];

const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const bumen = {
  data: [
    {
      name: '董事会',
      value: 6,
      children: [
        {
          name: '总经理',
          value: 6,
          children: [
            {
              name: '营销中心',
              value: 4,
              children: [
                {
                  name: '市场部',
                  value: 4,
                },
                {
                  name: '销售部',
                  value: 4,
                },
                {
                  name: '客服部',
                  value: 4,
                },
              ],
            },
            {
              name: '项目中心',
              value: 4,
              children: [
                {
                  name: '售前支持部',
                  value: 4,
                },
                {
                  name: '项目一部',
                  value: 4,
                },
                {
                  name: '项目二部',
                  value: 4,
                },
                {
                  name: '项目三部',
                  value: 4,
                },
              ],
            },
            {
              name: '技术中心',
              value: 4,
              children: [
                {
                  name: '开发部',
                  value: 4,
                },
                {
                  name: '设计部',
                  value: 4,
                },
                {
                  name: '系统部',
                  value: 4,
                },
              ],
            },
            {
              name: '行政部',
              value: 4,
            },
            {
              name: '财务部',
              value: 4,
            },
            {
              name: '其他分支',
              value: 4,
              children: [
                {
                  name: '汕头分公司',
                  value: 4,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const zhiwei = {
  data: [
    {
      name: '董事会主席',
      value: 6,
      children: [
        {
          name: '总经理',
          value: 6,
          children: [
            {
              name: '营销总监',
              value: 4,
              children: [
                {
                  name: '市场总监',
                  value: 4,
                },
                {
                  name: '销售经理',
                  value: 4,
                },
                {
                  name: '客服经理',
                  value: 4,
                },
              ],
            },
            {
              name: '项目总监',
              value: 4,
              children: [
                {
                  name: '售前支持',
                  value: 4,
                },
                {
                  name: '项目一开发',
                  value: 4,
                },
                {
                  name: '项目二开发',
                  value: 4,
                },
                {
                  name: '项目三开发',
                  value: 4,
                },
              ],
            },
            {
              name: 'CTO',
              value: 4,
              children: [
                {
                  name: '前端开发',
                  value: 4,
                },
                {
                  name: 'UI设计',
                  value: 4,
                },
                {
                  name: '系统架构师',
                  value: 4,
                },
              ],
            },
            {
              name: '行政总监',
              value: 4,
            },
            {
              name: '财务总监',
              value: 4,
            },
            {
              name: '后勤管理',
              value: 4,
              children: [
                {
                  name: '采购员',
                  value: 4,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const renyuan = {
  data: [
    {
      name: '张三',
      value: 6,
      children: [
        {
          name: '李四',
          value: 6,
          children: [
            {
              name: '王五',
              value: 4,
              children: [
                {
                  name: '宋二',
                  value: 4,
                },
                {
                  name: '姜就',
                  value: 4,
                },
                {
                  name: '赵的',
                  value: 4,
                },
              ],
            },
            {
              name: '钱破',
              value: 4,
              children: [
                {
                  name: '孙加',
                  value: 4,
                },
                {
                  name: '李三点',
                  value: 4,
                },
                {
                  name: '周硕美',
                  value: 4,
                },
                {
                  name: '吴看视',
                  value: 4,
                },
              ],
            },
            {
              name: '郑晨功',
              value: 4,
              children: [
                {
                  name: '王志华',
                  value: 4,
                },
                {
                  name: '冯春雷',
                  value: 4,
                },
                {
                  name: '魏海新',
                  value: 4,
                },
              ],
            },
            {
              name: '蒋倩倩',
              value: 4,
            },
            {
              name: '沈一飞',
              value: 4,
            },
            {
              name: '韩信',
              value: 4,
              children: [
                {
                  name: '杨元元',
                  value: 4,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const getFakeChartData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData,
  bumen,
  zhiwei,
  renyuan,
};

export default {
  'GET /api/fake_chart_data': getFakeChartData,
};

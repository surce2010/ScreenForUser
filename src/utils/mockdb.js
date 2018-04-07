const Mock = require('mockjs')

// 应用运行监控
Mock.mock(new RegExp('/topic/schoolAppStatisc/'), {
  'schoolAppStatisc': { //校园应用统计
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 1,
      'pages': 1
    },
    'dataSet': [
      {
        'mobile_app_num': 48.0, //移动应用数据
        'active_app_num': 119.0, //活跃应用数，（非活跃应用数应用总数-活跃应用数）
        'pc_app_num': 264.0, //pc应用数据
        'schoolid': '11646', //学校id
        'app_num': 283.0 //应用总数
      }
    ]
  },
  'appCatagoryStatisc': { //应用分类（部门）统计
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 14,
      'pages': 1
    },
    'dataSet': [
      {
        'app_catagory_name': '学工', //应用分类名称
        'schoolid': '11646', //学校ID
        'app_num': 29.0, //应用数据
        'app_catagory_id': '01' //应用分类ID
      },
      {
        'app_catagory_name': '教学',
        'schoolid': '11646',
        'app_num': 130.0,
        'app_catagory_id': '02'
      },
      {
        'app_catagory_name': '科研',
        'schoolid': '11646',
        'app_num': 2.0,
        'app_catagory_id': '04'
      },
      {
        'app_catagory_name': 'IT',
        'schoolid': '11646',
        'app_num': 13.0,
        'app_catagory_id': '06'
      },
      {
        'app_catagory_name': '财务',
        'schoolid': '11646',
        'app_num': 9.0,
        'app_catagory_id': '07'
      },
      {
        'app_catagory_name': '生活',
        'schoolid': '11646',
        'app_num': 9.0,
        'app_catagory_id': '08'
      },
      {
        'app_catagory_name': '办公',
        'schoolid': '11646',
        'app_num': 1.0,
        'app_catagory_id': '11'
      },
      {
        'app_catagory_name': '人事',
        'schoolid': '11646',
        'app_num': 61.0,
        'app_catagory_id': '12'
      },
      {
        'app_catagory_name': '资产',
        'schoolid': '11646',
        'app_num': 1.0,
        'app_catagory_id': '13'
      },
      {
        'app_catagory_name': '迎新',
        'schoolid': '11646',
        'app_num': 4.0,
        'app_catagory_id': '16'
      },
      {
        'app_catagory_name': '后勤',
        'schoolid': '11646',
        'app_num': 1.0,
        'app_catagory_id': '18'
      },
      {
        'app_catagory_name': '其他',
        'schoolid': '11646',
        'app_num': 1.0,
        'app_catagory_id': '19'
      },
      {
        'app_catagory_name': '公共',
        'schoolid': '11646',
        'app_num': 33.0,
        'app_catagory_id': '20'
      },
      {
        'app_catagory_name': '研究生',
        'schoolid': '11646',
        'app_num': 1.0,
        'app_catagory_id': '22'
      }]
  },
  'pc': {
    'last30DaysAccessStatisc': { //最近30天访问情况
      'returnStatus': '1', //返回状态 1成功 0失败
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': { //分页信息忽略
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 31,
        'pages': 1
      },
      'dataSet': [
        { //数据集
          'tuv': 49.0, //教师uv
          'suv': 31.0, //学生uv
          'spv': 15121.0, //学生pv
          'tpv': 319.0, //教师pv
          'statisc_date': '2018-03-05' //统计日期
        },
        {
          'tuv': 73.0,
          'suv': 109.0,
          'spv': 8565.0,
          'tpv': 358.0,
          'statisc_date': '2018-03-06'
        },
        {
          'tuv': 59.0,
          'suv': 30.0,
          'spv': 17307.0,
          'tpv': 252.0,
          'statisc_date': '2018-03-07'
        },
        {
          'tuv': 52.0,
          'suv': 96.0,
          'spv': 15157.0,
          'tpv': 251.0,
          'statisc_date': '2018-03-08'
        },
        {
          'tuv': 49.0,
          'suv': 51.0,
          'spv': 37200.0,
          'tpv': 214.0,
          'statisc_date': '2018-03-09'
        },
        {
          'tuv': 14.0,
          'suv': 24.0,
          'spv': 13330.0,
          'tpv': 74.0,
          'statisc_date': '2018-03-10'
        },
        {
          'tuv': 16.0,
          'suv': 71.0,
          'spv': 12322.0,
          'tpv': 84.0,
          'statisc_date': '2018-03-11'
        },
        {
          'tuv': 49.0,
          'suv': 25.0,
          'spv': 14949.0,
          'tpv': 211.0,
          'statisc_date': '2018-03-12'
        },
        {
          'tuv': 48.0,
          'suv': 22.0,
          'spv': 13178.0,
          'tpv': 306.0,
          'statisc_date': '2018-03-13'
        },
        {
          'tuv': 43.0,
          'suv': 46.0,
          'spv': 13218.0,
          'tpv': 244.0,
          'statisc_date': '2018-03-14'
        },
        {
          'tuv': 59.0,
          'suv': 29.0,
          'spv': 15152.0,
          'tpv': 339.0,
          'statisc_date': '2018-03-15'
        },
        {
          'tuv': 64.0,
          'suv': 15.0,
          'spv': 7044.0,
          'tpv': 271.0,
          'statisc_date': '2018-03-16'
        },
        {
          'tuv': 15.0,
          'suv': 10.0,
          'spv': 4396.0,
          'tpv': 63.0,
          'statisc_date': '2018-03-17'
        },
        {
          'tuv': 23.0,
          'suv': 53.0,
          'spv': 4844.0,
          'tpv': 98.0,
          'statisc_date': '2018-03-18'
        },
        {
          'tuv': 63.0,
          'suv': 16.0,
          'spv': 5054.0,
          'tpv': 254.0,
          'statisc_date': '2018-03-19'
        },
        {
          'tuv': 52.0,
          'suv': 12.0,
          'spv': 5046.0,
          'tpv': 262.0,
          'statisc_date': '2018-03-20'
        },
        {
          'tuv': 32.0,
          'suv': 10.0,
          'spv': 4065.0,
          'tpv': 127.0,
          'statisc_date': '2018-03-21'
        },
        {
          'tuv': 54.0,
          'suv': 14.0,
          'spv': 10098.0,
          'tpv': 390.0,
          'statisc_date': '2018-03-22'
        },
        {
          'tuv': 36.0,
          'suv': 18.0,
          'spv': 7288.0,
          'tpv': 324.0,
          'statisc_date': '2018-03-23'
        },
        {
          'tuv': 21.0,
          'suv': 10.0,
          'spv': 3603.0,
          'tpv': 74.0,
          'statisc_date': '2018-03-24'
        },
        {
          'tuv': 17.0,
          'suv': 19.0,
          'spv': 2920.0,
          'tpv': 71.0,
          'statisc_date': '2018-03-25'
        },
        {
          'tuv': 37.0,
          'suv': 14.0,
          'spv': 6381.0,
          'tpv': 183.0,
          'statisc_date': '2018-03-26'
        },
        {
          'tuv': 37.0,
          'suv': 10.0,
          'spv': 11514.0,
          'tpv': 139.0,
          'statisc_date': '2018-03-27'
        },
        {
          'tuv': 39.0,
          'suv': 22.0,
          'spv': 13034.0,
          'tpv': 186.0,
          'statisc_date': '2018-03-28'
        },
        {
          'tuv': 52.0,
          'suv': 15.0,
          'spv': 5985.0,
          'tpv': 226.0,
          'statisc_date': '2018-03-29'
        },
        {
          'tuv': 51.0,
          'suv': 102.0,
          'spv': 3618.0,
          'tpv': 242.0,
          'statisc_date': '2018-03-30'
        },
        {
          'tuv': 27.0,
          'suv': 91.0,
          'spv': 3754.0,
          'tpv': 117.0,
          'statisc_date': '2018-03-31'
        },
        {
          'tuv': 28.0,
          'suv': 52.0,
          'spv': 1927.0,
          'tpv': 120.0,
          'statisc_date': '2018-04-01'
        },
        {
          'tuv': 61.0,
          'suv': 18.0,
          'spv': 3706.0,
          'tpv': 317.0,
          'statisc_date': '2018-04-02'
        },
        {
          'tuv': 39.0,
          'suv': 56.0,
          'spv': 2122.0,
          'tpv': 173.0,
          'statisc_date': '2018-04-03'
        },
        {
          'tuv': 32.0,
          'suv': 47.0,
          'spv': 1548.0,
          'tpv': 161.0,
          'statisc_date': '2018-04-04'
        }]
    },
    'studentAppTop4': { //学生累计热门应用
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 5,
        'pages': 1
      },
      'dataSet': [
        {
          'APP_ID': '4985475111478338', //应用ID
          'uv': 63264.0, //UV
          'pv': 116149.0, //PV
          'schoolid': '11646', //学校ID
          'APP_NAME': '团委志愿服务', //应用名称
          'VERSION': 'NDZYFW_V1.0_R1' //应用版本
        },
        {
          'APP_ID': '4768574631264620',
          'uv': 48152.0,
          'pv': 90226.0,
          'schoolid': '11646',
          'APP_NAME': '成绩查询',
          'VERSION': 'cjcx_V4.0.3_TR1'
        },
        {
          'APP_ID': '4768687067472349',
          'uv': 34831.0,
          'pv': 58050.0,
          'schoolid': '11646',
          'APP_NAME': '我的考试安排',
          'VERSION': 'studentWdksapApp_V4.0.4_TR1'
        },
        {
          'APP_ID': '4862759070414449',
          'uv': 34043.0,
          'pv': 74251.0,
          'schoolid': '11646',
          'APP_NAME': '学生社会考试报名',
          'VERSION': 'xsshksbm_V4.0.1_TR1'
        },
        {
          'APP_ID': '4592429014624916',
          'uv': 24808.0,
          'pv': 47205.0,
          'schoolid': '11646',
          'APP_NAME': '奖学金',
          'VERSION': '4.0.9'
        }]
    },
    'teacherAppTop4': { //累计教师应用Top5
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 5,
        'pages': 1
      },
      'dataSet': [
        {
          'APP_ID': '4767602453207800', //应用ID
          'uv': 3323.0, //UV
          'pv': 6053.0, //PV
          'schoolid': '11646', //学校ID
          'APP_NAME': '工作量', //应用名称
          'VERSION': '1.0.0' //应用版本
        },
        {
          'APP_ID': '4883646355556186',
          'uv': 1871.0,
          'pv': 3022.0,
          'schoolid': '11646',
          'APP_NAME': '国库用款计划',
          'VERSION': 'NDYK_V1.0_R1'
        },
        {
          'APP_ID': '4805715756286825',
          'uv': 1337.0,
          'pv': 2334.0,
          'schoolid': '11646',
          'APP_NAME': '年度考核',
          'VERSION': 'NDKHXT_V4.0.14_TR1'
        },
        {
          'APP_ID': '4592429014624916',
          'uv': 1276.0,
          'pv': 3010.0,
          'schoolid': '11646',
          'APP_NAME': '奖学金',
          'VERSION': '4.0.9'
        },
        {
          'APP_ID': '4805658316975744',
          'uv': 677.0,
          'pv': 1141.0,
          'schoolid': '11646',
          'APP_NAME': '开放实验室系统',
          'VERSION': '1.0.0'
        }]
    },
    'todayTop5AppForS': { //教师今日热门应用Top5
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 5,
        'pages': 1
      },
      'dataSet': [
        {
          'APP_ID': '5027831257827360', //应用ID
          'uv': 79.0, //UV
          'pv': 368.0, //PV
          'schoolid': '11646', //学校ID
          'APP_NAME': '我的课表', //应用名称
          'VERSION': 'cloud_WDKB_V1.0.1_R1' //应用版本
        },
        {
          'APP_ID': '4827203218410545',
          'uv': 59.0,
          'pv': 348.0,
          'schoolid': '11646',
          'APP_NAME': '查自习室',
          'VERSION': '1.0.2'
        },
        {
          'APP_ID': '4985475111478338',
          'uv': 147.0,
          'pv': 252.0,
          'schoolid': '11646',
          'APP_NAME': '团委志愿服务',
          'VERSION': 'NDZYFW_V1.0_R1'
        },
        {
          'APP_ID': '4822355489884712',
          'uv': 53.0,
          'pv': 180.0,
          'schoolid': '11646',
          'APP_NAME': '成绩查询',
          'VERSION': 'cjcxapp_V1.0.4_TR1'
        },
        {
          'APP_ID': '4706385818929380',
          'uv': 53.0,
          'pv': 91.0,
          'schoolid': '11646',
          'APP_NAME': '非学业因素',
          'VERSION': '1.0.1'
        }]
    },
    'todayTop5AppForT': { //学生今日热门应用Top5
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 5,
        'pages': 1
      },
      'dataSet': [
        {
          'APP_ID': '4671873484017906', //应用ID
          'uv': 19.0, //UV
          'pv': 105.0, //PV
          'schoolid': '11646', //学校ID
          'APP_NAME': '我的校园卡', //应用名称
          'VERSION': '1.1.14_TR1' //应用版本
        },
        {
          'APP_ID': '5183464919208022',
          'uv': 7.0,
          'pv': 15.0,
          'schoolid': '11646',
          'APP_NAME': '学生消费报告与学霸画像',
          'VERSION': '1.0_R1'
        },
        {
          'APP_ID': '4827203218410545',
          'uv': 3.0,
          'pv': 14.0,
          'schoolid': '11646',
          'APP_NAME': '查自习室',
          'VERSION': '1.0.2'
        },
        {
          'APP_ID': '4706385818929380',
          'uv': 6.0,
          'pv': 12.0,
          'schoolid': '11646',
          'APP_NAME': '非学业因素',
          'VERSION': '1.0.1'
        },
        {
          'APP_ID': '4944839804341327',
          'uv': 3.0,
          'pv': 10.0,
          'schoolid': '11646',
          'APP_NAME': '班车服务（移动）',
          'VERSION': 'BCFWM_V1.0_TR1'
        }]
    },
    'todayAccessStatisc': { //今日访问统计
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 1,
        'pages': 1
      },
      'dataSet': [
        {
          'tuv': 63.0, //学生UV
          'suv': 656.0, //教师UV
          'spv': 2776.0, //教师PV
          'tpv': 346.0 //学生PV
        }]
    }
  },
  'mobile': {
    'last30DaysAccessStatisc': { //最近30天访问情况
      'returnStatus': '1', //返回状态 1成功 0失败
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': { //分页信息忽略
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 31,
        'pages': 1
      },
      'dataSet': [
        { //数据集
          'tuv': 49.0, //教师uv
          'suv': 2316.0, //学生uv
          'spv': 15121.0, //学生pv
          'tpv': 319.0, //教师pv
          'statisc_date': '2018-03-05' //统计日期
        },
        {
          'tuv': 73.0,
          'suv': 1958.0,
          'spv': 8565.0,
          'tpv': 358.0,
          'statisc_date': '2018-03-06'
        },
        {
          'tuv': 59.0,
          'suv': 3230.0,
          'spv': 17307.0,
          'tpv': 252.0,
          'statisc_date': '2018-03-07'
        },
        {
          'tuv': 52.0,
          'suv': 2996.0,
          'spv': 15157.0,
          'tpv': 251.0,
          'statisc_date': '2018-03-08'
        },
        {
          'tuv': 49.0,
          'suv': 5160.0,
          'spv': 37200.0,
          'tpv': 214.0,
          'statisc_date': '2018-03-09'
        },
        {
          'tuv': 14.0,
          'suv': 2411.0,
          'spv': 13330.0,
          'tpv': 74.0,
          'statisc_date': '2018-03-10'
        },
        {
          'tuv': 16.0,
          'suv': 2371.0,
          'spv': 12322.0,
          'tpv': 84.0,
          'statisc_date': '2018-03-11'
        },
        {
          'tuv': 49.0,
          'suv': 2855.0,
          'spv': 14949.0,
          'tpv': 211.0,
          'statisc_date': '2018-03-12'
        },
        {
          'tuv': 48.0,
          'suv': 2602.0,
          'spv': 13178.0,
          'tpv': 306.0,
          'statisc_date': '2018-03-13'
        },
        {
          'tuv': 43.0,
          'suv': 2546.0,
          'spv': 13218.0,
          'tpv': 244.0,
          'statisc_date': '2018-03-14'
        },
        {
          'tuv': 59.0,
          'suv': 2967.0,
          'spv': 15152.0,
          'tpv': 339.0,
          'statisc_date': '2018-03-15'
        },
        {
          'tuv': 64.0,
          'suv': 1584.0,
          'spv': 7044.0,
          'tpv': 271.0,
          'statisc_date': '2018-03-16'
        },
        {
          'tuv': 15.0,
          'suv': 1083.0,
          'spv': 4396.0,
          'tpv': 63.0,
          'statisc_date': '2018-03-17'
        },
        {
          'tuv': 23.0,
          'suv': 1153.0,
          'spv': 4844.0,
          'tpv': 98.0,
          'statisc_date': '2018-03-18'
        },
        {
          'tuv': 63.0,
          'suv': 1264.0,
          'spv': 5054.0,
          'tpv': 254.0,
          'statisc_date': '2018-03-19'
        },
        {
          'tuv': 52.0,
          'suv': 1257.0,
          'spv': 5046.0,
          'tpv': 262.0,
          'statisc_date': '2018-03-20'
        },
        {
          'tuv': 32.0,
          'suv': 1004.0,
          'spv': 4065.0,
          'tpv': 127.0,
          'statisc_date': '2018-03-21'
        },
        {
          'tuv': 54.0,
          'suv': 1614.0,
          'spv': 10098.0,
          'tpv': 390.0,
          'statisc_date': '2018-03-22'
        },
        {
          'tuv': 36.0,
          'suv': 1338.0,
          'spv': 7288.0,
          'tpv': 324.0,
          'statisc_date': '2018-03-23'
        },
        {
          'tuv': 21.0,
          'suv': 810.0,
          'spv': 3603.0,
          'tpv': 74.0,
          'statisc_date': '2018-03-24'
        },
        {
          'tuv': 17.0,
          'suv': 719.0,
          'spv': 2920.0,
          'tpv': 71.0,
          'statisc_date': '2018-03-25'
        },
        {
          'tuv': 37.0,
          'suv': 1334.0,
          'spv': 6381.0,
          'tpv': 183.0,
          'statisc_date': '2018-03-26'
        },
        {
          'tuv': 37.0,
          'suv': 2210.0,
          'spv': 11514.0,
          'tpv': 139.0,
          'statisc_date': '2018-03-27'
        },
        {
          'tuv': 39.0,
          'suv': 2512.0,
          'spv': 13034.0,
          'tpv': 186.0,
          'statisc_date': '2018-03-28'
        },
        {
          'tuv': 52.0,
          'suv': 1530.0,
          'spv': 5985.0,
          'tpv': 226.0,
          'statisc_date': '2018-03-29'
        },
        {
          'tuv': 51.0,
          'suv': 1002.0,
          'spv': 3618.0,
          'tpv': 242.0,
          'statisc_date': '2018-03-30'
        },
        {
          'tuv': 27.0,
          'suv': 1091.0,
          'spv': 3754.0,
          'tpv': 117.0,
          'statisc_date': '2018-03-31'
        },
        {
          'tuv': 28.0,
          'suv': 592.0,
          'spv': 1927.0,
          'tpv': 120.0,
          'statisc_date': '2018-04-01'
        },
        {
          'tuv': 61.0,
          'suv': 1028.0,
          'spv': 3706.0,
          'tpv': 317.0,
          'statisc_date': '2018-04-02'
        },
        {
          'tuv': 39.0,
          'suv': 596.0,
          'spv': 2122.0,
          'tpv': 173.0,
          'statisc_date': '2018-04-03'
        },
        {
          'tuv': 32.0,
          'suv': 427.0,
          'spv': 1548.0,
          'tpv': 161.0,
          'statisc_date': '2018-04-04'
        }]
    },
    'studentAppTop4': { //学生累计热门应用
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 5,
        'pages': 1
      },
      'dataSet': [
        {
          'APP_ID': '4985475111478338', //应用ID
          'uv': 63264.0, //UV
          'pv': 116149.0, //PV
          'schoolid': '11646', //学校ID
          'APP_NAME': '团委志愿服务', //应用名称
          'VERSION': 'NDZYFW_V1.0_R1' //应用版本
        },
        {
          'APP_ID': '4768574631264620',
          'uv': 48152.0,
          'pv': 90226.0,
          'schoolid': '11646',
          'APP_NAME': '成绩查询',
          'VERSION': 'cjcx_V4.0.3_TR1'
        },
        {
          'APP_ID': '4768687067472349',
          'uv': 34831.0,
          'pv': 58050.0,
          'schoolid': '11646',
          'APP_NAME': '我的考试安排',
          'VERSION': 'studentWdksapApp_V4.0.4_TR1'
        },
        {
          'APP_ID': '4862759070414449',
          'uv': 34043.0,
          'pv': 74251.0,
          'schoolid': '11646',
          'APP_NAME': '学生社会考试报名',
          'VERSION': 'xsshksbm_V4.0.1_TR1'
        },
        {
          'APP_ID': '4592429014624916',
          'uv': 24808.0,
          'pv': 47205.0,
          'schoolid': '11646',
          'APP_NAME': '奖学金',
          'VERSION': '4.0.9'
        }]
    },
    'todayTop5AppForS': { //教师今日热门应用Top5
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 5,
        'pages': 1
      },
      'dataSet': [
        {
          'APP_ID': '5027831257827360', //应用ID
          'uv': 79.0, //UV
          'pv': 38.0, //PV
          'schoolid': '11646', //学校ID
          'APP_NAME': '我的课表', //应用名称
          'VERSION': 'cloud_WDKB_V1.0.1_R1' //应用版本

        },
        {
          'APP_ID': '4827203218410545',
          'uv': 59.0,
          'pv': 481.0,
          'schoolid': '11646',
          'APP_NAME': '查自习室',
          'VERSION': '1.0.2'
        },
        {
          'APP_ID': '4985475111478338',
          'uv': 147.0,
          'pv': 152.0,
          'schoolid': '11646',
          'APP_NAME': '团委志愿服务',
          'VERSION': 'NDZYFW_V1.0_R1'
        },
        {
          'APP_ID': '4822355489884712',
          'uv': 53.0,
          'pv': 113.0,
          'schoolid': '11646',
          'APP_NAME': '成绩查询',
          'VERSION': 'cjcxapp_V1.0.4_TR1'
        },
        {
          'APP_ID': '4706385818929380',
          'uv': 53.0,
          'pv': 191.0,
          'schoolid': '11646',
          'APP_NAME': '非学业因素',
          'VERSION': '1.0.1'
        }]
    },
    'todayTop5AppForT': { //学生今日热门应用Top5
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 5,
        'pages': 1
      },
      'dataSet': [
        {
          'APP_ID': '4671873484017906', //应用ID
          'uv': 19.0, //UV
          'pv': 105.0, //PV
          'schoolid': '11646', //学校ID
          'APP_NAME': '我的校园卡', //应用名称
          'VERSION': '1.1.14_TR1' //应用版本
        },
        {
          'APP_ID': '5183464919208022',
          'uv': 7.0,
          'pv': 15.0,
          'schoolid': '11646',
          'APP_NAME': '学生消费报告与学霸画像',
          'VERSION': '1.0_R1'
        },
        {
          'APP_ID': '4827203218410545',
          'uv': 3.0,
          'pv': 14.0,
          'schoolid': '11646',
          'APP_NAME': '查自习室',
          'VERSION': '1.0.2'
        },
        {
          'APP_ID': '4706385818929380',
          'uv': 6.0,
          'pv': 12.0,
          'schoolid': '11646',
          'APP_NAME': '非学业因素',
          'VERSION': '1.0.1'
        },
        {
          'APP_ID': '4944839804341327',
          'uv': 3.0,
          'pv': 10.0,
          'schoolid': '11646',
          'APP_NAME': '班车服务（移动）',
          'VERSION': 'BCFWM_V1.0_TR1'
        }]
    },
    'teacherAppTop4': { //累计教师应用Top5
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 5,
        'pages': 1
      },
      'dataSet': [
        {
          'APP_ID': '4767602453207800', //应用ID
          'uv': 3323.0, //UV
          'pv': 6053.0, //PV
          'schoolid': '11646', //学校ID
          'APP_NAME': '工作量', //应用名称
          'VERSION': '1.0.0' //应用版本

        },
        {
          'APP_ID': '4883646355556186',
          'uv': 1871.0,
          'pv': 3022.0,
          'schoolid': '11646',
          'APP_NAME': '国库用款计划',
          'VERSION': 'NDYK_V1.0_R1'
        },
        {
          'APP_ID': '4805715756286825',
          'uv': 1337.0,
          'pv': 2334.0,
          'schoolid': '11646',
          'APP_NAME': '年度考核',
          'VERSION': 'NDKHXT_V4.0.14_TR1'
        },
        {
          'APP_ID': '4592429014624916',
          'uv': 1276.0,
          'pv': 3010.0,
          'schoolid': '11646',
          'APP_NAME': '奖学金',
          'VERSION': '4.0.9'
        },
        {
          'APP_ID': '4805658316975744',
          'uv': 677.0,
          'pv': 1141.0,
          'schoolid': '11646',
          'APP_NAME': '开放实验室系统',
          'VERSION': '1.0.0'
        }]
    },
    'todayAccessStatisc': { //今日访问统计
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 1,
        'pages': 1
      },
      'dataSet': [
        {
          'tuv': 163.0, //学生UV
          'suv': 1656.0, //教师UV
          'spv': 276.0, //教师PV
          'tpv': 1316.0 //学生PV
        }]
    }
  }
});

// 应用评价统计
Mock.mock(new RegExp('/call/appAssessStatisc'), function (options) {
  if (JSON.parse(options.body).appType === 'pc') {
    return {
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 1,
        'pages': 1
      },
      'dataSet': [
        {
          //得分
          'score': 5.0,
          //应用名称
          'app_name': '基金会系统',
          //类别
          'category_name': '校友',
          //评论数据
          'total_count': 22,
          //学校ID
          'schoolid': 'njau',
          //推荐次数
          'record_num': 3,
          //序号
          'rn': 1,
          //应用ID
          'app_id': '4877331829650731',
          //应用版本
          'version': 'JJHXT_V1.0_R1'
        }]
    };
  } else {
    return {
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 1,
        'pages': 1
      },
      'dataSet': [
        {
          //得分
          'score': 3.0,
          //应用名称
          'app_name': '成绩查询',
          //类别
          'category_name': '教学',
          //评论数据
          'total_count': 22,
          //学校ID
          'schoolid': 'njau',
          //推荐次数
          'record_num': 3,
          //序号
          'rn': 1,
          //应用ID
          'app_id': '4877331829650731',
          //应用版本
          'version': 'JJHXT_V1.0_R1'
        }]
    };
  }
});

// 应用评价详情列表
Mock.mock(new RegExp('/call/appAssessDetailList'), function (options) {
  if (JSON.parse(options.body).appType === 'pc') {
    return {
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 76,
        'pages': 1
      },
      'dataSet': [
        {
          //评分
          'score': 5,
          //内容
          'assessment': '网费怎么贵？？？',
          'wid': 'ff9e88bb-dcf4-4d06-8af4-fe57d2c68b9d',
          //是否删除
          'is_deleted': 0,
          //应用版本号
          'app_version': 'MYYKTZD_V1.1.13_TR3',
          //是否匿名
          'is_anonymous': '0',
          //评价ID
          'assessor_id': '2015116057',
          //学校ID
          'schoolid': 'njau',
          //采集时间
          'dc_insert_time': '2018-03-26 03:00:17',
          //评论人
          'assessor_name': '童仁磊',
          'app_id': '4671873484017906',
          //评论日期
          'assess_time': '2018-03-25'
        },
        {
          'score': 5,
          'assessment': '我觉得不错，很好的。。。',
          'wid': '05d1baa4-d715-467e-af5d-58f9d7217283',
          'is_deleted': 0,
          'app_version': 'MYYKTZD_V1.1.13_TR3',
          'is_anonymous': '0',
          'assessor_id': '32315204',
          'schoolid': 'njau',
          'dc_insert_time': '2018-01-31 03:01:34',
          'assessor_name': '邓东上',
          'app_id': '4671873484017906',
          'assess_time': '2018-01-30'
        }]
    };
  } else {
    return {
      'returnStatus': '1',
      'returnId': '',
      'errorCode': '',
      'errorMsg': '',
      'pageInfo': {
        'pageNum': 1,
        'pageSize': 1000,
        'startRow': 0,
        'endRow': 1000,
        'total': 76,
        'pages': 1
      },
      'dataSet': [
        {
          //评分
          'score': 5,
          //内容
          'assessment': '用户评价内容用户评价内容用户评价内容用户评价内容用户评价内用户评价内容用户评价内容用户评价内容用户评价内容用户评价内',
          'wid': 'ff9e88bb-dcf4-4d06-8af4-fe57d2c68b9d',
          //是否删除
          'is_deleted': 0,
          //应用版本号
          'app_version': 'MYYKTZD_V1.1.13_TR3',
          //是否匿名
          'is_anonymous': '0',
          //评价ID
          'assessor_id': '2015116057',
          //学校ID
          'schoolid': 'njau',
          //采集时间
          'dc_insert_time': '2018-03-26 03:00:17',
          //评论人
          'assessor_name': '童仁磊',
          'app_id': '4671873484017906',
          //评论日期
          'assess_time': '2018-03-25'
        }]
    };
  }
});

// 用户分析
Mock.mock(new RegExp('/topic/schoolUserStatisc/'), {
  //学生客户端统计
  'studentClientStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 2,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 45247.0,
        //客户端类型
        'client_type': 'mobile'
      },
      {
        'user_num': 95361.0,
        'client_type': 'pc'
      }]
  },
  //教师账号安全统计
  'teacherAccountSafeStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 0,
      'pages': 0
    },
    'dataSet': [
      {
        //密码安全等级
        'pwd_safe_grade': '强',
        //用户数据
        'user_num': 100
      },
      {
        //密码安全等级
        'pwd_safe_grade': '中',
        //用户数据
        'user_num': 100
      },
      {
        //密码安全等级
        'pwd_safe_grade': '弱',
        //用户数据
        'user_num': 100
      },
      {
        //密码安全等级
        'pwd_safe_grade': '无安全等级',
        //用户数据
        'user_num': 100
      }]
  },
  //账号激活
  'accountActiveStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 0,
      'pages': 0
    },
    'dataSet': [
      {
        //学生账号数
        'account_num_s': 234,
        //学生激活账号数
        'active_account_num_s': 100,
        //学生未激活账号数
        'inactive_account_num_s': 100,
        //教师账号数
        'account_num_t': 2281,
        //教师激活账号数
        'active_account_num_t': 100,
        //教师未激活账号数
        'inactive_account_num_t': 100
      }]
  },
  //学生账号安全统计
  'studentAccountSafeStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 0,
      'pages': 0
    },
    'dataSet': [
      {
        //密码安全等级
        'pwd_safe_grade': '强',
        //用户数据
        'user_num': 100
      },
      {
        //密码安全等级
        'pwd_safe_grade': '中',
        //用户数据
        'user_num': 100
      },
      {
        //密码安全等级
        'pwd_safe_grade': '弱',
        //用户数据
        'user_num': 100
      },
      {
        //密码安全等级
        'pwd_safe_grade': '无安全等级',
        //用户数据
        'user_num': 100
      }]
  },
  //学生在线时长统计
  'studentOnlineTimeStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 5,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 266.0,
        //在线时长等级
        'online_time_grade': '0.5-1h'
      },
      {
        'user_num': 2077.0,
        'online_time_grade': '1-2h'
      },
      {
        'user_num': 26729.0,
        'online_time_grade': '2-3h'
      },
      {
        'user_num': 4400.0,
        'online_time_grade': '<0.5h'
      },
      {
        'user_num': 55179.0,
        'online_time_grade': '>3h'
      }]
  },
  //教师常用客户端统计
  'teacherClientStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 2,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 1698.0,
        //客户端类型
        'client_type': 'mobile'
      },
      {
        'user_num': 46953.0,
        'client_type': 'pc'
      }]
  },
  //学生登录方式统计
  'studentLoginTypeStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 4,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 4237.0,
        //登录方式
        'login_type': '免登陆'
      },
      {
        'user_num': 5481.0,
        'login_type': '手机App登录'
      },
      {
        'user_num': 33334.0,
        'login_type': '联合登陆'
      },
      {
        'user_num': 112559.0,
        'login_type': '账号密码'
      }]
  },
  //学生浏览器Top5
  'studentBrowserTop5Statisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 5,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 42325.0,
        //浏览器
        'browser': 'Chrome'
      },
      {
        'user_num': 38095.0,
        'browser': 'Apache'
      },
      {
        'user_num': 30160.0,
        'browser': 'IE'
      },
      {
        'user_num': 12404.0,
        'browser': 'Safari'
      },
      {
        'user_num': 4038.0,
        'browser': 'Baidu'
      }]
  },
  //教师常用网络统计
  'teacherNetworkStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 1,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 59.0,
        //网络运营商
        'network_provider': '电信'
      },
      {
        'user_num': 127.0,
        'network_provider': '移动'
      },
      {
        'user_num': 18.0,
        'network_provider': '联通'
      }]
  },
  //教师在线时长统计
  'teacherOnlineTimeStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 5,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 733.0,
        //在线时长
        'online_time_grade': '0.5-1h'
      },
      {
        'user_num': 1149.0,
        'online_time_grade': '1-2h'
      },
      {
        'user_num': 10419.0,
        'online_time_grade': '2-3h'
      },
      {
        'user_num': 4173.0,
        'online_time_grade': '<0.5h'
      },
      {
        'user_num': 17128.0,
        'online_time_grade': '>3h'
      }]
  },
  //学生网络统计
  'studentNetworkStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 6,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 71.0,
        //网络运营商
        'network_provider': '电信'
      },
      {
        'user_num': 27.0,
        'network_provider': '移动'
      },
      {
        'user_num': 4.0,
        'network_provider': '联通'
      }]
  },
  //教师登录类型
  'teacherLoginTypeStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 4,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 3898.0,
        //登录类型
        'login_type': '免登陆'
      },
      {
        'user_num': 765.0,
        'login_type': '手机App登录'
      },
      {
        'user_num': 2575.0,
        'login_type': '联合登陆'
      },
      {
        'user_num': 59682.0,
        'login_type': '账号密码'
      }]
  },
  //累计账号审计
  'accountAuditStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 0,
      'pages': 0
    },
    'dataSet': [
      {
        //恶意IP
        'malic_ip_num': 112,
        //密码暴力猜解
        'pws_guess_num': 59
      }]
  },
  //今日审计
  'todayAccountAuditStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 0,
      'pages': 0
    },
    'dataSet': [
      {
        //恶意IP
        'malic_ip_num': 12,
        //密码暴力猜解
        'pws_guess_num': 3
      }]
  },
  //教师常用浏览器统计
  'teacherBrowserTop5Statisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 5,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 29965.0,
        //浏览器
        'browser': 'IE'
      },
      {
        'user_num': 10654.0,
        'browser': 'Chrome'
      },
      {
        'user_num': 2493.0,
        'browser': 'Apache'
      },
      {
        'user_num': 1252.0,
        'browser': '搜狗'
      },
      {
        'user_num': 901.0,
        'browser': 'QQ'
      }]
  },
  //用户地区统计
  'userAreaStatisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 3,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 2.0,
        //省份
        'province': '北京市'
      },
      {
        'user_num': 2.0,
        'province': '湖北省'
      },
      {
        'user_num': 99.0,
        'province': '浙江省'
      }]
  },
  //用户境外国家Top5
  'userForeignAreaTop5Statisc': {
    'returnStatus': '1',
    'returnId': '',
    'errorCode': '',
    'errorMsg': '',
    'pageInfo': {
      'pageNum': 1,
      'pageSize': 1000,
      'startRow': 0,
      'endRow': 1000,
      'total': 3,
      'pages': 1
    },
    'dataSet': [
      {
        //用户数
        'user_num': 2.0,
        //省份
        'country': '国家1'
      },
      {
        'user_num': 2.0,
        'country': '国家2'
      },
      {
        'user_num': 99.0,
        'country': '国家3'
      },
      {
        'user_num': 99.0,
        'country': '国家4'
      },
      {
        'user_num': 99.0,
        'country': '国家5'
      }]
  }
})

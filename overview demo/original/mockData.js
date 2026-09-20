/**
 * 广州脑科医院 35 项指标 Mock 数据
 * 数据来源：广州脑科指标归类整理20260918-用于概览设计.xlsx
 * 5 大制度模块 + 排名 + 趋势图
 */

// 指标导向：positive=越高越好（上升绿色），negative=越低越好（下降绿色），monitor=监测比较
const DIRECTION = { positive: 'positive', negative: 'negative', monitor: 'monitor' }
const STATUS = { online: 'online', offline: 'offline' }

// ====== 35 项指标明细 ======
const indicators = {
  // ---------- 模块1：首诊、三级查房、分级护理与值班交接查对制度（7） ----------
  hzry48xsnzkdbl: { name: '患者入院48小时内转科的比例(%)', code: 'hzry48xsnzkdbl', module: 1, subSystem: '首诊负责制度', direction: 'negative', status: 'online', value: 8.2, deltaYoY: -0.6, deltaMoM: -0.3, desc: '反映科室收治能力与首诊负责制度的落实情况。指标越低越好。', formula: '48小时内转科患者数 / 同期入院患者总数 × 100%' },
  hzry8xsncfl: { name: '患者入院8小时内查房率(%)', code: 'hzry8xsncfl', module: 1, subSystem: '首诊负责制度', direction: 'positive', status: 'online', value: 96.8, deltaYoY: 1.4, deltaMoM: 0.6, desc: '反映医师对新人院患者的及时关注程度。指标越高越好。', formula: '入院8小时内查房患者数 / 同期新人院患者总数 × 100%' },
  sjyscfjlgfl: { name: '上级医师查房记录规范率(%)', code: 'sjyscfjlgfl', module: 1, subSystem: '三级查房制度', direction: 'positive', status: 'online', value: 92.3, deltaYoY: -0.6, deltaMoM: 0.2, desc: '反映三级查房制度的规范执行情况。指标越高越好。', formula: '上级医师查房记录规范患者数 / 同期查房患者总数 × 100%' },
  zyhzfjhssl: { name: '住院患者非计划手术率(%)', code: 'zyhzfjhssl', module: 1, subSystem: '三级查房制度', direction: 'negative', status: 'online', value: 3.2, deltaYoY: -0.4, deltaMoM: -0.1, desc: '反映治疗计划性和查房质量。指标越低越好。', formula: '非计划手术患者数 / 同期手术患者总数 × 100%' },
  sshztjhlyjhlcyl: { name: '手术患者特级护理/一级护理出院率(%)', code: 'sshztjhlyjhlcyl', module: 1, subSystem: '分级护理制度', direction: 'negative', status: 'online', value: 12.5, deltaYoY: 0.8, deltaMoM: 0.3, desc: '反映护理级别判定的准确性。指标越低越好。', formula: '特级/一级护理手术患者出院人数 / 同期手术出院患者总数 × 100%' },
  sjsshzssdrcpjjbzb: { name: '四级手术患者手术当日床旁交接班占比(%)', code: 'sjsshzssdrcpjjbzb', module: 1, subSystem: '值班和交接班制度', direction: 'positive', status: 'online', value: 98.6, deltaYoY: 0.4, deltaMoM: 0.1, desc: '反映值班交接班制度的执行情况。指标越高越好。', formula: '手术当日床旁交接班四级手术患者数 / 同期四级手术患者总数 × 100%' },
  cqyzdrzzl: { name: '长期医嘱当日终止率(%)', code: 'cqyzdrzzl', module: 1, subSystem: '查对制度', direction: 'negative', status: 'online', value: 88.1, deltaYoY: 2.1, deltaMoM: 0.8, desc: '反映医嘱执行准确性与查对制度落实情况。指标越低越好。', formula: '长期医嘱当日终止数 / 同期长期医嘱总数 × 100%' },

  // 模块1补充：4个柱状图指标
  ryrs: { name: '入院人数', code: 'ryrs', module: 1, subSystem: '首诊负责制度', direction: 'monitor', status: 'online', type: 'bar-supplement' },
  cyrs: { name: '出院人数', code: 'cyrs', module: 1, subSystem: '首诊负责制度', direction: 'monitor', status: 'online', type: 'bar-supplement' },
  ssrs: { name: '手术人数', code: 'ssrs', module: 1, subSystem: '首诊负责制度', direction: 'monitor', status: 'online', type: 'bar-supplement' },
  sjssrs: { name: '四级手术人数', code: 'sjssrs', module: 1, subSystem: '首诊负责制度', direction: 'monitor', status: 'online', type: 'bar-supplement' },

  // ---------- 模块2：会诊、急危重抢救与危急值报告制度（7） ----------
  jhzjsdwl: { name: '急会诊及时到位率(%)', code: 'jhzjsdwl', module: 2, subSystem: '会诊制度', direction: 'positive', status: 'online', value: 95.4, deltaYoY: 1.2, deltaMoM: 0.3, desc: '反映急会诊响应效率。指标越高越好。', formula: '急会诊及时到位次数 / 同期急会诊总次数 × 100%' },
  jhzyxl: { name: '急会诊有效率(%)', code: 'jhzyxl', module: 2, subSystem: '会诊制度', direction: 'positive', status: 'online', value: 89.7, deltaYoY: 0.6, deltaMoM: -0.4, desc: '反映急会诊的实际效果。指标越高越好。', formula: '急会诊有效次数 / 同期急会诊总次数 × 100%' },
  pthzjswcl: { name: '普通会诊及时完成率(%)', code: 'pthzjswcl', module: 2, subSystem: '会诊制度', direction: 'positive', status: 'online', value: 93.2, deltaYoY: 0.8, deltaMoM: 0.2, desc: '反映普通会诊的执行及时性。指标越高越好。', formula: '普通会诊及时完成次数 / 同期普通会诊总次数 × 100%' },
  pthzyxl: { name: '普通会诊有效率(%)', code: 'pthzyxl', module: 2, subSystem: '会诊制度', direction: 'positive', status: 'online', value: 91.5, deltaYoY: 0.3, deltaMoM: -0.1, desc: '反映普通会诊的实际效果。指标越高越好。', formula: '普通会诊有效次数 / 同期普通会诊总次数 × 100%' },
  jwzzhzqjcgl: { name: '急危重症患者抢救成功率(%)', code: 'jwzzhzqjcgl', module: 2, subSystem: '急危重患者抢救制度', direction: 'positive', status: 'online', value: 92.6, deltaYoY: 1.8, deltaMoM: 0.5, desc: '反映医院急危重症救治能力。指标越高越好。', formula: '急危重症抢救成功次数 / 同期急危重症抢救总次数 × 100%' },
  wjzbgsj: { name: '危急值报告时间', code: 'wjzbgsj', module: 2, subSystem: '危急值报告制度', direction: 'negative', status: 'online', type: 'multi-value', value: 9.6, unit: '分钟', valueSource: '独立模拟主值，非三个分项的平均值', desc: '需要同时展示住院、门诊、急诊危急值报告时间（中位数）。指标越低越好。', formula: '危急值报告时间中位数（min）', subValues: { 住院: 12.5, 门诊: 8.3, 急诊: 5.6 } },
  zyhzwjzdrjsczl: { name: '住院患者危急值当日及时处置率(%)', code: 'zyhzwjzdrjsczl', module: 2, subSystem: '危急值报告制度', direction: 'positive', status: 'online', value: 96.1, deltaYoY: 0.9, deltaMoM: 0.4, desc: '反映危急值处置及时性。指标越高越好。', formula: '当日及时处置危急值患者数 / 同期住院危急值患者总数 × 100%' },

  // ---------- 模块3：疑难病例与死亡病例讨论制度（7） ----------
  fjhzczysshzynbltwcl: { name: '非计划再次住院/手术患者疑难病例讨论完成率(%)', code: 'fjhzczysshzynbltwcl', module: 3, subSystem: '疑难病例讨论制度', direction: 'positive', status: 'online', value: 94.5, deltaYoY: 1.5, deltaMoM: 0.6, desc: '反映疑难病例讨论制度的执行情况。指标越高越好。', formula: '完成讨论人数 / 同期非计划再次住院/手术患者总数 × 100%' },
  fjhzczysshzynbltljlwzl: { name: '非计划再次住院/手术患者疑难病例讨论记录完整率(%)', code: 'fjhzczysshzynbltljlwzl', module: 3, subSystem: '疑难病例讨论制度', direction: 'positive', status: 'online', value: 90.8, deltaYoY: 0.7, deltaMoM: 0.2, desc: '反映疑难病例讨论记录质量。指标越高越好。', formula: '记录规范完整人数 / 同期讨论完成总人数 × 100%' },
  geycfyhzjxynbltldzb: { name: '高额异常费用患者进行疑难病例讨论的占比(%)', code: 'geycfyhzjxynbltldzb', module: 3, subSystem: '疑难病例讨论制度', direction: 'positive', status: 'online', value: 87.3, deltaYoY: 2.1, deltaMoM: 0.8, desc: '反映对高额异常费用病例的监管力度。指标越高越好。', formula: '完成讨论高额异常费用患者数 / 同期高额异常费用患者总数 × 100%' },
  swbltl5rwcl: { name: '死亡病例讨论5日完成率(%)', code: 'swbltl5rwcl', module: 3, subSystem: '死亡病例讨论制度', direction: 'positive', status: 'online', type: 'fraction', numeratorLabel: '完成死亡病例讨论患者数', denominatorLabel: '住院死亡患者数', unit: '%', value: 95.6, num: 218, den: 228, desc: '反映死亡病例讨论及时性，同时展示分子分母实际值。指标越高越好。', formula: '完成死亡病例讨论患者数 ÷ 住院死亡患者数 × 100%' },
  ywbmzztldswblyfsjfdswblbz: { name: '医务部门组织讨论的死亡病例与发生纠纷的死亡病例比值', code: 'ywbmzztldswblyfsjfdswblbz', module: 3, subSystem: '死亡病例讨论制度', direction: 'positive', status: 'online', type: 'fraction', numeratorLabel: '医务部门组织进行死亡病例讨论的病例数量', denominatorLabel: '同期发生医疗纠纷的死亡病例数量', unit: '', value: 0.764, num: 84, den: 110, desc: '反映死亡病例讨论制度落实和管理情况。两类病例数量比值，不按百分率展示。', formula: '医务部门组织进行死亡病例讨论的病例数量 ÷ 同期发生医疗纠纷的死亡病例数量' },
  kzrzcswbltll: { name: '科主任主持死亡病例讨论率(%)', code: 'kzrzcswbltll', module: 3, subSystem: '死亡病例讨论制度', direction: 'positive', status: 'online', type: 'fraction', numeratorLabel: '科主任主持死亡病例数', denominatorLabel: '住院死亡患者数', unit: '%', value: 98.2, num: 224, den: 228, desc: '反映科主任对死亡病例讨论的重视程度。指标越高越好。', formula: '科主任主持死亡病例数 ÷ 住院死亡患者数 × 100%' },
  swhzbascl: { name: '死亡患者病案上传率(%)', code: 'swhzbascl', module: 3, subSystem: '死亡病例讨论制度', direction: 'positive', status: 'online', type: 'fraction', numeratorLabel: '按要求完整上传本机构死亡患者病案的数量', denominatorLabel: '同期应上传死亡患者病案总数量', unit: '%', value: 99.1, num: 226, den: 228, desc: '反映死亡病案归档及时性。指标越高越好。', formula: '按要求完整上传本机构死亡患者病案的数量 ÷ 同期应上传死亡患者病案总数量 × 100%' },

  // ---------- 模块4：术前讨论、手术安全核查与分级管理制度（10） ----------
  sqtlwcl: { name: '术前讨论完成率(%)', code: 'sqtlwcl', module: 4, subSystem: '术前讨论制度', direction: 'positive', status: 'online', value: 96.8, deltaYoY: 0.6, deltaMoM: 0.2, desc: '反映术前讨论制度的执行情况。指标越高越好。', formula: '完成术前讨论例数 / 同期手术总例数 × 100%' },
  szcjsqtll: { name: '术者参加术前讨论率(%)', code: 'szcjsqtll', module: 4, subSystem: '术前讨论制度', direction: 'positive', status: 'online', value: 92.1, deltaYoY: 0.4, deltaMoM: -0.1, desc: '反映术者对术前讨论的参与度。指标越高越好。', formula: '术者参加讨论例数 / 同期术前讨论总例数 × 100%' },
  sqtljhssyzl: { name: '术前讨论计划手术一致率(%)', code: 'sqtljhssyzl', module: 4, subSystem: '术前讨论制度', direction: 'positive', status: 'online', value: 88.4, deltaYoY: -0.7, deltaMoM: -0.3, desc: '反映术前讨论的计划执行准确度。指标越高越好。', formula: '实际与计划一致例数 / 同期术前讨论总例数 × 100%' },
  sjssszyjhssszyzl: { name: '实际手术术者与计划手术术者一致率(%)', code: 'sjssszyjhssszyzl', module: 4, subSystem: '术前讨论制度', direction: 'positive', status: 'online', value: 90.2, deltaYoY: 0.5, deltaMoM: 0.1, desc: '反映术者变更管理规范程度。指标越高越好。', formula: '实际术者与计划一致例数 / 同期手术总例数 × 100%' },
  ssyssssjzhl: { name: '手术医师手术时间重合率(%)', code: 'ssyssssjzhl', module: 4, subSystem: '手术安全核查制度', direction: 'negative', status: 'online', value: 2.4, deltaYoY: -0.3, deltaMoM: -0.1, desc: '反映手术安排的合理性，避免医师冲突。指标越低越好。', formula: '手术时间重合手术医师人次 / 同期手术总人次 × 100%' },
  mzyssssjzhl: { name: '麻醉医师手术时间重合率(%)', code: 'mzyssssjzhl', module: 4, subSystem: '手术安全核查制度', direction: 'negative', status: 'online', value: 1.8, deltaYoY: -0.2, deltaMoM: 0.1, desc: '反映麻醉安排的合理性。指标越低越好。', formula: '手术时间重合麻醉医师人次 / 同期麻醉总人次 × 100%' },
  sjssysjssbfzfslb: { name: '四级手术与三级手术并发症发生率比', code: 'sjssysjssbfzfslb', module: 4, subSystem: '手术分级管理制度', direction: 'monitor', status: 'online', type: 'ratio', value: 1.42, subValues: { '四级手术并发症率': 8.2, '三级手术并发症率': 5.8 }, desc: '比值类指标，同时展示四级与三级手术并发症率。监测比较，无同比环比。', formula: '四级手术并发症率 / 三级手术并发症率' },
  sjssysjsshzswlb: { name: '四级手术与三级手术患者死亡率比', code: 'sjssysjsshzswlb', module: 4, subSystem: '手术分级管理制度', direction: 'monitor', status: 'online', type: 'ratio', value: 2.15, subValues: { '四级手术死亡率': 1.8, '三级手术死亡率': 0.84 }, desc: '比值类指标，同时展示四级与三级手术死亡率。监测比较，无同比环比。', formula: '四级手术死亡率 / 三级手术死亡率' },
  sjsssqdxktlwcl: { name: '四级手术术前多学科讨论完成率(%)', code: 'sjsssqdxktlwcl', module: 4, subSystem: '手术分级管理制度', direction: 'positive', status: 'online', value: 91.6, deltaYoY: 1.3, deltaMoM: 0.4, desc: '反映四级手术的多学科诊疗落实情况。指标越高越好。', formula: '完成多学科讨论例数 / 同期四级手术总例数 × 100%' },
  ssjsssjkzl: { name: '三、四级手术实际开展率(%)', code: 'ssjsssjkzl', module: 4, subSystem: '手术分级管理制度', direction: 'positive', status: 'online', value: 87.9, deltaYoY: 0.6, deltaMoM: -0.2, desc: '反映医院高难度手术的实际开展能力。指标越高越好。', formula: '实际开展三、四级手术例数 / 同期备案三、四级手术总例数 × 100%' },

  // ---------- 模块5：抗菌药物、临床用血与新技术准入制度（4） ----------
  xjsxxmlczhl: { name: '新技术新项目留存转化率(%)', code: 'xjsxxmlczhl', module: 5, subSystem: '新技术和新项目准入制度', direction: 'positive', status: 'online', value: 78.4, deltaYoY: 2.6, deltaMoM: 0.9, desc: '反映新技术新项目的临床应用价值。指标越高越好。', formula: '留存转化项目数 / 同期准入项目总数 × 100%' },
  tssyjkjywsyhzl: { name: '特殊使用级抗菌药物使用会诊率(%)', code: 'tssyjkjywsyhzl', module: 5, subSystem: '抗菌药物分级管理制度', direction: 'positive', status: 'online', value: 96.2, deltaYoY: 0.5, deltaMoM: 0.2, desc: '反映特殊抗菌药物的规范使用情况。指标越高越好。', formula: '使用前会诊人次 / 同期特殊级抗菌药物使用总人次 × 100%' },
  lcyxhpgjll: { name: '临床用血后评估记录率(%)', code: 'lcyxhpgjll', module: 5, subSystem: '临床用血审核制度', direction: 'positive', status: 'online', value: 94.8, deltaYoY: 0.8, deltaMoM: 0.3, desc: '反映临床用血的规范性和后评估质量。指标越高越好。', formula: '完成用血后评估记录例数 / 同期用血总例数 × 100%' },
  szztxhsl: { name: '术中自体血回输率(%)', code: 'szztxhsl', module: 5, subSystem: '临床用血审核制度', direction: 'positive', status: 'offline', value: null, desc: '反映术中合理用血能力。指标越高越好。', formula: '术中自体血回输例数 / 同期手术总例数 × 100%' }
}

// ====== 模块定义 ======
const modules = [
  {
    id: 1,
    name: '首诊、三级查房、分级护理与值班交接查对制度',
    shortName: '首诊三级查房',
    anchor: 'module-1',
    indicatorCodes: ['hzry48xsnzkdbl', 'hzry8xsncfl', 'sjyscfjlgfl', 'zyhzfjhssl', 'sshztjhlyjhlcyl', 'sjsshzssdrcpjjbzb', 'cqyzdrzzl', 'ryrs', 'cyrs', 'ssrs', 'sjssrs']
  },
  {
    id: 2,
    name: '会诊、急危重抢救与危急值报告制度',
    shortName: '会诊抢救危急值',
    anchor: 'module-2',
    indicatorCodes: ['jhzjsdwl', 'jhzyxl', 'pthzjswcl', 'pthzyxl', 'jwzzhzqjcgl', 'wjzbgsj', 'zyhzwjzdrjsczl']
  },
  {
    id: 3,
    name: '疑难病例与死亡病例讨论制度',
    shortName: '疑难死亡病例',
    anchor: 'module-3',
    indicatorCodes: ['fjhzczysshzynbltwcl', 'fjhzczysshzynbltljlwzl', 'geycfyhzjxynbltldzb', 'swbltl5rwcl', 'ywbmzztldswblyfsjfdswblbz', 'kzrzcswbltll', 'swhzbascl']
  },
  {
    id: 4,
    name: '术前讨论、手术安全核查与分级管理制度',
    shortName: '术前手术安全',
    anchor: 'module-4',
    indicatorCodes: ['sqtlwcl', 'szcjsqtll', 'sqtljhssyzl', 'sjssszyjhssszyzl', 'ssyssssjzhl', 'mzyssssjzhl', 'sjssysjssbfzfslb', 'sjssysjsshzswlb', 'sjsssqdxktlwcl', 'ssjsssjkzl']
  },
  {
    id: 5,
    name: '抗菌药物、临床用血与新技术准入制度',
    shortName: '抗菌用血准入',
    anchor: 'module-5',
    indicatorCodes: ['xjsxxmlczhl', 'tssyjkjywsyhzl', 'lcyxhpgjll', 'szztxhsl']
  }
]

// ====== 院内科室排名（蝴蝶图 / 柱线）Mock ======
const deptRanking = [
  { name: '神经内科',   value: 95.2, lastValue: 92.1 },
  { name: '精神科',     value: 93.8, lastValue: 90.5 },
  { name: '心理科',     value: 92.5, lastValue: 89.8 },
  { name: '康复医学科', value: 91.3, lastValue: 88.4 },
  { name: '老年病科',   value: 90.6, lastValue: 87.9 },
  { name: '急诊科',     value: 89.4, lastValue: 86.2 },
  { name: '重症医学科', value: 88.1, lastValue: 85.5 },
  { name: '神经外科',   value: 87.5, lastValue: 84.8 },
  { name: '麻醉科',     value: 86.7, lastValue: 83.9 },
  { name: '医学影像科', value: 85.9, lastValue: 83.1 }
]

// ====== 趋势图 Mock ======
const trendData = {
  months: ['1月','2月','3月','4月','5月','6月','7月','8月'],
  series: [
    { name: '首诊三级查房', data: [82, 84, 86, 87, 89, 91, 92, 93] },
    { name: '会诊抢救危急值', data: [78, 80, 83, 85, 87, 89, 91, 92] },
    { name: '疑难死亡病例', data: [85, 86, 88, 89, 90, 92, 93, 94] },
    { name: '术前手术安全', data: [80, 82, 84, 86, 88, 89, 91, 92] },
    { name: '抗菌用血准入', data: [88, 89, 90, 91, 92, 93, 94, 95] }
  ]
}

// ====== 模块1补充柱状图数据 ======
const supplementBarData = {
  months: ['1月','2月','3月','4月','5月','6月','7月','8月'],
  series: [
    { name: '入院人数', code: 'ryrs', data: [1820, 1750, 1920, 1880, 2030, 2120, 2080, 2150] },
    { name: '出院人数', code: 'cyrs', data: [1780, 1720, 1890, 1850, 2000, 2090, 2050, 2120] },
    { name: '手术人数', code: 'ssrs', data: [320, 305, 358, 342, 386, 412, 398, 425] },
    { name: '四级手术人数', code: 'sjssrs', data: [82, 78, 95, 88, 102, 115, 108, 122] }
  ]
}

// 暴露给浏览器
if (typeof window !== 'undefined') {
  window.indicators = indicators
  window.modules = modules
  window.deptRanking = deptRanking
  window.trendData = trendData
  window.supplementBarData = supplementBarData
  window.DIRECTION = DIRECTION
  window.STATUS = STATUS
}

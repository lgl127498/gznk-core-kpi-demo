/**
 * 广州脑科医院 死亡病例台账 Mock 数据
 * 业务：医务部门组织讨论的死亡病例与发生纠纷的死亡病例比值（评价指标）
 * 数据来源：基础字段来自 HIS 镜像，纠纷字段用户录入
 * 权限：见下方 ROLE_PERMS
 */

const ROLE_PERMS = {
  VIEW: 'death_case_ledger:view',
  EDIT: 'death_case_ledger:edit',
  EXPORT: 'death_case_ledger:export'
}

// ====== 字典：科室 ======
const deptList = [
  { code: 'neurology',    name: '神经内科' },
  { code: 'psychiatry',   name: '精神科' },
  { code: 'psycology',    name: '心理科' },
  { code: 'rehab',        name: '康复医学科' },
  { code: 'geriatrics',   name: '老年病科' },
  { code: 'emergency',    name: '急诊科' },
  { code: 'icu',          name: '重症医学科' },
  { code: 'neurosurgery', name: '神经外科' },
  { code: 'anesthesia',   name: '麻醉科' },
  { code: 'imaging',      name: '医学影像科' }
]

// ====== 字典：就诊类型 ======
const VISIT_TYPE = {
  OUTPATIENT: '门诊',
  INPATIENT:  '住院',
  EMERGENCY:  '急诊'
}

// ====== 字典：纠纷标记状态（前端展示用） ======
const DISPUTE_STATUS = {
  UNMARKED: '未标记',
  MARKED:   '已标记',
  REVOKED:  '已撤销'
}

// ====== 字典：讨论结论（待定项——以下为候选枚举，实际由产品确认） ======
const DISCUSSION_CONCLUSIONS = [
  '抢救成功，病情稳定',
  '抢救无效，死亡',
  '家属放弃治疗，自动出院',
  '转上级医院进一步治疗',
  '病情恶化，预后不良',
  '并发症导致多器官衰竭',
  '原发病进展，终末期'
]

// ====== 字典：用户（用于讨论签名 / 纠纷标记人） ======
const users = [
  { id: 1001, name: '王建国', title: '主任医师',         deptCode: 'neurosurgery' },
  { id: 1002, name: '李慧敏', title: '副主任医师',       deptCode: 'neurology' },
  { id: 1003, name: '张志强', title: '主治医师',         deptCode: 'icu' },
  { id: 1004, name: '陈雅芳', title: '副主任医师',       deptCode: 'geriatrics' },
  { id: 1005, name: '刘伟东', title: '主任医师',         deptCode: 'psychiatry' },
  { id: 1006, name: '赵丽华', title: '主治医师',         deptCode: 'emergency' },
  { id: 1007, name: '孙文博', title: '副主任医师',       deptCode: 'rehab' },
  { id: 1008, name: '周晓燕', title: '主任医师',         deptCode: 'psycology' },
  { id: 1009, name: '吴志远', title: '副主任医师',       deptCode: 'anesthesia' },
  { id: 1010, name: '郑红梅', title: '主任医师',         deptCode: 'imaging' },
  { id: 1011, name: '医务部-张三', title: '医务部主任',    deptCode: 'medical_affairs' }
]

// ====== 工具：根据 id 取用户 ======
function findUser(id) {
  return users.find(u => u.id === id) || null
}

// ====== 工具：根据 code 取科室 ======
function findDept(code) {
  return deptList.find(d => d.code === code) || null
}

// ====== 工具：日期偏移（锚定 2026-09-28） ======
function daysAgo(n) {
  const d = new Date(2026, 8, 28)
  d.setDate(d.getDate() - n)
  return d
}

function pad(n) { return String(n).padStart(2, '0') }
function fmtDate(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
function fmtDateTime(d) {
  return `${fmtDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`
}

// ====== 25 条死亡病例 Mock ======
// 字段说明：
//   id                   主键
//   registrationNo       登记号（HIS 主键）
//   patientName          患者姓名
//   visitType            就诊类型（门诊 / 住院 / 急诊）
//   visitDate            就诊日期
//   visitDeptCode        就诊科室编码
//   deathTime            死亡时间
//   discussionConclusion 讨论结论（待定，可能改为其他形式）
//   discussionRecordTime 讨论记录时间
//   discussionPhysicianId 讨论记录医师 id
//   discussionHostId     讨论记录主持人 id
//   isDispute            是否标记纠纷 0/1
//   disputeMarkTime      纠纷标记时间
//   disputeMarkUserId    纠纷标记人 id
//   disputeDescription   纠纷说明
//   disputeUpdatedAt     纠纷更新时间
const deathCases = [
  // —— 住院死亡，已讨论，已标记纠纷（典型场景） ——
  {
    id: 1, registrationNo: 'BN202609001', patientName: '陈志强',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(45),
    visitDeptCode: 'neurosurgery', deathTime: daysAgo(43),
    discussionConclusion: '抢救无效，死亡',
    discussionRecordTime: daysAgo(40), discussionPhysicianId: 1001, discussionHostId: 1001,
    isDispute: 1, disputeMarkTime: daysAgo(38), disputeMarkUserId: 1011,
    disputeDescription: '家属质疑手术时机选择，要求医院出具书面解释。',
    disputeUpdatedAt: daysAgo(37)
  },
  {
    id: 2, registrationNo: 'BN202609002', patientName: '林秀英',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(40),
    visitDeptCode: 'neurology', deathTime: daysAgo(38),
    discussionConclusion: '原发病进展，终末期',
    discussionRecordTime: daysAgo(35), discussionPhysicianId: 1002, discussionHostId: 1001,
    isDispute: 1, disputeMarkTime: daysAgo(34), disputeMarkUserId: 1011,
    disputeDescription: '家属对护理记录完整性提出异议。',
    disputeUpdatedAt: daysAgo(33)
  },
  {
    id: 3, registrationNo: 'BN202609003', patientName: '黄海涛',
    visitType: VISIT_TYPE.EMERGENCY, visitDate: daysAgo(35),
    visitDeptCode: 'emergency', deathTime: daysAgo(35),
    discussionConclusion: '抢救无效，死亡',
    discussionRecordTime: daysAgo(32), discussionPhysicianId: 1006, discussionHostId: 1001,
    isDispute: 1, disputeMarkTime: daysAgo(31), disputeMarkUserId: 1011,
    disputeDescription: '家属反映急诊分诊等待时间过长。',
    disputeUpdatedAt: daysAgo(30)
  },
  {
    id: 4, registrationNo: 'BN202609004', patientName: '王美丽',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(32),
    visitDeptCode: 'icu', deathTime: daysAgo(30),
    discussionConclusion: '并发症导致多器官衰竭',
    discussionRecordTime: daysAgo(27), discussionPhysicianId: 1003, discussionHostId: 1001,
    isDispute: 2, disputeMarkTime: daysAgo(26), disputeMarkUserId: 1011,
    disputeDescription: '经核实并与家属沟通，争议已消除，撤销纠纷标记。',
    disputeUpdatedAt: daysAgo(25)
  },

  // —— 住院死亡，已讨论，未标记纠纷 ——
  {
    id: 5, registrationNo: 'BN202609005', patientName: '李建华',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(28),
    visitDeptCode: 'neurosurgery', deathTime: daysAgo(26),
    discussionConclusion: '抢救无效，死亡',
    discussionRecordTime: daysAgo(22), discussionPhysicianId: 1001, discussionHostId: 1001,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },
  {
    id: 6, registrationNo: 'BN202609006', patientName: '赵文斌',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(25),
    visitDeptCode: 'neurology', deathTime: daysAgo(23),
    discussionConclusion: '原发病进展，终末期',
    discussionRecordTime: daysAgo(20), discussionPhysicianId: 1002, discussionHostId: 1001,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },
  {
    id: 7, registrationNo: 'BN202609007', patientName: '孙桂兰',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(22),
    visitDeptCode: 'geriatrics', deathTime: daysAgo(20),
    discussionConclusion: '家属放弃治疗，自动出院',
    discussionRecordTime: daysAgo(17), discussionPhysicianId: 1004, discussionHostId: 1004,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },
  {
    id: 8, registrationNo: 'BN202609008', patientName: '周建国',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(20),
    visitDeptCode: 'psychiatry', deathTime: daysAgo(18),
    discussionConclusion: '抢救无效，死亡',
    discussionRecordTime: daysAgo(15), discussionPhysicianId: 1005, discussionHostId: 1005,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },
  {
    id: 9, registrationNo: 'BN202609009', patientName: '吴美芳',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(18),
    visitDeptCode: 'rehab', deathTime: daysAgo(16),
    discussionConclusion: '病情恶化，预后不良',
    discussionRecordTime: daysAgo(13), discussionPhysicianId: 1007, discussionHostId: 1001,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },
  {
    id: 10, registrationNo: 'BN202609010', patientName: '郑伟明',
    visitType: VISIT_TYPE.EMERGENCY, visitDate: daysAgo(15),
    visitDeptCode: 'emergency', deathTime: daysAgo(15),
    discussionConclusion: '抢救无效，死亡',
    discussionRecordTime: daysAgo(12), discussionPhysicianId: 1006, discussionHostId: 1001,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },

  // —— 住院死亡，已讨论，已标记纠纷 ——
  {
    id: 11, registrationNo: 'BN202609011', patientName: '钱玉珍',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(12),
    visitDeptCode: 'icu', deathTime: daysAgo(10),
    discussionConclusion: '并发症导致多器官衰竭',
    discussionRecordTime: daysAgo(7), discussionPhysicianId: 1003, discussionHostId: 1001,
    isDispute: 1, disputeMarkTime: daysAgo(6), disputeMarkUserId: 1011,
    disputeDescription: '家属对抢救用药剂量提出疑问。',
    disputeUpdatedAt: daysAgo(5)
  },
  {
    id: 12, registrationNo: 'BN202609012', patientName: '冯志刚',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(10),
    visitDeptCode: 'neurosurgery', deathTime: daysAgo(8),
    discussionConclusion: '抢救无效，死亡',
    discussionRecordTime: daysAgo(5), discussionPhysicianId: 1001, discussionHostId: 1001,
    isDispute: 1, disputeMarkTime: daysAgo(4), disputeMarkUserId: 1011,
    disputeDescription: '家属怀疑术前评估不充分。',
    disputeUpdatedAt: daysAgo(3)
  },
  {
    id: 13, registrationNo: 'BN202609013', patientName: '蒋丽娟',
    visitType: VISIT_TYPE.OUTPATIENT, visitDate: daysAgo(8),
    visitDeptCode: 'psycology', deathTime: daysAgo(7),
    discussionConclusion: '自杀事件，已报警备案',
    discussionRecordTime: daysAgo(5), discussionPhysicianId: 1008, discussionHostId: 1008,
    isDispute: 1, disputeMarkTime: daysAgo(5), disputeMarkUserId: 1011,
    disputeDescription: '家属质疑门诊心理评估流程。',
    disputeUpdatedAt: daysAgo(4)
  },

  // —— 住院死亡，未讨论（5 日内未完成讨论，触发警告） ——
  {
    id: 14, registrationNo: 'BN202609014', patientName: '魏长青',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(6),
    visitDeptCode: 'neurosurgery', deathTime: daysAgo(5),
    discussionConclusion: null,
    discussionRecordTime: null, discussionPhysicianId: null, discussionHostId: null,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },
  {
    id: 15, registrationNo: 'BN202609015', patientName: '韩秀梅',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(5),
    visitDeptCode: 'neurology', deathTime: daysAgo(4),
    discussionConclusion: null,
    discussionRecordTime: null, discussionPhysicianId: null, discussionHostId: null,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },

  // —— 已讨论，未标记纠纷 ——
  {
    id: 16, registrationNo: 'BN202609016', patientName: '杨德昌',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(4),
    visitDeptCode: 'geriatrics', deathTime: daysAgo(3),
    discussionConclusion: '原发病进展，终末期',
    discussionRecordTime: daysAgo(1), discussionPhysicianId: 1004, discussionHostId: 1001,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },
  {
    id: 17, registrationNo: 'BN202609017', patientName: '朱金凤',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(3),
    visitDeptCode: 'icu', deathTime: daysAgo(2),
    discussionConclusion: '并发症导致多器官衰竭',
    discussionRecordTime: daysAgo(0), discussionPhysicianId: 1003, discussionHostId: 1001,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },

  // —— 近期死亡，未讨论（用于演示"待补录"状态） ——
  {
    id: 18, registrationNo: 'BN202609018', patientName: '罗建华',
    visitType: VISIT_TYPE.EMERGENCY, visitDate: daysAgo(2),
    visitDeptCode: 'emergency', deathTime: daysAgo(2),
    discussionConclusion: null,
    discussionRecordTime: null, discussionPhysicianId: null, discussionHostId: null,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },
  {
    id: 19, registrationNo: 'BN202609019', patientName: '高秀英',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(1),
    visitDeptCode: 'neurosurgery', deathTime: daysAgo(1),
    discussionConclusion: null,
    discussionRecordTime: null, discussionPhysicianId: null, discussionHostId: null,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },
  {
    id: 20, registrationNo: 'BN202609020', patientName: '马志远',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(1),
    visitDeptCode: 'neurology', deathTime: daysAgo(0),
    discussionConclusion: null,
    discussionRecordTime: null, discussionPhysicianId: null, discussionHostId: null,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },

  // —— 历史数据 ——
  {
    id: 21, registrationNo: 'BN202608028', patientName: '胡桂香',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(60),
    visitDeptCode: 'neurosurgery', deathTime: daysAgo(58),
    discussionConclusion: '抢救无效，死亡',
    discussionRecordTime: daysAgo(55), discussionPhysicianId: 1001, discussionHostId: 1001,
    isDispute: 1, disputeMarkTime: daysAgo(54), disputeMarkUserId: 1011,
    disputeDescription: '家属对术后护理记录有异议，已调解。',
    disputeUpdatedAt: daysAgo(50)
  },
  {
    id: 22, registrationNo: 'BN202608030', patientName: '郭向东',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(55),
    visitDeptCode: 'psychiatry', deathTime: daysAgo(53),
    discussionConclusion: '病情恶化，预后不良',
    discussionRecordTime: daysAgo(50), discussionPhysicianId: 1005, discussionHostId: 1005,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },
  {
    id: 23, registrationNo: 'BN202607015', patientName: '邓丽君',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(80),
    visitDeptCode: 'geriatrics', deathTime: daysAgo(78),
    discussionConclusion: '家属放弃治疗，自动出院',
    discussionRecordTime: daysAgo(75), discussionPhysicianId: 1004, discussionHostId: 1004,
    isDispute: 1, disputeMarkTime: daysAgo(74), disputeMarkUserId: 1011,
    disputeDescription: '家属对放弃治疗决策过程有异议。',
    disputeUpdatedAt: daysAgo(70)
  },
  {
    id: 24, registrationNo: 'BN202607018', patientName: '曾祥瑞',
    visitType: VISIT_TYPE.EMERGENCY, visitDate: daysAgo(75),
    visitDeptCode: 'emergency', deathTime: daysAgo(75),
    discussionConclusion: '抢救无效，死亡',
    discussionRecordTime: daysAgo(72), discussionPhysicianId: 1006, discussionHostId: 1001,
    isDispute: 0, disputeMarkTime: null, disputeMarkUserId: null,
    disputeDescription: '', disputeUpdatedAt: null
  },
  {
    id: 25, registrationNo: 'BN202606010', patientName: '彭玉兰',
    visitType: VISIT_TYPE.INPATIENT, visitDate: daysAgo(100),
    visitDeptCode: 'icu', deathTime: daysAgo(98),
    discussionConclusion: '并发症导致多器官衰竭',
    discussionRecordTime: daysAgo(95), discussionPhysicianId: 1003, discussionHostId: 1001,
    isDispute: 1, disputeMarkTime: daysAgo(94), disputeMarkUserId: 1011,
    disputeDescription: '家属要求复印全部病历资料。',
    disputeUpdatedAt: daysAgo(88)
  }
]

// ====== 工具函数：把 mock 数据转为表格行（含展示字段） ======
function toTableRows(list) {
  return list.map(item => ({
    ...item,
    visitDateText:               fmtDate(item.visitDate),
    deathTimeText:               fmtDateTime(item.deathTime),
    discussionRecordTimeText:    item.discussionRecordTime ? fmtDate(item.discussionRecordTime) : '—',
    disputeMarkTimeText:         item.disputeMarkTime ? fmtDate(item.disputeMarkTime) : '—',
    visitDeptName:               findDept(item.visitDeptCode)?.name || item.visitDeptCode,
    discussionPhysicianName:     item.discussionPhysicianId ? findUser(item.discussionPhysicianId)?.name : '—',
    discussionHostName:          item.discussionHostId ? findUser(item.discussionHostId)?.name : '—',
    disputeMarkUserName:         item.disputeMarkUserId ? findUser(item.disputeMarkUserId)?.name : '—',
    disputeUpdatedAtText:        item.disputeUpdatedAt ? fmtDate(item.disputeUpdatedAt) : '—',
    // 派生：5 日内是否完成讨论（评价指标 swbltl5rwcl 监控）
    isOverdueDiscussion:         !item.discussionRecordTime
      && ((new Date(2026, 8, 28)) - item.deathTime) / (1000 * 60 * 60 * 24) > 5
  }))
}

// ====== 暴露给浏览器 ======
if (typeof window !== 'undefined') {
  window.deathCases = deathCases
  window.deptList = deptList
  window.users = users
  window.VISIT_TYPE = VISIT_TYPE
  window.DISPUTE_STATUS = DISPUTE_STATUS
  window.DISCUSSION_CONCLUSIONS = DISCUSSION_CONCLUSIONS
  window.ROLE_PERMS = ROLE_PERMS
  window.toTableRows = toTableRows
  window.findDept = findDept
  window.findUser = findUser
  window.fmtDate = fmtDate
  window.fmtDateTime = fmtDateTime
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    deathCases, deptList, users,
    VISIT_TYPE, DISPUTE_STATUS, DISCUSSION_CONCLUSIONS, ROLE_PERMS,
    toTableRows, findDept, findUser, fmtDate, fmtDateTime
  }
}

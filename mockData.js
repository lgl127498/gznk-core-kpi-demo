;(function () {
  const DATE_MIN = { year: 2024, month: 1 }
  const DATE_MAX = { year: 2026, month: 7 }

  const deptList = [
    { deptCode: 'all', deptName: '整体' },
    { deptCode: 'sjnk', deptName: '神经内科' },
    { deptCode: 'sjwk', deptName: '神经外科' },
    { deptCode: 'jkj', deptName: '精神科一病区' },
    { deptCode: 'jek', deptName: '精神科二病区' },
    { deptCode: 'xlk', deptName: '心理科' },
    { deptCode: 'lnjk', deptName: '老年精神科' },
    { deptCode: 'esjk', deptName: '儿少精神科' },
    { deptCode: 'kf', deptName: '康复科' },
    { deptCode: 'zgy', deptName: '重症医学科' }
  ]

  const kpiList = [
    { kpiCode: 'sjzzl', systemName: '首诊负责制度', kpiName: '首诊病历书写及时率(%)', fzKpiName: '及时完成书写的首诊病历数', fmKpiName: '同期检查首诊病历总数', unit: '%', degree: 2 },
    { kpiCode: 'sjcfwcx', systemName: '三级查房制度', kpiName: '三级查房完成率(%)', fzKpiName: '按时完成三级医师查房数', fmKpiName: '同期需三级医师查房住院患者总数', unit: '%', degree: 2 },
    { kpiCode: 'jhzjswl', systemName: '会诊制度', kpiName: '急会诊及时到位率(%)', fzKpiName: '10分钟内到位的急会诊数', fmKpiName: '同期急会诊总数', unit: '%', degree: 2 },
    { kpiCode: 'fjhlygl', systemName: '分级护理制度', kpiName: '分级护理合格率(%)', fzKpiName: '护理级别与医嘱病情相符患者数', fmKpiName: '同期分级护理患者总数', unit: '%', degree: 2 },
    { kpiCode: 'jjbjlwcx', systemName: '值班和交接班制度', kpiName: '交接班记录完整率(%)', fzKpiName: '交接班记录完整数', fmKpiName: '同期检查交接班记录总数', unit: '%', degree: 2 },
    { kpiCode: 'ynblltl', systemName: '疑难病例讨论制度', kpiName: '疑难病例讨论及时率(%)', fzKpiName: '按时完成疑难病例讨论数', fmKpiName: '同期疑难病例总数', unit: '%', degree: 2 },
    { kpiCode: 'jwhzqzcg', systemName: '急危重患者抢救制度', kpiName: '急危重患者抢救成功率(%)', fzKpiName: '抢救成功的急危重患者数', fmKpiName: '同期急危重患者抢救总数', unit: '%', degree: 2 },
    { kpiCode: 'sqtlwcx', systemName: '术前讨论制度', kpiName: '术前讨论完成率(%)', fzKpiName: '完成术前讨论的手术数', fmKpiName: '同期三级及以上手术总数', unit: '%', degree: 2 },
    { kpiCode: 'swblltl', systemName: '死亡病例讨论制度', kpiName: '死亡病例讨论及时率(%)', fzKpiName: '一周内完成死亡病例讨论数', fmKpiName: '同期死亡病例总数', unit: '%', degree: 2 },
    { kpiCode: 'ydclhgl', systemName: '查对制度', kpiName: '医嘱查对合格率(%)', fzKpiName: '查对无误医嘱数', fmKpiName: '同期检查医嘱总数', unit: '%', degree: 2 },
    { kpiCode: 'ssaqjcwcx', systemName: '手术安全核查制度', kpiName: '手术安全核查表完整率(%)', fzKpiName: '手术安全核查表完整数', fmKpiName: '同期手术总台次数', unit: '%', degree: 2 },
    { kpiCode: 'ssfjglzxl', systemName: '手术分级管理制度', kpiName: '手术分级管理执行率(%)', fzKpiName: '医师手术权限与手术级别相符台次数', fmKpiName: '同期手术总台次数', unit: '%', degree: 2 },
    { kpiCode: 'xjsxmssps', systemName: '新技术和新项目准入制度', kpiName: '新技术和新项目准入审批数(项)', fzKpiName: null, fmKpiName: null, unit: '项', countKpi: true },
    { kpiCode: 'wjzbgjsl', systemName: '危急值报告制度', kpiName: '危急值报告及时率(%)', fzKpiName: '及时报告的危急值数', fmKpiName: '同期危急值总数', unit: '%', degree: 2 },
    { kpiCode: 'cyblagsl', systemName: '病历管理制度', kpiName: '出院病历按时归档率(%)', fzKpiName: '按时归档出院病历数', fmKpiName: '同期出院病历总数', unit: '%', degree: 2 },
    { kpiCode: 'kjdfjglhzl', systemName: '抗菌药物分级管理制度', kpiName: '特殊使用级抗菌药物会诊率(%)', fzKpiName: '有会诊记录的特殊使用级抗菌药物处方数', fmKpiName: '同期特殊使用级抗菌药物处方总数', unit: '%', degree: 2 },
    { kpiCode: 'lcxysshzl', systemName: '临床用血审核制度', kpiName: '临床用血申请审核率(%)', fzKpiName: '按规定审核的用血申请数', fmKpiName: '同期临床用血申请总数', unit: '%', degree: 2 },
    { kpiCode: 'xxaqyzxyl', systemName: '信息安全管理制度', kpiName: '信息系统故障应急响应及时率(%)', fzKpiName: '及时响应的信息系统故障数', fmKpiName: '同期信息系统故障总数', unit: '%', degree: 2 }
  ]

  function pad(n) {
    return n < 10 ? `0${n}` : `${n}`
  }

  function toMonthStr(year, month) {
    return `${year}-${pad(month)}`
  }

  function getAllMonths() {
    const months = []
    let { year, month } = DATE_MIN
    while (year < DATE_MAX.year || (year === DATE_MAX.year && month <= DATE_MAX.month)) {
      months.push(toMonthStr(year, month))
      month += 1
      if (month > 12) {
        month = 1
        year += 1
      }
    }
    return months
  }

  const allMonths = getAllMonths()

  function hashCode(str) {
    let hash = 2166136261
    for (let i = 0; i < str.length; i += 1) {
      hash ^= str.charCodeAt(i)
      hash = Math.imul(hash, 16777619)
    }
    return hash >>> 0
  }

  function rand(key) {
    let t = hashCode(key) + 0x6d2b79f5
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  const leafDeptList = deptList.filter((item) => item.deptCode !== 'all')

  function buildBaseData() {
    const baseData = {}
    leafDeptList.forEach((dept) => {
      baseData[dept.deptCode] = {}
      kpiList.forEach((kpi) => {
        const deptKpi = {}
        allMonths.forEach((month) => {
          if (kpi.countKpi) {
            deptKpi[month] = {
              value: 1 + Math.floor(rand(`${dept.deptCode}-${kpi.kpiCode}-${month}`) * 12)
            }
            return
          }
          const fm = 30 + Math.floor(rand(`${dept.deptCode}-${kpi.kpiCode}-${month}-fm`) * 271)
          const baseRatio = 0.82 + rand(`${dept.deptCode}-${kpi.kpiCode}-base`) * 0.16
          const waveRatio = (rand(`${dept.deptCode}-${kpi.kpiCode}-${month}-r`) - 0.5) * 0.08
          let ratio = baseRatio + waveRatio
          if (ratio > 1) ratio = 1
          if (ratio < 0) ratio = 0
          const fz = Math.round(fm * ratio)
          deptKpi[month] = { fz, fm, value: null }
        })
        baseData[dept.deptCode][kpi.kpiCode] = deptKpi
      })
    })
    return baseData
  }

  const baseData = buildBaseData()

  function getMonthData(deptCode, kpiCode, month) {
    if (!allMonths.includes(month)) return null
    if (deptCode === 'all') {
      const kpi = kpiList.find((item) => item.kpiCode === kpiCode)
      const parts = leafDeptList
        .map((dept) => baseData[dept.deptCode][kpiCode][month])
        .filter((item) => item)
      if (!parts.length) return null
      if (kpi && kpi.countKpi) {
        return { value: parts.reduce((sum, item) => sum + (item.value || 0), 0) }
      }
      return {
        fz: parts.reduce((sum, item) => sum + (item.fz || 0), 0),
        fm: parts.reduce((sum, item) => sum + (item.fm || 0), 0),
        value: null
      }
    }
    return (baseData[deptCode] && baseData[deptCode][kpiCode] && baseData[deptCode][kpiCode][month]) || null
  }

  function getHalfOptions() {
    const options = []
    for (let year = DATE_MIN.year; year <= DATE_MAX.year; year += 1) {
      options.push({ label: `${year}年上半年`, value: `${year}-1` })
      options.push({ label: `${year}年下半年`, value: `${year}-2` })
    }
    return options.filter((option) => {
      const year = Number(option.value.split('-')[0])
      const half = Number(option.value.split('-')[1])
      const months = getHalfMonths(String(option.value))
      if (year < DATE_MIN.year || year > DATE_MAX.year) return false
      if (half === 2 && year === DATE_MAX.year) {
        return months.length > 0
      }
      return true
    })
  }

  function getHalfMonths(halfValue) {
    const parts = halfValue.split('-').map(Number)
    const year = parts[0]
    const half = parts[1]
    const start = half === 1 ? 1 : 7
    const end = half === 1 ? 6 : 12
    const months = []
    for (let m = start; m <= end; m += 1) {
      const monthStr = toMonthStr(year, m)
      if (allMonths.includes(monthStr)) {
        months.push(monthStr)
      }
    }
    return months
  }

  function formatKpiValue(kpi, fz, fm) {
    if (kpi.countKpi) {
      return fz === null || fz === undefined ? '-' : `${fz}`
    }
    if (!fm) return '-'
    return `${((fz / fm) * 100).toFixed(kpi.degree)}${kpi.unit}`
  }

  function getCellData(kpi, deptCode, months) {
    const parts = months
      .map((month) => getMonthData(deptCode, kpi.kpiCode, month))
      .filter((item) => item)
    if (!parts.length) {
      return { value: '-', fz: '-', fm: '-' }
    }
    if (kpi.countKpi) {
      const value = parts.reduce((sum, item) => sum + (item.value || 0), 0)
      return { value: `${value}`, fz: '-', fm: '-' }
    }
    const fz = kpi.fzKpiName
      ? parts.reduce((sum, item) => sum + (item.fz || 0), 0)
      : null
    const fm = kpi.fmKpiName
      ? parts.reduce((sum, item) => sum + (item.fm || 0), 0)
      : null
    return {
      value: formatKpiValue(kpi, fz, fm),
      fz: fz === null ? '-' : `${fz}`,
      fm: fm === null ? '-' : `${fm}`
    }
  }

  function quarterOf(monthStr) {
    const parts = monthStr.split('-').map(Number)
    return { year: parts[0], quarter: Math.ceil(parts[1] / 3) }
  }

  function groupMonthsByQuarter(months) {
    const groups = []
    months.forEach((month) => {
      const { year, quarter } = quarterOf(month)
      const key = `${year}-${quarter}`
      let group = groups.find((item) => item.key === key)
      if (!group) {
        group = { key, title: `${year}年第${quarter}季度`, months: [] }
        groups.push(group)
      }
      group.months.push(month)
    })
    return groups
  }

  function groupMonthsByHalf(months) {
    const groups = []
    months.forEach((month) => {
      const parts = month.split('-').map(Number)
      const year = parts[0]
      const monthNum = parts[1]
      const half = monthNum <= 6 ? 1 : 2
      const key = `${year}-${half}`
      let group = groups.find((item) => item.key === key)
      if (!group) {
        group = {
          key,
          title: `${year}年${half === 1 ? '上' : '下'}半年`,
          months: []
        }
        groups.push(group)
      }
      group.months.push(month)
    })
    return groups
  }

  function groupMonthsByYear(months) {
    const groups = []
    months.forEach((month) => {
      const year = month.split('-')[0]
      let group = groups.find((item) => item.key === year)
      if (!group) {
        group = { key: year, title: `${year}年`, months: [] }
        groups.push(group)
      }
      group.months.push(month)
    })
    return groups
  }

  function getMonthLabel(monthStr) {
    const parts = monthStr.split('-').map(Number)
    return `${parts[0]}年${parts[1]}月`
  }

  function getExpandedMonths(start, end) {
    return allMonths.filter((month) => month >= start && month <= end)
  }

  window.MockData = {
    DATE_MIN,
    DATE_MAX,
    deptList,
    kpiList,
    allMonths,
    toMonthStr,
    getMonthData,
    getHalfOptions,
    getHalfMonths,
    formatKpiValue,
    getCellData,
    groupMonthsByQuarter,
    groupMonthsByHalf,
    groupMonthsByYear,
    getMonthLabel,
    getExpandedMonths
  }
})()

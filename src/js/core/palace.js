/**
 * 达摩一掌经宫位计算模块
 * 根据生辰八字计算六道宫位分布
 */

import { DIZHI } from './bazi.js'

// 六道宫位定义
const PALACES = {
  '佛道': ['天贵', '天厄', '天权', '天破', '天奸', '天文', '天福', '天驿', '天孤', '天刃', '天艺', '天寿'],
  '人道': ['命宫', '身宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '仆役', '官禄', '田宅', '福德']
}

// 宫位吉凶属性
const PALACE_LUCK = {
  '天贵': '吉', '天厄': '凶', '天权': '吉', '天破': '凶', 
  '天奸': '凶', '天文': '吉', '天福': '吉', '天驿': '平',
  '天孤': '凶', '天刃': '凶', '天艺': '吉', '天寿': '吉'
}

// 宫位解释文本
const PALACE_DESCRIPTIONS = {
  '天贵': '主聪明智慧，有佛缘，心地善良',
  '天厄': '主一生多劳碌，易遇小人暗算',
  '天权': '主权势地位，管理能力',
  '天破': '主破败损耗，财运起伏',
  '天奸': '主奸诈狡猾，易惹是非',
  '天文': '主文采学识，艺术天赋',
  '天福': '主福气深厚，生活安乐',
  '天驿': '主奔波变动，迁移频繁',
  '天孤': '主孤独自立，六亲缘薄',
  '天刃': '主刚强好斗，易有伤灾',
  '天艺': '主技艺才能，手艺精湛',
  '天寿': '主健康长寿，晚年安稳'
}

/**
 * 计算六道宫位分布
 * @param {string} yearGanZhi - 年柱
 * @param {string} monthGanZhi - 月柱
 * @param {string} dayGanZhi - 日柱
 * @param {string} timeGanZhi - 时柱
 * @returns {Object} 宫位分布结果
 */
export function calculatePalaces(yearGanZhi, monthGanZhi, dayGanZhi, timeGanZhi) {
  const yearZhi = yearGanZhi[1]
  const monthZhi = monthGanZhi[1]
  const dayZhi = dayGanZhi[1]
  const timeZhi = timeGanZhi[1]
  
  // 1. 确定命宫(根据月支和时支)
  const lifePalace = calculateLifePalace(monthZhi, timeZhi)
  
  // 2. 确定身宫(根据年支和日支)
  const bodyPalace = calculateBodyPalace(yearZhi, dayZhi)
  
  // 3. 计算六道宫位分布
  const palaceDistribution = distributePalaces(lifePalace)
  
  return {
    lifePalace,
    bodyPalace,
    palaceDistribution,
    descriptions: getPalaceDescriptions(palaceDistribution)
  }
}

/**
 * 计算命宫
 */
function calculateLifePalace(monthZhi, timeZhi) {
  const monthIndex = DIZHI.indexOf(monthZhi)
  const timeIndex = DIZHI.indexOf(timeZhi)
  const lifeIndex = (12 + monthIndex - timeIndex) % 12
  return PALACES['佛道'][lifeIndex]
}

/**
 * 计算身宫
 */
function calculateBodyPalace(yearZhi, dayZhi) {
  const yearIndex = DIZHI.indexOf(yearZhi)
  const dayIndex = DIZHI.indexOf(dayZhi)
  const bodyIndex = (12 + yearIndex + dayIndex) % 12
  return PALACES['佛道'][bodyIndex]
}

/**
 * 分布六道宫位
 */
function distributePalaces(lifePalace) {
  const palaceIndex = PALACES['佛道'].indexOf(lifePalace)
  const distribution = {}
  
  PALACES['佛道'].forEach((palace, index) => {
    const offset = (index - palaceIndex + 12) % 12
    distribution[PALACES['人道'][offset]] = palace
  })
  
  return distribution
}

/**
 * 获取宫位解释
 */
function getPalaceDescriptions(palaceDistribution) {
  const result = {}
  for (const [humanPalace, buddhaPalace] of Object.entries(palaceDistribution)) {
    result[humanPalace] = {
      palace: buddhaPalace,
      luck: PALACE_LUCK[buddhaPalace],
      description: PALACE_DESCRIPTIONS[buddhaPalace]
    }
  }
  return result
}

export { PALACES, PALACE_LUCK }
export default calculatePalaces

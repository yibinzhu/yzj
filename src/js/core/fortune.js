/**
 * 运势预测模块
 * 基于八字和宫位结果生成运势分析
 */

import calculatePalaces, { PALACE_LUCK } from './palace.js'

// 运势维度定义
const FORTUNE_DIMENSIONS = [
  '整体运势', '事业运势', '财运分析', '健康运势', '感情运势'
]

// 运势评分规则
const FORTUNE_RULES = {
  // 基于宫位吉凶的评分规则
  '天贵': { base: 4, range: 1 },
  '天厄': { base: 2, range: 1 },
  '天权': { base: 4, range: 1 },
  '天破': { base: 2, range: 1 },
  '天奸': { base: 1, range: 1 },
  '天文': { base: 3, range: 1 },
  '天福': { base: 4, range: 1 },
  '天驿': { base: 3, range: 1 },
  '天孤': { base: 2, range: 1 },
  '天刃': { base: 2, range: 1 },
  '天艺': { base: 3, range: 1 },
  '天寿': { base: 4, range: 1 }
}

// 运势描述模板
const FORTUNE_TEMPLATES = {
  '整体运势': (palaces) => {
    const mainPalace = palaces.lifePalace
    const luck = PALACE_LUCK[mainPalace]
    const descriptions = {
      '吉': '整体运势较佳，诸事顺遂',
      '凶': '运势较为坎坷，需谨慎行事',
      '平': '运势平稳，无大起大落'
    }
    return `${mainPalace}入命，${descriptions[luck]}。${getYearTips(palaces)}`
  },
  '事业运势': (palaces) => {
    const workPalace = palaces.palaceDistribution['官禄']
    const luck = PALACE_LUCK[workPalace]
    const tips = {
      '吉': '事业上有贵人相助，宜把握机会展现才能',
      '凶': '工作中易遇阻碍，需注意与同事关系',
      '平': '事业发展平稳，按部就班即可'
    }
    return `${workPalace}入官禄宫，${tips[luck]}。${getWorkDetailTips(workPalace)}`
  },
  // 其他维度模板类似...
}

/**
 * 生成运势预测
 * @param {Object} bazi - 八字信息
 * @param {Object} palaces - 宫位信息
 * @param {string} period - 时间维度(month/year/3years)
 * @returns {Object} 运势预测结果
 */
export function generateFortune(bazi, palaces, period = 'month') {
  const fortune = {}
  
  FORTUNE_DIMENSIONS.forEach(dimension => {
    const score = calculateScore(palaces, dimension)
    fortune[dimension] = {
      score,
      stars: generateStars(score),
      description: generateDescription(dimension, palaces, period),
      advice: generateAdvice(palaces, dimension)
    }
  })
  
  return fortune
}

/**
 * 计算运势评分
 */
function calculateScore(palaces, dimension) {
  let baseScore = 3 // 默认基础分
  let variance = 0.5 // 波动范围
  
  // 根据不同维度调整评分规则
  if (dimension === '事业运势') {
    const palace = palaces.palaceDistribution['官禄']
    const rule = FORTUNE_RULES[palace]
    baseScore = rule.base
    variance = rule.range * 0.5
  } else if (dimension === '财运分析') {
    const palace = palaces.palaceDistribution['财帛']
    const rule = FORTUNE_RULES[palace]
    baseScore = rule.base
    variance = rule.range * 0.5
  }
  // 其他维度类似...
  
  // 添加随机波动
  const finalScore = baseScore + (Math.random() * variance * 2 - variance)
  return Math.min(5, Math.max(1, finalScore))
}

/**
 * 生成星级显示
 */
function generateStars(score) {
  const fullStars = Math.floor(score)
  const hasHalfStar = score % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  
  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: emptyStars,
    text: score.toFixed(1)
  }
}

/**
 * 生成运势描述
 */
function generateDescription(dimension, palaces, period) {
  const template = FORTUNE_TEMPLATES[dimension]
  if (template) {
    return template(palaces)
  }
  return '运势平稳，无特别注意事项'
}

/**
 * 生成改运建议
 */
function generateAdvice(palaces, dimension) {
  // 根据宫位和维度生成具体建议
  return '保持积极心态，多行善事'
}

/**
 * 获取年份运势提示
 */
function getYearTips(palaces) {
  const mainPalace = palaces.lifePalace
  const yearTips = {
    '天贵': '今年贵人运强，适合拓展人脉',
    '天厄': '今年需注意健康和安全问题',
    '天权': '今年事业上有晋升机会',
    '天破': '今年财务需谨慎，避免大额投资',
    '天奸': '今年易遇小人，需谨言慎行',
    '天文': '今年学习运佳，适合进修',
    '天福': '今年福气深厚，诸事顺遂',
    '天驿': '今年变动较多，可能搬迁或出差',
    '天孤': '今年需多关注家庭关系',
    '天刃': '今年需注意意外伤害',
    '天艺': '今年才艺能得到发挥',
    '天寿': '今年健康状况良好'
  }
  return yearTips[mainPalace] || '今年运势平稳，无特别注意事项'
}

/**
 * 获取工作详细建议
 */
function getWorkDetailTips(palace) {
  const tips = {
    '天贵': '可尝试跨界合作，拓展业务领域',
    '天厄': '避免高风险决策，稳扎稳打',
    '天权': '主动承担更多责任，展现领导力',
    '天破': '注意合同细节，避免财务纠纷',
    '天奸': '保持低调，避免卷入办公室政治',
    '天文': '适合从事创意、教育相关工作',
    '天福': '现有项目容易获得成功',
    '天驿': '考虑外地或跨国工作机会',
    '天孤': '独立工作表现更佳',
    '天刃': '避免与同事正面冲突',
    '天艺': '技术类工作会有突出表现',
    '天寿': '工作生活平衡良好'
  }
  return tips[palace] || '专注本职工作，稳步发展'
}

export default {
  generateFortune,
  FORTUNE_DIMENSIONS
}

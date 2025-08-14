/**
 * 八字计算核心模块
 * 使用lunar-javascript库进行农历转换
 */

import {calendar} from './calendar.js';

// 天干地支常量
const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const WUXING = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水']

// 地支藏干
const DIZHI_CANGGAN = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '戊', '庚'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲']
}

/**
 * 计算八字
 * @param {Date} date - 公历日期对象
 * @param {number} time - 时间(0-23)
 * @param {string} location - 出生地点(用于真太阳时计算)
 * @returns {Object} 八字对象
 */
export function calculateBazi(date, time, location) {

  // 使用calendar.js进行日期转换
  const lunarDate = calendar.solar2Lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  console.log('riqizhuanhuan')
  console.log(lunarDate)
  // 1. 计算年柱(以立春为界)
  const yearGanZhi = lunarDate.yearGanZhi;
  
  // 2. 计算月柱(根据节气)
  const monthGanZhi = lunarDate.monthGanZhi;
  
  // 3. 计算日柱
  const dayGanZhi = lunarDate.dayGanZhi;
  
  // 4. 计算时柱
  const timeGanZhi = calculateTimeGanZhi(dayGanZhi[0], time)
  
  return {
    year: yearGanZhi,
    month: monthGanZhi,
    day: dayGanZhi,
    time: timeGanZhi,
    ganzhi: `${yearGanZhi} ${monthGanZhi} ${dayGanZhi} ${timeGanZhi}`,
    wuxing: getWuxing(yearGanZhi, monthGanZhi, dayGanZhi, timeGanZhi),
    canggan: getCanggan(yearGanZhi, monthGanZhi, dayGanZhi, timeGanZhi)
  }
}

/**
 * 计算时柱
 * @param {string} dayGan - 日干
 * @param {number} time - 时间(0-23)
 * @returns {string} 时柱干支
 */
function calculateTimeGanZhi(dayGan, time) {
  const timeZhiIndex = Math.floor((time + 1) / 2) % 12
  const timeZhi = DIZHI[timeZhiIndex]
  
  // 五鼠遁口诀：甲己还加甲，乙庚丙作初...
  const dayGanIndex = TIANGAN.indexOf(dayGan)
  const timeGanIndex = (dayGanIndex % 5) * 2 + Math.floor(timeZhiIndex / 2)
  const timeGan = TIANGAN[timeGanIndex % 10]
  
  return timeGan + timeZhi
}

/**
 * 获取五行属性
 */
function getWuxing(...ganzhiList) {
  return ganzhiList.map(gz => {
    const gan = gz[0]
    const zhi = gz[1]
    const ganIndex = TIANGAN.indexOf(gan)
    const zhiIndex = DIZHI.indexOf(zhi)
    
    return {
      gan: WUXING[ganIndex],
      zhi: WUXING[zhiIndex % 10] // 地支五行按顺序循环
    }
  })
}

/**
 * 获取藏干信息
 */
function getCanggan(...ganzhiList) {
  return ganzhiList.map(gz => {
    const zhi = gz[1]
    return DIZHI_CANGGAN[zhi] || []
  })
}

export { TIANGAN, DIZHI, WUXING }
export default calculateBazi

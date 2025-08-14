/**
 * 达摩一掌经主应用模块
 * 整合各核心功能模块，处理用户交互
 */


import convertAndCalculateInfo from './core/paipan.js'

// 应用状态管理
const AppState = {
  currentUser: null,
  history: [],
  settings: {
    theme: 'dark',
    notification: true
  }
}

// 初始化应用
export function initApp() {
  loadHistory()
  setupEventListeners()
}

// 加载历史记录
function loadHistory() {
  const savedHistory = localStorage.getItem('damo-history')
  if (savedHistory) {
    AppState.history = JSON.parse(savedHistory)
  }
}

// 设置事件监听
function setupEventListeners() {
  // 排盘表单提交
  document.getElementById('fortune-form')?.addEventListener('submit', handleFortuneSubmit)
  
  // 历史记录点击
  document.querySelectorAll('.history-item').forEach(item => {
    item.addEventListener('click', () => viewHistory(item.dataset.id))
  })
}

/**
 * 处理排盘表单提交
 */
function handleFortuneSubmit(e) {
  e.preventDefault()
  console.log('表单提交事件触发')
  
  const formData = new FormData(e.target)
  const birthDate = formData.get('birth-date')
  const birthTime = formData.get('birth-time')
  const location = formData.get('location')
  const gender = formData.get('gender')
  const calendarType = formData.get('calendarType')
  
  console.log('表单数据:', {birthDate, birthTime, location, gender,calendarType})
  
  // 验证输入
  if (!birthDate || !birthTime || !location) {
    console.log('验证失败: 缺少必填字段')
    showAlert('请填写完整的生辰信息')
    return
  }
  
  // 计算八字
  const [year, month, day] = birthDate.split('-').map(Number)
  const [hours, minutes] = birthTime.split(':').map(Number)
  
  // let date
  // if (calendarType === 'lunar') {
  //   // 阴历转阳历
  //   const solarDate = calendar.lunar2solar(year, month, day)
  //   date = new Date(solarDate.solarYear, solarDate.solarMonth - 1, solarDate.solarDay)
  //   console.log("solardate")
  //   console.log(solarDate)
  // } else {
  //   // 阳历直接使用
  //   date = new Date(year, month - 1, day)
  // }
  // date.setHours(hours, minutes)
  
  try {
    
    let res =  convertAndCalculateInfo(birthDate,birthTime,calendarType)
    console.log(res)

    // 保存结果
    const result = {
      id: Date.now(),
      date: new Date().toISOString(),
      birthDate: birthDate,
      birthTime: birthTime,
      location,
      gender,
      data:res
    }
    console.log(result)
    saveResult(result)
    showResult(result)
  } catch (error) {
    console.error('排盘错误:', error)
    showAlert('排盘失败，请检查输入信息')
  }
}

/**
 * 保存排盘结果
 */
function saveResult(result) {
  AppState.history.unshift(result)
  localStorage.setItem('damo-history', JSON.stringify(AppState.history))
  console.log('结果已保存:', result.id)
}

/**
 * 显示排盘结果
 */
function showResult(result) {
  console.log('准备跳转到结果页，ID:', result.id)
  // 使用Vite配置的基础路径
  window.location.href = '/pages/result.html?id=' + result.id
}

/**
 * 查看历史记录
 */
function viewHistory(id) {
  const record = AppState.history.find(item => item.id === Number(id))
  if (record) {
    showResult(record)
  }
}

/**
 * 显示提示信息
 */
function showAlert(message) {
  alert(message) // 实际应用中应使用更友好的UI提示
}

/**
 * 删除历史记录
 */
export function deleteHistoryItem(id) {
  const history = JSON.parse(localStorage.getItem('damo-history') || '[]')
  const updatedHistory = history.filter(item => item.id !== Number(id))
  localStorage.setItem('damo-history', JSON.stringify(updatedHistory))
  return updatedHistory
}

/**
 * 获取所有历史记录
 */ 
export function getAllHistory() {
  return JSON.parse(localStorage.getItem('damo-history') || '[]')
}

/**
 * 根据ID获取历史记录
 */
export function getResultById(id) {
  const history = JSON.parse(localStorage.getItem('damo-history') || '[]')
  return history.find(item => item.id === Number(id))
}

/**
 * 分享排盘结果
 */
function shareResult(result) {
  // 实际应用中应实现具体的分享逻辑
  const shareData = {
    title: '达摩一掌经排盘结果',
    text: `我的八字排盘结果：${result.bazi.ganzhi}`,
    url: window.location.href
  }
  
  if (navigator.share) {
    navigator.share(shareData)
      .catch(err => console.log('分享失败:', err))
  } else {
    // 备用分享方案
    alert('请手动复制链接分享: ' + window.location.href)
  }
}

// 导出主要功能
export default {
  initApp,
  getResultById
}

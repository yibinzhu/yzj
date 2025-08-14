/**
 * 排盘计算核心模块
 * calendar.js库进行农历转换
 */

import {calendar} from './calendar.js';

 // // 达摩一掌经排盘
 const palaceNames = ['天贵', '天厄', '天权', '天破', '天奸', '天文', '天福', '天驿', '天孤', '天刃', '天艺', '天寿']
 const startIndex = 0 // 起始宫位索引
	//达摩一掌经对男性排盘方法
    function performCyclicCounts(start, count1, count2, count3) {
        let position = start;
        let results = [start]; // 包含起始值
    
        // 第一次计数
        for (let i = 0; i < count1-1; i++) {
            position++; // 增加位置
            if (position > 11) { // 如果位置超过11
                position = 0; // 将位置重置为0
            }
        }
        results.push(position); // 保存第一次计数的结果
    
        console.log('第二次计数的之前值：', position)
        // 第二次计数
        for (let i = 0; i < count2-1; i++) {
            position++; // 增加位置
            if (position > 11) { // 如果位置超过11
                position = 0; // 将位置重置为0
            }
        }
        results.push(position); // 保存第二次计数的结果
    
        // 第三次计数
        for (let i = 0; i < count3-1; i++) {
            position++; // 增加位置
            if (position > 11) { // 如果位置超过11
                position = 0; // 将位置重置为0
            }
        }
        results.push(position); // 保存第三次计数的结果
    
        return results;
    }
    
    //达摩一掌经对女性排盘方法
    function performCyclicCountsFemale(start, count1, count2, count3) {
        let position = start;
        let results = [start]; // 包含起始值
    
        // 第一次计数
        for (let i = 0; i < count1-1; i++) {
            position--; // 减少位置
            if (position < 0) { 
                position = 11; 
            }
        }
        results.push(position); // 保存第一次计数的结果
    
        console.log('第二次计数的之前值：', position)
        // 第二次计数
        for (let i = 0; i < count2-1; i++) {
            position--; // 减少位置
            if (position < 0) { 
                position = 11; 
            }
        }
        results.push(position); // 保存第二次计数的结果
    
        // 第三次计数
        for (let i = 0; i < count3-1; i++) {
            position--; // 减少位置
            if (position < 0) { 
                position = 11; 
            }
        }
        results.push(position); // 保存第三次计数的结果
    
        return results;
    }
    


function convertAndCalculateInfo(d,t,lifa) {
    // 解析输入的日期字符串
    const [year, month, day] = d.split('-').map(Number);
    const [hour] = t.split(':').map(Number);

    var dateInfo;

    
    console.log('t',t);
    
    switch (lifa){
        case 'solar':
            // 农历日期转换
            console.log('执行公历转农历');
            dateInfo = solarToLunar(year,month,day);
            console.log(dateInfo);
            break;
        case 'lunar':
            console.log('执行农历转公历');
            dateInfo = lunarToSolar(year,month,day);
            console.log(dateInfo);
            break;
        default:
            break;
    }
    
    
    // 生肖计算
    const zodiac = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    const zodiacYear = year - 4; // 1900年是鼠年，所以减去4得到生肖的起始年份
    const zodiacIndex = zodiacYear % 12;
    const zodiacSign = zodiac[zodiacIndex];
    
    // 出生时辰
    let chushengshichen = timeToEarthlyBranch(t);
    console.log(chushengshichen);
    
    // 年龄计算（假设当前日期为2024-07-27）
    const today = new Date(); // 注意月份是0-11
    const age = (today.getFullYear() - dateInfo.lyear)+1;
    

    

    return {
        age: `${age}岁`,
        zodiac: zodiacSign,
        zodiacIndex: zodiacIndex,
        birthHour: `${chushengshichen.branchName}时`,
        solarDate: `${dateInfo.cyear}年${dateInfo.cmonth}月${dateInfo.cday}日`,
        lunarDate: `${dateInfo.lyear}年${dateInfo.lmonth}月${dateInfo.lday}日`,
        birthNum: chushengshichen.branchIndex,
        lYear: dateInfo.lyear,
        lMonth: dateInfo.lmonth,
        lDay: dateInfo.lday,
        hour: hour,
        cYear: dateInfo.cyear,
        cMonth: dateInfo.cmonth,
        cDay: dateInfo.cday
    };
}

// 公历转农历函数
function solarToLunar(y,m,d) {
let res = calendar.solar2lunar(y,m,d);
    console.log('公历转农历');
    console.log(res);
    return {
        lyear: res.lYear,
        lmonth: res.lMonth,
        lday: res.lDay,
        cyear: res.cYear,
        cmonth: res.cMonth,
        cday: res.cDay
    };
}

//农历转公历函数
function lunarToSolar(y,m,d){
    let res = calendar.lunar2solar(y,m,d);
    console.log('农历转阳历');
    console.log(res);
    return {
       lyear: res.lYear,
       lmonth: res.lMonth,
       lday: res.lDay,
       cyear: res.cYear,
       cmonth: res.cMonth,
       cday: res.cDay
    };
}

//时间转换地支
function timeToEarthlyBranch(timeStr) {
    // 解析时间字符串，获取小时
    const [hour] = timeStr.split(':').map(Number);

    // 定义变量存储地支名称
    let branchName;
    let branchIndex;

    // 使用 switch 语句判断小时并确定对应的地支
    switch (true) {
        case hour >= 23 || hour < 1:
            branchName = '子';
            branchIndex = 1;
            break;
        case hour >= 1 && hour < 3:
            branchName = '丑';
            branchIndex = 2;
            break;
        case hour >= 3 && hour < 5:
            branchName = '寅';
            branchIndex = 3;
            break;
        case hour >= 5 && hour < 7:
            branchName = '卯';
            branchIndex = 4;
            break;
        case hour >= 7 && hour < 9:
            branchName = '辰';
            branchIndex = 5;
            break;
        case hour >= 9 && hour < 11:
            branchName = '巳';
            branchIndex = 6;
            break;
        case hour >= 11 && hour < 13:
            branchName = '午';
            branchIndex = 7;
            break;
        case hour >= 13 && hour < 15:
            branchName = '未';
            branchIndex = 8;
            break;
        case hour >= 15 && hour < 17:
            branchName = '申';
            branchIndex = 9;
            break;
        case hour >= 17 && hour < 19:
            branchName = '酉';
            branchIndex = 10;
            break;
        case hour >= 19 && hour < 21:
            branchName = '戌';
            branchIndex = 11;
            break;
        case hour >= 21 && hour < 23:
            branchName = '亥';
            branchIndex = 12;
            break;
        default:
            branchName = '未知';
    }

    // 返回对应的地支名称
    return {branchName:branchName,branchIndex:branchIndex};
}

export default convertAndCalculateInfo
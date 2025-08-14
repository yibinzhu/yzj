import{a as r,g as h,d as b}from"./app-66ea1794.js";document.addEventListener("DOMContentLoaded",async()=>{console.log("DOM已加载，开始初始化历史记录");const d=document.getElementById("history-container"),i=document.getElementById("search-input");o(r());function o(a){if(!a||a.length===0){d.innerHTML=`
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="far fa-clock"></i>
                            </div>
                            <h3 class="text-lg mb-2">暂无历史记录</h3>
                            <p class="text-sm">排盘后，您的记录将显示在这里</p>
                        </div>
                    `;return}let s="";a.forEach(e=>{const t=new Date(e.date);`${t.getFullYear()}${(t.getMonth()+1).toString().padStart(2,"0")}${t.getDate().toString().padStart(2,"0")}${t.getHours().toString().padStart(2,"0")}${t.getMinutes().toString().padStart(2,"0")}`,console.log("历史记录项:",e),s+=`
                    <div class="history-item" data-id="${e.id}">
                        <div class="history-info">
                            <div class="history-date">阴历 ${e.birthDate.replace(/-/g,"年").replace("-","月")}日 
                                ${localStorage.getItem(`bookmark_${e.id}`)==="true"?'<i class="fas fa-bookmark text-yellow-500 ml-2"></i>':""}
                            </div>
                            <div class="history-desc">${e.birthDate} ${e.birthTime} ${e.gender==="male"?"男":"女"}</div>
                            <div class="history-bazi">
                           
                        
                            </div>
                        </div>
                        <div class="history-actions">
                            <button class="history-btn view-btn" data-id="${e.id}">查看</button>
                            <button class="history-btn delete-btn" data-id="${e.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    `}),d.insertAdjacentHTML("beforeend",s),document.querySelectorAll(".view-btn").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const n=e.dataset.id;h(n)&&(window.location.href=`/pages/result.html?id=${n}`)})}),document.querySelectorAll(".delete-btn").forEach(e=>{e.addEventListener("click",async t=>{t.stopPropagation();const n=e.dataset.id;confirm("确定要删除这条记录吗？")&&(await b(n),d.innerHTML="",o(r()))})})}function l(){const a=i.value.trim().toLowerCase();console.log("搜索关键词:",a);const s=r();console.log("所有历史记录:",s);const e=s.filter(t=>{if(t.birthDate.toLowerCase().includes(a)||t.birthTime.toLowerCase().includes(a)||t.bazi.ganzhi&&t.bazi.ganzhi.toLowerCase().includes(a))return!0;const n=[t.bazi.yearGan||t.bazi.year.gan||"",t.bazi.yearZhi||t.bazi.year.zhi||"",t.bazi.monthGan||t.bazi.month.gan||"",t.bazi.monthZhi||t.bazi.month.zhi||"",t.bazi.dayGan||t.bazi.day.gan||"",t.bazi.dayZhi||t.bazi.day.zhi||"",t.bazi.timeGan||t.bazi.time.gan||"",t.bazi.timeZhi||t.bazi.time.zhi||""].join("").toLowerCase();return console.log("八字字符串:",n),n.includes(a)});console.log("筛选结果:",e),d.innerHTML="",o(e)}document.getElementById("search-btn").addEventListener("click",l),i.addEventListener("keypress",a=>{a.key==="Enter"&&l()});const c=document.getElementById("clear-search");i.addEventListener("input",()=>{i.value.trim()?c.classList.remove("hidden"):(c.classList.add("hidden"),o(r()))}),c.addEventListener("click",()=>{i.value="",c.classList.add("hidden"),o(r())})});

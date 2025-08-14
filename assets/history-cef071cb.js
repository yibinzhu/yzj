import{a as i,g as u,d as h}from"./app-66ea1794.js";document.addEventListener("DOMContentLoaded",async()=>{console.log("DOM已加载，开始初始化历史记录");const d=document.getElementById("history-container"),s=document.getElementById("search-input");n(i());function n(a){if(!a||a.length===0){d.innerHTML=`
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="far fa-clock"></i>
                            </div>
                            <h3 class="text-lg mb-2">暂无历史记录</h3>
                            <p class="text-sm">排盘后，您的记录将显示在这里</p>
                        </div>
                    `;return}let o="";a.forEach(t=>{const e=new Date(t.date);`${e.getFullYear()}${(e.getMonth()+1).toString().padStart(2,"0")}${e.getDate().toString().padStart(2,"0")}${e.getHours().toString().padStart(2,"0")}${e.getMinutes().toString().padStart(2,"0")}`,console.log("历史记录项:",t),o+=`
                    <div class="history-item" data-id="${t.id}">
                        <div class="history-info">
                            <div class="history-date">阴历 ${t.data.lunarDate}  
                                ${localStorage.getItem(`bookmark_${t.id}`)==="true"?'<i class="fas fa-bookmark text-yellow-500 ml-2"></i>':""}
                            </div>
                            <div class="history-desc">${t.data.solarDate}  ${t.gender==="male"?"男":"女"}</div>
                            <div class="history-bazi">
                           
                        
                            </div>
                        </div>
                        <div class="history-actions">
                            <button class="history-btn view-btn" data-id="${t.id}">查看</button>
                            <button class="history-btn delete-btn" data-id="${t.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    `}),d.insertAdjacentHTML("beforeend",o),document.querySelectorAll(".view-btn").forEach(t=>{t.addEventListener("click",e=>{e.stopPropagation();const c=t.dataset.id;u(c)&&(window.location.href=`/pages/result.html?id=${c}`)})}),document.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",async e=>{e.stopPropagation();const c=t.dataset.id;confirm("确定要删除这条记录吗？")&&(await h(c),d.innerHTML="",n(i()))})})}function l(){const a=s.value.trim().toLowerCase();console.log("搜索关键词:",a);const o=i();console.log("所有历史记录:",o);const t=o.filter(e=>{if(e.birthDate.toLowerCase().includes(a)||e.birthTime.toLowerCase().includes(a))return!0});console.log("筛选结果:",t),d.innerHTML="",n(t)}document.getElementById("search-btn").addEventListener("click",l),s.addEventListener("keypress",a=>{a.key==="Enter"&&l()});const r=document.getElementById("clear-search");s.addEventListener("input",()=>{s.value.trim()?r.classList.remove("hidden"):(r.classList.add("hidden"),n(i()))}),r.addEventListener("click",()=>{s.value="",r.classList.add("hidden"),n(i())})});

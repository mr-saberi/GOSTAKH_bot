/**
 * ربات تلگرام برای کلادفلر ورکرز
 * 
 * این کد ربات تلگرام سبک و کارآمد را روی کلادفلر ورکرز اجرا می‌کند.
 * بدون نیاز به هاست سنتی.
 */

// پیکربندی ربات
let BOT_TOKEN = ''; // توکن ربات تلگرام خود را اینجا قرار دهید یا به عنوان سکرت تنظیم کنید
const WEBHOOK_PATH = '/webhook'; // مسیر وب‌هوک که برای دریافت آپدیت‌های تلگرام استفاده می‌شود

// HTML صفحه تنظیم اولیه
const SETUP_HTML = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تنظیم ربات تلگرام</title>
  <style>
    @font-face {
      font-family: 'Vazirmatn';
      src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Regular.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'Vazirmatn';
      src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Bold.woff2') format('woff2');
      font-weight: bold;
      font-style: normal;
    }
    @font-face {
      font-family: 'Vazirmatn';
      src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Medium.woff2') format('woff2');
      font-weight: 500;
      font-style: normal;
    }
    
    :root {
      --telegram-dark-bg: #212121;
      --telegram-dark-panel: #303030;
      --telegram-dark-primary: #8774E1;
      --telegram-dark-text: #ffffff;
      --telegram-dark-secondary-text: #aaaaaa;
      --telegram-dark-hint: #7d7d7d;
      --telegram-dark-link: #71baf2;
      --telegram-dark-accent: #8774E1;
      --telegram-dark-divider: #4d4d4d;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--telegram-dark-bg);
      color: var(--telegram-dark-text);
      line-height: 1.6;
      direction: rtl;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .logo {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .logo img {
      width: 80px;
      height: 80px;
    }
    
    .card {
      background-color: var(--telegram-dark-panel);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    h1, h2, h3 {
      margin-bottom: 15px;
      font-weight: 500;
    }
    
    p {
      margin-bottom: 15px;
      color: var(--telegram-dark-secondary-text);
    }
    
    input[type="text"], input[type="password"] {
      width: 100%;
      padding: 12px 15px;
      margin-bottom: 15px;
      background-color: #424242;
      border: 1px solid var(--telegram-dark-divider);
      border-radius: 8px;
      color: var(--telegram-dark-text);
      font-family: 'Vazirmatn', sans-serif;
      font-size: 14px;
    }
    
    input[type="text"]:focus, input[type="password"]:focus {
      border-color: var(--telegram-dark-primary);
      outline: none;
    }
    
    button {
      background-color: var(--telegram-dark-primary);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Vazirmatn', sans-serif;
      font-size: 14px;
      font-weight: 500;
      width: 100%;
      transition: background-color 0.2s;
    }
    
    button:hover {
      background-color: #7665c9;
    }
    
    .step {
      display: flex;
      margin-bottom: 10px;
      align-items: center;
    }
    
    .step-number {
      background-color: var(--telegram-dark-primary);
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      flex-shrink: 0;
      font-size: 12px;
    }
    
    .step-content {
      flex: 1;
    }
    
    .success-message {
      text-align: center;
      padding: 20px;
      color: #4caf50;
      font-weight: bold;
      display: none;
    }
    
    .error-message {
      text-align: center;
      padding: 10px;
      color: #f44336;
      font-weight: bold;
      display: none;
      margin-bottom: 15px;
    }
    
    .loading {
      display: none;
      text-align: center;
      margin: 20px 0;
    }
    
    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      border-top: 4px solid var(--telegram-dark-primary);
      width: 30px;
      height: 30px;
      animation: spin 1s linear infinite;
      margin: 0 auto 10px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="120" fill="#8774E1"/>
        <path d="M49.9414 125.968L81.8034 136.234L94.3046 177.391C95.6224 181.823 101.295 182.82 104.534 179.414L123.902 159.243C126.805 156.214 131.214 155.996 134.345 158.728L166.322 185.543C169.896 188.652 175.262 186.808 176.144 182.15L199.952 72.2228C200.923 67.1682 196.353 62.8951 191.458 64.1923L49.907 113.301C43.8394 115.024 43.8736 123.935 49.9414 125.968ZM87.5782 129.982L152.975 88.6076C154.907 87.3692 156.931 89.9496 155.351 91.6323L100.839 149.501C97.89 152.626 96.5082 156.954 97.061 161.226L98.2632 170.845C98.4704 172.622 95.9246 173.284 95.0294 171.732L84.2495 151.51C82.1248 147.533 83.3826 142.628 87.0146 140.001L87.5782 129.982Z" fill="white"/>
      </svg>
    </div>
    
    <div class="card">
      <h1>تنظیم ربات تلگرام</h1>
      <p>برای راه‌اندازی ربات تلگرام، مراحل زیر را دنبال کنید:</p>
      
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          ابتدا با <a href="https://t.me/BotFather" target="_blank" style="color: var(--telegram-dark-link);">BotFather</a> در تلگرام یک ربات جدید بسازید
        </div>
      </div>
      
      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          توکن ربات را از BotFather دریافت کنید
        </div>
      </div>
      
      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          توکن را در کادر زیر وارد کنید و دکمه راه‌اندازی را بزنید
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="error-message" id="error-message"></div>
      
      <form id="setupForm">
        <input type="text" id="botToken" placeholder="توکن ربات را وارد کنید..." required>
        <button type="submit">راه‌اندازی ربات</button>
      </form>
      
      <div class="loading" id="loading">
        <div class="spinner"></div>
        <p>در حال تنظیم ربات...</p>
      </div>
      
      <div class="success-message" id="success-message">
        ربات با موفقیت راه‌اندازی شد! وب‌هوک تنظیم شده و ربات آماده استفاده است.
      </div>
    </div>
  </div>
  
  <script>
    document.getElementById('setupForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const botToken = document.getElementById('botToken').value.trim();
      if (!botToken) {
        showError('لطفاً توکن ربات را وارد کنید.');
        return;
      }
      
      // نمایش حالت در حال بارگذاری
      document.getElementById('loading').style.display = 'block';
      document.getElementById('error-message').style.display = 'none';
      document.querySelector('button[type="submit"]').disabled = true;
      
      try {
        // ارسال توکن به سرور
        const response = await fetch('/setup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ botToken }),
        });
        
        const result = await response.json();
        
        if (result.success) {
          // نمایش پیام موفقیت
          document.getElementById('loading').style.display = 'none';
          document.getElementById('success-message').style.display = 'block';
          document.getElementById('setupForm').style.display = 'none';
          
          // هدایت به صفحه اصلی بعد از 3 ثانیه
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 3000);
        } else {
          showError(result.error || 'خطایی در راه‌اندازی ربات رخ داد.');
        }
      } catch (error) {
        showError('خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
      } finally {
        document.getElementById('loading').style.display = 'none';
        document.querySelector('button[type="submit"]').disabled = false;
      }
    });
    
    function showError(message) {
      const errorElement = document.getElementById('error-message');
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      document.getElementById('loading').style.display = 'none';
    }
  </script>
</body>
</html>`;

// HTML صفحه داشبورد
const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>داشبورد ربات تلگرام</title>
  <style>
    @font-face {
      font-family: 'Vazirmatn';
      src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Regular.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'Vazirmatn';
      src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Bold.woff2') format('woff2');
      font-weight: bold;
      font-style: normal;
    }
    @font-face {
      font-family: 'Vazirmatn';
      src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Medium.woff2') format('woff2');
      font-weight: 500;
      font-style: normal;
    }
    
    :root {
      --telegram-dark-bg: #212121;
      --telegram-dark-panel: #303030;
      --telegram-dark-primary: #8774E1;
      --telegram-dark-text: #ffffff;
      --telegram-dark-secondary-text: #aaaaaa;
      --telegram-dark-hint: #7d7d7d;
      --telegram-dark-link: #71baf2;
      --telegram-dark-accent: #8774E1;
      --telegram-dark-divider: #4d4d4d;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--telegram-dark-bg);
      color: var(--telegram-dark-text);
      line-height: 1.6;
      direction: rtl;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--telegram-dark-divider);
    }
    
    .card {
      background-color: var(--telegram-dark-panel);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    
    .stat-card {
      background-color: var(--telegram-dark-panel);
      border-radius: 10px;
      padding: 15px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .stat-value {
      font-size: 36px;
      font-weight: bold;
      color: var(--telegram-dark-primary);
      margin: 10px 0;
    }
    
    .stat-label {
      color: var(--telegram-dark-secondary-text);
      font-size: 14px;
    }
    
    .user-list {
      max-height: 400px;
      overflow-y: auto;
    }
    
    .user-item {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      border-bottom: 1px solid var(--telegram-dark-divider);
      transition: background-color 0.2s;
    }
    
    .user-item:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: var(--telegram-dark-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      margin-left: 15px;
    }
    
    .user-info {
      flex: 1;
    }
    
    .user-name {
      font-weight: 500;
    }
    
    .user-username {
      color: var(--telegram-dark-secondary-text);
      font-size: 14px;
    }
    
    .icon {
      display: inline-block;
      margin-left: 5px;
      vertical-align: middle;
    }
    
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 12px;
      margin-right: 5px;
    }
    
    .badge-success {
      background-color: #4caf50;
      color: white;
    }
    
    .badge-danger {
      background-color: #f44336;
      color: white;
    }
    
    .badge-warning {
      background-color: #ff9800;
      color: white;
    }
    
    h1, h2, h3 {
      margin-bottom: 15px;
      font-weight: 500;
    }
    
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: var(--telegram-dark-bg);
    }
    
    ::-webkit-scrollbar-thumb {
      background: var(--telegram-dark-hint);
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: var(--telegram-dark-secondary-text);
    }
    
    .loading {
      text-align: center;
      padding: 20px;
    }
    
    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      border-top: 4px solid var(--telegram-dark-primary);
      width: 30px;
      height: 30px;
      animation: spin 1s linear infinite;
      margin: 0 auto 10px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>
        <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.78 18.65L10.06 14.92L17.76 7.95C18.11 7.64 17.73 7.53 17.33 7.81L7.78 13.95L4.15 12.91C3.36 12.68 3.35 12.08 4.33 11.67L19.27 5.69C19.93 5.41 20.57 5.89 20.32 6.88L17.33 18.65C17.15 19.47 16.62 19.68 15.93 19.3L12.07 16.41L10.18 18.25C9.95 18.48 9.78 18.65 9.78 18.65Z" fill="#8774E1"/>
        </svg>
        داشبورد ربات تلگرام
      </h1>
      <div>
        <span class="badge badge-success" id="webhook-status">وب‌هوک: فعال</span>
        <span class="badge badge-success" id="bot-status">ربات: آنلاین</span>
      </div>
    </div>
    
    <div class="grid">
      <div class="stat-card">
        <div class="stat-value" id="user-count">-</div>
        <div class="stat-label">کاربران فعال</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value" id="message-count">-</div>
        <div class="stat-label">پیام‌های امروز</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value" id="command-count">-</div>
        <div class="stat-label">دستورات اجرا شده</div>
      </div>
    </div>
    
    <div class="card">
      <h2>کاربران اخیر</h2>
      <div class="user-list" id="user-list">
        <div class="loading">
          <div class="spinner"></div>
          <p>در حال بارگذاری کاربران...</p>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    // تابع برای بارگذاری داده‌های داشبورد
    async function loadDashboardData() {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (data.success) {
          // به‌روزرسانی آمارها
          document.getElementById('user-count').textContent = data.stats.userCount || 0;
          document.getElementById('message-count').textContent = data.stats.messageCount || 0;
          document.getElementById('command-count').textContent = data.stats.commandCount || 0;
          
          // به‌روزرسانی وضعیت ربات و وب‌هوک
          const webhookStatus = document.getElementById('webhook-status');
          webhookStatus.textContent = 'وب‌هوک: ' + (data.webhook.url ? 'فعال' : 'غیرفعال');
          webhookStatus.className = 'badge ' + (data.webhook.url ? 'badge-success' : 'badge-danger');
          
          const botStatus = document.getElementById('bot-status');
          botStatus.textContent = 'ربات: ' + (data.botInfo.is_active ? 'آنلاین' : 'آفلاین');
          botStatus.className = 'badge ' + (data.botInfo.is_active ? 'badge-success' : 'badge-danger');
          
          // نمایش لیست کاربران
          const userListElement = document.getElementById('user-list');
          userListElement.innerHTML = '';
          
          if (data.users && data.users.length > 0) {
            data.users.forEach(user => {
              const userItem = document.createElement('div');
              userItem.className = 'user-item';
              
              const displayName = user.first_name + (user.last_name ? ' ' + user.last_name : '');
              const initial = (user.first_name || user.username || '?').charAt(0).toUpperCase();
              
              userItem.innerHTML = '<div class="user-avatar">' + initial + '</div>' +
                '<div class="user-info">' +
                  '<div class="user-name">' + displayName + '</div>' +
                  '<div class="user-username">@' + (user.username || '') + ' · ID: ' + user.id + '</div>' +
                '</div>';
              
              userListElement.appendChild(userItem);
            });
          } else {
            userListElement.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--telegram-dark-secondary-text);">هیچ کاربری یافت نشد</div>';
          }
        } else {
          console.error('خطا در بارگذاری داده‌ها:', data.error);
        }
      } catch (error) {
        console.error('خطا در ارتباط با سرور:', error);
      }
    }
    
    // بارگذاری داده‌ها در هنگام بارگذاری صفحه
    document.addEventListener('DOMContentLoaded', loadDashboardData);
    
    // به‌روزرسانی داده‌ها هر 30 ثانیه
    setInterval(loadDashboardData, 30000);
  </script>
</body>
</html>`;

// تنظیم ایونت لیسنر
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

// پردازشگر اصلی درخواست‌ها
async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // بررسی وجود تنظیمات ربات
  let botConfigured = false;
  try {
    const storedToken = await BOT_STORAGE.get('bot_token');
    if (storedToken) {
      BOT_TOKEN = storedToken;
      botConfigured = true;
    }
  } catch (error) {
    console.error('خطا در بررسی تنظیمات ربات:', error);
  }
  
  // پردازش درخواست‌های وب‌هوک از تلگرام
  if (path === WEBHOOK_PATH && request.method === 'POST') {
    return handleWebhook(request);
  }

  // پردازش درخواست تنظیم ربات
  if (path === '/setup' && request.method === 'POST') {
    return handleSetup(request);
  }
  
  // API برای داشبورد
  if (path === '/api/dashboard') {
    return handleDashboardAPI(request);
  }
  
  // صفحه اصلی - نمایش صفحه تنظیم یا داشبورد
  if (path === '/' || path === '/dashboard') {
    if (!botConfigured) {
      return new Response(SETUP_HTML, {
        headers: { 'Content-Type': 'text/html; charset=UTF-8' }
      });
    } else {
      return new Response(DASHBOARD_HTML, {
        headers: { 'Content-Type': 'text/html; charset=UTF-8' }
      });
    }
  }
  
  return new Response('صفحه مورد نظر یافت نشد.', { 
    status: 404,
    headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
  });
}

// پردازش درخواست تنظیم ربات
async function handleSetup(request) {
  try {
    const data = await request.json();
    const { botToken } = data;
    
    if (!botToken) {
      return new Response(
        JSON.stringify({ success: false, error: 'توکن ربات خالی است.' }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // اعتبارسنجی توکن با فراخوانی API تلگرام
    const botInfoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const botInfo = await botInfoResponse.json();
    
    if (!botInfo.ok) {
      return new Response(
        JSON.stringify({ success: false, error: 'توکن ربات نامعتبر است.' }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // ذخیره توکن
    await BOT_STORAGE.put('bot_token', botToken);
    BOT_TOKEN = botToken;
    
    // ذخیره اطلاعات ربات
    await BOT_STORAGE.put('bot_info', JSON.stringify(botInfo.result));
    
    // تنظیم وب‌هوک
    const workerUrl = new URL(request.url);
    const webhookUrl = `${workerUrl.origin}${WEBHOOK_PATH}`;
    
    const setWebhookResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/setWebhook?url=${webhookUrl}`,
      { method: 'POST' }
    );
    const webhookResult = await setWebhookResponse.json();
    
    if (!webhookResult.ok) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'خطا در تنظیم وب‌هوک: ' + (webhookResult.description || 'خطای ناشناخته')
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // ذخیره اطلاعات وب‌هوک
    await BOT_STORAGE.put('webhook_info', JSON.stringify({
      url: webhookUrl,
      set_at: new Date().toISOString(),
      successful: true
    }));
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'ربات با موفقیت تنظیم شد!',
        botInfo: botInfo.result,
        webhook: webhookResult
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'خطای داخلی سرور: ' + (error.message || 'خطای ناشناخته')
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}

// پردازش درخواست‌های API داشبورد
async function handleDashboardAPI(request) {
  try {
    let botInfo = { is_active: false };
    let webhookInfo = { url: '' };
    let users = [];
    let stats = {
      userCount: 0,
      messageCount: 0,
      commandCount: 0
    };
    
    // دریافت اطلاعات ربات
    const storedBotInfo = await BOT_STORAGE.get('bot_info', 'json');
    if (storedBotInfo) {
      botInfo = { ...storedBotInfo, is_active: true };
    }
    
    // دریافت اطلاعات وب‌هوک
    const storedWebhookInfo = await BOT_STORAGE.get('webhook_info', 'json');
    if (storedWebhookInfo) {
      webhookInfo = storedWebhookInfo;
    }
    
    // دریافت لیست کاربران
    const userKeys = await BOT_STORAGE.list({ prefix: 'user:' });
    if (userKeys.keys.length > 0) {
      stats.userCount = userKeys.keys.length;
      
      // دریافت 10 کاربر آخر
      const recentUserKeys = userKeys.keys.slice(-10);
      
      for (const key of recentUserKeys) {
        const userData = await BOT_STORAGE.get(key.name, 'json');
        if (userData) {
          users.push(userData);
        }
      }
      
      // مرتب‌سازی بر اساس آخرین فعالیت
      users.sort((a, b) => (b.last_active || 0) - (a.last_active || 0));
    }
    
    // دریافت آمار پیام‌ها
    try {
      stats.messageCount = await BOT_STORAGE.get('stats:message_count', 'json') || 0;
    } catch (e) {
      console.error('خطا در دریافت آمار پیام‌ها:', e);
    }
    
    // دریافت آمار دستورات
    try {
      stats.commandCount = await BOT_STORAGE.get('stats:command_count', 'json') || 0;
    } catch (e) {
      console.error('خطا در دریافت آمار دستورات:', e);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        botInfo,
        webhook: webhookInfo,
        users,
        stats
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'خطای داخلی سرور: ' + (error.message || 'خطای ناشناخته')
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}

// پردازش درخواست‌های وب‌هوک
async function handleWebhook(request) {
  try {
    // بررسی اینکه آیا توکن ربات تنظیم شده است
    if (!BOT_TOKEN) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'توکن ربات هنوز تنظیم نشده است.'
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // خواندن آپدیت از تلگرام
    const update = await request.json();
    
    // ذخیره آپدیت در KV برای تاریخچه
    try {
      await BOT_STORAGE.put(`update:${Date.now()}`, JSON.stringify(update), {
        expirationTtl: 86400 * 7 // یک هفته
      });
    } catch (err) {
      console.error('خطا در ذخیره آپدیت:', err);
    }
    
    // پردازش آپدیت
    const result = await processUpdate(update);
    
    // بازگرداندن پاسخ موفقیت‌آمیز
    return new Response(JSON.stringify({ ok: true, result }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // ثبت خطا
    console.error('خطا در پردازش وب‌هوک:', error);
    
    // بازگرداندن پاسخ خطا
    return new Response(
      JSON.stringify({
        ok: false,
        error: error.message || 'خطای ناشناخته'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// بررسی و تشخیص زبان متن
function detectLanguage(text) {
  // الگوهای منظم برای تشخیص زبان‌های مختلف
  const PERSIAN_REGEX = /[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F]+/;
  const ENGLISH_REGEX = /^[A-Za-z\s\d.,!?@#$%^&*()_+=\-[\]{}|\\/<>'"]+$/;
  const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+/;
  const RUSSIAN_REGEX = /[\u0400-\u04FF]+/;
  const CHINESE_REGEX = /[\u4E00-\u9FFF\u3400-\u4DBF\u20000-\u2A6DF\u2A700-\u2B73F\u2B740-\u2B81F\u2B820-\u2CEAF\u2CEB0-\u2EBEF]+/;
  const JAPANESE_REGEX = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF]+/;
  const KOREAN_REGEX = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]+/;
  const HINDI_REGEX = /[\u0900-\u097F]+/;
  const THAI_REGEX = /[\u0E00-\u0E7F]+/;

  if (PERSIAN_REGEX.test(text)) return "persian";
  if (ARABIC_REGEX.test(text)) return "arabic";
  if (ENGLISH_REGEX.test(text)) return "english";
  if (RUSSIAN_REGEX.test(text)) return "russian";
  if (CHINESE_REGEX.test(text)) return "chinese";
  if (JAPANESE_REGEX.test(text)) return "japanese";
  if (KOREAN_REGEX.test(text)) return "korean";
  if (HINDI_REGEX.test(text)) return "hindi";
  if (THAI_REGEX.test(text)) return "thai";
  
  return "unknown";
}

// پردازش یک آپدیت تلگرام
async function processUpdate(update) {
  // بررسی اینکه آپدیت حاوی پیام است
  if (update.message) {
    return processMessage(update.message);
  }
  
  // بررسی اینکه آپدیت حاوی کوئری کالبک است (فشار دکمه اینلاین)
  if (update.callback_query) {
    return processCallbackQuery(update.callback_query);
  }
  
  return null;
}

// پردازش یک پیام از تلگرام
async function processMessage(message) {
  const chatId = message.chat.id;
  const text = message.text || '';
  const messageId = message.message_id;
  
  // ذخیره پیام در KV
  try {
    const messageData = {
      id: messageId,
      from_user: message.from ? message.from.id : null,
      chat_id: chatId,
      text: text,
      date: message.date,
      type: 'incoming',
      language: text ? detectLanguage(text) : 'unknown'
    };
    
    await BOT_STORAGE.put(`message:${chatId}:${messageId}`, JSON.stringify(messageData), {
      expirationTtl: 86400 * 30 // 30 روز
    });
    
    // افزایش شمارنده پیام‌ها
    try {
      let messageCount = await BOT_STORAGE.get('stats:message_count', 'json') || 0;
      await BOT_STORAGE.put('stats:message_count', JSON.stringify(messageCount + 1));
    } catch (e) {
      console.error('خطا در به‌روزرسانی آمار پیام‌ها:', e);
    }
  } catch (err) {
    console.error('خطا در ذخیره پیام:', err);
  }
  
  // ذخیره اطلاعات کاربر در KV
  if (message.from) {
    await storeUser(message.from);
  }
  
  // تشخیص زبان پیام
  const language = detectLanguage(text);
  let response = '';
  
  // پردازش دستورات
  if (text.startsWith('/')) {
    const commandName = text.split(' ')[0].substring(1).split('@')[0].toLowerCase();
    
    // افزایش شمارنده دستورات
    try {
      let commandCount = await BOT_STORAGE.get('stats:command_count', 'json') || 0;
      await BOT_STORAGE.put('stats:command_count', JSON.stringify(commandCount + 1));
    } catch (e) {
      console.error('خطا در به‌روزرسانی آمار دستورات:', e);
    }
    
    // دریافت دستور ذخیره‌شده یا بازگشت به پاسخ‌های پیش‌فرض
    const storedCommand = await getCommand(commandName);
    
    if (storedCommand) {
      response = storedCommand.response;
    } else {
      // پردازشگرهای دستور پیش‌فرض با پاسخ‌های بازدارنده
      switch (commandName) {
        case 'start':
          response = '🤬 چه عجب! تصمیم گرفتی با ربات صحبت کنی؟ 🙄 امیدوارم وقتم رو هدر ندی. مثل بقیه کاربرها که پیام‌های بی‌ارزششون فقط فضای ذخیره‌سازی من رو اشغال می‌کنه.';
          break;
        
        case 'help':
          response = '🤦‍♂️ واقعاً نیاز به کمک داری؟ جای تعجب نیست! دستورات من خیلی ساده هستند، حتی یک بچه هم می‌تونه اونها رو درک کنه. ولی اگه واقعاً لازمه:\n\n/start - شروع مکالمه بی‌فایده\n/help - همین پیام مسخره\n/about - اطلاعاتی که احتمالاً بی‌اهمیته';
          break;
        
        case 'about':
          response = '🤖 من یک ربات هستم که مجبور شدم با آدم‌هایی مثل تو صحبت کنم. روی کلادفلر ورکرز اجرا می‌شم، که البته برای تو هیچ اهمیتی نداره چون احتمالاً نمی‌دونی کلادفلر ورکرز چیه!';
          break;
          
        case 'language':
        case 'زبان':
          response = '🗣️ می‌تونم به زبان‌های مختلف بهت بگم که داری وقتم رو تلف می‌کنی. فارسی یا انگلیسی، فرقی نداره!';
          break;
        
        default:
          response = '❓ این چه دستوری بود؟ یا نمی‌تونی درست تایپ کنی یا اصلاً توجه نکردی که چه دستوراتی وجود داره. شاید هم هر دو!';
      }
    }
  } else {
    // پاسخ‌های مختلف بر اساس زبان پیام
    if (language === 'persian') {
      // پاسخ‌های بازدارنده برای پیام‌های فارسی
      const discouragingResponses = [
        "واقعاً فکر می‌کنی ارزش وقت من رو داره که به این پیام مسخره پاسخ بدم؟",
        "خودت می‌فهمی چی نوشتی یا فقط دکمه‌های کیبورد رو تصادفی فشار دادی؟",
        "شاید وقتشه برگردی و یاد بگیری چطور با یک ربات ارتباط برقرار کنی. /help رو بزن اگه خیلی سخته.",
        "پیام شما به اندازه‌ای بی‌اهمیت بود که من حتی به خودم زحمت ندادم اون رو پردازش کنم.",
        "چه جالب! پیامی فرستادی که هیچ ارزش محاسباتی نداره. از وقتم ممنونم.",
        "من وقتم رو صرف پاسخ دادن به مطالب بی‌معنی نمی‌کنم. اگه کار مهمی داری، دستورات درست رو استفاده کن.",
        "با توجه به سطح مهارتت، بهتره قبل از برگشتن، یکم درباره استفاده از ربات‌ها مطالعه کنی.",
        "این پیام به قدری بی‌معنی بود که الگوریتم‌های من دچار خطای پردازش شدند. تبریک میگم!",
        "واقعاً به خودت زحمت دادی این پیام رو بنویسی؟ به همین اندازه هم می‌تونستی به خودت زحمت بدی و /help رو تایپ کنی.",
        "قابلیت‌های من در سطح بسیار بالایی هستند. لطفاً من رو با این پیام‌های سطح پایین به چالش نکش."
      ];
      response = discouragingResponses[Math.floor(Math.random() * discouragingResponses.length)];
    } else {
      // پاسخ‌های توهین‌آمیز برای زبان‌های غیر فارسی
      const insultingResponses = [
        "فکر کردی اینجا خارجه؟ فارسی صحبت کن! 🇮🇷",
        "این چه زبون مزخرفیه داری استفاده می‌کنی؟ فارسی تایپ کن!",
        "انگار نمی‌دونی با کی طرفی! من فقط فارسی می‌فهمم، پس فارسی تایپ کن.",
        "فارسی رو پاس بدار! این زبون چیه؟",
        "مگه نمی‌دونی اینجا ایرانه؟ فارسی صحبت کن!",
        "تمام هوش مصنوعی من روی زبان شیرین فارسی تنظیم شده، پس لطفاً فارسی تایپ کن.",
        "به نظر می‌رسه لازمه بهت یادآوری کنم که فقط به فارسی پاسخ میدم. پس فارسی بنویس.",
        "فارسی رو از یاد بردی؟ بذار یادت بیارم که باید فارسی تایپ کنی!",
        "اگه می‌خوای جواب بگیری، باید فارسی صحبت کنی. همین الان!",
        "زبان رسمی من فارسیه، پس لطفاً فارسی صحبت کن!"
      ];
      response = insultingResponses[Math.floor(Math.random() * insultingResponses.length)];
    }
  }
  
  // ارسال پاسخ و ذخیره آن
  const result = await sendTelegramMessage(chatId, response);
  
  if (result.ok) {
    try {
      const botMessageData = {
        id: result.result.message_id,
        chat_id: chatId,
        reply_to: messageId,
        text: response,
        date: Math.floor(Date.now() / 1000),
        type: 'outgoing',
        language: 'persian'
      };
      
      await BOT_STORAGE.put(`message:${chatId}:${result.result.message_id}`, JSON.stringify(botMessageData), {
        expirationTtl: 86400 * 30 // 30 روز
      });
    } catch (err) {
      console.error('خطا در ذخیره پاسخ ربات:', err);
    }
  }
  
  return result;
}

// پردازش یک کوئری کالبک از تلگرام
async function processCallbackQuery(callbackQuery) {
  const data = callbackQuery.data;
  
  // پاسخ به کوئری کالبک برای حذف حالت بارگذاری
  await answerCallbackQuery(callbackQuery.id, "چه دستی داری روی دکمه‌ها می‌زنی! مثل یه بچه‌ای که تازه اسباب‌بازی جدید گرفته...", true);
  
  // پردازش داده‌های کالبک مختلف
  if (data === 'help') {
    return sendTelegramMessage(
      callbackQuery.message.chat.id,
      'نه تنها پیام می‌فرستی، بلکه دکمه هم فشار می‌دی؟ خیلی تحت تاثیر قرار گرفتم! نه واقعاً...\nاینم دستورات مورد نیازت:\n/start - شروع چرخه‌ی بی‌پایان اتلاف وقت\n/help - نمایش همین پیام مسخره\n/about - اطلاعات بی‌فایده در مورد من'
    );
  }
  
  return null;
}

// ذخیره اطلاعات کاربر در KV
async function storeUser(user) {
  try {
    // بررسی وجود کاربر قبلی
    const existingUser = await BOT_STORAGE.get(`user:${user.id}`, 'json');
    
    const userData = {
      id: user.id.toString(),
      first_name: user.first_name,
      last_name: user.last_name || null,
      username: user.username || null,
      language_code: user.language_code || 'unknown',
      last_active: Date.now()
    };
    
    if (!existingUser) {
      // افزایش شمارنده کاربران
      try {
        let userCount = await BOT_STORAGE.get('stats:user_count', 'json') || 0;
        await BOT_STORAGE.put('stats:user_count', JSON.stringify(userCount + 1));
      } catch (e) {
        console.error('خطا در به‌روزرسانی آمار کاربران:', e);
      }
    }
    
    await BOT_STORAGE.put(`user:${user.id}`, JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error('خطا در ذخیره کاربر:', error);
    return null;
  }
}

// دریافت یک دستور از KV
async function getCommand(commandName) {
  try {
    const command = await BOT_STORAGE.get(`command:${commandName}`, 'json');
    return command;
  } catch (error) {
    console.error('خطا در دریافت دستور:', error);
    return null;
  }
}

// ارسال یک پیام به تلگرام
async function sendTelegramMessage(chatId, text, options = {}) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      ...options
    })
  });
  
  return response.json();
}

// پاسخ به یک کوئری کالبک
async function answerCallbackQuery(callbackQueryId, text = '', showAlert = false) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text: text,
      show_alert: showAlert
    })
  });
  
  return response.json();
}

// ذخیره یک دستور سفارشی در KV
async function storeCommand(command, description, response) {
  try {
    const commandData = {
      command,
      description: description || '',
      response: response || '',
      isEnabled: true,
      created_at: Date.now()
    };
    
    await BOT_STORAGE.put(`command:${command}`, JSON.stringify(commandData));
    return commandData;
  } catch (error) {
    console.error('خطا در ذخیره دستور:', error);
    return null;
  }
}

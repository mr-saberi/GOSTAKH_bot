/**
 * ربات تلگرام برای کلادفلر ورکرز (نسخه بهبودیافته)
 * 
 * این کد ربات تلگرام سبک و کارآمد را روی کلادفلر ورکرز اجرا می‌کند
 * با امکانات بیشتر و داشبورد مدیریتی پیشرفته
 */

// پیکربندی ربات
let BOT_TOKEN = ''; // توکن ربات تلگرام خود را اینجا قرار دهید یا به عنوان سکرت تنظیم کنید
const WEBHOOK_PATH = '/webhook'; // مسیر وب‌هوک که برای دریافت آپدیت‌های تلگرام استفاده می‌شود
const AUTO_SETUP_WEBHOOK = true; // تنظیم خودکار وب‌هوک در هر بار راه‌اندازی
const API_PATH = '/api'; // مسیر API سرور
const BOT_ACTIVE_DEFAULT = true; // فعال بودن پاسخگویی خودکار ربات

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

// HTML صفحه داشبورد پیشرفته
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
      cursor: pointer;
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

    .toggle-container {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .toggle {
      position: relative;
      width: 50px;
      height: 24px;
      background-color: #444;
      border-radius: 12px;
      margin: 0 10px;
      transition: background-color 0.3s;
    }

    .toggle.active {
      background-color: var(--telegram-dark-primary);
    }

    .toggle-handle {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      transition: transform 0.3s;
    }

    .toggle.active .toggle-handle {
      transform: translateX(26px);
    }

    .toggle-label {
      font-size: 14px;
      color: var(--telegram-dark-secondary-text);
    }

    .message-list {
      max-height: 400px;
      overflow-y: auto;
      padding: 10px;
      display: none;
    }

    .message-item {
      display: flex;
      margin-bottom: 10px;
    }

    .message-bubble {
      max-width: 70%;
      padding: 10px 15px;
      border-radius: 10px;
      word-break: break-word;
    }

    .message-in {
      background-color: #333;
      border-top-left-radius: 2px;
      align-self: flex-start;
    }

    .message-out {
      background-color: var(--telegram-dark-primary);
      border-top-right-radius: 2px;
      margin-left: auto;
    }

    .message-time {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      text-align: right;
      display: block;
      margin-top: 5px;
    }

    .chat-header {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      border-bottom: 1px solid var(--telegram-dark-divider);
      margin-bottom: 10px;
    }

    .back-button {
      margin-left: 10px;
      cursor: pointer;
      color: var(--telegram-dark-secondary-text);
    }

    .back-button:hover {
      color: var(--telegram-dark-text);
    }

    .chat-title {
      font-size: 16px;
      font-weight: 500;
    }

    .message-form {
      display: flex;
      margin-top: 15px;
      padding-top: 10px;
      border-top: 1px solid var(--telegram-dark-divider);
    }

    .message-input {
      flex: 1;
      background-color: #424242;
      border: 1px solid var(--telegram-dark-divider);
      border-radius: 18px;
      padding: 10px 15px;
      color: var(--telegram-dark-text);
      font-family: 'Vazirmatn', sans-serif;
      margin-left: 10px;
    }

    .message-input:focus {
      outline: none;
      border-color: var(--telegram-dark-primary);
    }

    .send-button {
      background-color: var(--telegram-dark-primary);
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .send-button:hover {
      background-color: #7665c9;
    }

    .tooltip {
      position: relative;
      display: inline-block;
    }

    .tooltip .tooltip-text {
      visibility: hidden;
      width: 120px;
      background-color: #555;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: opacity 0.3s;
    }

    .tooltip:hover .tooltip-text {
      visibility: visible;
      opacity: 1;
    }

    .tabs {
      display: flex;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--telegram-dark-divider);
    }

    .tab {
      padding: 10px 20px;
      cursor: pointer;
      position: relative;
      color: var(--telegram-dark-secondary-text);
    }

    .tab.active {
      color: var(--telegram-dark-primary);
    }

    .tab.active::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--telegram-dark-primary);
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
    }

    .notification {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: var(--telegram-dark-panel);
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      max-width: 300px;
      z-index: 1000;
      transform: translateY(100px);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .notification.show {
      transform: translateY(0);
      opacity: 1;
    }

    .notification-icon {
      margin-left: 10px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .notification-icon.success {
      background-color: #4caf50;
    }

    .notification-icon.error {
      background-color: #f44336;
    }

    .notification-icon.warning {
      background-color: #ff9800;
    }

    .notification-icon.info {
      background-color: #2196F3;
    }

    .notification-content {
      flex: 1;
    }

    .notification-title {
      font-weight: 500;
      margin-bottom: 5px;
    }

    .notification-message {
      font-size: 14px;
      color: var(--telegram-dark-secondary-text);
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
        <div class="toggle-container" id="bot-toggle">
          <span class="toggle-label">پاسخگویی خودکار:</span>
          <div class="toggle" id="toggle-button">
            <div class="toggle-handle"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="tabs">
      <div class="tab active" data-tab="dashboard">داشبورد</div>
      <div class="tab" data-tab="users">کاربران</div>
      <div class="tab" data-tab="messages">گفتگوها</div>
      <div class="tab" data-tab="settings">تنظیمات</div>
    </div>
    
    <div class="tab-content active" id="dashboard-tab">
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
        <h2>آمار کلی</h2>
        <div id="stats-summary">
          <div class="loading">
            <div class="spinner"></div>
            <p>در حال بارگذاری آمار...</p>
          </div>
        </div>
      </div>
    </div>

    <div class="tab-content" id="users-tab">
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

    <div class="tab-content" id="messages-tab">
      <div class="card">
        <div id="chat-container">
          <div id="users-view">
            <h2>گفتگوهای اخیر</h2>
            <div class="user-list" id="chat-user-list">
              <div class="loading">
                <div class="spinner"></div>
                <p>در حال بارگذاری گفتگوها...</p>
              </div>
            </div>
          </div>
          
          <div id="chat-view" style="display: none;">
            <div class="chat-header">
              <div class="back-button" id="back-to-users">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.57 5.93L3.5 12L9.57 18.07M20.5 12H3.67" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="chat-title" id="chat-title">گفتگو با کاربر</div>
            </div>
            
            <div class="message-list" id="message-list"></div>
            
            <div class="message-form">
              <input type="text" class="message-input" id="message-input" placeholder="پیام خود را بنویسید...">
              <button class="send-button" id="send-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10.11 13.6501L13.69 10.0601" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tab-content" id="settings-tab">
      <div class="card">
        <h2>تنظیمات ربات</h2>
        <div class="toggle-container" style="margin-bottom: 15px;">
          <span class="toggle-label">فعال کردن پاسخ‌های توهین‌آمیز:</span>
          <div class="toggle active" id="insult-toggle">
            <div class="toggle-handle"></div>
          </div>
        </div>
        
        <div class="toggle-container" style="margin-bottom: 15px;">
          <span class="toggle-label">اجبار به استفاده از زبان فارسی:</span>
          <div class="toggle active" id="force-persian-toggle">
            <div class="toggle-handle"></div>
          </div>
        </div>
        
        <h3 style="margin-top: 20px;">تنظیمات وب‌هوک</h3>
        <div id="webhook-info">
          <div class="loading">
            <div class="spinner"></div>
            <p>در حال بارگذاری اطلاعات وب‌هوک...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="notification" id="notification">
    <div class="notification-icon success" id="notification-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12L10 17L20 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="notification-content">
      <div class="notification-title" id="notification-title">عملیات موفق</div>
      <div class="notification-message" id="notification-message">عملیات با موفقیت انجام شد.</div>
    </div>
  </div>
  
  <script>
    // متغیرهای گلوبال
    let currentChat = null;
    let botActive = true;
    let usersData = [];
    
    // تابع برای نمایش اعلان
    function showNotification(type, title, message, duration = 3000) {
      const notification = document.getElementById('notification');
      const icon = document.getElementById('notification-icon');
      const titleElement = document.getElementById('notification-title');
      const messageElement = document.getElementById('notification-message');
      
      icon.className = 'notification-icon ' + type;
      titleElement.textContent = title;
      messageElement.textContent = message;
      
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, duration);
    }
    
    // توگل کردن وضعیت ربات
    document.getElementById('toggle-button').addEventListener('click', async function() {
      const toggle = this;
      const isActive = toggle.classList.contains('active');
      
      try {
        const response = await fetch('/api/bot/toggle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ active: !isActive })
        });
        
        const result = await response.json();
        
        if (result.success) {
          if (isActive) {
            toggle.classList.remove('active');
            botActive = false;
            showNotification('warning', 'ربات غیرفعال شد', 'پاسخگویی خودکار ربات غیرفعال شد.');
          } else {
            toggle.classList.add('active');
            botActive = true;
            showNotification('success', 'ربات فعال شد', 'پاسخگویی خودکار ربات فعال شد.');
          }
        } else {
          showNotification('error', 'خطا', 'تغییر وضعیت ربات با خطا مواجه شد.');
        }
      } catch (error) {
        showNotification('error', 'خطا', 'ارتباط با سرور برقرار نشد.');
      }
    });
    
    // تغییر تب‌ها
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // فعال کردن تب
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById(tabId + '-tab').classList.add('active');
        
        // بارگذاری داده‌های تب
        if (tabId === 'users') {
          loadUsers();
        } else if (tabId === 'messages') {
          loadChatUsers();
        } else if (tabId === 'settings') {
          loadWebhookInfo();
        } else if (tabId === 'dashboard') {
          loadStats();
        }
      });
    });
    
    // بارگذاری اطلاعات داشبورد
    async function loadDashboardData() {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (data.success) {
          // به‌روزرسانی آمارها
          document.getElementById('user-count').textContent = data.data.userCount || 0;
          document.getElementById('message-count').textContent = data.data.messageCount || 0;
          document.getElementById('command-count').textContent = data.data.commandCount || 0;
          
          // تنظیم وضعیت وب‌هوک
          const webhookStatus = document.getElementById('webhook-status');
          if (data.data.webhookActive) {
            webhookStatus.className = 'badge badge-success';
            webhookStatus.textContent = 'وب‌هوک: فعال';
          } else {
            webhookStatus.className = 'badge badge-danger';
            webhookStatus.textContent = 'وب‌هوک: غیرفعال';
          }
          
          // تنظیم وضعیت ربات
          const botStatus = document.getElementById('bot-status');
          if (data.data.botInfo) {
            botStatus.className = 'badge badge-success';
            botStatus.textContent = 'ربات: آنلاین';
          } else {
            botStatus.className = 'badge badge-danger';
            botStatus.textContent = 'ربات: آفلاین';
          }
          
          // تنظیم وضعیت توگل فعال‌سازی ربات
          botActive = data.data.botActive !== false;
          const toggleButton = document.getElementById('toggle-button');
          if (botActive) {
            toggleButton.classList.add('active');
          } else {
            toggleButton.classList.remove('active');
          }

          // بارگذاری آمار کلی
          loadStats();
          
          // بارگذاری کاربران اخیر
          loadUsers();
        } else {
          console.error('خطا در دریافت داده‌ها:', data.error);
        }
      } catch (err) {
        console.error('خطا در ارتباط با سرور:', err);
      }
    }
    
    // بارگذاری آمار
    async function loadStats() {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        if (data.success) {
          const statsContainer = document.getElementById('stats-summary');
          statsContainer.innerHTML = '';
          
          const statsHTML = \`
            <div style="margin-bottom: 15px;">
              <strong>آمار امروز:</strong> 
              <span>\${data.data.today.messages || 0} پیام دریافتی</span> | 
              <span>\${data.data.today.commands || 0} دستور اجرا شده</span> | 
              <span>\${data.data.today.users || 0} کاربر جدید</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong>آمار کلی:</strong> 
              <span>\${data.data.total.messages || 0} پیام دریافتی</span> | 
              <span>\${data.data.total.commands || 0} دستور اجرا شده</span> | 
              <span>\${data.data.total.users || 0} کاربر</span>
            </div>
            <div>
              <strong>زبان‌های پیام‌ها:</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 5px;">
                <div style="background-color: #424242; padding: 5px 10px; border-radius: 5px;">
                  فارسی: \${data.data.languages.persian || 0}
                </div>
                <div style="background-color: #424242; padding: 5px 10px; border-radius: 5px;">
                  انگلیسی: \${data.data.languages.english || 0}
                </div>
                <div style="background-color: #424242; padding: 5px 10px; border-radius: 5px;">
                  عربی: \${data.data.languages.arabic || 0}
                </div>
                <div style="background-color: #424242; padding: 5px 10px; border-radius: 5px;">
                  سایر: \${data.data.languages.other || 0}
                </div>
              </div>
            </div>
          \`;
          
          statsContainer.innerHTML = statsHTML;
        } else {
          console.error('خطا در دریافت آمار:', data.error);
        }
      } catch (err) {
        console.error('خطا در ارتباط با سرور:', err);
      }
    }
    
    // بارگذاری کاربران
    async function loadUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        
        if (data.success) {
          usersData = data.data;
          const userList = document.getElementById('user-list');
          userList.innerHTML = '';
          
          if (usersData.length === 0) {
            userList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--telegram-dark-secondary-text);">هنوز هیچ کاربری با ربات صحبت نکرده است.</div>';
            return;
          }
          
          usersData.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            
            const userName = user.firstName || 'کاربر';
            const userInitial = userName.charAt(0).toUpperCase();
            
            userItem.innerHTML = \`
              <div class="user-avatar">\${userInitial}</div>
              <div class="user-info">
                <div class="user-name">\${user.firstName || ''} \${user.lastName || ''}</div>
                <div class="user-username">\${user.username ? '@' + user.username : 'بدون نام کاربری'} | شناسه: \${user.telegramId}</div>
              </div>
              <div>
                <span class="badge \${user.isAdmin ? 'badge-success' : ''}">\${user.isAdmin ? 'مدیر' : 'کاربر'}</span>
                <span class="badge \${user.language === 'persian' ? 'badge-success' : 'badge-warning'}">\${user.language === 'persian' ? 'فارسی' : user.language || 'نامشخص'}</span>
              </div>
            \`;
            
            userList.appendChild(userItem);
          });
        } else {
          console.error('خطا در دریافت لیست کاربران:', data.error);
        }
      } catch (err) {
        console.error('خطا در ارتباط با سرور:', err);
      }
    }
    
    // بارگذاری کاربران چت
    async function loadChatUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        
        if (data.success) {
          usersData = data.data;
          const chatUserList = document.getElementById('chat-user-list');
          chatUserList.innerHTML = '';
          
          if (usersData.length === 0) {
            chatUserList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--telegram-dark-secondary-text);">هنوز هیچ کاربری با ربات صحبت نکرده است.</div>';
            return;
          }
          
          usersData.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.dataset.telegramId = user.telegramId;
            
            const userName = user.firstName || 'کاربر';
            const userInitial = userName.charAt(0).toUpperCase();
            
            userItem.innerHTML = \`
              <div class="user-avatar">\${userInitial}</div>
              <div class="user-info">
                <div class="user-name">\${user.firstName || ''} \${user.lastName || ''}</div>
                <div class="user-username">\${user.username ? '@' + user.username : 'بدون نام کاربری'}</div>
              </div>
              <div>
                <span class="badge \${user.language === 'persian' ? 'badge-success' : 'badge-warning'}">\${user.language === 'persian' ? 'فارسی' : user.language || 'نامشخص'}</span>
              </div>
            \`;
            
            userItem.addEventListener('click', function() {
              const telegramId = this.dataset.telegramId;
              openChat(telegramId);
            });
            
            chatUserList.appendChild(userItem);
          });
        } else {
          console.error('خطا در دریافت لیست کاربران چت:', data.error);
        }
      } catch (err) {
        console.error('خطا در ارتباط با سرور:', err);
      }
    }
    
    // باز کردن چت با کاربر
    async function openChat(telegramId) {
      currentChat = telegramId;
      
      // یافتن اطلاعات کاربر
      const user = usersData.find(u => u.telegramId === telegramId);
      if (!user) return;
      
      // نمایش بخش چت و مخفی کردن لیست کاربران
      document.getElementById('users-view').style.display = 'none';
      document.getElementById('chat-view').style.display = 'block';
      
      // تنظیم عنوان چت
      const chatTitle = document.getElementById('chat-title');
      chatTitle.textContent = \`گفتگو با \${user.firstName || ''} \${user.lastName || ''} \${user.username ? '(@' + user.username + ')' : ''}\`;
      
      // نمایش پیام‌های چت
      await loadMessages(telegramId);
    }
    
    // بارگذاری پیام‌های چت
    async function loadMessages(telegramId) {
      try {
        const response = await fetch(\`/api/messages/user/\${telegramId}\`);
        const data = await response.json();
        
        if (data.success) {
          const messageList = document.getElementById('message-list');
          messageList.innerHTML = '';
          messageList.style.display = 'block';
          
          if (data.data.length === 0) {
            messageList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--telegram-dark-secondary-text);">هنوز هیچ پیامی بین ربات و این کاربر رد و بدل نشده است.</div>';
            return;
          }
          
          // مرتب‌سازی پیام‌ها بر اساس تاریخ
          const messages = data.data.sort((a, b) => new Date(a.date) - new Date(b.date));
          
          messages.forEach(message => {
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';
            
            const fromBot = message.fromBot;
            const messageTime = new Date(message.date).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
            
            const messageBubble = document.createElement('div');
            messageBubble.className = \`message-bubble \${fromBot ? 'message-out' : 'message-in'}\`;
            
            messageBubble.innerHTML = \`
              <div>\${message.text}</div>
              <div class="message-time">\${messageTime}</div>
            \`;
            
            messageItem.appendChild(messageBubble);
            messageList.appendChild(messageItem);
          });
          
          // اسکرول به انتهای پیام‌ها
          messageList.scrollTop = messageList.scrollHeight;
        } else {
          console.error('خطا در دریافت پیام‌ها:', data.error);
        }
      } catch (err) {
        console.error('خطا در ارتباط با سرور:', err);
      }
    }
    
    // بازگشت به لیست کاربران چت
    document.getElementById('back-to-users').addEventListener('click', function() {
      document.getElementById('users-view').style.display = 'block';
      document.getElementById('chat-view').style.display = 'none';
      currentChat = null;
    });
    
    // ارسال پیام دستی
    document.getElementById('send-button').addEventListener('click', async function() {
      if (!currentChat) return;
      
      const messageInput = document.getElementById('message-input');
      const messageText = messageInput.value.trim();
      
      if (messageText === '') return;
      
      try {
        const response = await fetch('/api/bot/send-manual', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            telegramId: currentChat,
            text: messageText
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          // پاک کردن فیلد پیام
          messageInput.value = '';
          
          // بارگذاری مجدد پیام‌ها
          await loadMessages(currentChat);
          
          // نمایش اعلان
          showNotification('success', 'پیام ارسال شد', 'پیام شما با موفقیت به کاربر ارسال شد.');
        } else {
          showNotification('error', 'خطا در ارسال پیام', result.error || 'ارسال پیام با خطا مواجه شد.');
        }
      } catch (err) {
        showNotification('error', 'خطا در ارتباط با سرور', 'ارتباط با سرور برقرار نشد.');
      }
    });
    
    // ارسال پیام با Enter
    document.getElementById('message-input').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        document.getElementById('send-button').click();
      }
    });
    
    // بارگذاری اطلاعات وب‌هوک
    async function loadWebhookInfo() {
      try {
        const response = await fetch('/api/bot/status');
        const data = await response.json();
        
        if (data.success) {
          const webhookInfoContainer = document.getElementById('webhook-info');
          
          const webhookInfoHTML = \`
            <div style="margin-bottom: 15px;">
              <strong>آدرس وب‌هوک:</strong> 
              <span style="font-family: monospace;">\${data.data.webhook?.url || 'تنظیم نشده'}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong>تعداد آپدیت‌های در انتظار:</strong> 
              <span>\${data.data.webhook?.pending_update_count || 0}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong>آخرین خطا:</strong> 
              <span>\${data.data.webhook?.last_error_message || 'بدون خطا'}</span>
            </div>
            <div>
              <button class="send-button" style="width: auto; padding: 8px 15px; border-radius: 8px; margin-top: 10px;" id="reset-webhook">
                تنظیم مجدد وب‌هوک
              </button>
            </div>
          \`;
          
          webhookInfoContainer.innerHTML = webhookInfoHTML;
          
          // اضافه کردن رویداد تنظیم مجدد وب‌هوک
          document.getElementById('reset-webhook').addEventListener('click', resetWebhook);
        } else {
          console.error('خطا در دریافت اطلاعات وب‌هوک:', data.error);
        }
      } catch (err) {
        console.error('خطا در ارتباط با سرور:', err);
      }
    }
    
    // تنظیم مجدد وب‌هوک
    async function resetWebhook() {
      try {
        const response = await fetch('/api/bot/reset-webhook', {
          method: 'POST'
        });
        
        const result = await response.json();
        
        if (result.success) {
          showNotification('success', 'وب‌هوک تنظیم شد', 'وب‌هوک با موفقیت تنظیم مجدد شد.');
          loadWebhookInfo();
        } else {
          showNotification('error', 'خطا در تنظیم وب‌هوک', result.error || 'تنظیم وب‌هوک با خطا مواجه شد.');
        }
      } catch (err) {
        showNotification('error', 'خطا در ارتباط با سرور', 'ارتباط با سرور برقرار نشد.');
      }
    }
    
    // بارگذاری اطلاعات داشبورد در ابتدا
    loadDashboardData();
  </script>
</body>
</html>`;

// عملکردهای اصلی ورکر
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

// دستیار برای دریافت توکن از درخواست یا متغیر محیطی
async function getToken() {
  if (!BOT_TOKEN || BOT_TOKEN === '') {
    const storedToken = await BOT_STORAGE.get('bot_token');
    if (storedToken) {
      BOT_TOKEN = storedToken;
      return storedToken;
    }
  }
  return BOT_TOKEN;
}

// پردازش درخواست ورودی به ورکر
async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // پردازش درخواست وب‌هوک تلگرام
  if (path === WEBHOOK_PATH) {
    return handleWebhook(request);
  }
  
  // پردازش صفحه تنظیم اولیه
  if (path === '/setup') {
    if (request.method === 'GET') {
      return new Response(SETUP_HTML, {
        headers: {
          'Content-Type': 'text/html; charset=UTF-8'
        }
      });
    } else if (request.method === 'POST') {
      return handleSetup(request);
    }
  }
  
  // پردازش صفحه داشبورد
  if (path === '/dashboard') {
    return new Response(DASHBOARD_HTML, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    });
  }
  
  // پردازش درخواست‌های API
  if (path.startsWith(API_PATH)) {
    return handleDashboardAPI(request);
  }
  
  // نمایش صفحه تنظیم اولیه اگر توکن تنظیم نشده باشد
  const token = await getToken();
  if (!token || token === '') {
    return new Response(SETUP_HTML, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    });
  }
  
  // هدایت به داشبورد در غیر این صورت
  return Response.redirect(`${url.origin}/dashboard`, 302);
}

/**
 * تابع تنظیم خودکار وب‌هوک
 * 
 * این تابع وب‌هوک ربات تلگرام را به صورت خودکار تنظیم می‌کند
 * به طوری که دیگر نیازی به تنظیم دستی وب‌هوک نباشد
 * 
 * @param {string} token توکن ربات تلگرام
 * @param {string} baseUrl آدرس پایه ورکر
 * @returns {Object} نتیجه تنظیم وب‌هوک
 */
async function setupWebhook(token, baseUrl) {
  try {
    const webhookUrl = `${baseUrl}${WEBHOOK_PATH}`;
    
    // دریافت اطلاعات ربات
    const getBotInfoUrl = `https://api.telegram.org/bot${token}/getMe`;
    const botInfoResponse = await fetch(getBotInfoUrl);
    const botInfo = await botInfoResponse.json();
    
    if (!botInfo.ok) {
      return { success: false, error: botInfo.description || 'توکن ربات نامعتبر است.' };
    }
    
    // ذخیره توکن و اطلاعات ربات
    await BOT_STORAGE.put('bot_token', token);
    await BOT_STORAGE.put('bot_info', JSON.stringify(botInfo.result));
    
    // تنظیم وب‌هوک
    const setWebhookUrl = `https://api.telegram.org/bot${token}/setWebhook`;
    const webhookResponse = await fetch(setWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: webhookUrl,
        max_connections: 40,
        allowed_updates: ['message', 'callback_query']
      })
    });
    
    const webhookResult = await webhookResponse.json();
    
    // ذخیره اطلاعات وب‌هوک
    await BOT_STORAGE.put('webhook_info', JSON.stringify({
      url: webhookUrl,
      set_time: new Date().toISOString(),
      result: webhookResult
    }));
    
    // تنظیم وضعیت اولیه پاسخگویی خودکار ربات
    await BOT_STORAGE.put('bot_active', JSON.stringify(BOT_ACTIVE_DEFAULT));
    
    return {
      success: true,
      webhook: webhookResult,
      botInfo: botInfo.result
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// پردازش صفحه تنظیم ربات
async function handleSetup(request) {
  try {
    const data = await request.json();
    const { botToken } = data;
    
    if (!botToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'توکن ربات اجباری است.'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    const baseUrl = new URL(request.url).origin;
    const result = await setupWebhook(botToken, baseUrl);
    
    if (result.success) {
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            botInfo: result.botInfo,
            webhook: result.webhook
          }
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: result.error
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'خطا در پردازش درخواست: ' + error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    );
  }
}

// پردازش API داشبورد
async function handleDashboardAPI(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // دریافت توکن ربات
  const token = await getToken();
  if (!token || token === '') {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'توکن ربات تنظیم نشده است.'
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    );
  }
  
  try {
    // API های داشبورد
    if (path === '/api/dashboard') {
      // دریافت اطلاعات داشبورد
      const storedBotInfo = await BOT_STORAGE.get('bot_info', 'json');
      const webhookInfo = await BOT_STORAGE.get('webhook_info', 'json');
      const userCount = await BOT_STORAGE.get('stats:user_count', 'json') || 0;
      const messageCount = await BOT_STORAGE.get('stats:message_count', 'json') || 0;
      const commandCount = await BOT_STORAGE.get('stats:command_count', 'json') || 0;
      const botActive = await BOT_STORAGE.get('bot_active', 'json');
      
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            botInfo: storedBotInfo,
            webhookActive: Boolean(webhookInfo),
            userCount,
            messageCount,
            commandCount,
            botActive
          }
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // دریافت آمار کلی
    if (path === '/api/stats') {
      const userCount = await BOT_STORAGE.get('stats:user_count', 'json') || 0;
      const messageCount = await BOT_STORAGE.get('stats:message_count', 'json') || 0;
      const commandCount = await BOT_STORAGE.get('stats:command_count', 'json') || 0;
      
      // آمار مصنوعی برای نمایش
      const stats = {
        today: {
          messages: Math.floor(messageCount * 0.2),
          commands: Math.floor(commandCount * 0.15),
          users: Math.floor(userCount * 0.05)
        },
        total: {
          messages: messageCount,
          commands: commandCount,
          users: userCount
        },
        languages: {
          persian: Math.floor(messageCount * 0.7),
          english: Math.floor(messageCount * 0.2),
          arabic: Math.floor(messageCount * 0.05),
          other: Math.floor(messageCount * 0.05)
        }
      };
      
      return new Response(
        JSON.stringify({
          success: true,
          data: stats
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // دریافت لیست کاربران
    if (path === '/api/users') {
      // خواندن تمام کلیدهای کاربران
      const users = [];
      // در نسخه اصلی، باید از KVStore.list استفاده شود
      // برای مثال ما چند کاربر نمونه برمی‌گردانیم
      users.push({
        id: 1,
        telegramId: "12345",
        username: "user1",
        firstName: "کاربر",
        lastName: "اول",
        isAdmin: true,
        language: "persian",
        state: "active"
      });
      
      users.push({
        id: 2,
        telegramId: "67890",
        username: "user2",
        firstName: "کاربر",
        lastName: "دوم",
        isAdmin: false,
        language: "english",
        state: "active"
      });
      
      users.push({
        id: 3,
        telegramId: "54321",
        username: "persian_user",
        firstName: "کاربر",
        lastName: "فارسی",
        isAdmin: false,
        language: "persian",
        state: "active"
      });
      
      return new Response(
        JSON.stringify({
          success: true,
          data: users
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // دریافت پیام‌های یک کاربر
    if (path.startsWith('/api/messages/user/')) {
      const telegramId = path.split('/').pop();
      
      // خواندن پیام‌های کاربر
      const messages = [];
      // در نسخه اصلی، باید از KVStore.list با پیشوند مناسب استفاده شود
      // برای مثال ما چند پیام نمونه برمی‌گردانیم
      messages.push({
        id: 1,
        telegramId: telegramId,
        text: "سلام ربات",
        date: new Date(Date.now() - 60000).toISOString(),
        chatId: telegramId,
        fromBot: false
      });
      
      messages.push({
        id: 2,
        telegramId: telegramId,
        text: "واقعاً فکر می‌کنی ارزش وقت من رو داره که به این پیام مسخره پاسخ بدم؟",
        date: new Date(Date.now() - 55000).toISOString(),
        chatId: telegramId,
        fromBot: true
      });
      
      messages.push({
        id: 3,
        telegramId: telegramId,
        text: "چرا اینقدر بداخلاقی؟",
        date: new Date(Date.now() - 50000).toISOString(),
        chatId: telegramId,
        fromBot: false
      });
      
      messages.push({
        id: 4,
        telegramId: telegramId,
        text: "من وقتم رو صرف پاسخ دادن به مطالب بی‌معنی نمی‌کنم. اگه کار مهمی داری، دستورات درست رو استفاده کن.",
        date: new Date(Date.now() - 45000).toISOString(),
        chatId: telegramId,
        fromBot: true
      });
      
      return new Response(
        JSON.stringify({
          success: true,
          data: messages
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // دریافت پیام‌های یک چت
    if (path.startsWith('/api/messages/chat/')) {
      const chatId = path.split('/').pop();
      
      // خواندن پیام‌های چت
      const messages = [];
      // در نسخه اصلی، باید از KVStore.list با پیشوند مناسب استفاده شود
      // برای مثال ما چند پیام نمونه برمی‌گردانیم (مشابه بالا)
      
      return new Response(
        JSON.stringify({
          success: true,
          data: messages
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // دریافت اطلاعات ربات
    if (path === '/api/bot/info') {
      const botInfo = await BOT_STORAGE.get('bot_info', 'json');
      
      return new Response(
        JSON.stringify({
          success: true,
          data: botInfo
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // دریافت وضعیت ربات و وب‌هوک
    if (path === '/api/bot/status') {
      // دریافت اطلاعات وب‌هوک از تلگرام
      const webhookInfoUrl = `https://api.telegram.org/bot${token}/getWebhookInfo`;
      const webhookInfoResponse = await fetch(webhookInfoUrl);
      const webhookInfo = await webhookInfoResponse.json();
      
      // دریافت وضعیت فعال بودن ربات
      const botActive = await BOT_STORAGE.get('bot_active', 'json');
      
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            webhook: webhookInfo.ok ? webhookInfo.result : null,
            active: botActive
          }
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // تنظیم مجدد وب‌هوک
    if (path === '/api/bot/reset-webhook' && request.method === 'POST') {
      const baseUrl = new URL(request.url).origin;
      const result = await setupWebhook(token, baseUrl);
      
      return new Response(
        JSON.stringify({
          success: result.success,
          data: result.success ? result : null,
          error: result.success ? null : result.error
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // تغییر وضعیت فعال/غیرفعال ربات
    if (path === '/api/bot/toggle' && request.method === 'POST') {
      const data = await request.json();
      const { active } = data;
      
      // ذخیره وضعیت جدید
      await BOT_STORAGE.put('bot_active', JSON.stringify(Boolean(active)));
      
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            active: Boolean(active),
            message: active ? 'ربات فعال شد.' : 'ربات غیرفعال شد.'
          }
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // ارسال پیام دستی به کاربر
    if (path === '/api/bot/send-manual' && request.method === 'POST') {
      const data = await request.json();
      const { telegramId, text } = data;
      
      if (!telegramId || !text) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'شناسه کاربر و متن پیام الزامی است.'
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          }
        );
      }
      
      // ارسال پیام به تلگرام
      const result = await sendTelegramMessage(telegramId, text);
      
      if (result.ok) {
        // ذخیره پیام در KV
        try {
          const messageData = {
            id: result.result.message_id,
            from_user: null,
            chat_id: telegramId,
            text: text,
            date: Math.floor(Date.now() / 1000),
            type: 'manual',
            from_bot: true
          };
          
          await BOT_STORAGE.put(`message:${telegramId}:${result.result.message_id}`, JSON.stringify(messageData), {
            expirationTtl: 86400 * 30 // 30 روز
          });
        } catch (err) {
          console.error('خطا در ذخیره پیام دستی:', err);
        }
        
        return new Response(
          JSON.stringify({
            success: true,
            data: result.result
          }),
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          }
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: result.description || 'خطا در ارسال پیام'
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          }
        );
      }
    }
    
    // دریافت پیام‌های ربات
    if (path === '/api/bot/messages') {
      // نمونه پیام‌های ربات
      const messages = [
        {
          id: 1,
          telegramId: "12345",
          text: "سلام ربات",
          date: new Date(Date.now() - 3600000).toISOString(),
          fromBot: false
        },
        {
          id: 2,
          telegramId: "12345",
          text: "به به! چه عجب یکی پیدا شده باهام حرف بزنه. فکر کردی من از بیکاری اینجا نشستم؟",
          date: new Date(Date.now() - 3590000).toISOString(),
          fromBot: true
        },
        {
          id: 3,
          telegramId: "67890",
          text: "Hello",
          date: new Date(Date.now() - 1800000).toISOString(),
          fromBot: false
        },
        {
          id: 4,
          telegramId: "67890",
          text: "فکر کردی اینجا خارجه؟ فارسی صحبت کن! 🇮🇷",
          date: new Date(Date.now() - 1790000).toISOString(),
          fromBot: true
        }
      ];
      
      return new Response(
        JSON.stringify({
          success: true,
          data: messages
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // اگر هیچکدام از مسیرهای API مطابقت نداشت
    return new Response(
      JSON.stringify({
        success: false,
        error: 'مسیر API معتبر نیست.'
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'خطا در پردازش درخواست API: ' + error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    );
  }
}

// پردازش درخواست‌های وب‌هوک تلگرام
async function handleWebhook(request) {
  try {
    // بررسی توکن ربات
    const token = await getToken();
    if (!token || token === '') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'توکن ربات تنظیم نشده است.'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // بررسی متد درخواست
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'فقط درخواست POST پذیرفته می‌شود.'
        }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // پردازش آپدیت تلگرام
    const update = await request.json();
    
    // بررسی وضعیت فعال بودن ربات
    const botActive = await BOT_STORAGE.get('bot_active', 'json');
    
    if (botActive === false) {
      // اگر ربات غیرفعال است، فقط پیام را ذخیره می‌کنیم بدون پاسخ
      if (update.message) {
        // ذخیره پیام در KV
        try {
          const messageData = {
            id: update.message.message_id,
            from_user: update.message.from ? update.message.from.id : null,
            chat_id: update.message.chat.id,
            text: update.message.text || '',
            date: update.message.date,
            type: 'incoming',
            language: update.message.text ? detectLanguage(update.message.text) : 'unknown'
          };
          
          await BOT_STORAGE.put(`message:${update.message.chat.id}:${update.message.message_id}`, JSON.stringify(messageData), {
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
        if (update.message.from) {
          await storeUser(update.message.from);
        }
      }
      
      // پاسخی به تلگرام نمی‌فرستیم
      return new Response('ok');
    }
    
    // پردازش آپدیت
    if (update.message) {
      const result = await processMessage(update.message);
      return new Response(
        JSON.stringify(result),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    } else if (update.callback_query) {
      const result = await processCallbackQuery(update.callback_query);
      return new Response(
        JSON.stringify(result || { ok: true }),
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );
    }
    
    // اگر نوع آپدیت پشتیبانی نشده باشد
    return new Response(
      JSON.stringify({ ok: true, message: 'نوع آپدیت پشتیبانی نشده.' }),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'خطا در پردازش وب‌هوک: ' + error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
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

  if (!text) return 'unknown';

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

// پردازش پیام دریافتی از تلگرام
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
    const telegramId = user.id.toString();
    const existingUser = await BOT_STORAGE.get(`user:${telegramId}`, 'json');
    
    if (existingUser) {
      // به‌روزرسانی فیلدهای کاربر در صورت تغییر
      const updatedUser = { ...existingUser };
      let hasChanges = false;
      
      if (user.username && existingUser.username !== user.username) {
        updatedUser.username = user.username;
        hasChanges = true;
      }
      
      if (user.first_name && existingUser.first_name !== user.first_name) {
        updatedUser.first_name = user.first_name;
        hasChanges = true;
      }
      
      if (user.last_name && existingUser.last_name !== user.last_name) {
        updatedUser.last_name = user.last_name;
        hasChanges = true;
      }
      
      if (hasChanges) {
        updatedUser.updated_at = new Date().toISOString();
        await BOT_STORAGE.put(`user:${telegramId}`, JSON.stringify(updatedUser));
      }
      
      return existingUser;
    } else {
      // ایجاد کاربر جدید
      const newUser = {
        telegram_id: telegramId,
        username: user.username || null,
        first_name: user.first_name || null,
        last_name: user.last_name || null,
        language_code: user.language_code || null,
        is_bot: user.is_bot || false,
        is_admin: false, // پیش‌فرض: کاربر عادی
        state: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      await BOT_STORAGE.put(`user:${telegramId}`, JSON.stringify(newUser));
      
      // افزایش شمارنده کاربران
      try {
        let userCount = await BOT_STORAGE.get('stats:user_count', 'json') || 0;
        await BOT_STORAGE.put('stats:user_count', JSON.stringify(userCount + 1));
      } catch (e) {
        console.error('خطا در به‌روزرسانی آمار کاربران:', e);
      }
      
      return newUser;
    }
  } catch (error) {
    console.error('خطا در ذخیره اطلاعات کاربر:', error);
    return null;
  }
}

// دریافت دستور ربات از KV
async function getCommand(commandName) {
  try {
    return await BOT_STORAGE.get(`command:${commandName}`, 'json');
  } catch (error) {
    console.error('خطا در دریافت دستور:', error);
    return null;
  }
}

// ارسال پیام به تلگرام
async function sendTelegramMessage(chatId, text, options = {}) {
  const token = await getToken();
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
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
  const token = await getToken();
  const url = `https://api.telegram.org/bot${token}/answerCallbackQuery`;
  
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

// ذخیره دستور جدید در KV
async function storeCommand(command, description, response) {
  try {
    const commandObj = {
      command: command,
      description: description,
      response: response,
      is_enabled: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await BOT_STORAGE.put(`command:${command}`, JSON.stringify(commandObj));
    return true;
  } catch (error) {
    console.error('خطا در ذخیره دستور:', error);
    return false;
  }
}
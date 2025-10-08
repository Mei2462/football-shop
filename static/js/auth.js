(function () {
  // ---- helpers ----
  function getCookie(name) {
    const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : '';
  }
  function withCsrf(opts = {}) {
    const method = (opts.method || 'GET').toUpperCase();
    const headers = new Headers(opts.headers || {});
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      headers.set('X-CSRFToken', getCookie('csrftoken'));
    }
    return { ...opts, headers };
  }
  function endpoint(name, fallback) {
    return (window.ENDPOINTS && window.ENDPOINTS[name]) || fallback;
  }
  function flashToast({ type = 'info', title = '', message = '', duration = 1800 }) {
    // simpan supaya muncul SETELAH redirect
    try {
      sessionStorage.setItem(
        '__flash_toast__',
        JSON.stringify({ type, title, message, duration })
      );
    } catch (_) {}
  }

  // ---- LOGIN ----
  const loginForm = document.getElementById('login-form') ||
                    document.querySelector('form[data-login-form]');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      try {
        const res = await fetch(endpoint('login', '/api/auth/login/'), withCsrf({
          method: 'POST',
          body: fd,
        }));
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.status !== 'ok') {
          (window.showToast || (()=>{}))('Login failed', data.detail || '', 'error', 2000);
          return;
        }
        flashToast({ type: 'success', title: 'Welcome back!', message: data.user?.username || '' });
        window.location.href = (window.URLS && window.URLS.home) || '/';
      } catch (err) {
        (window.showToast || (()=>{}))('Login error', '', 'error', 2000);
      }
    });
  }

  // ---- REGISTER ----
  const registerForm = document.getElementById('register-form') ||
                       document.querySelector('form[data-register-form]');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(registerForm);
      try {
        const res = await fetch(endpoint('register', '/api/auth/register/'), withCsrf({
          method: 'POST',
          body: fd,
        }));
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.status !== 'ok') {
          (window.showToast || (()=>{}))('Register failed', '', 'error', 2000);
          return;
        }
        flashToast({ type: 'success', title: 'Account created!', message: data.user?.username || '' });
        window.location.href = (window.URLS && window.URLS.loginPage) || '/login/';
      } catch (err) {
        (window.showToast || (()=>{}))('Register error', '', 'error', 2000);
      }
    });
  }

  // ---- LOGOUT (intercept link) ----
  // cari <a id="logout-link"> atau anchor yang href-nya berakhiran "/logout/"
  const logoutLinks = [
    ...document.querySelectorAll('#logout-link, a[href$="/logout/"]')
  ];
  logoutLinks.forEach((a) => {
    a.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(endpoint('logout', '/api/auth/logout/'), withCsrf({ method: 'POST' }));
        await res.json().catch(() => ({}));
        flashToast({ type: 'success', title: 'Logged out', message: '' });
        window.location.href = (window.URLS && window.URLS.loginPage) || '/login/';
      } catch (err) {
        (window.showToast || (()=>{}))('Logout error', '', 'error', 2000);
      }
    });
  });
})();

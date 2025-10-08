(function(){
  const el = () => ({
    root: document.getElementById('custom-toast'),
    title: document.getElementById('custom-toast-title'),
    msg: document.getElementById('custom-toast-message'),
    icon: document.getElementById('toast-icon-container'),
  });

  function iconFor(type){
    if(type === 'success') return '✅';
    if(type === 'error') return '❌';
    return 'ℹ️';
  }

  window.showToast = function(title, message = '', type = 'info', duration = 2500){
    const {root, title: t, msg, icon} = el();
    if(!root) return;

    t.textContent = title || '';
    msg.textContent = message || '';
    icon.textContent = iconFor(type);

    root.classList.remove('pointer-events-none','opacity-0','translate-y-10');
    root.classList.add('opacity-100','translate-y-0');
    root.style.borderColor = type === 'success' ? '#22c55e' : (type === 'error' ? '#ef4444' : '#e5e7eb');

    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => { window.hideCustomToast(); }, duration);
  };

  window.hideCustomToast = function(){
    const {root} = el();
    if(!root) return;
    root.classList.add('opacity-0','translate-y-10');
    root.classList.remove('opacity-100','translate-y-0');
    setTimeout(() => root.classList.add('pointer-events-none'), 250);
  };
})();
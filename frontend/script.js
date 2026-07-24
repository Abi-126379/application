const API_BASE = '/api/users';

// ---- Tab switching ----
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = {
  register: document.getElementById('registerForm'),
  login: document.getElementById('loginForm'),
};

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    Object.values(panels).forEach((p) => p.classList.remove('active'));
    panels[btn.dataset.tab].classList.add('active');
  });
});

function setError(fieldId, message) {
  const el = document.querySelector(`.error[data-for="${fieldId}"]`);
  if (el) el.textContent = message || '';
}

function clearErrors(form) {
  form.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
}

function showMessage(el, text, type) {
  el.textContent = text;
  el.className = 'form-message ' + (type || '');
}

// ---- Register ----
const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors(registerForm);
  showMessage(registerMessage, '', '');

  const data = {
    name: registerForm.name.value.trim(),
    mobile_no: registerForm.mobile_no.value.trim(),
    email: registerForm.email.value.trim(),
    address: registerForm.address.value.trim(),
    password: registerForm.password.value,
  };

  let hasError = false;
  if (!data.name) { setError('reg-name', 'Name is required.'); hasError = true; }
  if (!/^[0-9]{10}$/.test(data.mobile_no)) { setError('reg-mobile', 'Enter a 10-digit mobile number.'); hasError = true; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { setError('reg-email', 'Enter a valid email.'); hasError = true; }
  if (!data.address) { setError('reg-address', 'Address is required.'); hasError = true; }
  if (data.password.length < 6) { setError('reg-password', 'At least 6 characters.'); hasError = true; }
  if (hasError) return;

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      showMessage(registerMessage, result.error || 'Registration failed.', 'error');
      return;
    }

    showMessage(registerMessage, 'Account created. You can log in now.', 'success');
    registerForm.reset();
  } catch (err) {
    showMessage(registerMessage, 'Could not reach the server. Is the backend running?', 'error');
  }
});

// ---- Login ----
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors(loginForm);
  showMessage(loginMessage, '', '');

  const data = {
    email: loginForm.email.value.trim(),
    password: loginForm.password.value,
  };

  if (!data.email) { setError('login-email', 'Email is required.'); return; }
  if (!data.password) { setError('login-password', 'Password is required.'); return; }

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      showMessage(loginMessage, result.error || 'Login failed.', 'error');
      return;
    }

    showMessage(loginMessage, `Welcome, ${result.user.name}.`, 'success');
  } catch (err) {
    showMessage(loginMessage, 'Could not reach the server. Is the backend running?', 'error');
  }
});

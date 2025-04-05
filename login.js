const API_URL = 'http://localhost:5000/api/auth';

// Switch between Login and Signup forms
function showForm(formType) {
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });

    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const selectedForm = document.getElementById(formType + 'Form');
    const selectedBtn = document.querySelector(`.toggle-btn[data-form="${formType}"]`);

    if (selectedForm && selectedBtn) {
        selectedForm.classList.add('active');
        selectedBtn.classList.add('active');
    } else {
        console.error('Form or Button not found for:', formType);
    }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        localStorage.setItem('token', data.token);
        window.location.href = '../Landingpage/landingpage.html';
    } catch (error) {
        showError(this, error.message);
    }
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const termsCheckbox = document.getElementById('termsCheckbox');
    if (!termsCheckbox.checked) {
        showError(this, 'Please accept the Terms & Conditions');
        return;
    }

    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }

        localStorage.setItem('token', data.token);
        window.location.href = '../Landingpage/landingpage.html';
    } catch (error) {
        showError(this, error.message);
    }
});

// Handle Google Sign In (stub)
document.querySelectorAll('.google-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Google Sign In will be implemented soon!');
    });
});

// Show error message
function showError(form, message) {
    let errorDiv = form.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        form.insertBefore(errorDiv, form.firstChild);
    }
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4757';
    errorDiv.style.marginBottom = '15px';
    errorDiv.style.fontSize = '0.9em';
}

// Shake animation (optional)
const style = document.createElement('style');
style.textContent = `
.auth-form { display: none; }
.auth-form.active { display: block; }

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
}`;
document.head.appendChild(style);

// Hide error when checkbox is checked
document.getElementById('termsCheckbox')?.addEventListener('change', function () {
    const errorMsg = document.querySelector('.terms-error');
    if (errorMsg) {
        errorMsg.style.display = this.checked ? 'none' : 'block';
    }
});
document.addEventListener('DOMContentLoaded', () => {
  const forms = {
    checking: document.getElementById('checking-form'),
    debit: document.getElementById('debit-form'),
  };
  const images = {
    checking: document.getElementById('check-image'),
    debit: document.getElementById('debit-image'),
  };

  const togglePaymentType = (e) => {
    const type = e.target.value;
    const otherType = type === 'checking' ? 'debit' : 'checking';
    forms[type].style.display = 'block';
    forms[otherType].style.display = 'none';
    images[type].style.display = 'block';
    images[otherType].style.display = 'none';

    document.querySelectorAll(`#${type}-form input`).forEach(input => input.setAttribute('required', 'true'));
    document.querySelectorAll(`#${otherType}-form input`).forEach(input => input.removeAttribute('required'));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const ul = document.createElement('ul');
    for (const key in data) {
      const li = document.createElement('li');
      li.textContent = `${key}: ${data[key]}`;
      ul.appendChild(li);
    }
    document.getElementById('confirmation').appendChild(ul);
    e.target.reset();
  };

  const validateField = (field, condition, message) => {
    if (!condition) {
      field.setCustomValidity(message);
    } else {
      field.setCustomValidity('');
    }
  };

  const validateRouting = (e) => {
    validateField(e.target, e.target.value.length <= 9, 'Routing number must be less than 9 digits');
  };

  const validateCVV = (e) => {
    validateField(e.target, e.target.value.length === 3, 'CVV must be 3 digits');
  };

  const validatePassword = (e) => {
    const account = document.getElementById('account').value;
    validateField(e.target, e.target.value === account, 'Account Numbers must match');
  };

  // Initial toggle to 'checking'
  togglePaymentType({ target: { value: 'checking' } });

  // Event listeners
  document.getElementById('payment-form').addEventListener('submit', handleFormSubmit);
  document.getElementById('checking').addEventListener('change', togglePaymentType);
  document.getElementById('debit').addEventListener('change', togglePaymentType);
  document.getElementById('routing').addEventListener('input', validateRouting);
  document.getElementById('cvv').addEventListener('input', validateCVV);
  document.getElementById('confirm').addEventListener('input', validatePassword);
});
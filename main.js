document.addEventListener('DOMContentLoaded', () => {
  // Payment Form Sections
  const forms = {
    checking: document.getElementById('checking-form'),
    debit: document.getElementById('debit-form'),
  };
  const images = {
    checking: document.getElementById('check-image'),
    debit: document.getElementById('debit-image'),
  };

  // Toggles the State from checking to debit card, depending on the value of the radio button
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

  // Form Submission
    // Payment Confirmation Message
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
    const p = document.createElement('p');
    p.textContent = 'Thank you for your payment!';
    document.getElementById('confirmation').appendChild(p);
    document.getElementById('confirmation').appendChild(ul);
    e.target.reset();
  };

  // Form Validation Generic Function
  const validateField = (field, condition, message) => {
    if (!condition) {
      field.setCustomValidity(message);
    } else {
      field.setCustomValidity('');
    }
  };

  // Form Validation Functions
  const validateRouting = (e) => {
    validateField(e.target, e.target.value.length <= 9, 'Routing number must be less than 9 digits');
  };

  const validateCVV = (e) => {
    validateField(e.target, e.target.value.length === 3, 'CVV must be 3 digits');
  };

  const validateAccount = (e) => {
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
  document.getElementById('confirm').addEventListener('input', validateAccount);
});
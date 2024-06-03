const formEl = document.querySelector('.feedback-form');
const labelElems = document.querySelectorAll('label');
labelElems.forEach(el => {
  el.classList.add('form-label');
});

const inputElem = document.querySelector('input');
inputElem.classList.add('form-input');

const textElem = document.querySelector('textarea');
textElem.classList.add('form-textarea');
const btnElem = document.querySelector('button');
btnElem.classList.add('form-btn');
function SaveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}
function loadFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch (err) {
    return json;
  }
}

const formData = {
  email: '',
  message: '',
};

formEl.addEventListener('input', e => {
  formData.email = formEl.elements.email.value;
  formData.message = formEl.elements.message.value;
  console.log(formData);
  SaveToLS('feedback-form-state', formData);
});

window.addEventListener('DOMContentLoaded', e => {
  const data = loadFromLS('feedback-form-state');

  formEl.elements.email.value = data?.email || '';
  formEl.elements.message.value = data?.message || '';
});

formEl.addEventListener('submit', e => {
  e.preventDefault();
  formData.email = formEl.elements.email.value;
  formData.message = formEl.elements.message.value;
  if (formData.email === '' || formData.message === '')
    window.confirm('Fill please all fields');
  console.log(formData);
  formEl.reset();
  localStorage.removeItem('feedback-form-state');
});

inputElem.addEventListener('focus', e => {
  inputElem.setAttribute('placeholder', 'Type area');
});
inputElem.addEventListener('blur', e => {
  inputElem.removeAttribute('placeholder');
});

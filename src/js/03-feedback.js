import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const feedbackFormData = {};

const refs = {
  form: document.querySelector('form'),
  textarea: document.querySelector('textarea'),
  input: document.querySelector('input'),
};

refs.form.addEventListener('submit', onInputSubmit);
refs.form.addEventListener(
  'input',
  throttle(event => {
    feedbackFormData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
  }, 500)
);

populateTextarea();

function onInputSubmit(evt) {
  evt.preventDefault();
  console.log(feedbackFormData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parseMessage = JSON.parse(savedMessage);

  if (savedMessage) {
    refs.textarea.value = parseMessage.message;
    refs.input.value = parseMessage.email;
  }
}

import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const feedbackFormData = {
  message: '',
  email: '',
};

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

function populateTextarea() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    if (savedData.message !== undefined) {
      refs.textarea.value = savedData.message;
      feedbackFormData.message = savedData.message;
    }
    if (savedData.email !== undefined) {
      refs.input.value = savedData.email;
      feedbackFormData.email = savedData.email;
    }
  }
}

function onInputSubmit(evt) {
  evt.preventDefault();
  console.log(feedbackFormData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  feedbackFormData.message = '';
  feedbackFormData.email = '';
}

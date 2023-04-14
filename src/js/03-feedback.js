import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (savedState) {
  emailInput.value = savedState.email;
  messageInput.value = savedState.message;
}

const saveFormState = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}, 500);

feedbackForm.addEventListener('input', saveFormState);

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(state);
  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
});

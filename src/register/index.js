(function (window, document) {
  const form = document.forms.namedItem('register');

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(form);

    try {
      // Create a new account
      const createAccountResponse = await fetch('/api/accounts', {
        method: 'POST',
        body: JSON.stringify({
          account: {
            email: formData.get('email'),
            login_name: formData.get('username'),
            role: 'mentee',
          },
          password: formData.get('password'),
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const accountData = await createAccountResponse.json();
      const createdUser = accountData.user;

      const loginFormData = new FormData();
      loginFormData.append('username', formData.get('username'));
      loginFormData.append('password', formData.get('password'));

      // Log in using the created account
      const loginResponse = await fetch('/api/weblogin', {
        method: 'POST',
        body: loginFormData,
        credentials: 'include',
      });

      if (!loginResponse.ok) {
        window.location.replace('/login/');
      }

      // Update the user by adding the display name
      const updateUserResponse = await fetch(`/api/users/${createdUser.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          account_id: createdUser.account_id,
          display_name: formData.get('display-name'),
          id: createdUser.id,
          role: createdUser.role,
        }),
        credentials: 'include',
      });

      // Redirect to root
      if (updateUserResponse.ok) {
        sessionStorage.setItem('fromAuth', 'true');
        window.location.replace('/');
      }
    } catch (error) {
      console.log(error.message);
      window.location.replace('/login/');
    }
  });
})(window, document);

let passwordConfirmationHasBeenAccessed = false;

const isUsernameFree = async username => {
  const response = await fetch('/api/search?login_name=' + username, {
    method: 'HEAD',
  });
  if (response.status === 200) {
    // Response 200 OK: username exists
    return false;
  } else if (response.status === 204) {
    // Response 204 No Content: username doesn't exist
    return true;
  } else {
    throw Error;
  }
};

const changeVisibility = (id, visibility) =>
  (document.getElementById(id).style.display = visibility);

const toggleInput = (input, show) => {
  const inputField = document.getElementById(input);
  inputField.type = show ? 'text' : 'password';
  // Hide the current toggle and show the opposite
  changeVisibility(`${show ? 'show' : 'hide'}-${input}`, 'none');
  changeVisibility(`${!show ? 'show' : 'hide'}-${input}`, 'unset');
};

document.getElementById('show-password').onclick = () =>
  toggleInput('password', true);

document.getElementById('hide-password').onclick = () =>
  toggleInput('password', false);

document.getElementById('show-password-confirmation').onclick = () =>
  toggleInput('password-confirmation', true);

document.getElementById('hide-password-confirmation').onclick = () =>
  toggleInput('password-confirmation', false);

const getInputValue = id => document.getElementById(id).value;

const getErrorMessage = id =>
  document.getElementById(`${id}-field`).querySelector('.error-message');

const hideAllUsernameErrors = () =>
  getErrorMessage('username')
    .querySelectorAll('span')
    .forEach(message => (message.style.display = 'none'));

const changeUsernameError = id => {
  hideAllUsernameErrors();
  document.getElementById(id).style.display = 'flex';
};

const checkForError = async inputs => {
  for (const input of inputs) {
    if (!input.checkValidity()) return true; // Input value is invalid
    if (input.id === 'username') {
      try {
        const usernameIsFree = await isUsernameFree(input.value);
        if (!usernameIsFree) return true; // Username is taken
      } catch (error) {
        return true; // Username validation failed
      }
    }
    if (input.id === 'password-confirmation') {
      if (input.value !== getInputValue('password')) {
        return true; // Passwords don't match
      }
    }
  }
};

const checkForm = async () => {
  const inputs = document.querySelectorAll('input');
  const formError = await checkForError(inputs);
  // Disable submit button if an error is found
  document.getElementById('submit').disabled = formError;
};

const displayError = input => {
  document.getElementById('submit').disabled = true;
  input.classList.remove('input-checkmark');
  input.classList.add('error-border');
  document.querySelector(`label[for=${input.id}]`).classList.add('error-color');
  getErrorMessage(input.id).style.display = 'flex';
};

const removeError = input => {
  input.classList.remove('error-border');
  document
    .querySelector(`label[for=${input.id}]`)
    .classList.remove('error-color');
  getErrorMessage(input.id).style.display = 'none';
  checkForm();
};

const validatePasswordConfirmation = () => {
  passwordConfirmationHasBeenAccessed = true;

  const password = document.getElementById('password');
  const confirmation = document.getElementById('password-confirmation');
  if (password.value === confirmation.value) {
    // Passwords match
    removeError(confirmation);
    if (confirmation.value.length >= 8)
      confirmation.classList.add('input-checkmark');
  } else {
    // Passwords don't match
    displayError(confirmation);
  }
};

const validateInput = input => {
  if (input.checkValidity()) {
    // Input value is valid
    removeError(input);
    if (input.id !== 'email' || input.value)
      // Empty email gets no checkmark
      input.classList.add('input-checkmark');
  } else {
    // Input value is invalid
    displayError(input);
  }
};

// This function is used in the register/index.html file. The probelm will disappear when we rewrite this in React.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkInput = async id => {
  const input = document.getElementById(id);
  if (input.id === 'username') {
    if (!input.checkValidity()) {
      // Username is too short
      changeUsernameError('too-short-message');
      displayError(input);
    } else {
      // Username is long enough
      try {
        const usernameIsFree = await isUsernameFree(input.value);
        if (usernameIsFree) {
          hideAllUsernameErrors();
          removeError(input);
          input.classList.add('input-checkmark');
        } else {
          // Username is taken
          changeUsernameError('taken-message');
          displayError(input);
        }
      } catch (error) {
        // Username validation failed
        changeUsernameError('try-again-message');
        displayError(input);
      }
    }
  } else {
    if (input.id === 'password-confirmation') validatePasswordConfirmation();
    else validateInput(input);

    if (input.id === 'password' && passwordConfirmationHasBeenAccessed)
      validatePasswordConfirmation();
  }
};

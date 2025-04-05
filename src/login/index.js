(function (window, document) {
  const form = document.forms.namedItem('login');

  form.addEventListener(
    'submit',
    function (event) {
      event.preventDefault();

      fetch('/api/weblogin', {
        method: 'POST',
        body: new FormData(form),
        credentials: 'include',
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          const loginError = document.getElementById('login-error');
          loginError.style.display = 'flex';
          form.reset();
          form.elements[0].focus();
          throw new TypeError("Couldn't log in.");
        })
        .then(function () {
          sessionStorage.setItem('fromAuth', 'true');
          window.location.href = '/';
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
    false,
  );

  const showMfaButton = document.getElementById('show-mfa');
  const hideMfaButton = document.getElementById('hide-mfa');
  const toggleFields = document.querySelectorAll('.mfaField');

  showMfaButton.addEventListener('click', event => {
    event.preventDefault();
    toggleFields.forEach(field => {
      field.style.display = 'block'; // Show the field
      showMfaButton.style.display = 'none';
      hideMfaButton.style.display = 'block';
    });

    hideMfaButton.addEventListener('click', event => {
      event.preventDefault();
      toggleFields.forEach(field => {
        field.style.display = 'none'; // Hide the field
        hideMfaButton.style.display = 'none';
        showMfaButton.style.display = 'block';
      });
    });
  });
})(window, document);

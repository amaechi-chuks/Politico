const baseUrl = 'https://politico-software.herokuapp.com/index.html/api/v1';
const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');


/**
 * Assigns an event-listener to signupForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
const authLogin = () => {
  fetch(`${baseUrl}/parties`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      authorization: localStorage.token,
    },
  }).then(res => res.json()).then((data) => {
    if (data.status !== 200 || data.status !== 201) window.location.replace('user-profile.html');
    if (data.status === 200 || data.status === 201) {
      if (sessionStorage.getItem('parties') === null || sessionStorage.getItem('parties') !== data) {
        const parties = [];
        parties.push(data);
        sessionStorage.setItem('parties', JSON.stringify(parties));
      } else {
        const parties = JSON.parse(sessionStorage.getItem('parties'));
        parties.push(data);
        sessionStorage.setItem('parties', JSON.stringify(parties));
      }
      window.location.replace('admin-profile.html');
    }
  }).catch((error) => {
    document.querySelector('#error')
      .innerHTML = `<h2>server error<h2/>
        <h3>${error}<h3/>`;
  });
};

/**
 * Assigns an event-listener to signupForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstname = document.querySelector('#first-name').value;
    const lastname = document.querySelector('#last-name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const othername = document.querySelector('#other-name').value;
    const phonenumber = document.querySelector('#phonenumber').value;
    const inputValue = {
      firstname, lastname, email, password, othername, phonenumber,
    };
    fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputValue),
    }).then(res => res.json())
      .then((data) => {
        if (data.status === 201) {
          window.localStorage.token = data.token;
          document.querySelector('#signup-form')
            .innerHTML = `<h2>Signup successful<h2/>
          <h3>Welcome<h3/> <p>${data.user.firstname}<p/>`;
          setTimeout(() => {
            window.location.replace('user-profile.html');
          }, 5000);
        } else {
          let output = '<h3>Error<h3/>';
          Object.keys(data).forEach((key) => {
            output += `<p>${data[key]}<p/>`;
          });
          document.querySelector('#signup-form')
            .innerHTML = output;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error<h2/>
          <h3>${error}<h3/>`;
      });
  });
}

/**
 * Assigns an event-listener to loginForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json())
      .then((data) => {
        if (data.status === 200 || data.status === 201) {
          window.localStorage.token = data.token;
          document.querySelector('#login-form')
            .innerHTML = `<h2>Login Successful<h2/>
          <h3>Welcome<h3/> <p>${data.user.firstname}<p/>`;
          setTimeout(() => {
            authLogin();
          }, 5000);
        } else {
          document.querySelector('#login-form')
            .innerHTML = `<h2>${data.errors.form}<h2/>
          <h3>Please check your login details<h3/>`;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error<h2/>
            <h3>${error}<h3/>`;
      });
  });
}

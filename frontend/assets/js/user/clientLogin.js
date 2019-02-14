const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:60008/api/v1';
const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');


/**
 * Assigns an event-listener to signupForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
const authLogin = () => {
  if (window.localStorage.admin === 'true') {
    window.location.replace('admin-profile.html');
  } else {
    window.location.replace('user-profile.html');
  }
};

/**
 * Assigns an event-listener to signupForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.querySelector('#first-name').value;
    const lastName = document.querySelector('#last-name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const otherName = document.querySelector('#other-name').value;
    const phoneNumber = document.querySelector('#phonenumber').value;
    const inputValue = {
      firstName, lastName, email, password, otherName, phoneNumber,
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
          const { user } = data.data[0];
          document.querySelector('#signup-form')
            .innerHTML = `<h2>Signup successful<h2/>
          <h3>Welcome<h3/> <p>${user.firstname}<p/> ${user.lastname}`;
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
        if (data.status === 200) {
          window.localStorage.token = data.data[0].token;
          window.localStorage.admin = data.data[0].user.isadmin;
          window.localStorage.user = data.data[0].user.id;
          document.querySelector('#login-form')
            .innerHTML = `
            <h2 class='welcome-success'>Login Successful<h2/>
          <h3  class='welcome-success'>Welcome ${data.data[0].user.firstname}!<h3/> `;
          setTimeout(() => {
            authLogin();
          }, 5000);
        } else {
          document.querySelector('#login-form')
            .innerHTML = `<h2  class='welcome-success'>${data.error}<h2/>
          <h3  class='welcome-success'>Please check your login details<h3/>`;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2  class='welcome-success'> Sorry, something went wrong with the server error<h2/>
            <h3  class='welcome-success'>${error}<h3/>`;
      });
  });
}

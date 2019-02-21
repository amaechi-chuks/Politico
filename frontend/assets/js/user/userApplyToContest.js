const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:60008/api/v1';
const applyForm = document.querySelector('#apply-form');

const token = localStorage.getItem('token');
const id = Number(localStorage.getItem('user'));
/**
 * Assigns an event-listener to loginForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (applyForm) {
  applyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const office = Number(document.querySelector('#office').value);
    const party = Number(document.querySelector('#party').value);
    fetch(`${baseUrl}/interest/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ office, party }),
    }).then(res => res.json())
      .then((data) => {
        if (data.status === 201) {
          document.querySelector('#apply-form')
            .innerHTML = `
            <h2 class='welcome-success'>Thanks for Showing Interest<h2/>
          <h3  class='welcome-success'>You are running for ${data.data[0].office}!<h3/> `;
          setTimeout(() => {
            window.location.replace('user-profile.html');
          }, 5000);
        } else {
          document.querySelector('#apply-form')
            .innerHTML = `<h2  class='welcome-success'>${data.error}<h2/>
          <h3  class='welcome-success'>You cannot run for another office<h3/>`;
          setTimeout(() => {
            window.location.replace('user-profile.html');
          }, 5000);
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2  class='welcome-success'> Sorry, something went wrong with the server error<h2/>
            <h3  class='welcome-success'>${error}<h3/>`;
        setTimeout(() => {
          window.location.replace('user-profile.html');
        }, 5000);
      });
  });
}

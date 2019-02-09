const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
const token = localStorage.getItem('token');


function adminCreateOffice(e) {
  e.preventDefault();
  const type = document.getElementById('issue-type').value;
  const name = document.getElementById('issue-name').value;
  const formBody = document.getElementById('admin-create-office');

  fetch(`${baseUrl}/offices`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify(
      {
        type,
        name,
      },
    ),
  })
    .then(res => res.json())
    .then((response) => {
      const { data, error } = response;
      if (data) {
        formBody.innerHTML = `<h2>Office created successfully<h2/>
        <h3>Office Name: <h3/><br <p>${data[0].name}<p/> <br> <p>Office type ${data[0].type}<p/> <br> `;
        setTimeout(() => {
          window.location.replace('admin-profile-page.html');
        }, 5000);
      }
      else {
        formBody.innerHTML = `<h2  class='welcome-success'>${error}<h2/>
        <h3  class='welcome-success'>office type sample: federal, state legislative or local government
        Please try again!<h3/>`;
        setTimeout(() => {
          window.location.replace('admin-create-office.html');
        }, 5000);
      }
    })
    .catch((error) => {
      document.querySelector('#error')
        .innerHTML = `<h2>Sorry, something went wrong with the server error<h2/>
          <h3>${error}<h3/>`;
    });
}
document.getElementById('admin-create-office').addEventListener('submit', adminCreateOffice);

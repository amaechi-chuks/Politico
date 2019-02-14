// const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
const baseUrl = 'http://localhost:60008/api/v1';
const token = localStorage.getItem('token');

const adminCreateParty = (e) => {
  e.preventDefault();
  const name = document.getElementById('issue-type').value;
  const logoUrl = document.getElementById('logoUrl').value;
  const hqAddress = document.getElementById('HeadQuarter').value;
  const formBody = document.getElementById('admin-create-party');

  fetch(`${baseUrl}/parties`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify(
      {
        name,
        logoUrl,
        hqAddress,
      },
    ),
  })
    .then(res => res.json())
    .then((response) => {
      const { data, error } = response;
      if (data) {
        formBody.innerHTML = `<h2>Party created successfully<h2/>
        <h3>Party Name<h3/><br /> <p>${data[0].name}<p/> <p>Party hqAddress<br /> ${data[0].hqAddress}<p/> <br> <p>Party Logo <br /><img src="${data[0].logoUrl}"<p/> <br>`;
        setTimeout(() => {
          window.location.replace('view-all-party.html');
        }, 5000);
      } else {
        formBody.innerHTML = `<h2  class='welcome-success'>${error}<h2/>
        <h3  class='welcome-success'>Please try again<h3/>`;
        setTimeout(() => {
          window.location.replace('admin-create-party.html');
        }, 5000);
      }
    }).catch((error) => {
      document.querySelectorAll('#error')
        .innerHTML = `<h2>Sorry, something went wrong eith the server error<h2/>
          <h3>${error}<h3/>`;
    });
};
document.getElementById('admin-create-party').addEventListener('submit', adminCreateParty);

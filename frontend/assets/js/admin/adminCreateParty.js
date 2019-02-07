// const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
const baseUrl = 'http://localhost:60008/api/v1';
const token = localStorage.getItem('token');

function adminCreateParty(e) {
  e.preventDefault();
  const name = document.getElementById('issue-type').value;
  const logoUrl = document.getElementsByClassName('hello').value || 'myParty.png';
  const hqAddress = document.getElementById('HeadQuarter').value;

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
      const { data } = response;
      if (data) {
        document.getElementById('admin-create-party').innerHTML = `<h2>Party created successfully<h2/>
        <h3>Party Name:<h3/><br /> <p>${data[0].name}<p/> <p>Party hqAddress:<br /> ${data[0].hqAddress}<p/> <br> <p>Party Logo: <br /><img src="${data[0].logoUrl}"<p/> <br>`;
        setTimeout(() => {
          window.location.replace('admin-profile.html');
        }, 1000);
      } else {
        document.querySelector('#admin-create-party')
          .innerHTML = `<h2  class='welcome-success'>${data.error}<h2/>
        <h3  class='welcome-success'>Please try agin<h3/>`;
      }
    }).catch((error) => {
      document.querySelectorAll('#error')
        .innerHTML = `<h2>Sorry, something went wrong eith the server error<h2/>
          <h3>${error}<h3/>`;
    });
}
document.getElementById('admin-create-party').addEventListener('submit', adminCreateParty);

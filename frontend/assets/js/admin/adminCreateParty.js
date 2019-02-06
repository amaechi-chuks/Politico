const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
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
      console.log(response);
      const { error, data } = response;
      if (data) {
        document.getElementById('admin-create-party').innerHTML = `<h2>Party created successfully<h2/>
        <h3>Party Name <h3/> <p>${data[0].name}<p/> <br> <p>Party Address ${data[0].hqAddress}<p/> <br> <p>Party Logo ${data[0].logoUrl}<p/> <br>`;
        setTimeout(() => {
          window.location.replace('admin-create-party.html');
        }, 10000);
      }
    })
    .catch(error => console.log(error));
}
document.getElementById('admin-create-party').addEventListener('submit', adminCreateParty);

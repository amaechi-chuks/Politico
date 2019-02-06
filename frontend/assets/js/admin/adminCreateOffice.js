const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
const token = localStorage.getItem('token');


function adminCreateOffice(e) {
  e.preventDefault();
  const type = document.getElementById('issue-type').value;
  const name = document.getElementById('issue-name').value;

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
      const { error, data } = response;
      if (data) {
        document.getElementById('admin-create-office').innerHTML = `<h2>Office created successfully<h2/>
        <h3>Office Name <h3/> <p>${data[0].name}<p/> <br> <p>Office type ${data[0].type}<p/> <br> `;
        setTimeout(() => {
          window.location.replace('admin-create-office.html');
        }, 10000);
      }
    })
    .catch(error => console.log(error));
}
document.getElementById('admin-create-office').addEventListener('submit', adminCreateOffice);

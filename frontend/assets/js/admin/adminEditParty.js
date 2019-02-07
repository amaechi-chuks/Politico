// const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
const baseUrl = 'http://localhost:60008/api/v1';
const token = localStorage.getItem('token');
const editParty = document.querySelector('#edit-party');

let id = localStorage.getItem('idKey');

function editPartyName(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  id = Number(id);
  fetch(`${baseUrl}/parties/${id}/name`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: token,
    },

    body: JSON.stringify(
      {
        name,
      },
    ),
  })
    .then(res => res.json())
    .then((response) => {
      const { data } = response;
      if (data) {
        document.getElementById('edit-party').innerHTML = `<h2>Party updated successfully<h2/>
            <h3>Party Name: <h3/><br <p>${data[0].name}</p> `;
        setTimeout(() => {
          window.location.replace('admin-profile.html');
        }, 1000);
      } else {
        let output = '<h3>Error<h3/>';
        Object.keys(data).forEach((key) => {
          output += `<p>${data[key]}<p/>`;
        });
        document.querySelector('#edit-party')
          .innerHTML = output;
      }
    })
    .catch((error) => {
      document.querySelector('#error')
        .innerHTML = `<h2>Sorry, something went wrong with the server error<h2/>
              <h3>${error}<h3/>`;
    });
}
document.getElementById('edit-party').addEventListener('submit', editPartyName);

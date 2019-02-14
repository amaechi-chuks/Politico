// const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
const baseUrl = 'http://localhost:60008/api/v1';
const token = localStorage.getItem('token');
const editParty = document.querySelector('#edit-party');

let id = localStorage.getItem('idKey');

const editPartyName = (e) => {
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
      const { data, error } = response;
      if (data) {
        document.getElementById('edit-party').innerHTML = `<h2>Party updated successfully<h2/>
            <h3>Party Name: <h3/><br <p>${data.name}</p> `;
        setTimeout(() => {
          window.location.replace('admin-profile.html');
        }, 5000);
      } else {
        document.querySelector('#edit-party')
          .innerHTML = `<h2> ${error}</h2><h3>Please try again!!</h3>`;
      }
      setTimeout(() => {
        window.location.replace('admin-editParty.html');
      }, 5000);
    })
    .catch((error) => {
      document.querySelector('#error')
        .innerHTML = `<h2>Sorry, something went wrong with the server error<h2/>
              <h3>${error}<h3/>`;
    });
};
document.getElementById('edit-party').addEventListener('submit', editPartyName);

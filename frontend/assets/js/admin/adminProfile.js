// const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
const baseUrl = 'http://localhost:60008/api/v1';
let title;
let id;
/**
 * @description Admin Get all political parties
 */
const token = localStorage.getItem('token');

fetch(`${baseUrl}/parties`, {
  method: 'GET',
  mode: 'cors',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-type': 'application/json',
    authorization: token,
  },
})
  .then(res => res.json())
  .then((response) => {
    const { data } = response;
    let parties = '';
    data.forEach((party) => {
      // eslint-disable-next-line prefer-destructuring
      id = party.id;
      parties += `<tr>
      <td>${party.id}</td>
      <td>${party.name}</td>
      <td>${party.hqaddress}</td>
      <td class="col3 first">
          <img class="party-logo" src="./assets/img/PDP-logo.png" alt="APC logo">
      </td>
      <td>16-02-2011</td>
      <td>Amaechi Chuks Ebele</td>
      <td><a href="./admin-editParty.html" class="btn btn-primary" id="${id}">Edit</a></td>
      <td><button class="btn btn-warning delete-report">Delete</button></td>
      </tr>`;
      title = id;
      localStorage.setItem('idKey', title);
      document.getElementById('parties').innerHTML = parties;
    });
  })
  .catch((error) => {
    document.querySelector('#error')
      .innerHTML = `<h2>Sorry, Something went wrong with the server<h2/>
        <h3>${error}<h3/>`;
  });

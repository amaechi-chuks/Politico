const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:60008/api/v1';
const token = localStorage.getItem('token');
let title;
/**
 * @description Admin Get all political parties
 */
fetch(`${baseUrl}/interest/`, {
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
      const id = party.id;
      parties += `<tr>
      <td>${party.id}</td>
      <td>${party.party}</td>
      <td class="col3 first">${party.office}</td>
      <td>${new Date().toLocaleString()}</td>
      <td>${party.status}</td>
      <td><div class="dropdown">
      <button class="dropbtn drop-me">Dropdown</button>
      <div class="dropdown-content">
        <a id="myBtn" href="#">Accept</a>
        <a id="myBtn" href="#">Denial</a>
      </div>
    </div></td>
      </tr>`;
      title = id;
      localStorage.setItem('idKey', title);
      document.getElementById('User').innerHTML = parties;
    });
  })
  .catch((error) => {
    document.querySelector('#error')
      .innerHTML = `<h2>Sorry, Something went wrong with the server<h2/>
        <h3>${error}<h3/>`;
  });

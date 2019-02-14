const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:60008/api/v1';
/*
 * @description Admin Get all political parties
 */
const token = localStorage.getItem('token');
fetch(`${baseUrl}/offices`, {
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
      parties += `
        
      <tr>
          <td>1</td>
          <td>${party.type}</td>
          <td>${party.name}</td>
          <td>67</td>
          <td>16-02-2011</td>
          <td><a href="./admin-edit2.html" class="btn btn-primary">Edit</a></td>
          <td><button class="btn btn-warning delete-report">Delete</button></td>
      </tr>
        `;
      document.getElementById('offices').innerHTML += parties;
    });
  })
  .catch((error) => {
    document.querySelector('#error')
      .innerHTML = `<h2>Sorry, something went wrong with the server error<h2/>
        <h3>${error}<h3/>`;
  });

const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:60008/api/v1';
/**
 * @description Get a particular user
 */
const token = localStorage.getItem('token');
const id = localStorage.getItem('user');
console.log(token);

fetch(`${baseUrl}/auth/user/${id}`, {
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
    document.querySelector('.profile-name').innerHTML = `${data.firstname} ${data.lastname}`;
  })
  .catch((error) => {
    document.querySelector('#error')
      .innerHTML = `<h2> Sorry, Something went wrong with the server </h2>
      <h3> ${error} </h3>`;
  });

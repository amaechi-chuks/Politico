const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:60008/api/v1';
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
      parties += `
            <div class="card2 report-card">
              <div class="section1 clearfix">
                  <div class="col2 last">
                      <div class="grid clearfix">
                          <div class="col4 first">
                                <h3>Party logo:<br /><img  src="${baseUrl}/images/${party.logourl}" style="width:50px;">
                              </h3>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="participant"><strong style="width:20px;">Party name:<br />${party.name} </strong> </div>
              <br />
              <strong>HqAddress: <br />${party.hqaddress} </strong> 
          </div>
        `;
      document.getElementById('parties').innerHTML = parties;
    });
  })
  .catch((error) => {
    document.querySelector('#error')
      .innerHTML = `<h2>Sorry, Something went wrong with the server<h2/>
        <h3>${error}<h3/>`;
  });

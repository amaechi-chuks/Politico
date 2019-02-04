const adminRequest = document.querySelector('#main-body');

/**
 * @description Admin Get all political parties
 */
const getAllRequest = () => {
  const userDetails = JSON.parse(sessionStorage.getItem('parties'));
  const myRequest = document.querySelector('#fetch-parties');
  myRequest.innerHTML = '';
  for (let n = 0; n <= Object.keys(userDetails[0]).length - 3; n += 1) {
    const title = `${userDetails[0][n].title}`;
    const department = `${userDetails[0][n].department}`;
    const details = `${userDetails[0][n].details}`;
    myRequest.innerHTML += `<div class="profile-table">
                      <div class="text-party">
                      <h2>Party Records</h2>
                      </div>
            <table class="stats-table">
            
          <h1 class="admin-request-title">${title}</h1>
          <small class="sub-title">${department}</small>
          <button type="submit" class="resolved">RESOLVED</button>
          <button type="submit" class="approved">Approved</button>
          <button type="submit" class="disapproved">Disapproved</button>
          <h2 class="sub-title">Details</h2>
          <p class="page-info">${details}</p>
        </a>
        </div>
      </div>`;
  }
};

if (adminRequest) {
  adminRequest.addEventListener('load', getAllRequest());
}

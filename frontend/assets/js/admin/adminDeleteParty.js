/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable arrow-parens */
const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:60008/api/v1';
const token = localStorage.getItem('token');

setTimeout(() => {
    const displayDeleteModal = document.querySelectorAll('.modal');
    const deleteModal = document.querySelector('.delete');
    const closeDeleteModal = document.querySelector('.modal-close');
    const confirmDelete = document.getElementById('.delete');


    let id;
    displayDeleteModal.forEach((modal) => {
      modal.addEventListener('click', (e) => {
      id = e.target.attributes.key.value;
      deleteModal.style.display = 'block';
      });
    });

    closeDeleteModal.addEventListener('click', () => {
      deleteModal.style.display = 'none';
    });

      window.onclick = function (event) {
        if (event.target === deleteModal) {
          deleteModal.style.display = 'none';
        }
      };

      confirmDelete.addEventListener('click', () => {
          fetch(`${baseUrl}/parties/${id}`, {
              method: 'DELETE',
              mode: 'cors',
              headers: {
                  Accept: 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  authorization: token,
              },
          })
          .then((res) => res.json())
          .then((data) => {
              redirect('admin-profile.html');
          });
      });
      }, 1000);

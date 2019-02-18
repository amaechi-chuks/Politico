/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable arrow-parens */
const baseUrl1 = 'https://politico-software.herokuapp.com/api/v1';
// const baseUrl1 = 'http://localhost:60008/api/v1';
const token1 = localStorage.getItem('token');
let id = localStorage.getItem('idKey');

    const toggleModal = (evt) => {
        evt.preventDefault();
        const modalToggle = document.querySelector('.modal-toggle');
        const modal = document.querySelector('.modal');
        document.body.classList.toggle('modal-open');
        modalToggle.classList.toggle('modal-open');
        modal.classList.toggle('modal-open');
      };
      
      const deleteReportBtns = Array.from(document.getElementById('.delete-report'));
      deleteReportBtns.forEach(deleteReportBtn => deleteReportBtn.addEventListener('click', (evt) => {
        toggleModal(evt);
      }));
      
      const modalActionBtns = Array.from(document.querySelectorAll('.modal-btn'));
      modalActionBtns.forEach(modalActionBtn => modalActionBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (evt.target.id === 'delete') {
          const modalMessage = document.querySelector('.modal-message');
          modalMessage.textContent = 'Record Deleted Successfully';
          document.querySelector('.modal-group').remove();
        } else {
          toggleModal(evt);
        }
      }));

      modalActionBtns.addEventListener('click', () => {
          fetch(`${baseUrl1}/parties/${id}`, {
              method: 'DELETE',
              mode: 'cors',
              headers: {
                  Accept: 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  authorization: token1,
              },
          })
          .then((res) => res.json())
          .then((response) => {
            const { error, data } = response;
            if (data) {
              window.location.replace('admin-profile.html');
            }
          });
      });

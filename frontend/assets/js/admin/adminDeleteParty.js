/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable arrow-parens */
const baseUrl = 'https://politico-software.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:60008/api/v1';
const token = localStorage.getItem('token');
let id = localStorage.getItem('idKey');
console.log(id);

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

// Event handler for toggling menu of mobile devices
const hamburgerBtn = document.querySelector('.hamburger-menu');
hamburgerBtn.addEventListener('click', function toggleMenu() {
  const menu = document.querySelector('.navbar-menu');
  this.classList.toggle('menu-open');
  menu.classList.toggle('menu-open');
});

// Handle modal toggle events for report deletion
const toggleModal = (evt) => {
  evt.preventDefault();
  const modalToggle = document.querySelector('.modal-toggle');
  const modal = document.querySelector('.modal');
  document.body.classList.toggle('modal-open');
  modalToggle.classList.toggle('modal-open');
  modal.classList.toggle('modal-open');
};

const deleteReportBtns = Array.from(document.querySelectorAll('.delete-report'));
deleteReportBtns.forEach(deleteReportBtn => deleteReportBtn.addEventListener('click', (evt) => {
  toggleModal(evt);
}));

const modalActionBtns = Array.from(document.querySelectorAll('.modal-btn'));
modalActionBtns.forEach(modalActionBtn => modalActionBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.id === 'delete') {
    const modalMessage = document.querySelector('.modal-message');
    modalMessage.textContent = 'Updated Successfully';
    document.querySelector('.modal-group').remove();
  } else {
    toggleModal(evt);
  }
}));

const updateStatusBtns = Array.from(document.querySelectorAll('.update-record'));
if (updateStatusBtns) {
  const toast = document.querySelector('.toast');
  updateStatusBtns.forEach(updateStatusBtn => updateStatusBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    toast.classList.toggle('toast-show');
    setTimeout(() => {
      toast.classList.remove('toast-show');
    }, 3000);
  }));
}

const toastHide = document.querySelector('.toast-hide');
if (toastHide) {
  const toast = document.querySelector('.toast');
  toastHide.addEventListener('click', (evt) => {
    evt.preventDefault();
    toast.classList.toggle('toast-show');
  });
}

const closeModal = document.querySelector('.modal-close');
if (closeModal) {
  closeModal.addEventListener('click', (evt) => {
    toggleModal(evt);
  });
}
function submitModals() {
  const submitBtn = document.querySelector('.update');
  if (submitBtn) {
    submitBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      let message = '';
      if (evt.target.id === 'record') {
        message = 'Record Updated Successfully';
      } else if (evt.target.id === 'profile') {
        message = 'Profile Updated Successfully';
      } else if (evt.target.id === 'voted') {
        message = 'Voted Successfully';
      } else if (evt.target.id === 'records') {
        message = 'Updated Successfully';
      } else if (evt.target.id === 'signup') {
        message = 'Signup Successful, Please Log In to continue';
      } else if (evt.target.id === 'apply') {
        message = 'Application Successful!';
      } else if (evt.target.id === 'reset') {
        message = 'Check your email and follow the link';
      }
      document.querySelector('.message-box').textContent = message;
    });
  }
}

const mediaLinks = document.querySelectorAll('.report-media');
mediaLinks.forEach((mediaLink) => {
  mediaLink.addEventListener('click', (evt) => {
    toggleModal(evt);
  });
});

function submitForm() {
  window.location.href = './user-profile.html';
  return false;
}


function submitFormAdmin() {
  window.location.href = './admin-profile.html';
  return false;
}
// eslint-disable-next-line no-unused-vars
function submitFormAdminProfile() {
  window.location.href = './admin-profile-page.html';
  return false;
}

// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal


// Get the <span> element that closes the modal

const btn = document.getElementById('myBtn')

// When the user clicks on the button, open the modal
btn.onclick = () => {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
const close = document.querySelector('.modal-close');
close.onclick = (evt) => {
  modal.style.display = 'none';
  toggleModal(evt);
};

const cancel = document.getElementById('cancel');
cancel.onclick = (evt) => {
  modal.style.display = 'none';
  toggleModal(evt);
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    toggleModal();
  }
};

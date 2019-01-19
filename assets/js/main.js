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
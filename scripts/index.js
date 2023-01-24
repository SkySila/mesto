const popupElement = document.querySelector('.popup');
const closeElement = popupElement.querySelector('.popup__close-btn');
const profileElement = document.querySelector('.profile')
const editElement = profileElement.querySelector('.profile__edit-btn');
let formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('[name="profileName"]');
let jobInput = formElement.querySelector('[name="profileJob"]');
let nameElement = profileElement.querySelector('.profile__name');
let jobElement = profileElement.querySelector('.profile__job');

function togglePopupWindow () {
  popupElement.classList.toggle('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  togglePopupWindow();
}

/*окрашивание лайков*/
const likeButton = document.querySelectorAll('.place__like');
for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', function () {
    likeButton[i].classList.toggle('place__like_active');
  });
}

/*открытие всплывающего окна*/
editElement.addEventListener ('click', function () {
  togglePopupWindow();
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});

/*закрытие всплывающего окна*/
closeElement.addEventListener('click', function () {
  togglePopupWindow();
});

/*редактирование имени и работы*/ 
formElement.addEventListener('submit', handleFormSubmit);


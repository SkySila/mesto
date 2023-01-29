const popupElement = document.querySelector('.popup');
const closeBtnElement = popupElement.querySelector('.popup__close-btn');
const profileElement = document.querySelector('.profile')
const editBtnElement = profileElement.querySelector('.profile__edit-btn');
const addBtnElement = profileElement.querySelector('.profile__add-btn');
const initialPlaces = [
  {
    name: 'Эль-Капитан',
    link: './images/image-1.jpg',
    alt: 'Деревья и поляна перед горой Эль-Капитан, Калифорния'
  },
  {
    name: 'Усти-над-Лабем',
    link: './images/image-2.jpg',
    alt: 'Яркое солнце на лесом с холмами рядом с городом Усти-над-Лабем, Чехия'
  },
  {
    name: 'Озеро Пейто',
    link: './images/image-3.jpg',
    alt: 'Озеро Пейто, лазурного цвета под горой в лесной местности, Канада'
  },
  {
    name: 'Водопад Фаллох',
    link: './images/image-4.jpg',
    alt: 'Невысокий водопад Фаллох, немного деревьев и небо на фоне, Шотландия'
  },
  {
    name: 'Озеро Брайес',
    link: './images/image-5.jpg',
    alt: 'Вид из окна на озеро Брайес с лодками, Италия'
  },
  {
    name: 'Холмы Нанди',
    link: './images/image-6.jpg',
    alt: 'Прямая мощёная дорога в лесу со ступеньками, холмы Нанди, Индия'
  }
];
const placesElement = document.querySelector('.places');
const templateElement = document.querySelector('#place-template').content.querySelector('.place');
const likeButton = document.querySelectorAll('.place__like');
let formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('[name="profileName"]');
let jobInput = formElement.querySelector('[name="profileJob"]');
let nameElement = profileElement.querySelector('.profile__name');
let jobElement = profileElement.querySelector('.profile__job');

function togglePopupWindow (popupItem) {
  popupItem.classList.toggle('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  togglePopupWindow(popupElement);
}

function addCardsInitial () {
  initialPlaces.forEach((item) => {
    const card = templateElement.cloneNode(true);
    card.querySelector('.place__name').textContent = item.name;
    card.querySelector('.place__image').src = item.link;
    card.querySelector('.place__image').alt = item.alt;
    placesElement.append(card);
  });
}

/*окрашивание лайков*/
placesElement.addEventListener('click', function(event) {
  if(event.target.classList.contains('place__like')) 
    event.target.classList.toggle('place__like_active');
});

addCardsInitial();

/*открытие всплывающего окна*/
editBtnElement.addEventListener ('click', function () {
  togglePopupWindow(popupElement);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});

/*закрытие всплывающего окна*/
closeBtnElement.addEventListener('click', function () {
  togglePopupWindow(popupElement);
});

/*редактирование имени и работы*/ 
formElement.addEventListener('submit', handleFormSubmit);

const popupPlaceElement = document.querySelector('#popupPlace');
addBtnElement.addEventListener('click', function () {
  togglePopupWindow(popupPlaceElement);
});

const closeBtnPlaceElement = popupPlaceElement.querySelector('.popup__close-btn');

closeBtnPlaceElement.addEventListener('click', function() {
  togglePopupWindow(popupPlaceElement);
});




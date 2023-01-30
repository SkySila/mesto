const popupProfile = document.querySelector('.popup');
const profileElement = document.querySelector('.profile')
const editProfileBtn = profileElement.querySelector('.profile__edit-btn');
const closeProfileBtn = popupProfile.querySelector('.popup__close-btn');
const profileForm = popupProfile.querySelector('.popup__form');

const popupPlace = document.querySelector('#popupPlace');
const placesElement = document.querySelector('.places');
const templateElement = document.querySelector('#place-template').content.querySelector('.place');
const closePlaceBtn = popupPlace.querySelector('.popup__close-btn');
const addPlaceBtn = profileElement.querySelector('.profile__add-btn');
const placeForm = popupPlace.querySelector('.popup__form');
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
let profileNameInput = profileForm.querySelector('[name="profileName"]');
let profileJobInput = profileForm.querySelector('[name="profileJob"]');
let profileNameElement = profileElement.querySelector('.profile__name');
let profileJobElement = profileElement.querySelector('.profile__job');

let placeNameInput = placeForm.querySelector('[name ="placeName"]');
let placeImageSrcInput = placeForm.querySelector('[name ="placeImageSrc"]');

function togglePopupWindow (popupItem) {
  popupItem.classList.toggle('popup_opened');
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  togglePopupWindow(popupProfile);
}

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();  
  addNewPlace(placeNameInput.value, placeImageSrcInput.value);
  togglePopupWindow(popupPlace);
}

function addPlacesInitial () {
  initialPlaces.forEach((item) => {
    const newPlace = templateElement.cloneNode(true);
    newPlace.querySelector('.place__name').textContent = item.name;
    newPlace.querySelector('.place__image').src = item.link;
    newPlace.querySelector('.place__image').alt = item.alt;
    placesElement.append(newPlace);
  });
}

function addNewPlace(name, link) {
  const newPlace = templateElement.cloneNode(true);
  newPlace.querySelector('.place__name').textContent = name;
  newPlace.querySelector('.place__image').src = link;
  placesElement.prepend(newPlace);
}

addPlacesInitial();

/*окрашивание лайков и удаление карточек*/
placesElement.addEventListener('click', function(event) {
  if(event.target.classList.contains('place__like')) 
    event.target.classList.toggle('place__like_active');
  else if(event.target.classList.contains('place__delete-btn'))
    event.target.parentElement.remove();
});

/*открытие всплывающего окна редактирования*/
editProfileBtn.addEventListener ('click', function () {
  togglePopupWindow(popupProfile);
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
});

/*закрытие всплывающего окна редактирования*/
closeProfileBtn.addEventListener('click', function () {
  togglePopupWindow(popupProfile);
});

/*сохранение имени и работы*/ 
profileForm.addEventListener('submit', handleProfileFormSubmit);

/*добавление нового места*/
addPlaceBtn.addEventListener('click', function () {
  togglePopupWindow(popupPlace);
});

closePlaceBtn.addEventListener('click', function() {
  togglePopupWindow(popupPlace);
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);





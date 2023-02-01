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
    link: './images/image-1.jpg'
  },
  {
    name: 'Усти-над-Лабем',
    link: './images/image-2.jpg'
  },
  {
    name: 'Озеро Пейто',
    link: './images/image-3.jpg'
  },
  {
    name: 'Водопад Фаллох',
    link: './images/image-4.jpg'
  },
  {
    name: 'Озеро Брайес',
    link: './images/image-5.jpg'
  },
  {
    name: 'Холмы Нанди',
    link: './images/image-6.jpg'
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

function copyPlaceNameAndLink (placeName, placeLink) {
  const newPlaceDeepCopy = templateElement.cloneNode(true);
  newPlaceDeepCopy.querySelector('.place__name').textContent = placeName;
  newPlaceDeepCopy.querySelector('.place__image').src = placeLink;
  return newPlaceDeepCopy;
}

function addInitialPlaces () {
  initialPlaces.forEach((item) => {
    const newPlace = copyPlaceNameAndLink(item.name, item.link);
    placesElement.append(newPlace);
  });
}

function addNewPlace(name, link) {
  const newPlace = copyPlaceNameAndLink(name, link);
  placesElement.prepend(newPlace);
}

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();  
  addNewPlace(placeNameInput.value, placeImageSrcInput.value);
  togglePopupWindow(popupPlace);
}

function openImagePopup(image) {
  console.log(image);
};

addInitialPlaces();

/*окрашивание лайков и удаление карточек*/
placesElement.addEventListener('click', function(event) {
  if(event.target.classList.contains('place__like')) 
    event.target.classList.toggle('place__like_active');
  else if(event.target.classList.contains('place__delete-btn'))
    event.target.parentElement.remove();
  else if (event.target.classList.contains('place__image'))
    openImagePopup(event.target);
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





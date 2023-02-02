const popupProfile = document.querySelector('.popup');
const profileElement = document.querySelector('.profile')
const editProfileBtn = profileElement.querySelector('.profile__edit-btn');
const closeProfileBtn = popupProfile.querySelector('.popup__close-btn');
const profileForm = popupProfile.querySelector('.popup__form');

const popupPlace = document.querySelector('#popupPlace');
const placesElement = document.querySelector('.places');
const cardTemplateElement = document.querySelector('#place-template').content.querySelector('.place');
const closePlaceBtn = popupPlace.querySelector('.popup__close-btn');
const addPlaceBtn = profileElement.querySelector('.profile__add-btn');
const placeForm = popupPlace.querySelector('.popup__form');
const imagePopupTemplateElement = document.querySelector('#image-template').content.querySelector('.popup_type_image');
const pageElement = document.querySelector('.page');
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
  const newPlaceDeepCopy = {place: cardTemplateElement.cloneNode(true), imagePopup: imagePopupTemplateElement.cloneNode(true)};
  newPlaceDeepCopy.place.querySelector('.place__name').textContent = placeName;
  newPlaceDeepCopy.place.querySelector('.place__image').src = placeLink;
  newPlaceDeepCopy.place.querySelector('.place__like').addEventListener('click', function (event) {
    event.target.classList.toggle('place__like_active');
  });
  newPlaceDeepCopy.place.querySelector('.place__delete-btn').addEventListener('click', function (event) {
    event.target.parentElement.remove();
  });

  newPlaceDeepCopy.imagePopup.querySelector('.popup__image').src = placeLink;
  newPlaceDeepCopy.imagePopup.querySelector('.popup__image-name').textContent = placeName;
  newPlaceDeepCopy.place.querySelector('.place__image').addEventListener('click', function () {
    togglePopupWindow(newPlaceDeepCopy.imagePopup);
  });
  newPlaceDeepCopy.imagePopup.querySelector('.popup__close-btn').addEventListener('click', function () {
    togglePopupWindow(newPlaceDeepCopy.imagePopup);
  });

  return newPlaceDeepCopy;
}

function addInitialPlaces () {
  initialPlaces.forEach((item) => {
    const newPlaceAndPopup = copyPlaceNameAndLink(item.name, item.link);
    placesElement.append(newPlaceAndPopup.place);
    pageElement.append(newPlaceAndPopup.imagePopup);
  });
}

function addNewPlace(name, link) {
  const newPlaceAndPopup = copyPlaceNameAndLink(name, link);
  placesElement.prepend(newPlaceAndPopup.place);
  pageElement.append(newPlaceAndPopup.imagePopup);
}

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();  
  addNewPlace(placeNameInput.value, placeImageSrcInput.value);
  togglePopupWindow(popupPlace);
}

addInitialPlaces();

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

/*открытие всплывающего окна для добавления нового места*/
addPlaceBtn.addEventListener('click', function () {
  togglePopupWindow(popupPlace);
});

/*закрытие всплывающего окна для добавления нового места*/
closePlaceBtn.addEventListener('click', function() {
  togglePopupWindow(popupPlace);
});

/*добавление нового места*/
placeForm.addEventListener('submit', handlePlaceFormSubmit);





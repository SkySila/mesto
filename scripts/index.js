const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileElement = document.querySelector('.profile')
const editProfileBtn = profileElement.querySelector('.profile__edit-btn');
const addPlaceBtn = profileElement.querySelector('.profile__add-btn');
const profileForm = profilePopup.querySelector('.popup__form');
const profileNameInput = profileForm.querySelector('[name="profileName"]');
const profileJobInput = profileForm.querySelector('[name="profileJob"]');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileJobElement = profileElement.querySelector('.profile__job');

const placePopup = document.querySelector('.popup_type_add-place');
const placesElement = document.querySelector('.places');
const cardTemplateElement = document.querySelector('#place-template').content.querySelector('.place');
const placeForm = placePopup.querySelector('.popup__form');
const placeNameInput = placeForm.querySelector('[name ="placeName"]');
const placeImageSrcInput = placeForm.querySelector('[name ="placeImageSrc"]');
const imagePopup = document.querySelector('.popup_type_show-image');
const popupCardImage = imagePopup.querySelector('.popup__image');
const popupCardImageName = imagePopup.querySelector('.popup__image-name');
const closeButtons = document.querySelectorAll('.popup__close-btn');
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

function openPopupWindow (popupItem) {
  popupItem.classList.add('popup_opened');
}

function closePopupWindow (popupItem) {
  popupItem.classList.remove('popup_opened');
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closePopupWindow(profilePopup);
}

function copyPlaceNameAndLink (placeName, placeLink) {
  const newPlaceDeepCopy = cardTemplateElement.cloneNode(true);
  const newPlaceImage = newPlaceDeepCopy.querySelector('.place__image');
  
  newPlaceDeepCopy.querySelector('.place__name').textContent = placeName;
  newPlaceImage.alt = placeName;
  newPlaceImage.src = placeLink;

  newPlaceDeepCopy.querySelector('.place__like').addEventListener('click', function (event) {
    event.target.classList.toggle('place__like_active');
  });
  newPlaceDeepCopy.querySelector('.place__delete-btn').addEventListener('click', function (event) {
    event.target.parentElement.remove();
  });
  newPlaceImage.addEventListener('click', function () {
    popupCardImage.src = placeLink;
    popupCardImage.alt = placeName;
    popupCardImageName.textContent = placeName;
    openPopupWindow(imagePopup);
  });

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
  evt.target.reset();
  closePopupWindow(placePopup);
}

addInitialPlaces();

/*открытие всплывающего окна редактирования*/
editProfileBtn.addEventListener ('click', function () {
  openPopupWindow(profilePopup);
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
});

/*сохранение имени и работы*/ 
profileForm.addEventListener('submit', handleProfileFormSubmit);

/*открытие всплывающего окна для добавления нового места*/
addPlaceBtn.addEventListener('click', function () {
  openPopupWindow(placePopup);
});

/*закрытие всплывающих окон*/
closeButtons.forEach(function(button) {
  const closestPopup = button.closest('.popup');
  button.addEventListener('click', function(){
    closePopupWindow(closestPopup);
  });
});

/*добавление нового места*/
placeForm.addEventListener('submit', handlePlaceFormSubmit);





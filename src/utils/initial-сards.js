const firstImage = new URL('../images/laguna-beach.jpg', import.meta.url);
const secondImage = new URL('../images/faroe_s.jpg', import.meta.url);
const thirdImage = new URL('../images/oregon_s.jpg', import.meta.url);
const fourthImage = new URL('../images/switzerland_s.jpg', import.meta.url);
const fifthImage = new URL('../images/st-pitersburg.jpg', import.meta.url);
const sixthImage = new URL('../images/baikal.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Калифорния, США',
    link: firstImage,
  },
  {
    name: 'Фарерские острова',
    link: secondImage,
  },
  {
    name: 'Орегон, США',
    link: thirdImage,
  },
  {
    name: 'Швейцария',
    link: fourthImage,
  },
  {
    name: 'Санкт-Петербург',
    link: fifthImage,
  },
  {
    name: 'Байкал',
    link: sixthImage,
  },
];

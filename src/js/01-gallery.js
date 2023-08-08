// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);
const list = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item"><a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" loading="lazy" data-source="${original}" alt="${description}" title="${description}"/></a></li>`
  )
  .join('');

list.insertAdjacentHTML('beforeend', markup);
list.addEventListener('click', onClick);

function onClick(event) {
  const { target } = event;
  const image =
    target.dataset.source ?? target.closest('.gallery__link').dataset.source;
  const currentItem = galleryItems.find(({ original }) => original === image);
  let gallery = new SimpleLightbox(
    '.gallery a',
    {
      captions: true,
      captionSelector: 'img',
      captionType: 'attr',
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
      enableKeyboard: true,
    }
    // {
    //   handler: null,
    //   onShow(instance) {
    //     this.handler = onPressEsc.bind(instance);
    //     document.addEventListener('keydown', this.handler);
    //   },
    //   onClose() {
    //     document.removeEventListener('keydown', this.handler);
    //   },
    // }
  );

  gallery.on('show.simpleLightbox', function () {});

  event.preventDefault();

  // function onPressEsc(event) {
  //   if (event.code === 'Escape') {
  //     instance.close();
  //   }
  // }
}

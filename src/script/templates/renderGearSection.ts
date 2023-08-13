import { Product } from '../types';

const gearData: (Pick<Product, 'id' | 'image'> & { title: string; subtitle: string })[] = [
  {
    id: 1,
    image: 'images/gear-1.png',
    title: 'Article Title',
    subtitle: 'Article Subhead',
  },
  {
    id: 2,
    image: 'images/gear-2.png',
    title: 'Article Title',
    subtitle: 'Article Subhead',
  },
  {
    id: 3,
    image: 'images/gear-3.png',
    title: 'Article Title',
    subtitle: 'Article Subhead',
  },
  {
    id: 4,
    image: 'images/gear-4.png',
    title: 'Article Title',
    subtitle: 'Article Subhead',
  },
  {
    id: 5,
    image: 'images/gear-5.png',
    title: 'Article Title',
    subtitle: 'Article Subhead',
  },
];

export const renderGearSection = (): string => {
  return `
  ${gearData
    .map(
      (data) => `<li class="product-item">
    <figure class="product-image-frame">
      <img
        loading="lazy"
        class="product-image"
        src=${data.image}
        alt="product"
      />
    </figure>
    <div class="gear-info ${data.id === 1 || data.id === 4 ? 'gear-info-grey' : 'gear-info-dark'}">
      <div class="gear-details">
        <h3 class="text-sub-heading-bold gear-title">${data.title}</h3>
        <h4 class="text-description-base gear-subhead">${data.subtitle}</h4>
      </div>
    </div>
  </li>`
    )
    .join('')}`;
};

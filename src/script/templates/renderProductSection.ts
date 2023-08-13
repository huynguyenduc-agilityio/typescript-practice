import { SectionProductParams } from '../interfaces';

export const renderProductSection = ({
  category,
  titleContent,
  isSeeAll = true,
}: SectionProductParams): string => {
  return `
    <section class="section-layout product-card ${category}">
    <div class="container">
      <header class="product-header">
        <hr class="strikethrough" />
        <div class="product-heading">
          <h3 class="text-sub-heading-bold product-sub-heading">
            ${titleContent}
          </h3>
        </div>
      </header>
      <ul class="product-list">
      </ul>
      ${
        isSeeAll
          ? `<div class="flex-center">
      <a href="/${category}" class="btn btn-main btn-more text-uppercase">
        See All
      </a>
    </div>`
          : ``
      }
    </div>
  </section>
      `;
};

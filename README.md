### Overview

- This document provides requirements and estimation for JavaScript, TypeScript practice.
- Design: [Figma](<https://www.figma.com/file/PVp95OZv2YUMLeQvpqKB0A/Responsive-Music-Store-Template-(Community)?node-id=90%3A6209&mode=dev>)
- Plan: [Plan Practice](https://docs.google.com/document/d/15AXpCve88Mp2k83t3Q8UeLW4lvSisolFT8IT3nArdus/edit?usp=sharing)

### Target

- Understand & apply knowledge HTML/CSS/JavaScript (with ES6 syntax).
- Understanding & apply MVC (or any MV model or module concept) (optional)
- DOM manipulation, form validation.
- Understand how asynchronous code works & apply in practice (API call or any place we can mock API in code).
- Get familiar with DevTools (e.g Google Chrome DevTools) for debugging issues (breakpoint, log, etc..).
- Get familiar with TypeScript language and understand the power of typed language, best practices.
- Deploy to the hosting and improve the performance to increase the PageSpeed score.

### Timeline

- Estimate: 12 days (from July 24th, 2023 to Aug 9th, 2023).

### Technical

- HTML5/CSS3
- JavaScript
- TypeScript
- JSON Server
- Parcel

### Requirements

- Build a shopping website with following pages
  - A landing page that user can see below content:
    - Newest product
      - Show first 3 items
      - Click “See all” to go to Product list
      - Change “0 Colors available” to “0 items available”
    - The most popular products
      - Show first 6 items
      - Click “See all” to go to Product list
      - Change “0 Colors available” to “0 items available”
    - Gear heads (Fixed content)
  - Login/Register page: [design](https://drive.google.com/file/d/11RIhmi5WUCmJcDYBsnhUSsRZorieAgGH/view?usp=sharing)
    - User can register new account by following information
      - Email
      - Password
        - At least 8 character
        - At least 1 uppercase letter
        - At least 1 lowercase letter
        - At least 1 number character
      - Confirm password
    - User can login by following
          - Email
          - Password
  - Product list page
    - Show all products
    - Click on product item will show popup for product details with following
      - Product name
      - Product image
      - Product quantity
      - Product description
      - Button “Add to Cart” to add 1 item to cart
        - If user is not logged in yet, redirect to Login page
      - Close button to close popup
  - Cart page: [design](https://drive.google.com/file/d/1ficMiRnbmJgU5rV8mBznmPilKqK3ZZ3b/view?usp=sharing)
    - Show all selected products
    - User can see the total price of selected products
      - Product number can increase/decrease by 1
    - User can click to Confirm to buy selected products
      - Show popup with message: “Thank you for shopping here!”

### Getting Started

- Step 1: Clone repository.
  - With HTTPS:
    - `$ git clone git@gitlab.asoft-python.com:huy.nguyenduc/typescript-training.git`.
- Step 2: Move to folder which just cloned in your computer.
  - `cd ./typescript-training`.
- Step 3: Checkout to the branch.
  - `$ git checkout feature/practice`.
- Step 5:
  - Install the packages `npm i` or `yarn`.
- Step 6:
  - Run the practice `npm dev` or `yarn dev`.
- Step 7:
  - Create a .env file at your root folder, add a env var API_ENDPOINT with default port for json-server is 3000, it can be use with other port.
    - API_ENDPOINT = `http://localhost:{PORT}`

## Author

- Huy Nguyen.
- Email: [huy.nguyenduc@asnet.com.vn](huy.nguyenduc@asnet.com.vn).
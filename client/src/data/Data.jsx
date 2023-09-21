// Vegan dishes images
import vegan1 from '../assets/vegan1.jpg';
import vegan2 from '../assets/pizza_4.jpg';
import vegan3 from '../assets/vegan3.jpg';
import vegan4 from '../assets/vegan4.jpg';
import vegan5 from '../assets/vegan5.jpg';
import vegan6 from '../assets/vegan6.jpg';
import vegan7 from '../assets/vegan7.jpg';
import vegan8 from '../assets/vegan8.jpg';
import vegan9 from '../assets/vegan9.jpg';
import vegan10 from '../assets/vegan10.jpg';
import vegan11 from '../assets/vegan11.jpg';

// Traditional dishes images
import traditonal_1 from '../assets/eri_1.jpeg';
import traditonal_2 from '../assets/eri_2.jpg';
import traditonal_3 from '../assets/eri_3.jpeg';
import traditonal_4 from '../assets/eri_4.jpg';
import traditonal_5 from '../assets/zilzil_1.jpeg';
import traditonal_6 from '../assets/pizza_2.jpg';
import traditonal_7 from '../assets/zigni.jpg';
import traditonal_8 from '../assets/zilzil.jpg';

// Meat dishes images
import meat_1 from '../assets/fish_1.jpg';
import meat_2 from '../assets/fish_2.jpg';
import meat_3 from '../assets/fish_2.jpg';
import meat_4 from '../assets/fish_4.jpg';
import meat_5 from '../assets/meat_1.jpg';
import meat_6 from '../assets/meat_2.jpg';
import meat_7 from '../assets/pizza_1.jpg';
import meat_8 from '../assets/pizza_2.jpg';
import meat_9 from '../assets/pizza_3.jpg';
import meat_10 from '../assets/pizza_4.jpg';
import meat_11 from '../assets/pizza_5.jpg';

// Dish with variety of stews
import varietyDishes from '../assets/dishes.jpg';
import mixedDishe from '../assets/mixed_1.jpg';
import restaurantLocation from '../assets/restaurant.jpeg';

// Meat dishes images

export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

// Traditional dishes
export const traditionalDishes = [
  {
    id: 1,
    imageurl: traditonal_1,
    name: 'Colorful sneakers',
    price: '$19.99',
    description: 'Some text about the product..',
  },
  {
    id: 2,
    imageurl: traditonal_2,
    name: 'Sport sneakers',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 3,
    imageurl: traditonal_3,
    name: 'iWatch',
    price: '$19.99',
    description: 'Some text about the product..',
  },
  {
    id: 4,
    imageurl: traditonal_4,
    name: 'Water Bottle',
    price: '$14.99',
    description: 'Some text about the product..',
  },
  {
    id: 5,
    imageurl: traditonal_5,
    name: 'Vans sneakers',
    price: '$23.99',
    description: 'Some text about the product..',
  },
  {
    id: 6,
    imageurl: traditonal_6,
    name: 'Coco Noir',
    price: '$19.99',
    description: 'Some text about the product..',
  },
  {
    id: 7,
    imageurl: traditonal_7,
    name: 'Sunglasses',
    price: '$18.99',
    description: 'Some text about the product..',
  },
  {
    id: 8,
    imageurl: traditonal_8,
    name: 'Dove cream',
    price: '$19.99',
    description: 'Some text about the product..',
  },
];

// Meat Dishes

export const meatDishesData = [
  {
    id: 1,
    imageurl: meat_1,
    name: 'Colorful sneakers',
    price: '$19.99',
    description: 'Some text about the product..',
  },
  {
    id: 2,
    imageurl: meat_2,
    name: 'Sport sneakers',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 3,
    imageurl: meat_3,
    name: 'iWatch',
    price: '$99.99',
    description: 'Some text about the product..',
  },
  {
    id: 4,
    imageurl: meat_4,
    name: 'Water Bottle',
    price: '$14.99',
    description: 'Some text about the product..',
  },
  {
    id: 5,
    imageurl: meat_5,
    name: 'Vans sneakers',
    price: '$38.99',
    description: 'Some text about the product..',
  },
  {
    id: 6,
    imageurl: meat_6,
    name: 'Coco Noir',
    price: '$149.99',
    description: 'Some text about the product..',
  },
  {
    id: 7,
    imageurl: meat_7,
    name: 'Sunglasses',
    price: '$38.99',
    description: 'Some text about the product..',
  },
  {
    id: 8,
    imageurl: meat_8,
    name: 'Dove cream',
    price: '$49.99',
    description: 'Some text about the product..',
  },

  {
    id: 9,
    imageurl: meat_9,
    name: 'Sunglasses',
    price: '$38.99',
    description: 'Some text about the product..',
  },
  {
    id: 10,
    imageurl: meat_10,
    name: 'Dove cream',
    price: '$49.99',
    description: 'Some text about the product..',
  },

  {
    id: 11,
    imageurl: meat_11,
    name: 'Dove cream',
    price: '$49.99',
    description: 'Some text about the product..',
  },
];

// Vegan Dishes
export const VeganMeals = [
  {
    id: 1,
    imageurl: vegan1,
    price: '$19.99',
    description: 'Some text about the product..',
  },
  {
    id: 2,
    imageurl: vegan2,
    name: 'Rice',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 3,
    imageurl: vegan3,
    name: 'Mixed',
    price: '$99.99',
    description: 'Some text about the product..',
  },

  {
    id: 1,
    imageurl: vegan4,
    price: '$19.99',
    description: 'Some text about the product..',
  },
  {
    id: 2,
    imageurl: vegan5,
    name: 'Rice',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 3,
    imageurl: vegan6,
    name: 'Mixed',
    price: '$99.99',
    description: 'Some text about the product..',
  },
  {
    id: 1,
    imageurl: vegan7,
    price: '$19.99',
    description: 'Some text about the product..',
  },
  {
    id: 2,
    imageurl: vegan8,
    name: 'Rice',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 3,
    imageurl: vegan9,
    name: 'Mixed',
    price: '$99.99',
    description: 'Some text about the product..',
  },

  {
    id: 1,
    imageurl: vegan10,
    price: '$19.99',
    description: 'Some text about the product..',
  },
  {
    id: 2,
    imageurl: vegan11,
    name: 'Rice',
    price: '$21.99',
    description: 'Some text about the product..',
  },
];

// About Page
export const aboutHoky = [
  {
    _id: 1,
    title: `About Hoky Restaurant`,
    paragraph1: `The restaurant belongs to two friends who have gained a lot of experience in the catering industry. After completing her studies, one worked as a lecturer at the University of Hamburg, while the other worked in the administration of a restaurant chain. However, their love for cooking led the two of them into a different career direction and back together again. They now own several restaurants in Hamburg. Hoky contains a new culinary concept that is still unknown to most: "African dishes with European cooking techniques".`,
    paragraph2: `Our mission is to create a welcoming atmosphere where absolute guest satisfaction is our top priority through the consistent provision of outstanding food with fresh ingredients and use the power of an open heart to lovingly serve our customers, staff, community and the earth.`,
    image: varietyDishes,
  },

  {
    _id: 2,
    title: `Hoky Restaurant Menu`,
    paragraph1:
      'Our goal at Hoky Restaurant is to create our Eritrean and Ethiopian dishes in a perfect and unique way. We are inspired by different European cooking techniques. Enjoy them now at Hoky, we look forward to seeing you and hearing your opinion about our dishes.',

    paragraph2:
      'We always offer two separate menus: for vegetarians and non-vegetarians, because we really want to cook our creations for all of you!',

    image: mixedDishe,
  },

  {
    _id: 3,
    title: `Hoky Restaurant Location`,
    paragraph1: `We have paid attention to every detail in our restaurant to make you feel like you are coming home. That feeling you get when you've been away for a few days and then relax at home on the sofa with what you love and feel good.`,
    paragraph2: `Visit us today in the heart of Hamburg, just a stone's throw from the new Hamburg central station. We look forward to welcoming you to our restaurant and providing you with unforgettable culinary delights. Reserve the table now and experience an unforgettable culinary journey.`,
    image: restaurantLocation,
  },
];

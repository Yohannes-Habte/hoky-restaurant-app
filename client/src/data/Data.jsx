// Vegan dishes images
import vegan1 from '../assets/eri-ethio-vegan1.jpeg';
import vegan2 from '../assets/eri-ethio-vegan2.jpeg';
import vegan3 from '../assets/eri-ethio-vegan3.jpeg';
import vegan4 from '../assets/eri-ethio-vegan4.jpeg';
import vegan5 from '../assets/eri-ethio-vegan5.jpeg';
import vegan6 from '../assets/eri-ethio-vegan6.jpeg';
import vegan7 from '../assets/eri-ethio-vegan7.jpeg';



// Meat dishes images
import meat_1 from '../assets/eri-ethio-meat1.jpeg';
import meat_2 from '../assets/eri-ethio-meat2.jpeg';
import meat_3 from '../assets/eri-ethio-meat3.jpeg';
import meat_4 from '../assets/eri-ethio-meat4.jpeg';
import meat_5 from '../assets/eri-ethio-meat5.jpeg';
import meat_6 from '../assets/eri-ethio-meat6.jpeg';
import meat_7 from '../assets/eri-ethio-meat7.jpeg';

// Mexed dishes images
import mixed_1 from '../assets/eri-ethio-mixed1.jpeg';
import mixed_2 from '../assets/eri-ethio-mixed2.jpeg';
import mixed_3 from '../assets/eri-ethio-mixed3.jpeg';
import mixed_4 from '../assets/eri-ethio-mixed4.jpeg';
import mixed_5 from '../assets/eri-ethio-mixed5.jpeg';

// Vegan dishes images
import eastAfrica1 from '../assets/east-africa-dish1.jpeg';
import eastAfrica2 from '../assets/east-africa-dish2.jpeg';
import eastAfrica3 from '../assets/east-africa-dish3.jpeg';
import eastAfrica4 from '../assets/east-africa-dish4.jpeg';
import eastAfrica5 from '../assets/east-africa-dish5.jpeg';
import eastAfrica6 from '../assets/east-africa-dish6.jpeg';
import eastAfrica7 from '../assets/east-africa-dish7.jpeg';
import eastAfrica8 from '../assets/east-africa-dish8.jpeg';


// Dish with variety of stews
import varietyDishes from '../assets/dishes.jpg';
import restaurantLocation from '../assets/restaurant.jpeg';

// Styling for carousel
export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

// Eritrean Meat dishes
export const meatDishesData = [
  {
    id: 1,
    imageurl: meat_1,
    name: 'Colorful sneakers',
    price: '$19.99',
    description:
      'Some text about the product Some text about the product Some text about the product',
  },
  {
    id: 2,
    imageurl: meat_2,
    name: 'Sport sneakers',
    price: '$21.99',
    description:
    'Some text about the product Some text about the product Some text about the product',
  },
  {
    id: 3,
    imageurl: meat_3,
    name: 'iWatch',
    price: '$19.99',
    description:
      'Some text about the product Some text about the product Some text about the product',
  },
  {
    id: 4,
    imageurl: meat_4,
    name: 'Water Bottle',
    price: '$14.99',
    description:
    'Some text about the product Some text about the product Some text about the product',
  },
  {
    id: 5,
    imageurl: meat_5,
    name: 'Vans sneakers',
    price: '$23.99',
    description:
      'Some text about the product Some text about the product Some text about the product',
  },
  {
    id: 6,
    imageurl: meat_6,
    name: 'Coco Noir',
    price: '$19.99',
    description:
    'Some text about the product Some text about the product Some text about the product',
  },
  {
    id: 7,
    imageurl: meat_7,
    name: 'Sunglasses',
    price: '$18.99',
    description:
    'Some text about the product Some text about the product Some text about the product',
  },

];

// Eritrean Vegan Dishes
export const veganDishesData = [
  {
    id: 1,
    imageurl: vegan1,
    name: 'Rice',
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
    id: 4,
    imageurl: vegan4,
    name: 'Rice',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 5,
    imageurl: vegan5,
    name: 'Mixed',
    price: '$99.99',
    description: 'Some text about the product..',
  },

  {
    id: 6,
    imageurl: vegan6,
    name: 'Rice',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 7,
    imageurl: vegan7,
    name: 'Mixed',
    price: '$99.99',
    description: 'Some text about the product..',
  },

];


// Eritrean Mixed Dishes

export const mixedDishesData = [
  {
    id: 1,
    imageurl: mixed_1,
    name: 'Colorful sneakers',
    price: '$19.99',
    description: 'Some text about the product..',
  },
  {
    id: 2,
    imageurl: mixed_2,
    name: 'Sport sneakers',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 3,
    imageurl: mixed_3,
    name: 'iWatch',
    price: '$99.99',
    description: 'Some text about the product..',
  },
  {
    id: 4,
    imageurl: mixed_4,
    name: 'Water Bottle',
    price: '$14.99',
    description: 'Some text about the product..',
  },

  {
    id: 4,
    imageurl: mixed_5,
    name: 'Water Bottle',
    price: '$14.99',
    description: 'Some text about the product..',
  },
 
];

// East African Dishes
export const eastAfricanDishesData = [
  {
    id: 1,
    imageurl: eastAfrica1,
    name: 'Rice',
    price: '$19.99',
    description: 'Some text about the product..',
  },
  {
    id: 2,
    imageurl: eastAfrica2,
    name: 'Rice',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 3,
    imageurl: eastAfrica3,
    name: 'Mixed',
    price: '$99.99',
    description: 'Some text about the product..',
  },

  {
    id: 4,
    imageurl: eastAfrica4,
    name: 'Rice',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 5,
    imageurl: eastAfrica5,
    name: 'Mixed',
    price: '$99.99',
    description: 'Some text about the product..',
  },

  {
    id: 6,
    imageurl: eastAfrica6,
    name: 'Rice',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 7,
    imageurl: eastAfrica7,
    name: 'Mixed',
    price: '$99.99',
    description: 'Some text about the product..',
  },

  {
    id: 8,
    imageurl: eastAfrica8,
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

    image: mixed_5,
  },

  {
    _id: 3,
    title: `Hoky Restaurant Location`,
    paragraph1: `We have paid attention to every detail in our restaurant to make you feel like you are coming home. That feeling you get when you've been away for a few days and then relax at home on the sofa with what you love and feel good.`,
    paragraph2: `Visit us today in the heart of Hamburg, just a stone's throw from the new Hamburg central station. We look forward to welcoming you to our restaurant and providing you with unforgettable culinary delights. Reserve the table now and experience an unforgettable culinary journey.`,
    image: restaurantLocation,
  },
];

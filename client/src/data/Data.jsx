import {
  BsCartCheck,
  BsClockHistory,
  BsFillCreditCardFill,
} from 'react-icons/bs';
import { FaShippingFast } from 'react-icons/fa'; // Dish with variety of stews
import varietyDishes from '../assets/dishes.jpg';
import mixed_5 from '../assets/eri-ethio-mixed5.jpeg';
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

// Home page

export const serviceInfo = [
  {
    icon: <FaShippingFast size={30} color="#8cb4f5" />,
    heading: 'Free Shipping',
    text: 'We offer free shipping on special Dishes',
  },
  {
    icon: <BsFillCreditCardFill size={30} color="#f7d272" />,
    heading: 'Secure Payment',
    text: 'Make secure payment for your meals.',
  },
  {
    icon: <BsCartCheck size={30} color="#fa82ea" />,
    heading: 'Healthy Organic Meals',
    text: 'We sell foods only organic healthy ingredients.',
  },
  {
    icon: <BsClockHistory size={30} color="#82fa9e" />,
    heading: '24/7 Support',
    text: 'Get access to support from our exprt support team.',
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

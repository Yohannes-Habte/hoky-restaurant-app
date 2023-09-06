import vegan1 from '../assets/vegan1.jpg';
import vegan2 from '../assets/vegan2.jpg';
import vegan3 from '../assets/vegan3.jpg';
import vegan4 from '../assets/vegan4.jpg';
import vegan5 from '../assets/vegan5.jpg';
import vegan6 from '../assets/vegan6.jpg';
import vegan7 from '../assets/vegan7.jpg';
import vegan8 from '../assets/vegan8.jpg';
import vegan9 from '../assets/vegan9.jpg';
import vegan10 from '../assets/vegan10.jpg';
import vegan11 from '../assets/vegan11.jpg';

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

export const dishData = [
  {
    id: 1,
    imageurl:
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    name: 'Colorful sneakers',
    price: '$19.99',
    description: 'Some text about the product..',
  },
  {
    id: 2,
    imageurl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    name: 'Sport sneakers',
    price: '$21.99',
    description: 'Some text about the product..',
  },
  {
    id: 3,
    imageurl:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    name: 'iWatch',
    price: '$99.99',
    description: 'Some text about the product..',
  },
  {
    id: 4,
    imageurl:
      'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    name: 'Water Bottle',
    price: '$14.99',
    description: 'Some text about the product..',
  },
  {
    id: 5,
    imageurl:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    name: 'Vans sneakers',
    price: '$38.99',
    description: 'Some text about the product..',
  },
  {
    id: 6,
    imageurl:
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    name: 'Coco Noir',
    price: '$149.99',
    description: 'Some text about the product..',
  },
  {
    id: 7,
    imageurl:
      'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    name: 'Sunglasses',
    price: '$38.99',
    description: 'Some text about the product..',
  },
  {
    id: 8,
    imageurl:
      'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    name: 'Dove cream',
    price: '$49.99',
    description: 'Some text about the product..',
  },
];

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

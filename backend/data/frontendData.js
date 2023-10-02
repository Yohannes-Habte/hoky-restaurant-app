// Admin Side menu data
export const sidebarMenu = [
    {
      _id: 1,
      title: 'main',
      listItems: [
        {
          _id: 1,
          itemName: 'Homepage',
          url: '/',
        },
        {
          _id: 2,
          itemName: 'Profile',
          url: '/users/1',
        },
      ],
    },
    {
      _id: 2,
      title: 'lists',
      listItems: [
        {
          _id: 1,
          itemName: 'Users',
          url: '/users',
        },
  
        {
          _id: 2,
          itemName: 'Meals',
          url: '/meals',
        },
  
        {
          _id: 3,
          itemName: 'Drinks',
          url: '/drinks',
        },
  
        {
          _id: 4,
          itemName: 'Reservations',
          url: '/reservations',
        },
        {
          _id: 5,
          itemName: 'Orders',
          url: '/orders',
        },
  
        {
          _id: 6,
          itemName: 'Comments',
          url: '/comments',
        },
      ],
    },
  
    {
      _id: 4,
      title: 'Maintenance',
      listItems: [
        {
          _id: 1,
          itemName: 'Settings',
          url: '/settings',
        },
        {
          _id: 2,
          itemName: 'Backups',
          url: '/backups',
        },
      ],
    },
  ];
  
  // User Form Inputs
  export const userInputs = [
    {
      type: 'text',
      id: 'firstName',
      name: 'firstName',
      label: 'Firt Name',
      placeholder: 'First Name',
    },
    {
      type: 'text',
      id: 'lastName',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
    },
    {
      type: 'mail',
      name: 'email',
      id: 'email',
      label: 'Email',
      placeholder: 'Email Address',
    },
    {
      type: 'password',
      name: 'password',
      id: 'password',
      label: 'Password',
      placeholder: 'Password',
    },
  
    {
      type: 'password',
      name: 'confirmPassword',
      id: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
    },
  ];
  
  // Meals Form Inputs
  export const mealInuts = [
    {
      _id: 1,
      type: 'text',
      name: 'name',
      id: 'name',
      label: 'Meal Name',
      placeholder: 'Meal Name',
    },
  
    {
      _id: 2,
      type: 'text',
      name: 'category',
      id: 'category',
      label: 'Meal Category ',
      placeholder: 'Meal Category',
    },
    {
      _id: 3,
      type: 'number',
      name: 'price',
      id: 'price',
      label: 'Price',
      placeholder: 'Price',
    },
  
    {
      _id: 4,
      type: 'number',
      name: 'discountedPrice',
      id: 'discountedPrice',
      label: 'Discounted Price',
      placeholder: 'Discount',
    },
  
    {
      _id: 5,
      type: 'text',
      name: 'description',
      id: 'description',
      label: 'Description',
      placeholder: 'Description',
    },
  
    {
      _id: 6,
      type: 'number',
      name: 'quantity',
      id: 'quantity',
      label: 'Quantity',
      placeholder: 'Quantity',
    },
  
    {
      _id: 7,
      type: 'text',
      name: 'featured',
      id: 'featured',
      label: 'Featured',
      placeholder: 'Featured',
    },
  ];
  
  // Meals Form Inputs
  export const drinkInuts = [
    {
      _id: 1,
      type: 'text',
      name: 'name',
      id: 'name',
      label: 'Drink Name',
      placeholder: 'Drink Name',
    },
  
    {
      _id: 2,
      type: 'text',
      name: 'category',
      id: 'category',
      label: 'Drink Category ',
      placeholder: 'Drink Category',
    },
  
    {
      _id: 3,
      type: 'text',
      name: 'brand',
      id: 'brand',
      label: 'Drink Brand ',
      placeholder: 'Drink Brand ',
    },
    {
      _id: 4,
      type: 'number',
      name: 'price',
      id: 'price',
      label: 'Drink Price',
      placeholder: 'Drink Price',
    },
  
    {
      _id: 5,
      type: 'text',
      name: 'description',
      id: 'description',
      label: 'Description',
      placeholder: 'Description',
    },
  
    {
      _id: 6,
      type: 'number',
      name: 'quantity',
      id: 'quantity',
      label: 'Drink Quantity',
      placeholder: 'Drink Quantity',
    },
  
    {
      _id: 7,
      type: 'text',
      name: 'featured',
      id: 'featured',
      label: 'Featured',
      placeholder: 'Featured',
    },
  ];
  
  // Reservation Form Inputs
  export const reservationInputs = [
    {
      type: 'text',
      id: 'firstName',
      name: 'firstName',
      label: 'Firt Name',
      placeholder: 'First Name',
    },
    {
      type: 'text',
      id: 'lastName',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
    },
    {
      type: 'mail',
      name: 'email',
      id: 'email',
      label: 'Email',
      placeholder: 'Email Address',
    },
  
    {
      type: 'text',
      name: 'phone',
      id: 'phone',
      label: 'Phone Number',
      placeholder: 'Enter phone number',
    },
  
    {
      type: 'text',
      name: 'date',
      id: 'date',
      label: 'Date',
      placeholder: 'Enter date',
    },
  
    {
      type: 'text',
      name: 'time',
      id: 'time',
      label: 'Time',
      placeholder: 'Enter Time',
    },
  
    {
      type: 'number',
      name: 'persons',
      id: 'persons',
      label: 'Persons',
      placeholder: 'Enter persons (e.g. 3)',
    },
  
    {
      type: 'text',
      name: 'message',
      id: 'message',
      label: 'Message',
      placeholder: 'Enter message',
    },
  ];
  
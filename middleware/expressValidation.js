import { check } from 'express-validator';

const addressValidator = [
  check('name', 'Enter a valid Full Name').exists({ checkFalsy: true }),
  check('mob', 'Enter a valid number').exists({ checkFalsy: true }).isLength({ min: 10 }),
  check('house', 'house details should not be empty').exists({ checkFalsy: true }),
  check('landmark', 'landmark details should not be empty').exists({ checkFalsy: true }),
  check('city', 'city details should not be empty').exists({ checkFalsy: true }),
  check('district', 'district should not be empty').exists({ checkFalsy: true }),
  check('state', 'state should not be empty').exists({ checkFalsy: true }),
  check('pincode', 'Enter a valid pincode').exists({ checkFalsy: true }).isLength({ min: 6, max: 6 }),
];
const signupValidator = [
  check('name', 'Enter a valid Full Name').exists({ checkFalsy: true }),
  check('mob', 'Enter a valid number').exists({ checkFalsy: true }).isLength({ min: 10 }),
  check('house', 'house details should not be empty').exists({ checkFalsy: true }),
  check('landmark', 'landmark details should not be empty').exists({ checkFalsy: true }),
  check('city', 'city details should not be empty').exists({ checkFalsy: true }),
  check('district', 'district should not be empty').exists({ checkFalsy: true }),
  check('state', 'state should not be empty').exists({ checkFalsy: true }),
  check('pincode', 'Enter a valid pincode').exists({ checkFalsy: true }).isLength({ min: 6, max: 6 }),
];
const checkoutValidator = [
  check('name', 'Enter a valid Full Name').exists({ checkFalsy: true }),
  check('mob', 'Enter a valid number').exists({ checkFalsy: true }).isLength({ min: 10 }),
  check('house', 'house details should not be empty').exists({ checkFalsy: true }),
  check('landmark', 'landmark details should not be empty').exists({ checkFalsy: true }),
  check('city', 'city details should not be empty').exists({ checkFalsy: true }),
  check('district', 'district should not be empty').exists({ checkFalsy: true }),
  check('state', 'state should not be empty').exists({ checkFalsy: true }),
  check('pincode', 'Enter a valid pincode').exists({ checkFalsy: true }).isLength({ min: 6, max: 6 }),
];

export { addressValidator, signupValidator, checkoutValidator };

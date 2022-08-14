export const ASYNC_STATUS = {
  IDLE: "IDLE",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export const paymentId = 1;


export const USER_TYPES = {
  PARTNER: 'partner',
  DRIVER: 'driver',
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  CUSTOMER: 'customer'
};

export const PARTNER_ROUTES = {
  register: '/partner/register',
  createContract: '/partner/create-contract',
  productsOverview: '/partner/products',
  ordersOverview: '/partner/orders'
};

export const CUSTOMER_ROUTES = {
  register: '/customer/register',
  seeAllPartners: '/customer/partners',
  placeOrder: '/customer/place-order',
  checkDeliveryStatus: '/customer/delivery-status'
};

export const DRIVER_ROUTES = {
  register: '/driver/register',
  orders: '/driver/orders',
  income: '/driver/income'
};

export const EMPLOYEE_ROUTES = {
  partnerOverview: '/employee/partners',
  contractOverview: '/employee/contracts'
};

export const ADMIN_ROUTES = {
  userOverview: '/admin/users',
};


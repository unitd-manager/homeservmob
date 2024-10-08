export type RootDrawerParamList = {
  Cart: undefined;
  Category: undefined;
  Shop: undefined;
  Detail: undefined;
  HomeStack: undefined;
  Tabs: undefined;
};

export type RootBottomTabsParamList = {
  HomeScreen: { userId: string; name: string };
  Cart: undefined;
  Categories: undefined;
  Settings: undefined;
};

export type RootHomeStackParamList = {
  News: undefined;
  ContactUs: undefined;
  BlogScreen: undefined;
  BlogDetails: undefined;
  Settings: undefined;
  AboutUs: undefined;
  AddAddress: undefined;
  Address: undefined;
  IntroSliderScreen: undefined;
  MyOrders: undefined;
  PrivacyPolicy: undefined;
  TermsAndCond: undefined;
  Profile: undefined;
  OrderDetails: undefined;
  Home: { userId: string; name: string };
  Cart: undefined;
  Shop: undefined;
  CustomizeTheme: undefined;
  HomeStack: undefined;
  Tab: undefined;
  HomeOne: undefined;
  HomeTwo: undefined;
  Login: undefined;
  Search: undefined;
  ProductDetail: { dataImages: { url: any, productName: string, quantity: string }[] };
  Category: undefined;
  ProductDescriptionScreen: undefined;
  RatingReviewsScreen: undefined;
  Wishlist: { dataImages: { url: any, productName: string, quantity: string }[] };
  ShippingAddress: undefined;
  ShippingMethod: undefined;
  OrderPage: undefined;
  ThankYouScreen: undefined;
};

export type CategoryStackParamList = {
  Category: undefined;
};

export type CartRootStackParamList = {
  Cart: undefined;
};

export type LoginRootStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  LogoutScreen: undefined;
  ForgotPasswordScreen: undefined;
  TermsAndCondScreen: undefined;
};

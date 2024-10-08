import React from 'react';
import { I18nManager } from 'react-native';
import { List as ListModel } from './dropDownList/List';

const images: string[] = []

const bannersOne = [require('../images/headPhone/Banner1.png'),
require('../images/headPhone/Banner1.png'),
require('../images/headPhone/Banner1.png'),
require('../images/headPhone/Banner1.png')
]
const bannersTwo = [require('../images/furniture/Banner1.png'),
require('../images/furniture/Banner1.png'),
require('../images/furniture/Banner1.png'),
require('../images/furniture/Banner1.png')
]
const bannersThree = [require('../images/grocery/Banner1.png'),
require('../images/grocery/Banner1.png'),
require('../images/grocery/Banner1.png'),
require('../images/grocery/Banner1.png')
]
const bannersFour = [require('../images/shirtsTwo/Banner8.png'),
require('../images/shirtsTwo/Banner8.png'),
require('../images/shirtsTwo/Banner8.png'),
require('../images/shirtsTwo/Banner8.png')
]
const bannersFive = [require('../images/shirts/Banner4.png'),
require('../images/shirts/Banner4.png'),
require('../images/shirts/Banner4.png'),
require('../images/shirts/Banner4.png')
]

const cartData = [{
  url: require('../images/headPhone/CustomSize3.png'),
  productName: 'Men',
  quantity: '120 Products'
},
{
  url: require('../images/headPhone/CustomSize3.png'),
  productName: 'Shoes',
  quantity: '789 Products'
}]

const list: ListModel = {
  name: 'Total Points',
  items: [
    { name: !I18nManager.isRTL ? 'T Shirt' : 'تي شيرت', navigate: 'Shop' },
    {
      name: !I18nManager.isRTL ? 'Yellow Shirt' : 'قميص أصفر',
      navigate: 'Shop',
    },
    {
      name: !I18nManager.isRTL ? 'Red Shirt' : 'القميص الأحمر',
      navigate: 'Shop',
    },
    {
      name: !I18nManager.isRTL ? 'Large Shirt' : 'قميص كبير',
      navigate: 'Shop',
    },
    {
      name: !I18nManager.isRTL ? 'View all' : 'مشاهدة الكل',
      navigate: 'Shop',
    },
  ],
};

export {
  images, cartData, bannersOne,
  bannersTwo, bannersThree, bannersFour, bannersFive,
  list
};

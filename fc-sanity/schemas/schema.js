import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import product from './product';
import banner from './banner';
import work from './work'
import about from './about'
import contact from './contact'
import kitchen from './kitchen';
import seating from './seating';
import livingarea from './livingarea';
import decor from './decor';


export default createSchema({
  name: 'default',
  types: schemaTypes.concat([ product, banner, work, about, contact, kitchen, seating, livingarea, decor ]),
})
  
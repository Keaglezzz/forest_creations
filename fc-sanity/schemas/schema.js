import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import product from "./product";
import banner from "./banner";
import work from "./work";
import about from "./about";
import contact from "./contact";
import volume from "./volume";
import productType from "./productType";
import parent from "./parent";
import user from "./user";
import orders from "./orders";
import woodSpecies from "./woodSpecies";
import stackAway from "./stackAway";
import size from "./size";
import stain from "./stain";
import legStyle from "./legStyle";
import legMaterial from "./legMaterial";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    product,
    banner,
    work,
    about,
    contact,
    volume,
    parent,
    productType,
    user,
    orders,
    woodSpecies,
    stackAway,
    size,
    stain,
    legStyle,
    legMaterial,
  ]),
});

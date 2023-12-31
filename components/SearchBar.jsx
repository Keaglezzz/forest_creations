import React from 'react';
import algoliasearch from 'algoliasearch';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    ClearRefinements,
    RefinementList,
    Configure,
  } from 'react-instantsearch-dom';
  import { client } from '../lib/client';
import indexer, { flattenBlocks } from 'sanity-algolia';

const algolia = algoliasearch('1E5NUX4XB4', '07230ffb24011bb82682f060e52af8f5');
const sanity = client;

const sanityAlgolia = indexer(
    {
        post: {
            index: algolia.initIndex('posts'),
          },
    },
    document => {
        switch (document._type) {
          case 'post':
            return {
              title: document.title,
              path: document.slug.current,
              publishedAt: document.publishedAt,
              excerpt: flattenBlocks(document.excerpt),
            };
          default:
            throw new Error(`Unknown type: ${document.type}`);
        }
    }
);

const SearchBar = (req, res) => (
  
   
    <div className="ais-InstantSearch">
    <h1>React InstantSearch e-commerce demo</h1>
    <InstantSearch>
      <div className="left-panel">
        <ClearRefinements />
        <h2>Brands</h2>
        <RefinementList attribute="brand" />
        <Configure hitsPerPage={8} />
      </div>
      <div className="right-panel">
        <SearchBox />
        <Hits />
        <Pagination />
      </div>
    </InstantSearch>
  </div>
);

export default SearchBar 

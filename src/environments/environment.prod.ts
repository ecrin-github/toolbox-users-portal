import {host} from '@angular-devkit/build-angular/src/test-utils';

export const environment = {
  production: true,
  appVersion: 'v.0.1.1',

  // HOSTNAME
  // hostname: 'http://localhost:8000/',
  // hostname: 'http://51.210.99.16:8000/',
  hostname: 'http://tsdo.lifescience-ri.eu:8000/',

  // Back-end configs
  apiBaseUrl: 'api/',
  apiVersion: 'v1',

  // API Query URLs
  categoriesApiUrl: '/categories',
  searchOptionsApiUrl: '/search-options',
  searchApiUrl: '/search',
  resourceIdUrl: '/resource',
};

interface route {
  path: string;
  component: typeof Component;
}
import { routes } from '../routes';
import { Component } from './component';

export function routeRender() {
  if (!location.hash) {
    history.replaceState(null, '', '/#/');
  }
  const routerView = document.querySelector('router-view');
  const [hash, queryString] = location.hash.split('?');
  const currentRoute = routes.find((route) => {
    return new RegExp(route.path + '/?$').test(hash);
  }) as route;
  if (routerView) {
    routerView.innerHTML = '';
    routerView.append(new currentRoute.component().componentRoot);
  }
  window.scrollTo(0, 0);
}

export const getUrlParam = () => {
  const [hash, queryString] = location.hash.split('?');
  const [id, value] = queryString.split('=');
  return value;
};

export const navigate = (url = '/') => {
  window.history.pushState(null, '', `/#${url}`);
  routeRender();
};

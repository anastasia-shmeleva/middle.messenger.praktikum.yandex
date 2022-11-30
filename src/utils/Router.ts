import Route from "./Route";
import { RouterProps } from "./types";

export default class Router {
  private static __instance: Router;
  private _currentRoute: Route | null = null;
  private _rootQuery!: string;
  routes: Route[] = [];
  history = window.history;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;
    this.routes = [];
    Router.__instance = this;
  }

  static getInstance() {
    return this.__instance;
  }

  use({
    pathname, block
  }: RouterProps) {
    const route = new Route(
      pathname, 
      block,
      { rootQuery: this._rootQuery }
    );
    
    this.routes.push(route);
    
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }

  back() {
    this.history.go(-1);
  }

  forward() {
    this.history.go(1);
  }
}

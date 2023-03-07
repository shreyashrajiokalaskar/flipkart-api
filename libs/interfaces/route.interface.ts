export interface IRoutes {
  allRoutes: IRoute[];
  init?: any;
}

export interface IRoute {
  path: string;
  router: any;
}

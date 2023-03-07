import { sequelize } from '../configs/db-connection.config';

export class APIModifier {
  filterClause: { [key: string]: any } = {};
  filterParams: any;
  constructor(filterParams: any) {
    this.filterParams = filterParams;
  }

  filter() {
    const queryParams = { ...this.filterParams };
    const excludedParams = [
      'pageNumber',
      'pageSize',
      'sortBy',
      'order',
      'fields',
    ];
    excludedParams.forEach((param) => delete queryParams[param]);
    // Filtering
    const { searchColumn, searchString } = queryParams;
    const whereClause: { [key: string]: any } = {};
    whereClause[searchColumn] = sequelize.where(
      searchColumn,
      'LIKE',
      '%' + searchString + '%'
    );
    this.filterClause = {
      ...this.filterClause,
    };
    return this;
  }

  sort() {
    if (this.filterParams.sortBy) {
      const order = this.filterParams.order || 'ASC';
      const sortBy = this.filterParams.sortBy;
      this.filterClause = {
        ...this.filterClause,
        order: [[sortBy, order]],
      };
    }
    return this;
  }

  limitFields() {
    if (this.filterParams.attributes) {
      const attributes = this.filterParams.attributes.split(',');
      this.filterClause = {
        ...this.filterClause,
        attributes,
      };
    }
    return this;
  }

  paginate() {
    const { pageNumber = 1, pageSize = 10 } = this.filterParams;
    const offset = (pageNumber * 1 - 1) * pageSize * 1;
    this.filterClause = {
      ...this.filterClause,
      offset,
      limit: pageSize,
    };
    return this;
  }
}

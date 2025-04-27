import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

const DataSourceConnection = new DataSource({
  ...typeOrmConfig(),
  migrations: ['dist/src/common/migrations/*.js'],
});

export default DataSourceConnection;

import * as Koa from 'koa';
import * as mount from 'koa-mount';
import * as HTTP from 'koa-graphql';
import { schema, rootValue } from './schema';

const app = new Koa();

app.use(mount('/graphql', HTTP({
  schema,
  rootValue,
  graphql: true
})));

export default app;


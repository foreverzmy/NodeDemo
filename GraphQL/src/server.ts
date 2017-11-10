import * as Koa from 'koa';
import * as mount from 'koa-mount';
import * as convert from 'koa-convert';
import * as HTTP from 'koa-graphql';
import { schema, rootValue } from './schema';

const app = new Koa();

app.use(mount('/graphql', convert(HTTP({
  schema,
  rootValue,
  graphql: true
}))));

export default app;


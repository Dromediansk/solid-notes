import { Request } from "express";
import { Query } from "express-serve-static-core";

export interface RequestWithQuery<Q extends Query> extends Request {
  query: Q;
}

export interface RequestWithBody<Q extends Query, B> extends Request {
  query: Q;
  body: B;
}

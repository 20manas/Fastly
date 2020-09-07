import ReactDOMServer from 'react-dom/server';

import Layout from '../views/layout';
import {User} from './database';

interface ReqJSON {
  user: User | Express.User | undefined,
}

export default (json: ReqJSON, Body: JSX.Element): string =>
  `<!doctype html>${ReactDOMServer.renderToString(Layout(json, Body))}`;

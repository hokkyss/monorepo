import { createRouter } from '@tanstack/react-router';

import { routeTree } from './route-tree.config';

const router = createRouter({ context: {}, routeTree });

export default router;

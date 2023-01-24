import { server } from 'src/server';
import { serverWithCluster } from 'src/cluster';
import { MULTI } from 'src/constants';

MULTI ? serverWithCluster.start() : server.start();
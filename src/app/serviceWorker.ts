
import {BackgroundSyncPlugin} from 'workbox-background-sync';
import {registerRoute} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';

const version = "0.1.3";

const bgSyncPlugin = new BackgroundSyncPlugin('vetproviehSync', {
  maxRetentionTime: 7 * 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

const route = registerRoute(
    /.*\/service\/.*/,
    new NetworkOnly({
      plugins: [bgSyncPlugin as any],
    }),
    'POST'
);

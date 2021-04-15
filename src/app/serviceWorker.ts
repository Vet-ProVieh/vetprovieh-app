
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';


const bgSyncPlugin = new BackgroundSyncPlugin('vetproviehSync', {
    maxRetentionTime: 7 * 24 * 60 // Retry for max of 24 Hours (specified in minutes)
  });

  var route = registerRoute(
    /.*\/service\/.*/,
    new NetworkOnly({
      plugins: [bgSyncPlugin as any]
    }),
    'POST'
  );
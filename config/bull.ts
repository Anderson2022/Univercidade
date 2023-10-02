import { BullConfig } from '@ioc:Rocketseat/Bull';
import Env from '@ioc:Adonis/Core/Env';


const bullConfig: BullConfig = {
  connection: Env.get('BULL_CONNECTION', 'local'),

  connections: {
    local: {
      host: Env.get('BULL_REDIS_HOST'),
      port: Env.get('BULL_REDIS_PORT'),
      username: Env.get('BULL_REDIS_USERNAME'),
      password: Env.get('BULL_REDIS_PASSWORD'),
      db: Env.get('BULL_REDIS_DB', '0'),
      keyPrefix: Env.get('BULL_KEY_PREFIX', ''),
      },
  },
};

export default bullConfig;

import Bull from '@ioc:Rocketseat/Bull';
import Env from '@ioc:Adonis/Core/Env';
import {} from '@ioc:Rocketseat/Bull';

const PORT = 9995;
const isProduction = Env.get('NODE_ENV') === 'production' || 'development';

Bull.process();

if (isProduction) {
  Bull.ui(PORT);
}


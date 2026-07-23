import 'dotenv/config';

import { app } from './app.js';
import { assertJwtConfig } from './utils/jwt.js';

const port = Number(process.env.PORT) || 3001;

assertJwtConfig();

app.listen(port, () => {
  console.log(`Aura Drinks API running on http://localhost:${port}`);
});

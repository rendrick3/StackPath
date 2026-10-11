import 'dotenv/config';
import { createApp } from './app.js';

const app = createApp();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`[StackPath Academy API] Server listening on http://localhost:${PORT}`);
  console.log(`[StackPath Academy API] Ready for learning.`);
});

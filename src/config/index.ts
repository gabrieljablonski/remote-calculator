import * as dotenv from 'dotenv';

dotenv.config();

export default {
  httpPort: process.env.REMOTE_CALCULATOR_HTTP_PORT || 6160,
};

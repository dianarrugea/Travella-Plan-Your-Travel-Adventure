import { listening } from "../server/index.js";
  
const startupMessage = require('../server/index.js');

test('listen', () => {
  expect(listening).toBeUndefined();
});
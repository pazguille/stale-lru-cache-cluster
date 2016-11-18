/**
 * Module dependencies
 */
const { expect } = require('chai');
const cache = require('../');

/**
 * Tests
 */
describe('Cache module', () => {
  it('Should export a function.', () => {
    expect(cache).to.be.a('function');
  });
});

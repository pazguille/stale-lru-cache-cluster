/**
 * Module dependencies
 */
const { expect } = require('chai');
const LRUCache = require('../');

/**
 * Tests
 */
describe('LRUCache Client', () => {
  const key = 'test';
  const value = 'cached';

  beforeEach(() => {
    this.cache = LRUCache();
  });

  it('Should have a LRUCache client', () => {
    expect(this.cache).to.have.property('lru');
  });

  it('Should have an "set" method', () => {
    expect(this.cache).to.have.property('set');
  });

  it('Should have an "has" method', () => {
    expect(this.cache).to.have.property('has');
  });

  it('Should have an "get" method', () => {
    expect(this.cache).to.have.property('get');
  });

  it('Should set a given key-value into cache', (done) => {
    this.cache.set(key, value)
      .then((response) => {
        expect(response).to.be.a('boolean');
        expect(response);
        done();
      });
  });

  it('Should overwrite the value of an existing key', (done) => {
    const newValue = 'testing';
    this.cache.set(key, newValue);
    this.cache.get(key)
      .then((response) => {
        expect(response).to.be.a('string');
        expect(response).to.be.not.equal(value);
        expect(response).to.be.equal(newValue);
        done();
      });
  });

  it('Should check if a given key exists into the cache', (done) => {
    this.cache.has(key)
      .then((exists) => {
        expect(exists).to.be.a('boolean');
        expect(exists);
        done();
      });
  });

  it('Should get a given key from the cache', (done) => {
    const cache = LRUCache();
    cache.set(key, value);
    cache.get(key)
      .then((response) => {
        expect(response).to.be.a('string');
        expect(response).to.be.equal(value);
        done();
      });
  });
});

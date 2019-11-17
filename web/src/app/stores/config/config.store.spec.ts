import { TestBed } from '@angular/core/testing';

import { ConfigStore } from './config.store';

describe('ConfigStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigStore = TestBed.get(ConfigStore);
    expect(service).toBeTruthy();
  });
});

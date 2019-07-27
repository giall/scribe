import { TestBed } from '@angular/core/testing';

import { UserStore } from '../stores/user/user.store';

describe('UserStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserStore = TestBed.get(UserStore);
    expect(service).toBeTruthy();
  });
});

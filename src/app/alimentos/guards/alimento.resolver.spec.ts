import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { alimentoResolver } from './alimento.resolver';

describe('alimentoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => alimentoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

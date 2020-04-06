import { TestBed } from '@angular/core/testing';

import { LayerGroupService } from './layer-group.service';

describe('LayerGroupService', () => {
  let service: LayerGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayerGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

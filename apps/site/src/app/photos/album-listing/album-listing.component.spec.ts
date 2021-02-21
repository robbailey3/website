import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumListingComponent } from './album-listing.component';

describe('AlbumListingComponent', () => {
  let component: AlbumListingComponent;
  let fixture: ComponentFixture<AlbumListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

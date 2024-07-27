import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminCreateOrUpdateProductComponent } from './admin-create-or-update-product.component';

describe('AdminCreateOrUpdateProductComponent', () => {
  let component: AdminCreateOrUpdateProductComponent;
  let fixture: ComponentFixture<AdminCreateOrUpdateProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateOrUpdateProductComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCreateOrUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

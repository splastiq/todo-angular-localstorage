import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from "./header.component";

let component: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let h1: HTMLElement;

describe('Testing HeaderComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
        });
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        h1 = fixture.nativeElement.querySelector('h1');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display original title', () => {
        fixture.detectChanges();
        expect(h1.textContent).toContain(component.title);
    });

});

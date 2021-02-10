import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WordCountDirective } from '../validators/word-count.directive';

import { TextareaComponent } from './textarea.component';

@Component({
  template: `<form #form="ngForm">
    <rob-textarea
      maxWordCount="200"
      name="textAreaValue"
      [formControl]="textAreaFormControl"
    ></rob-textarea>
  </form>`,
  selector: 'rob-test-textarea'
})
class TestTextAreaComponent {
  @ViewChild(TextareaComponent) public textArea: TextareaComponent;

  public textAreaFormControl = new FormControl('Test');
}

describe('TextareaComponent', () => {
  let hostComponent: TestTextAreaComponent;
  let hostFixture: ComponentFixture<TestTextAreaComponent>;
  let changeSpy: jest.SpyInstance;
  let textareaComponent: TextareaComponent;
  let textarea: HTMLTextAreaElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestTextAreaComponent,
        TextareaComponent,
        WordCountDirective
      ],

      imports: [ReactiveFormsModule, FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestTextAreaComponent);
    hostComponent = hostFixture.componentInstance;
    textarea = hostFixture.debugElement.nativeElement.querySelector(
      'rob-textarea textarea'
    );
    hostFixture.detectChanges();
    textareaComponent = hostComponent.textArea;
    changeSpy = jest.spyOn(hostComponent.textArea, 'change');
  });

  it('should create', () => {
    expect(textareaComponent).toBeTruthy();
  });

  it('should update the value when the ngModel changes', () => {
    hostComponent.textAreaFormControl.patchValue('Foo');
    hostFixture.detectChanges();
    expect(hostComponent.textArea.value).toEqual('Foo');
  });

  it('should run the change function when the input event is fired from the textarea', () => {
    textarea.dispatchEvent(new Event('input'));
    hostFixture.detectChanges();
    expect(changeSpy).toHaveBeenCalled();
  });
});

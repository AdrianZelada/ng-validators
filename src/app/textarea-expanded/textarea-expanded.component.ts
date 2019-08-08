import { Component, forwardRef, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const EPANDED_TEXTAREA_VALUE_ACCESSOR : any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaExpandedComponent),
  multi: true,
};

@Component({
  selector: 'textarea-expanded',
  providers: [EPANDED_TEXTAREA_VALUE_ACCESSOR],
  template: `
    <input contenteditable="true"
         #textarea
         tabindex="1"
         (input)="change($event)"
         role="textarea"/>
  `,
  styles: [`
    div {
      width: 200px;
      min-height: 50px;
      border: 1px solid lightgray;
    }
    div.disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
  `]
})
export class TextareaExpandedComponent implements ControlValueAccessor {
  @ViewChild('textarea') textarea;

  onChange;
  onTouched;
  lastValue;

  writeValue( value: any ) : void {
    console.log('writeValue', value);
    const div = this.textarea.nativeElement;
    this.lastValue = value;
    this.renderer.setProperty(div, 'textContent', value);
  }

  registerOnChange( fn : any ) : void {
    console.log('registerOnChange');
    this.onChange = fn;
  }

  registerOnTouched( fn : any ) : void {
    console.log('registerOnTouched');
    this.onTouched = fn;
  }

  setDisabledState( isDisabled : boolean ) : void {
    console.log('setDisabledState');
    const div = this.textarea.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.renderer[action](div, 'disabled');
  }

  constructor( private renderer : Renderer2 ) {
  }

  change( $event ) {
    console.log(event);
    const text = $event.target.value;
    const div = this.textarea.nativeElement;
    if (this.isNumber(text)) {
      this.onChange(text);
      this.onTouched(text);
      this.lastValue = text;
    } else {
      this.renderer.setProperty(div, 'value', this.lastValue);
    }
  }

  isNumber(n: any) {
    const pattern = /^\d+$/;
    return pattern.test(n);
  }

}

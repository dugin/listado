import { Directive, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[hammer-gestures]'
})
export class HammerGesturesDirective implements AfterViewInit {
    @Output() onGesture = new EventEmitter();
    static hammerInitialized = false;

    constructor(public el: ElementRef) {



    }
    ngAfterViewInit() {

        if (!HammerGesturesDirective.hammerInitialized) {

            let hammertime = new Hammer(this.el.nativeElement);

            hammertime.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL, threshold: 0 });
          

            hammertime.on("panup", (ev) => {
                this.onGesture.emit("panup");
            });
            hammertime.on("pandown", (ev) => {
                this.onGesture.emit("pandown");
            });
            hammertime.on("tap", (ev) => {
                this.onGesture.emit("tap");
            });

    
                 hammertime.on("press", (ev) => {
                this.onGesture.emit("press");
            });

            HammerGesturesDirective.hammerInitialized = true;
        }


    }
}
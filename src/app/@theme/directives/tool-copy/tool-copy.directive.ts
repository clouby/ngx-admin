import { Directive, HostListener, Renderer2, AfterViewInit, ContentChild, Inject } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
    selector: '[ngxToolCopy]',
})
export class ToolCopyDirective implements AfterViewInit {
    // Get refs about directives injected
    @ContentChild(NbPopoverDirective) _popover: NbPopoverDirective;

    constructor(private _render: Renderer2, @Inject(DOCUMENT) private document: Document) { }

    // Init if there's a PopoverDirective
    ngAfterViewInit() {
        if (!this._popover) {
            throw new Error('NbPopoverDirective not found');
        }
    }

    // Set a new message, using a popover
    showMessage(message: string): void {
        this._popover.content = message;
        this._popover.toggle();
    }

    //  When make `Ctrl + Click` trigger this handler
    @HostListener('click', ['$event', '$event.target.innerText']) onClick(event: MouseEvent, value: string) {
        // Prevent execute the popover event
        event.stopPropagation();

        if (event.ctrlKey && value) {
            // Create a DOM Node (`textarea`)
            const aux_textarea = <HTMLTextAreaElement>this._render.createElement('textarea');

            // Styles included for hide the node.
            aux_textarea.style.opacity = '0';
            aux_textarea.style.position = 'fixed';
            aux_textarea.style.bottom = '0px';
            aux_textarea.style.right = '0px';

            // Set the new value
            aux_textarea.value = value;

            // Inject to BODY node
            this._render.appendChild(this.document.body, aux_textarea);

            // Prepare the text that it'll be copied.
            aux_textarea.focus();
            aux_textarea.select();

            // Execute the command to copy the text selected.
            const executed_message = this.document.execCommand('copy') ? '¡Copiado!' : 'Error al copiarlo.';

            // Trigger the pop message
            this.showMessage(executed_message);
        }
    }

    // Denegate default event about `contextmenu` (right-click)
    @HostListener('contextmenu', ['$event']) onRightClick(event) {
        event.preventDefault();
    }
}

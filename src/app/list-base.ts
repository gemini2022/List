import { Directive, input } from "@angular/core";

@Directive()
export abstract class ListBase {
    public width = input<string>();
    public height = input<string>();
    public cursor = input<string>();
    public indent = input<string>();
    public fontSize = input<string>();
    public itemHeight = input<string>();
    public fontFamily = input<string>();
    public showHover = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public scrollSnapping = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
}
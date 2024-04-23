import { Directive, contentChildren, effect, input } from "@angular/core";
import { ListItemComponent } from "./list-item/list-item.component";

@Directive()
export abstract class ListBase {
    public width = input<string>();
    public height = input<string>();
    public cursor = input<string>();
    public indent = input<string>();
    public fontSize = input<string>();
    public itemHeight = input<string>();
    public fontFamily = input<string>();
    private items = contentChildren(ListItemComponent);
    public hoverVisible = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });
    public scrollSnapping = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });


    constructor() {
        effect(() => {
            if (this.hoverVisible()) {
                this.items().forEach((item) => {
                    this.setItemHoverVisibility(item);
                })
            }
        })
    }


    private setItemHoverVisibility(item: ListItemComponent) {
        item.hoverVisible = this.hoverVisible();
    }
}
import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CocktailService } from 'src/app/services/cocktail.service';
import { SearchService } from 'src/app/services/search.service';
import { CocktailSearchType } from 'src/app/types/cocktail_search_type';

@Component({
    selector: 'app-searchable-select',
    templateUrl: './searchable-select.component.html',
    styleUrls: ['./searchable-select.component.css']
})
export class SearchableSelectComponent implements OnInit, OnChanges {

    @Input() items: string[] = [];
    @Output() selectedItemChanged = new EventEmitter<string | undefined>(undefined);

    constructor(
        private searchService: SearchService,
        private cs: CocktailService,
    ) {}

    ngOnChanges(_: SimpleChanges): void {
        this.visibleItems = this.items;
    }

    ngOnInit(): void {
        this.visibleItems = this.items;

        // For testing
        if (this.items.length == 0) {
            this.cs.getAttributes(CocktailSearchType.Glass)
            .subscribe(res => {
                this.items = res;
                this.visibleItems = res;
            });
        }
    }
    
    reset() {
        this.query = "";
    }

    visibleItems: string[] = this.items;

    selectedIndex: number | undefined = undefined;
    selectedItem: string | undefined = undefined;

    dropdownVisible = false;

    query: string = "";

    search() {
        this.visibleItems = this.items.filter(s => this.searchService.fuzzyMatch(this.query, s));
    }

    toggle() {
        this.dropdownVisible = !this.dropdownVisible;
    }

    selectNext(offset: number) {
        const len = this.visibleItems.length;
        if (len == 0) return;

        if (this.selectedIndex == undefined) this.selectedIndex = 0;

        this.selectedIndex = this.mod((this.selectedIndex + offset), len);
        this.selectedItem = this.visibleItems[this.selectedIndex];

        document.getElementById(`item-${this.selectedIndex}`)?.scrollIntoView();
    }

    select(i: number) {
        this.selectedIndex = i;
        this.selectedItem = this.visibleItems[i];
        this.selectedItemChanged.emit(this.selectedItem);

        this.toggle();
    }

    mod(x: number, y: number) {
        return ((x % y) + y) % y;
    }


    focused = false;

    @HostListener("click")
    clicked() {
        this.focused = true;
    }

    @HostListener("document:click")
    clickedOut() {
        if (!this.focused) {
            this.dropdownVisible = false;
        }

        this.focused = false;
    }
}

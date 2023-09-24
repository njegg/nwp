import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
    selector: 'app-searchable-select',
    templateUrl: './searchable-select.component.html',
    styleUrls: ['./searchable-select.component.css']
})
export class SearchableSelectComponent implements OnInit, OnChanges {

    @Input() items!: string[];
    @Output() selectedItemChanged = new EventEmitter<string | undefined>(undefined);
    @Output() onInit = new EventEmitter<SearchableSelectComponent>();

    constructor(
        private searchService: SearchService,
    ) {}

    ngOnChanges(_: SimpleChanges): void {
        this.visibleItems = this.items;
    }

    ngOnInit(): void {
        this.visibleItems = this.items;
        this.onInit.emit(this);
    }
    
    reset() {
        this.selectedIndex = undefined;
        this.selectedItem = undefined;
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
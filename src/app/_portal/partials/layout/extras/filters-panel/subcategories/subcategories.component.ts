import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FilterInterface} from '../../../../../core/interfaces/filters/filter.interface';
import {BehaviorSubject, Subscription} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {StatesService} from '../../../../../core/services/state/states.service';
import {SubscriptionEvents} from '../../../../../core/states/subscription-events';
import {SnackbarService} from '../../../../../core/services/snackbar/snackbar.service';


class FilterItemNode {
    id: number;
    modelPropertyName: string;
    resourcePropertyName: string;
    name: string;
    label: string;
    isSelected: boolean;
    children: FilterItemNode[];
}

class FilterItemFlatNode {
    level: number;
    expandable: boolean;
    id: number;
    modelPropertyName: string;
    resourcePropertyName: string;
    name: string;
    label: string;
    isSelected: boolean;
}


@Component({
    selector: 'app-subcategories',
    templateUrl: 'subcategories.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoriesComponent implements OnInit {

    clearFilterEventSubscription: Subscription;

    constructor(
        private ref: ChangeDetectorRef,
        private statesService: StatesService,
        private subscriptionEvents: SubscriptionEvents,
        private snackbarService: SnackbarService
    ) {
        ref.detach();
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<FilterItemFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        this.dataChange.subscribe(data => {
            this.dataSource.data = data;
        });
        this.clearFilterEventSubscription = this.subscriptionEvents.getClearFilterEvent().subscribe(() => {
            this.refreshTreeData();
        });
        setInterval(() => {
            if (!this.ref['destroyed']) {
                this.ref.detectChanges();
            }
        }, 1);
    }
    @Input() categoryId: number;
    @Input() modelName: string;
    @Input() appName: string;
    @Input() name: string;
    @Input() isSelected: boolean;
    @Input() filters: Array<FilterInterface>;

    get data(): FilterItemNode[] { return this.dataChange.value; }

    dataChange = new BehaviorSubject<FilterItemNode[]>([]);

    flatNodeMap = new Map<FilterItemFlatNode, FilterItemNode>();

    nestedNodeMap = new Map<FilterItemNode, FilterItemFlatNode>();

    selectedParent: FilterItemFlatNode | null = null;

    treeControl: FlatTreeControl<FilterItemFlatNode>;

    treeFlattener: MatTreeFlattener<FilterItemNode, FilterItemFlatNode>;

    dataSource: MatTreeFlatDataSource<FilterItemNode, FilterItemFlatNode>;

    filtersData: FilterItemNode[];

    checklistSelection = new SelectionModel<FilterItemFlatNode>(true /* multiple */);

    initialize(catData: FilterItemNode[]) {
        const data = this.buildFilterTree(catData, 0);
        this.dataChange.next(data);
    }

    buildFilterTree(obj: {[key: string]: any}, level: number): FilterItemNode[] {
        return Object.keys(obj).reduce<FilterItemNode[]>((accumulator, key) => {
            const item = obj[key];
            const node = new FilterItemNode();
            node.label = obj[key].name;
            node.name = obj[key].name;
            node.id = obj[key].id;
            node.modelPropertyName = obj[key].modelPropertyName;
            node.resourcePropertyName = obj[key].resourcePropertyName;
            node.isSelected =  obj[key].isSelected;

            if (item != null) {
                if (typeof item === 'object'  && item.children !== undefined) {
                    // @ts-ignore
                    node.children = this.buildFilterTree(item.children, level + 1);
                } else {
                    node.label = item.name;
                }
            }

            return accumulator.concat(node);
        }, []);
    }

    checkAll(){
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.treeControl.dataNodes.length; i++) {

            if (this.treeControl.dataNodes[i].isSelected) {
                this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
            }
            this.treeControl.expand(this.treeControl.dataNodes[i]);
        }
    }

    getLevel = (node: FilterItemFlatNode) => node.level;

    isExpandable = (node: FilterItemFlatNode) => node.expandable;

    // @ts-ignore
    getChildren = (node: FilterItemNode): FilterItemNode[] => node.children;

    // tslint:disable-next-line:variable-name
    hasChild = (_: number, _nodeData: FilterItemFlatNode) => _nodeData.expandable;

    // tslint:disable-next-line:variable-name
    hasNoContent = (_: number, _nodeData: FilterItemFlatNode) => _nodeData.name === '';

    transformer = (node: FilterItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.name === node.name
            ? existingNode
            : new FilterItemFlatNode();
        flatNode.name = node.name;
        flatNode.label = node.label;
        flatNode.level = level;
        flatNode.id = node.id;
        flatNode.modelPropertyName = node.modelPropertyName;
        flatNode.resourcePropertyName = node.resourcePropertyName;
        flatNode.isSelected = node.isSelected;
        flatNode.expandable = !!node.children;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    }

    descendantsAllSelected(node: FilterItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        return descendants.every(child => {
            this.checklistSelection.isSelected(child);
        });
    }

    descendantsPartiallySelected(node: FilterItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    filterSelectionToggle(event, node: FilterItemFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        const close = 'Close';

        if (event.checked) {
            const message = 'Selected filter: ';

            this.snackbarService.snackbarMessage(message + node.name, close);

            const indx = this.statesService.filtersList.findIndex(x => x.name === node.name && x.id === x.id);

            if (indx <= -1) {
                this.statesService.filtersList.push({
                    id: node.id,
                    modelPropertyName: node.modelPropertyName,
                    resourcePropertyName: node.resourcePropertyName,
                    name: node.name,
                    isSelected: true,
                });
            }

            this.statesService.isFiltered = this.statesService.filtersList.length > 0;
            this.subscriptionEvents.sendFilterEvent();

            descendants.forEach(child => {
                this.checklistSelection.isSelected(child);

                const index = this.statesService.filtersList.findIndex(x => x.name === child.name && x.id === child.id);

                if (index <= -1) {
                    this.statesService.filtersList.push({
                        id: child.id,
                        modelPropertyName: child.modelPropertyName,
                        resourcePropertyName: child.resourcePropertyName,
                        name: child.name,
                        isSelected: true,
                    });
                }

                this.statesService.isFiltered = this.statesService.filtersList.length > 0;
                this.subscriptionEvents.sendFilterEvent();
            });
        } else {

            const message = 'Deselected filter: ';

            this.snackbarService.snackbarMessage(message + node.name, close);

            this.statesService.filtersList.splice(
                this.statesService.filtersList.findIndex(x => x.name === node.name && x.id === node.id), 1
            );

            this.statesService.isFiltered = this.statesService.filtersList.length > 0;
            this.subscriptionEvents.sendFilterEvent();

            descendants.forEach(child => {
                this.checklistSelection.isSelected(child);

                this.statesService.filtersList.splice(
                    this.statesService.filtersList.findIndex(x => x.name === child.name && x.id === child.id), 1
                );

                this.statesService.isFiltered = this.statesService.filtersList.length > 0;
                this.subscriptionEvents.sendFilterEvent();
            });
        }
        this.checkAllParentsSelection(node);
    }

    filterLeafItemSelectionToggle(event, node: FilterItemFlatNode): void {
        this.checklistSelection.toggle(node);
        node.isSelected ? node.isSelected = false : node.isSelected = true;
        this.checkAllParentsSelection(node);

        const close = 'Close';

        if (event.checked) {

            const message = 'Selected filter: ';

            this.snackbarService.snackbarMessage(message + node.name, close);

            const indx = this.statesService.filtersList.findIndex(x => x.name === node.name && x.id === node.id);

            if (indx <= -1) {
                this.statesService.filtersList.push({
                    id: node.id,
                    modelPropertyName: node.modelPropertyName,
                    resourcePropertyName: node.resourcePropertyName,
                    name: node.name,
                    isSelected: true,
                });
            }

            this.statesService.isFiltered = this.statesService.filtersList.length > 0;
            this.subscriptionEvents.sendFilterEvent();

        } else {

            const message = 'Deselected filter: ';

            this.snackbarService.snackbarMessage(message + node.name, close);

            this.statesService.filtersList.splice(
                this.statesService.filtersList.findIndex(x => x.name === node.name && x.id === node.id), 1
            );

            this.statesService.isFiltered = this.statesService.filtersList.length > 0;
            this.subscriptionEvents.sendFilterEvent();

        }

    }

    checkAllParentsSelection(node: FilterItemFlatNode): void {
        let parent: FilterItemFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    checkRootNodeSelection(node: FilterItemFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    getParentNode(node: FilterItemFlatNode): FilterItemFlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }

     buildingTreeData(): FilterItemNode[] {
         const catData: FilterItemNode[] = [];
         this.filters.forEach(filter => {
             if (filter.children !== undefined) {
                 const children: FilterItemNode[] = [];
                 if (filter.children.length > 0) {
                     for (const child of filter.children) {
                         const childRecord = new FilterItemNode();
                         childRecord.name = child.name;
                         childRecord.label = child.name;
                         childRecord.isSelected = child.isSelected;
                         childRecord.id = child.id;
                         childRecord.resourcePropertyName = child.resourcePropertyName;
                         childRecord.modelPropertyName = child.modelPropertyName;
                         children.push(childRecord);
                     }
                 }
                 const filterRecord = new FilterItemNode();
                 filterRecord.id = filter.id;
                 filterRecord.name = filter.name;
                 filterRecord.label = filter.name;
                 filterRecord.modelPropertyName = filter.modelPropertyName;
                 filterRecord.resourcePropertyName = filter.resourcePropertyName;
                 filterRecord.isSelected = filter.isSelected;
                 filterRecord.children = children;
                 catData.push(filterRecord);
             }
         });
         return catData;
     }

     refreshTreeData() {
        this.initialize(this.buildingTreeData());
     }


    ngOnInit() {
        this.initialize(this.buildingTreeData());
    }
}

import { Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TagModel } from 'ngx-chips/core/tag-model';
import { TagInputComponent } from 'ngx-chips';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  @ViewChild('tagInput') tagInputRef: TagInputComponent | undefined;
  show: boolean = false;

  selectedTag: { category: string; } | undefined;
  items = [];

  itemsAsObjects = [];

  hello() {
    this.show = !this.show;
  }

  autocompleteItems = [
    { value: 3, display: 'Item3' },
    { value: 4, display: 'Item4' },
    { value: 5, display: 'Item5' }
  ];

  autocompleteItemsAsObjects = [
    { id: '1', name: 'Angular', category: 'Framework' },
    { id: '0', name: 'React', category: 'Framework' },
    { id: '2', name: 'TypeScript', category: 'Language' }
  ];

  public onInputFocused(event: any) {
    console.log('focused', event, this.itemsAsObjects);
  }

  public onTagSelected(event: any) {
    console.log('selected', event, this.tagInputRef);
    this.selectedTag = event;
    this.tagInputRef?.dropdown.show();
  }

  public requestAutocompleteItems$ = (text: string): Observable<TagModel[]> => {
    console.log('autocomplete', this.selectedTag);
    if (this.selectedTag) {
      return of(
        this.autocompleteItemsAsObjects.filter(
          item => item.category === this.selectedTag?.category
        )
      );
    }
    return of(this.autocompleteItemsAsObjects);
  };


  // userSelectsString = '';
  // name = 'Angular';
  // userSelects: any[] = [];
  //  suggestions = [{"id":"001","name":"mango"},{"id":"002","name":"apple"},{"id":"003","name":"banana"},{"id":"004","name":"pine"},{"id":"005","name":"orange"},{"id":"006","name":"chery"},{"id":"007","name":"watermelon"},{"id":"008","name":"grapes"},{"id":"009","name":"lemon"}];

  // show: boolean = false;

  // suggest() {
  //   this.show = true;
  // }

  // isSelected(s:any) {
  //  return this.userSelects.findIndex((item: any) => item.id === s.id) > -1 ? true : false;
  // }


  // // selectSuggestion(s) {
  // //   if(this.userSelects.indexOf(s) > -1){
  // //      this.userSelects = this.userSelects.replace(s,'');
  // //   } else {
  // //      this.userSelects += ' '+s;
  // // }
  // //   this.userSelects = this.userSelects.replace(/^\s*/,'');//.trim();
  // //   this.deleteInvalidSelects();
  // //   this.show = false;
  // // }

  // selectSuggestion(s: any) {
  //   this.userSelects.find((item) => item.id === s.id) ? 
  //   this.userSelects = this.userSelects.filter((item) => item.id !== s.id) :
  //   this.userSelects.push(s);
  //   // this.assignToNgModel();
  // }

  // // deleteInvalidSelects() {
  // //  for(var user of this.invalidUsers){
  // //     if(this.userSelects.indexOf(user) > -1){
  // //        this.userSelects = this.userSelects.replace(user, ' ');
  // //     }
  // //   }
  // // }

  // deleteSelects(s: any) {
  //   this.userSelects = this.userSelects.filter((item) => item.id !== s.id);
  //   // this.assignToNgModel();
  // }

  // assignToNgModel() {
  //   this.userSelectsString = '';
  //   this.userSelects.map((item) => this.userSelectsString += item.name + ' ');
  // }
}

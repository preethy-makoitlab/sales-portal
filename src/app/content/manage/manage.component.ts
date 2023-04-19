import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  totalCount: number = 0;
  activeCount: number = 0;
  category: string = "";
  genre: string = "";
  practiceName: string = "";
  categoryArray: any[] = [];
  placeholder: string = "Enter Practice Name";
  icon: string = "../../../assets/icons/success-tick.svg";
  pageNo: number = 1;
  pageSize: number = 10;
  contentLength!: number;

  constructor(private router: Router,
    private contentService: ContentService,
    private categoryService: CategoryService) {}

  fetch() {
    var flag = true;
    this.categoryArray.every(cat => {
      if (cat.category == this.category) {
        this.genre = cat.genre;
        flag = false;
      }
      return flag;
    })
    if (flag) {
      this.genre = "";
    }
  }

  onKey(name: any) {
    console.log(name);
    this.practiceName = name;
  }

  loadCategories() {
    this.categoryService.getCategory().subscribe({
      next: (value) => {
        console.log(value);
        this.categoryArray = value;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onScroll() {
    console.log("scrolled");
    if(this.contentLength) {
      this.pageNo += 1;
      this.contentService.infiniteScroll(this.pageNo, this.pageSize).subscribe({
        next: (value) => {
          console.log(value);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }


  ngOnInit(): void {
    this.loadCategories();
    const input = document.getElementById('category');
    input?.addEventListener('click', function () {
      this.focus();
    });

  }
}

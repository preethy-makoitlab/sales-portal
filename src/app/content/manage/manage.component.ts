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
  contentData: any[] = [];
  category: string = "";
  genre: string = "";
  practiceName: string = "";
  categoryArray: any[] = [];
  deepCopyCategoryArray: any[] = [];
  genreArray: any[] = [];
  placeholder: string = "Enter Practice Name";
  icon: string = "../../../assets/icons/success-tick.svg";
  pageNo: number = 0;
  pageSize: number = 4;
  contentLength!: number;
  isAlert: boolean = false;
  isDisabled: boolean = false;
  alertHeaderDisable: string = "Content Delete"
  alertBodyDisable: string = "Please make sure that you want to delete the content permanently"

  constructor(private router: Router,
    private contentService: ContentService,
    private categoryService: CategoryService) {}

  fetch() {
    console.log(this.genre)
    let categoryArray: any[]= [];
    this.deepCopyCategoryArray.forEach(cat => {
      if (cat.genreId == this.genre) {
        categoryArray.push(cat);
      }
    })
    this.categoryArray = categoryArray;
  }

  onKey(name: any) {
    console.log(name);
    this.practiceName = name;
  }

  dialogShow() {
    this.isAlert = !this.isAlert;
    
  }

  deleteContent(id: string) {
    this.contentService.deleteContent(id).subscribe({
      next: (value) => {
        console.log(value);
        this.listContent();
        
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = true;
  }

  listContent() {
    this.contentService.contentList(null, this.pageNo, this.pageSize).subscribe({
      next: (value) => {
        console.log(value);
        this.totalCount = value.count;
        this.contentLength = value.data.length;
        this.contentData = value.data;
        console.log(this.contentData, this.contentLength);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadCategories() {
    this.categoryService.getCategory().subscribe({
      next: (value) => {
        console.log(value);
        this.categoryArray = value;
        this.deepCopyCategoryArray  = JSON.parse(JSON.stringify(value));
        this.categoryArray.forEach(cat => {
          let obj = {
            id: cat.genreId, 
            genre: cat.genre
          }
          var flag = true;
          if(this.genreArray.some(gen => gen.id === obj.id)) {
            flag = false;
          }
          if(flag){
            this.genreArray.push(obj);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onScroll() {
    console.log("scrolled");
    if(this.contentLength < this.totalCount) {
      this.pageNo += 1;
      this.contentService.contentList(null, this.pageNo, this.pageSize).subscribe({
        next: (value) => {
          console.log(value);
          value.data.forEach((content: any) => {
            this.contentData.push(content);
          })
          this.contentLength = this.contentData.length;
          console.log(this.contentData, this.contentLength);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  filter() {
    console.log(this.genre, this.category, this.practiceName);
    let filter = {
      genre: this.genre || null,
      category: this.category || null,
      practiceName: this.practiceName || null
    }
    this.contentService.contentList(filter, this.pageNo, this.pageSize).subscribe({
      next: (value) => {
        console.log(value);
        this.contentData = value.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.listContent();
    this.loadCategories();
    const input = document.getElementById('category');
    input?.addEventListener('click', function () {
      this.focus();
    });

  }
}

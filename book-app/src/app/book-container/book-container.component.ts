import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-container',
  templateUrl: './book-container.component.html',
  styleUrls: ['./book-container.component.scss'],
})
export class BookContainerComponent implements OnInit {
  books: any = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    const url = 'http://127.0.0.1:3000/book';
    this.http.get(url).subscribe((res) => {
      this.books = res;
      console.log(this.books);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(BookFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'book-container-form',
  templateUrl: './book-container.form.html',
})
export class BookFormComponent {
  title: string = '';
  author: string = '';

  constructor(private http: HttpClient) {}

  formSubmit() {
    if (this.title != '' && this.author != '') {
      const body = {
        name: this.title,
        author: this.author,
      };

      this.http
        .post<any>('http://127.0.0.1:3000/book', body)
        .subscribe((data) => {
          console.log(data.id);
        });
      window.location.reload();
    }
  }
}

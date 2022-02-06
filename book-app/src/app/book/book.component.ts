import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() id: number = 0;
  @Input() name = 'Test Title';
  @Input() author = 'Test Author';
  @Input() completed = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onChange(checked: boolean) {
    const body = {
      name: this.name,
      author: this.author,
      isRead: !checked,
    };
    const url = `http://127.0.0.1:3000/book/${this.id}`;
    this.http.put<any>(url, body).subscribe((data) => console.log(data));
  }
}

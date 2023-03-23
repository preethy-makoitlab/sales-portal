import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoserviceService } from '../../services/videoservice.service';

@Component({
  selector: 'app-videostream',
  templateUrl: './videostream.component.html',
  styleUrls: ['./videostream.component.scss']
})
export class VideostreamComponent implements OnInit{
  @ViewChild('video')
  video!: ElementRef;

  videoUrl!: string;

  constructor(private videoService: VideoserviceService,
    private http: HttpClient) { }

  ngOnInit() {
    const videoKey = 'Yoga_Apsara_Anyo_Ep 1.mp4'; 
    // const headers = new HttpHeaders().set('Range', 'bytes=0-');
    
    this.videoService.getVideoUrl(videoKey).subscribe({
      next: (url) => {
      this.videoUrl = url;
      this.http.get<any>(url)
      // this.http.head(url, { headers }).subscribe((response: HttpResponse) => {
      //   const contentRange = response.headers.get('Content-Range');
      //   const contentLength = response.headers.get('Content-Length');
      //   const start = Number(contentRange!.split('/')[0].split('-')[0]);
      //   const end = Number(contentRange!.split('/')[1]);
  
      //   const video = document.getElementById('video') as HTMLVideoElement;
      //   video.addEventListener('timeupdate', () => {
      //     if (video.currentTime >= end) {
      //       video.pause();
      //     }
      //   });
      // });
      },
      error: (error) => {
        // error
      }
    });

  }
}

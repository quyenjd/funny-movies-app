import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from '@app/services/youtube.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
  embedUrl?: SafeResourceUrl;

  @Input() set url(value: string) {
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.youtubeService.toEmbedLink(value).url
    );
  }

  constructor(
    private youtubeService: YoutubeService,
    private sanitizer: DomSanitizer
  ) {}
}

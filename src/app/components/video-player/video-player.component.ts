import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from '@app/services/youtube.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
  private _embedUrl?: string;
  embedUrl?: SafeResourceUrl;
  loading = true;

  @Input() set url(value: string) {
    const embedUrl = this.youtubeService.toEmbedLink(value).url;
    if (this._embedUrl !== embedUrl) {
      this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      this._embedUrl = embedUrl;
      this.loading = true;
    }
  }

  constructor(
    private youtubeService: YoutubeService,
    private sanitizer: DomSanitizer
  ) {}
}

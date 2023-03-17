import { Injectable } from '@angular/core';

// https://stackoverflow.com/a/27728417
const YOUTUBE_ID_PATTERN =
  /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  toEmbedLink(any: string) {
    const id = (any.match(YOUTUBE_ID_PATTERN) ?? [])[1];

    return {
      id: id || null,
      url: `https://www.youtube.com/embed/${id}`,
    };
  }
}

import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';


/**
 * https://stackoverflow.com/questions/47811784/passing-authorization-header-for-images-src-to-remote-server-in-ionic-page
 */
@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  transform(url: string): Observable<SafeUrl> {
      return this.http
          .get(url, { responseType: 'blob' })
          .pipe(map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))));
  }
}

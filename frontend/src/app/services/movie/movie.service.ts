import { HttpClient } from '@angular/common/http'; import { Injectable } from '@angular/core';
import { movie } from 'src/app/models/movie/movie';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getMovieList(): Promise<movie[]> {
    return this.http.get<movie[]>(`${this.apiUrl}/movie`).toPromise();
  }

  addMovie(movieName: string, movieDescription: string, file: File, duration: number, ticketPrice: number){
    const uploadData = new FormData();
    uploadData.append('image', file)
    uploadData.append('movieName', movieName);
    uploadData.append('movieDescription', movieDescription);
    uploadData.append('duration', duration as any);
    uploadData.append('ticketPrice', ticketPrice as any);
    return this.http.post(`${this.apiUrl}/movie`, uploadData).toPromise() as any;
  }

  updateMovie(movieID: string, movieName: string, movieDescription: string, duration: number, ticketPrice: number): Promise<any> {
    return this.http.put(`${this.apiUrl}/movie/${movieID}`, { movieName, movieDescription, duration, ticketPrice }).toPromise();;
  }

  deleteMovie(movieID: string): Promise<any> {
    return this.http.delete(`${this.apiUrl}/movie/${movieID}`).toPromise();
  }

  getMovieById(movieID: String): Promise<movie> {
    return this.http
      .get<movie>(`${this.apiUrl}/movie/${movieID}`)
      .toPromise();
  }
}

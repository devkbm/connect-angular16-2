import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DayPilot} from "@daypilot/daypilot-lite-angular";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {

  events: any[] = [
    {
      id: 1,
      start: "2022-09-01T13:00:00",
      end: "2022-09-01T15:00:00",
      text: "Event 1",
      resource: "R1",
      barColor: "#f1c232"
    },
    {
      id: 2,
      start: "2022-09-01T10:00:00",
      end: "2022-09-01T12:00:00",
      text: "Event 2",
      resource: "R1"
    }
  ];

  resources: any[] = [
      {name: "Resource 1", id: "R1"},
      {name: "Resource 2", id: "R2"},
      {name: "Resource 3", id: "R3"},
      {name: "Resource 4", id: "R4"},
      {name: "Resource 5", id: "R5"},
      {name: "Resource 6", id: "R6"},
      {name: "Resource 7", id: "R7"},
      {name: "Resource 8", id: "R8"}
  ];

  constructor(private http: HttpClient) {
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
        observer.complete();
        }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getResources(): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.resources);
        observer.complete();
      }, 200);
    });

    // return this.http.get("/api/resources");
  }


}

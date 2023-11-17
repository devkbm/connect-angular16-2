import {Component, ViewChild, AfterViewInit, inject} from "@angular/core";
import {DayPilot, DayPilotCalendarComponent} from "@daypilot/daypilot-lite-angular";
import {DataService} from "./data.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit {

  @ViewChild("calendar")
  calendar!: DayPilotCalendarComponent;

  config: DayPilot.CalendarConfig = {
    viewType: "Resources",
    startDate: new DayPilot.Date("2022-09-01"),
    onTimeRangeSelected: async params => {
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");

      const dp = this.calendar.control;
      dp.clearSelection();
      if (modal.canceled) {
        return;
      }

      dp.events.add({
        start: params.start,
        end: params.end,
        id: DayPilot.guid(),
        text: modal.result,
        resource: params.resource
      });

    }
  };

  private ds = inject(DataService);

  ngAfterViewInit(): void {

    const from = this.config.startDate as DayPilot.Date;
    const to = from.addDays(1);

    forkJoin([
      this.ds.getResources(),
      this.ds.getEvents(from, to)
    ]).subscribe(data => {
        const options = {
          columns: data[0],
          events: data[1]
        };
        this.calendar.control.update(options);
    });

  }

}

import { Component } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';

export interface JsonModel {
   departureTime: string;
}

export interface User {
   departureTime: Date;
}

@Component({
    selector: 'my-app',
    template: `
      <form #form="ngForm">
           <div class="example-config">
               <p>Form model: {{ user | json }}</p>
               <p>Model: {{ output }}</p>
           </div>
           <label>
               Select departure time:
               <kendo-timepicker
                   #departureTime
                   name="departureTime"
                   [(ngModel)]="user.departureTime"
                   (valueChange)="handleChange($event)"
               ></kendo-timepicker>
           </label>
       </form>
    `
})
export class AppComponent implements OnInit {
   public user: User;

   // Parse JSON date in UTC timezone
   public model: JsonModel = JSON.parse('{ "departureTime": "2017-06-30T12:22:32Z" }');

   // Stringify model for presentational purposes
   public output: string = JSON.stringify(this.model);

   constructor(private intl: IntlService) {}

   public ngOnInit() {
       this.user = this.parse(this.model);
   }

   public handleChange(value: Date) {
       // Update the JSON departureTime string date
       this.model.departureTime = this.intl.formatDate(value,  'HH:mm:ss');

       this.output = JSON.stringify(this.model);
   }

   // A simple method for the string-to-date conversion
   private parse(json) {
       Object.keys(json).map(key => {
           const date = new Date(json[key]);
           if (!isNaN(date.getTime())) { json[key] = date; }
       });

       return json;
   }
}

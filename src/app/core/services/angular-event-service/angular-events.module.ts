import { EventsService } from "./angular-events.service";
import { ModuleWithProviders, NgModule } from "@angular/core";

@NgModule({
  providers: [EventsService],
})
export class EventsModule {
  public static forRoot(): ModuleWithProviders<EventsModule> {
    return {
      ngModule: EventsModule,
      providers: [EventsService],
    };
  }
}

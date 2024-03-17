import { Pipe, PipeTransform } from "@angular/core";
import { ITask } from "../types/task.interface";

@Pipe({
  name: "filterTask",
})
export class FilterTaskPipe implements PipeTransform {
  transform(allTasksSig: ITask[], search: string): ITask[] {
    if (search.length === 0) return allTasksSig;
    return allTasksSig.filter(task => task.name.toLowerCase().includes(search.toLowerCase()));
  }
}

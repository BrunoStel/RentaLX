import { IDateProvider } from "../IDateProvider";
import  dayjs  from "dayjs";
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

class DayJsDateProvider implements IDateProvider{
     
    convertToUTC(date: Date): string {
         return dayjs(date).utc().local().format()
     }

     compareInHours(expected_return_date: Date): Number {
        const startDateUTC = this.convertToUTC(this.dateNow())
        const expectedDateUTC = this.convertToUTC(expected_return_date)

        return dayjs(expectedDateUTC).diff(startDateUTC, "hours")
    }

    dateNow():Date{
        return dayjs().toDate()
    }

}

export { DayJsDateProvider } 
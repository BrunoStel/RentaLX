import { IDateProvider } from "../IDateProvider";
import  dayjs  from "dayjs";
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

class DayJsDateProvider implements IDateProvider{
     
    convertToUTC(date: Date): string {
         return dayjs(date).utc().local().format()
     }

     compareInHours(start_date:Date, expected_return_date: Date): Number {
        const startDateUTC = this.convertToUTC(start_date)
        const expectedDateUTC = this.convertToUTC(expected_return_date)

        return dayjs(expectedDateUTC).diff(startDateUTC, "hours")
    }

    dateNow():Date{
        return dayjs().toDate()
    }
    
    addDays(days: number):Date{
        return dayjs().add(days, "days").toDate()
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate()
    }

    compareIfBefore(start_date: Date, end_date: Date): Boolean {
       return dayjs(start_date).isBefore(end_date)
    }

}

export { DayJsDateProvider } 



interface IDateProvider{
    compareInHours(star_date:Date,expected_return_date:Date):Number
    convertToUTC(date:Date):string
    dateNow():Date
    addDays(days:number):Date
    addHours(hours:number):Date
    compareIfBefore(start_date:Date, end_date:Date):Boolean
}

export{IDateProvider}



interface IDateProvider{
    compareInHours(expected_return_date:Date):Number
    convertToUTC(date:Date):string
    dateNow():Date
}

export{IDateProvider}



interface IDateProvider{
    compareInHours(star_date:Date,expected_return_date:Date):Number
    convertToUTC(date:Date):string
    dateNow():Date
}

export{IDateProvider}
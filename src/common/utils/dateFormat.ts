export const getFormattedDate = (date: Date) => {

    const year = date.getFullYear(),
        month = ('0' + (date.getMonth() + 1)).slice(-2),
        day = (date.getDate().toString().length == 1) ? '0' + date.getDate() : date.getDate()
    return [year, month, day].join('.');
}

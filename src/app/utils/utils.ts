
import * as moment from 'moment';

export function isoToDDMMYYHHMM(date: string) { //dd-mm-yy
    if (!date) {
        return '';
    }
    const dateObj = new Date(date);
    const day = prependToString(dateObj.getDate().toString(), '0', 2);
    const month = prependToString((dateObj.getMonth() + 1).toString(), '0', 2);
    const year = dateObj.getFullYear();
    const hour = prependToString(dateObj.getHours().toString(), '0', 2);
    const minute = prependToString(dateObj.getMinutes().toString(), '0', 2);
    return day + '-' + month + '-' + year + ' ' + hour + ':' + minute;
}

export function isoToDDMMYYYY(date: string) { //dd/mm/yy
    if (!date) {
        return '';
    }
    const dateObj = new Date(date);
    const day = prependToString(dateObj.getDate().toString(), '0', 2);
    const month = prependToString((dateObj.getMonth() + 1).toString(), '0', 2);
    const year = dateObj.getFullYear();
    return day + ' / ' + month + ' / ' + year;
}

export function prependToString(str: string, prependText: string, minLength: number) {
    let prependedString = str
    while (prependedString.length < minLength) {
        prependedString = prependText + prependedString
    }
    return prependedString;
}

export function dateToddMMYYYY(dateString: Date) {
    const date: Date = new Date(dateString);
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();
    const formattedDate: string = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
    return formattedDate;
}

export function ddmmyyyyToDate(dateString: string) {
    const dateParts = dateString.split("/");
    return(new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0])); 
}

export function isoToTime(dateString: string) { //hh:mm
    const date: Date = new Date(dateString);
    const hours: number = date.getHours();
    const minutes: string = date.getMinutes().toString().padStart(2, '0');;
    const formattedDate: string = `${hours}:${minutes}`;
    return formattedDate;
}

export function isoToYMD(isoString: string): string { //yyyy-mm-dd
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

export function isDateInRange(inputDate: string, startDateISO: string, endDateISO: string): boolean {
    const date = new Date(inputDate);
    const startDate = new Date(startDateISO);
    const endDate = new Date(endDateISO);
    return date >= startDate && date <= endDate;
}

export function sendMessageToParent(method: string, data: object) {
    const message = {method: method, data : data}
    window.parent.postMessage(message, '*');
}

export function getDateRange(range: string) {
    const dateRange = {startDate: new Date().toISOString(), endDate: new Date().toISOString()}
    switch(range) {
        case 'Today':
            return dateRange;
        case 'Last 7 days':
            dateRange.startDate = getNDaysBack(new Date(), 7).toISOString();
            return dateRange;
        case 'Last 30 days':
            dateRange.startDate = getNDaysBack(new Date(), 30).toISOString();
            return dateRange;
        case 'Last 60 days':
            dateRange.startDate = getNDaysBack(new Date(), 60).toISOString();
            return dateRange;
        case 'Last 90 days':
            dateRange.startDate = getNDaysBack(new Date(), 90).toISOString();
            return dateRange;
        default: 
            return dateRange.startDate = getNDaysBack(new Date(), 30).toISOString();
    }
}

export function getNDaysBack(endDate: Date, daysCount: number) {
    return new Date(endDate.setDate(endDate.getDate() - daysCount));
}

export function filterByDate(data: any[], dateField: string, dateRange: any) {
    const filteredData: any[] = [];
    data.forEach(d => {
        if(d[dateField] && isValidDate(d[dateField])) {
            const date = new Date(d[dateField]).toISOString();
            if(date <= dateRange.endDate && date >= dateRange.startDate) {
                filteredData.push(d)
            }
        }
    })
    return filteredData;
}

export function isValidDate(dateString: string) {
    let isValid = false;
    const date = new Date(dateString);
    if(!isNaN(date.getTime())) {
        isValid = true;
    }
    return isValid;
}
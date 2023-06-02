
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

export function isoToDDMMYYYY(date: string) { //dd-mm-yy
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

export function isDateInRange(startDateISO: string, endDateISO: string): boolean | string{
    const currentDate = new Date();
    const startDate = new Date(startDateISO);
    const endDate = new Date(endDateISO);
    if(currentDate < startDate) {
      return "early";
    }
    else {
      return currentDate >= startDate && currentDate <= endDate;
    }
}
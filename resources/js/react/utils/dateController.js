import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import timezone from 'dayjs/plugin/timezone';
import utc from "dayjs/plugin/utc";
import WeekOfYear from "dayjs/plugin/weekOfYear";



export const isBetweenDate = ({ compareDate, startDate, endDate}) => {
   return  dayjs(compareDate).isBetween(startDate, endDate);
}


// is same or before



export function CompareDate(){
    dayjs.extend(utc);
    dayjs.extend(quarterOfYear);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(WeekOfYear);
    dayjs.extend(isBetween);
    dayjs.extend(isSameOrAfter);
    dayjs.extend(timezone);
    this.dayjs = dayjs;
}


CompareDate.prototype.isBetween = function(compareDate, startDate, endDate){
    this.current = this.dayjs(compareDate).format('YYYY-MM-DD');
    this.start = this.dayjs(startDate).format('YYYY-MM-DD');
    this.end = this.dayjs(endDate).format('YYYY-MM-DD');
    return this.dayjs(this.current).isBetween(this.start, this.end);
}

//  is same or before
CompareDate.prototype.isSameOrBefore = function(current, compare){
    this.current = this.dayjs(current).format('YYYY-MM-DD');
    this.compare = this.dayjs(compare).format('YYYY-MM-DD');
    return this.dayjs(this.current).isSameOrBefore(this.compare);
}


//  is same or after
CompareDate.prototype.isSameOrAfter = function(current, compare){
    this.current = this.dayjs(current).format('YYYY-MM-DD');
    this.compare = this.dayjs(compare).format('YYYY-MM-DD');
    return this.dayjs(this.current).isSameOrAfter(this.compare);
}


// is isSame
CompareDate.prototype.isSame = function(current, compare) {
    this.current = this.dayjs(current).format('YYYY-MM-DD');
    this.compare = this.dayjs(compare).format('YYYY-MM-DD');
    return this.dayjs(this.current).isSame(this.compare);
}

// is before
CompareDate.prototype.isBefore = function(current, compare) {
    this.current = this.dayjs(current).format('YYYY-MM-DD');
    this.compare = this.dayjs(compare).format('YYYY-MM-DD');
    return this.dayjs(this.current).isBefore(this.compare);
}

// is after
CompareDate.prototype.isAfter = function(current, compare) {
    this.current = this.dayjs(current).format('YYYY-MM-DD');
    this.compare = this.dayjs(compare).format('YYYY-MM-DD');
    return this.dayjs(this.current).isAfter(this.compare);
}

// is equal
CompareDate.prototype.isEqual = function (current, compare) {
    this.current = this.dayjs(current).format('YYYY-MM-DD');
    this.compare = this.dayjs(compare).format('YYYY-MM-DD');
    return this.dayjs(this.current).isSame(this.compare);
}

// diff




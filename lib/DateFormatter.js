import React from 'react'

const DateFormatter = (tobeformat) => {
  
    const date = new Date(tobeformat); 

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const formattedDate = monthNames[date.getMonth()] + ' ' +
    date.getDate() + ' ' +
    date.getHours() + ':' +
    (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

    return formattedDate;
  
}

export default DateFormatter
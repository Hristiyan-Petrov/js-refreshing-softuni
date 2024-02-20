function dayOfWeek(day) {
    let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (day <= weekdays.length) {
        console.log(weekdays[day - 1]);
    } else {
        console.log('Invalid day');
    }
}
dayOfWeek(7);
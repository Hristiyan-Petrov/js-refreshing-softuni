// Predicate, built-in higher order function (filter), IIFE usage

function filterEmployees(input, criteria) {
    let filteredEmplyees = null;
    if (criteria !== 'all') {
        let [poperty, value] = criteria.split('-');
        let meetCriteria = x => x[poperty] === value;
        filteredEmplyees = JSON.parse(input).filter(meetCriteria);
    } else {
        filteredEmplyees = JSON.parse(input);
    }


    let printEmplyees = (() => {
        filteredEmplyees.forEach((emp, i) => {
            console.log(`${i}. ${emp.first_name} ${emp.last_name} - ${emp.email}`);
        });
    })();
}

filterEmployees(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`,
    'gender-Female'
)
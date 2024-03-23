function createBMIData(name, age, weight, height) {

    let person = {
        name,
        personalInfo: {
            age,
            weight,
            height
        },
        BMI: calculateBMI(weight, height),
    }

    return (function addStatus() {
        person.status = setStatus(person.BMI);

        return (function addRecommendation() {
            if (person.status === 'obese') {
                person.recommendation = 'admission required';
            }

            // console.log(person);
            return person;
        })();
    })();



    // Object.entries(person).forEach(([key ,value]) => {
    //     console.log(key);
    //     console.log(value);
    // });

    function calculateBMI(w, h) {
        return Math.round(w / (h / 100) ** 2);
    }

    function setStatus(i) {
        if (i < 18.5) {
            return 'underweight'
        } else if (i > 18.5 && i < 25) {
            return 'normal';
        } else if (i > 25 && i < 30) {
            return 'overweight';
        } else {
            return 'obese';
        }
    }
}

createBMIData('Hris', 22, 75, 181)
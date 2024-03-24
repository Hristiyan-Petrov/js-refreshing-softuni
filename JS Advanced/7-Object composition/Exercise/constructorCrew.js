function solve(worker) {
    let { dizziness } = worker;
    
    if (dizziness === true) {
        let hydrationAmount = 0.1 * worker.weight * worker.experience;
        worker.levelOfHydrated += hydrationAmount;
        worker.dizziness = false;
    }

    return worker;
    // console.log(worker);
}

solve(
    { weight: 95,
        experience: 3,
        levelOfHydrated: 0,
        dizziness: false }
      

)
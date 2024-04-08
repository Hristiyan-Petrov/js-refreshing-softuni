(() => {
    console.log('yeeeey');

    const divWrapper = document.querySelector('.monkeys');

    const monkeyPartialSource = document.getElementById('monkey-partial-template').innerHTML;
    Handlebars.registerPartial('monkeyPartial', monkeyPartialSource);

    const allMonkeysParialSource = document.querySelector('#monkeys-template').innerHTML;
    const createMokeysTemplate = Handlebars.compile(allMonkeysParialSource);

    let monkeysHtml = createMokeysTemplate({ monkeys });
    console.log(monkeys);
    divWrapper.innerHTML = monkeysHtml;
})();


function createTable(data) {
    let htmlResult = '<table>';

    data.forEach(employeeData => {
        htmlResult +=
            `\n   <tr>
        ${Object.values(JSON.parse(employeeData)).map(value => `<td>${value}</td>\n`).join('')}
        </tr>`;
        // console.log(JSON.parse(employeeData).name);
    });

    htmlResult += '</table>';
    // return htmlResult;
    console.log(htmlResult);
}
    /* <table>
    <tr>
        <td>Pesho</td>
        <td>Promenliva</td>
        <td>100000</td>
    </tr>
    <tr>
        <td>Teo</td>
        <td>Lecturer</td>
        <td>1000</td>
    </tr>
    <tr>
        <td>Georgi</td>
        <td>Lecturer</td>
        <td>1000</td>
    </tr>
</table> */


createTable(
    [
        '{"name":"Pesho","position":"Promenliva","salary":100000}',
        '{"name":"Teo","position":"Lecturer","salary":1000}',
        '{"name":"Georgi","position":"Lecturer","salary":1000}'
    ]

)
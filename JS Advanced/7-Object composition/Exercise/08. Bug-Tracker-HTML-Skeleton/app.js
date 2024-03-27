function solve() {

    let ID = 0;
    let bugList = [];
    let reportContainer;

    let report = function (author, description, reproducible, severity, status = 'Open') {
        let bug = {
            ID,
            author,
            description,
            reproducible,
            severity,
            status
        }
        bugList.push(bug);
        ID++;
        updateHTML();
    }

    let setStatus = (id, newStatus) => {
        let currBug = bugList.find(bug => bug.ID === id);
        currBug.status = newStatus;
        updateHTML();
    }

    let remove = id => {
        let currBug = bugList.find(bug => bug.ID === id);
        bugList = bugList.filter(bug => bug != currBug);
        updateHTML();
    }

    let sort = (method = 'ID') => {
        if (method === 'author') {
            bugList.sort((a, b) => a[method].localeCompare(b[method]));
        } else {
            bugList.sort((a, b) => a[method] - b[method]);
        }
        updateHTML();
    }

    let output = selector => {
        reportContainer = document.querySelector(selector);
        updateHTML();
    }

    function updateHTML() {
        if (reportContainer) {
            reportContainer.innerHTML = bugList.map(bug => `
                    <div id="report_${bug.ID}" class="report">
                        <div class="body">
                            <p>${bug.description}</p>
                        </div>
                        <div class="title">
                            <span class="author">Submitted by: ${bug.author}</span>
                            <span class="status">${bug.status} | ${bug.severity}</span>
                        </div>
                    </div>`).join("\n");
        }
    }

    return {
        report,
        setStatus,
        remove,
        sort,
        output
    }
}

let tracker = solve();
tracker.output('#content');
tracker.report('guy', 'report content', true, 5);
tracker.report('second guy', 'report content 2', true, 3);
tracker.report('abv', 'report content three', true, 4);

tracker.sort('author');

// let reports = $('.report');

// expect(reports.eq(0).attr('id')).to.equal('report_2', "Sorting order wasn't followed, encountered wrong report ID.");
// expect(reports.eq(1).attr('id')).to.equal('report_0', "Sorting order wasn't followed, encountered wrong report ID.");
// expect(reports.eq(2).attr('id')).to.equal('report_1', "Sorting order wasn't followed, encountered wrong report ID.");

tracker.sort('severity');

// reports = $('.report');

// expect(reports.eq(0).attr('id')).to.equal('report_1', "Sorting order wasn't followed, encountered wrong report ID.");
// expect(reports.eq(1).attr('id')).to.equal('report_2', "Sorting order wasn't followed, encountered wrong report ID.");
// expect(reports.eq(2).attr('id')).to.equal('report_0', "Sorting order wasn't followed, encountered wrong report ID.");

tracker.sort('ID');

// reports = $('.report');

// expect(reports.eq(0).attr('id')).to.equal('report_0', "Sorting order wasn't followed, encountered wrong report ID.");
// expect(reports.eq(1).attr('id')).to.equal('report_1', "Sorting order wasn't followed, encountered wrong report ID.");
// expect(reports.eq(2).attr('id')).to.equal('report_2', "Sorting order wasn't followed, encountered wrong report ID.");
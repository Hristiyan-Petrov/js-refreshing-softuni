function solve(browser, commands) {

    for (let line of commands) {
        let [action, ...site] = line.split(' ');
        site = site.join(' ');

        if (action === 'Open') {
            browser['Open Tabs'].push(site);
            browser['Browser Logs'].push(line);

        } else if (action === 'Close') {
            if (!browser['Open Tabs'].includes(site)) {
                continue;
            }

            browser['Open Tabs'] = browser['Open Tabs'].filter(tab => tab !== site);
            browser['Recently Closed'].push(site);
            browser['Browser Logs'].push(line);

        } else {
            for (let key in browser) {
                if (key === 'Browser Name') {
                    continue;
                }

                browser[key] = [];
            }
        }
    }

    // console.log(Object.keys(browser));

    Object.keys(browser).forEach(key => {
        if (key === 'Browser Name') {
            console.log(browser[key]);

        } else if (key === "Open Tabs") {
            console.log(`Open Tabs: ${browser[key].join(', ')}`)

        } else if (key === "Recently Closed") {
            console.log(`Recently Closed: ${browser[key].join(', ')}`)

        } else if (key === "Browser Logs") {
            console.log(`Browser Logs: ${browser[key].join(', ')}`)

        }
    })

}

solve({
    "Browser Name": "Mozilla Firefox",
    "Open Tabs": ["YouTube"],
    "Recently Closed": ["Gmail", "Dropbox"],
    "Browser Logs": []
},
    ["Open Google Translate", 'Close Google Translate', 'Open Investopedia']

)
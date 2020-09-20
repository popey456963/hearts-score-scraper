function onError(error) {
    console.error(`Error: ${JSON.stringify(error)}`);
}

function sendMessageToTabs(tabs, type) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            { type }
        ).then(response => {
            if (response.success) {
                console.log('Done!')
            } else {
                console.log('Error :(')
            }
        }).catch(onError)
    }
}
  

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(
        tabs => sendMessageToTabs(tabs, 'copy')
    ).catch(onError)
});
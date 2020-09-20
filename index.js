function tableToJson(table) {
    return Array.from(table.rows).map(row => 
        Array.from(row.cells).map(cell => cell.innerHTML)
    )
}

function parsePlayers(divs) {
    return Array.from(divs).map(div => {
        const seat = Number(div.children[0].innerHTML.substring(1))
        const name = div.children[1].children[1].children[1].textContent
        const score = Number(div.children[2].children[0].textContent)
        const time = div.children[2].children[1].textContent

        return {
            seat,
            name,
            score,
            time
        }
    })
}

function getScores() {
    const history = tableToJson(document.querySelector('.tcrdpan div div table.br'))
        .map(row => row.map(cell => Number(cell)))
    const players = parsePlayers(document.querySelectorAll('.tplcont > div'))

    return { players, history }
}

function copyScoresToClipboard() {
    const { players, history } = getScores()

    const csvPlayers = Papa.unparse(players)
    const csvHistory = Papa.unparse({
        fields: players.map(player => player.name),
        data: history
    })

    navigator.clipboard.writeText(csvPlayers + '\n\n' + csvHistory)
}

browser.runtime.onMessage.addListener(request => {
    if (request.type === 'copy') {
        copyScoresToClipboard()

        return Promise.resolve({ success: true })
    } else {
        throw new Error('unknown message type')
    }

    return Promise.resolve({ success: false })
})

console.log('hello, world!')
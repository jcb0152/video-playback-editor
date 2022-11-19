document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("playback-speed-range").addEventListener('change', main)
    document.getElementById("playback-speed-text").addEventListener('change', main)
})

async function main(event) {
    const newRate = event.target.value
    document.getElementById("playback-speed-text").value = newRate
    document.getElementById("playback-speed-range").value = newRate
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

    chrome.scripting.executeScript({
        args: [newRate],
        target: {
            tabId: tab.id,
        },
        func: (arg1) => {
            document.querySelectorAll("video").forEach((x) => x.playbackRate = arg1)
        }
    });
}

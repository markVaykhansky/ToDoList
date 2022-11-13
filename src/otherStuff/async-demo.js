
function sleep(ms) {
    console.log("Sleeping " + ms + " MS");
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncFunction() {
    await sleep(3000);
    console.log('async function done');
}

(() => {
    asyncFunction();
    console.log('done');
})();
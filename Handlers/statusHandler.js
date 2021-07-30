
// JS

/**
 * 
 * @param {import("discord.js").Collection<string, import("./Types").TemplateStatus>} Activities
 * @param {import("../main/Client")} This
 */
function statusHandler(Activities, This) {
    const Arr = Activities.array();
    if (!Arr.length || Arr.length < 1) return;
    if (Arr.length === 1) {
        const status = Arr[0];
        This.client.user.setStatus(status.status);
        This.client.user.setActivity(status.name, {type: status.type, url: status.url});

        console.warn(`Length of Activities was 1, Recommended Lifetime duration should be more than 30 `);
    }
    let i = 0;
    let Timeout = setTimeout(function () { }, 1000)
    function update() {
        clearTimeout(Timeout);
        Timeout = null;
        let status = Arr[i]
        if (!status) {
            status = Arr[0];
            i = 0;
        }
        i++;
        
        This.client.user.setStatus(status.status);
        This.client.user.setActivity(status.name, {type: status.type, url: status.url});
        Timeout = setTimeout(update, status.Lifetime * 1000);
    }

    update()
}

module.exports = statusHandler
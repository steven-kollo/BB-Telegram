function handle_service_checkbox(e) {
    freeze_group_on_select(e.target.id[1])
    set_required_on_select()
}

function freeze_group_on_select(group_id) {
    const checks = $.map($(`#g${group_id}c > div > div > .form-check > input`), input => input.checked)
    if (checks.includes(true)) {
        document.getElementById(`g${group_id}ch`).parentNode.setAttribute("onclick", "return false")
        document.getElementById(`g${group_id}ch`).setAttribute("data-toggle", "")
    } else {
        document.getElementById(`g${group_id}ch`).parentNode.setAttribute("onclick", "")
        document.getElementById(`g${group_id}ch`).setAttribute("data-toggle", "collapse")
    }
}

function set_required_on_select() {
    const services = document.getElementsByClassName("service-checkbox")
    Array.from(services).forEach((s) => {
        const textarea = document.getElementById(`${s.id}t`)
        if (s.checked) {
            textarea.required = true
        } else {
            textarea.required = false
        }
       
    })
}

function handle_submit() {
    if (check_filled_fields() && check_personal_fields()) {
        $("#form").submit()
    } else {
        console.log("handle submit")
    }
}

function check_filled_fields() {
    let checked = false
    let filled = true
    Array.from(document.getElementsByClassName("service-checkbox")).forEach((s) => {
        if (s.checked) {
            if (document.getElementById(`${s.id}t`).value == "") { filled = false } 
            if (checked == false) { checked = true }
        }
    })
    return checked && filled
}

function check_personal_fields() {
    const personal = document.getElementById("personal-container")
    if (personal.hidden) {
        personal.hidden = false
        document.getElementById("group-container").hidden = true
        document.getElementById("back-btn").hidden = false
    } else {
        return true
    }
}

function back_btn() {
    document.getElementById("personal-container").hidden = true
    document.getElementById("group-container").hidden = false
    document.getElementById("back-btn").hidden = true
}

function add_check_services(services) {
    const table = document.getElementById("service-table")
    add_check_consults(services)
    for (const service of services) {
        service.symbol = groups_json[service.group].symbol
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <th width="80%">
            ${service.symbol} ${service.name}
            <small style="width: 90%;" id="personal-name-help" class="form-text text-muted">${service.info}</small>
            </th>
            <th width="20%"><span class="badge badge-secondary">${service.price}</span></th>
        `
        table.appendChild(tr)
    }
}

function add_check_consults(services) {
    const table = document.getElementById("consult-table")
    let groups = []
    for (const service of services) {
        if (!groups.includes(service.group)) {
            groups.push(service.group)
        }
    }

    for (const group_id of groups) {
        const tr = document.createElement("tr")
        const group = groups_json[group_id]
        tr.innerHTML = `
            <th width="80%">
            ${group.symbol} ${group.consult_item.name}
            <small style="width: 90%;" id="personal-name-help" class="form-text text-muted">${group.consult_item.description}</small>
            </th>
            <th width="20%"><span class="badge badge-secondary">${group.consult_item.price}</span></th>
        `
        table.appendChild(tr)
    }
}

// TESTS 
const test_services = [
    {
        group: 0,
        name: "Моя юр задача",
        info: "Описываю в свободной форме ситуацию, вы проведете консультацию и определите объем работы",
        price: "3 500₽ / час"
    },
    {
        group: 2,
        name: "Моя бух задача",
        info: "Описываю в свободной форме ситуацию",
        price: "3 000₽ / час"
    }
]
setTimeout(() => { 
    add_check_services(test_services) 
}, 2000)


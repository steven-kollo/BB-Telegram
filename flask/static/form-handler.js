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

function add_check_service(service) {
    const table = document.getElementById("service-table")
    const tr = document.createElement("tr")
    tr.innerHTML = `
        <th width="85%">
        ${service.name}
        <small id="personal-name-help" class="form-text text-muted">Напишите кириллицей</small>
        </th>
        <th width="15%"><span class="badge badge-secondary">${service.price}</span></th>
    `
    table.appendChild(tr)
}


add_check_service({
    name: "test",
    price: "3 500₽"
})
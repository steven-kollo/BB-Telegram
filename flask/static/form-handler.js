function handle_service_checkbox(e) {
    console.log("clk")
    freeze_group_on_select(e.target.id[1])
    set_required_on_select()
}


function freeze_group_on_select(group_id) {
    console.log(group_id)
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
    console.log(check_filled_fields())
    if (check_filled_fields()) {
        // TODO
        // show_personal_fields()
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

function back_btn() {
    console.log("Back")
}
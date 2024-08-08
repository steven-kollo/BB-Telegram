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

$('.service-checkbox').click(function(e) {
    freeze_group_on_select(e.target.id[1])
})
  
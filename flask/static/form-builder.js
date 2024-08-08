const groups = [
    {
        "id": 1,
        "name": "⚖️ Legal Services",
        "description": "legal services description",
        "items": [
            {
                "g": 1,
                "s": 1,
                "name": "my name 1",
                "description": "my description 1",
                "tip": "my tip 1",
                "price": "2 500₽"
            },
            {
                "g": 1,
                "s": 2,
                "name": "me name 2",
                "description": "my description 2",
                "tip": "my tip 2",
                "price": "3 500₽"
            }
        ]
    },
    {
        "id": 2,
        "name": "Accounting",
        "description": "accounting description",
        "items": [
            {
                "g": 2,
                "s": 1,
                "name": "my name 1",
                "description": "my description 1",
                "tip": "my tip 1",
                "price": "2 500₽"
            },
            {
                "g": 2,
                "s": 2,
                "name": "me name 2",
                "description": "my description 2",
                "tip": "my tip 2",
                "price": "3 500₽"
            }
        ]
    },
]

add_services(groups)

function add_services(groups) {
    const parent = document.getElementById("group-container")
    for (const group of groups) {
        const group_container = document.createElement("div")
        group_container.setAttribute("id", `g${group.id}`)
        parent.appendChild(group_container)

        group_container.appendChild(
            build_HTML_group_checkbox(group)
        )
        group_container.appendChild(
            build_HTML_group_collapse(group)
        )
        const subgroup_container = document.getElementById(`g${group.id}s`)
        for (const item of group.items) {
            const element = build_HTML_item(item)
            subgroup_container.appendChild(element)
        }
    }
}

function build_HTML_group_checkbox(group) {
    const group_checkbox = document.createElement('div')
    group_checkbox.innerHTML = `
        <input data-toggle="collapse" href="#g${group.id}c" role="button" aria-expanded="false" aria-controls="g${group.id}c" class="form-check-input group-checkbox" type="checkbox" id="g${group.id}ch" name="g${group.id}">
        <label class="form-check-label" id="g${group.id}l" for="g${group.id}ch">${group.name}</label>   
    `
    group_checkbox.setAttribute("class", "form-check")
    return group_checkbox
}

function build_HTML_group_collapse(group) {
    const group_collapse = document.createElement('div')
    group_collapse.innerHTML = `
        <div class="collapse" id="g${group.id}c">
            <div class="form-group" id="g${group.id}s"></div>
        </div>
    `
    group_collapse.setAttribute("class", "ml-3")
    return group_collapse
}

function build_HTML_item(item) {
    const element = document.createElement('div')
    element.innerHTML = `
    <div class="form-check">
        <input data-toggle="collapse" role="button" aria-expanded="false" class="form-check-input" type="checkbox" href="#g${item.g}s${item.s}c" aria-controls="g${item.g}s${item.s}c" id="g${item.g}s${item.s}" name="g${item.g}s${item.s}">
        <label class="form-check-label" for="g${item.g}s${item.s}">${item.name}<span class="badge badge-primary">${item.price}</span></label>
    </div>
    <div class="collapse ml-3" id="g${item.g}s${item.s}c">
        <textarea placeholder="${item.tip}" class="form-control" id="g${item.g}s${item.s}t" rows="3" name="g${item.g}s${item.s}t"></textarea>
    </div>
    `
    element.setAttribute("id", `g${item.g}s${item.s}e`)
    return element
}
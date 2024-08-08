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

add_services(groups, "g1s")

function add_services(groups) {
    let i = 1
    const parent = document.getElementById("group-container")
    for (const group of groups) {
        const group_container = document.createElement("div")
        group_container.setAttribute("id", `g${group.id}`)
        parent.appendChild(group_container)
        append_HTML_group(group, i, group_container)


        const subgroup_container = document.getElementById(`g${group.id}s`)
        console.log(`g${group.id}s`)
        console.log(subgroup_container)
        for (const item of group.items) {
            const element = build_HTML_element(item)
            subgroup_container.appendChild(element)
        }
        i++
    }
}

function build_HTML_element(item) {
    const element = document.createElement('div')
    element.innerHTML = `
    <div class="form-check">
        <input data-toggle="collapse" role="button" aria-expanded="false" class="form-check-input" type="checkbox" value="" href="#g${item.g}s${item.s}c" aria-controls="g${item.g}s${item.s}c" id="g${item.g}s${item.s}" name="g${item.g}s${item.s}">
        <label class="form-check-label" for="g${item.g}s${item.s}">${item.name}<span class="badge badge-primary">${item.price}</span></label>
    </div>
    <div class="collapse ml-3" id="g${item.g}s${item.s}c">
        <textarea placeholder="${item.tip}" class="form-control" id="g${item.g}s${item.s}t" rows="3" name="g${item.g}s${item.s}t"></textarea>
    </div>
    `
    element.setAttribute("id", `g${item.g}s${item.s}e`)
    return element
}

function append_HTML_group(group, i, parent) {
    const group_checkbox = document.createElement('div')
    group_checkbox.innerHTML = `
        <input data-toggle="collapse" href="#g${i}c" role="button" aria-expanded="false" aria-controls="g${i}c" class="form-check-input" type="checkbox" value="" id="g${i}ch" name="g${i}">
        <label class="form-check-label" for="g${i}ch">${group.name}</label>   
    `
    group_checkbox.setAttribute("class", "form-check")
    parent.appendChild(group_checkbox)

    const group_collapse = document.createElement('div')
    group_collapse.innerHTML = `
        <div class="collapse" id="g${i}c">
            <div class="form-group" id="g${i}s"></div>
        </div>
    `
    group_collapse.setAttribute("class", "ml-3")
    parent.appendChild(group_collapse)
}
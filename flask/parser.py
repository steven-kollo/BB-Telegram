import re

def parse_user_fields(form, groups):
    global GROUPS
    GROUPS = groups
    personal = {}
    order = []
    consults = []
    for key, val in form.items():
        if "t" in key and val != "":
            if "-t" in key: 
                personal[key.split("-")[0]] = val
            else:
                order.append(build_service_info(key, val))
                if int(key[1]) not in consults:
                    consults.append(int(key[1]))

    consults = list(map(build_consult_info, consults))
    user_data = {
        "order_id": 10001,
        "personal": personal,
        "order": order,
        "consults": consults,
    }
    user_data["text"] = build_tg_text(user_data)
    user_data["order_json"] = parse_order_to_json(user_data)
    return user_data

def build_service_info(key, val):
    g, s = parse_service_id(key)
    return {
        "key": key,
        "group": GROUPS[g]["name"],
        "name": GROUPS[g]["items"][s]["name"],
        "info": val,
        "price": GROUPS[g]["items"][s]["price"]
    }

def build_consult_info(group_id):
    consult_item = GROUPS[group_id]["consult_item"]
    consult_item["group_name"] = GROUPS[group_id]["name"]
    consult_item["group_id"] = group_id
    return consult_item

def build_tg_text(user_data):
    text = f'Супер!\nВаша заявка №{user_data["order_id"]} взята в работу:\n\n*--- Выбранные услуги ---*\n'

    for service in user_data["order"]:
        text += f'{service["group"]}\n{service["name"]} | {handle_price_line(service["price"])}\n'
        text += f'_{service["info"]}_\n\n'
    
    text += "*--- Первичные консультации ---*\n"
    for consult in user_data["consults"]:
        text += f'{consult["group_name"]}\n{consult["name"]} | {handle_price_line(consult["price"])}\n\n'

    text += f'================\n*Итого к оплате: {price_to_string(sum_price(user_data["consults"]))}*'
    return text

def handle_price_line(price):
    if price == "~":
        return "Цена по согласованию"
    else:
        return price
    
def sum_price(consults):
    price = 0
    for consult in consults:
        price += int(
            re.sub(r' ', '', 
                re.sub(r'₽', '', consult["price"])
            )
        )
    return price

def price_to_string(price):
    return f"{str(price)[:-3]} {str(price)[-3]}00₽"

def parse_service_id(id):
    return int(id[1]), int(id[3])

def parse_order_to_json(user_data):
    return {
        "order_id": user_data["order_id"],
        "total_price": sum_price(user_data["consults"]),
        "order": parse_orders_to_json(user_data["order"]),
        "consults": parse_consults_to_json(user_data["consults"]),
    }

def parse_orders_to_json(n):
    return [[n["info"], n["key"]] for n in n]

def parse_consults_to_json(n):
    return [n["group_id"] for n in n]

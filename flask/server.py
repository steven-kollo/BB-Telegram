#!/usr/bin/env python
import os, json, re
from flask import Flask, render_template, request, url_for
import threading, requests
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler
from parser import parse_user_fields
# from pymongo import MongoClient

json_url = os.path.join(
    os.path.realpath(os.path.dirname(__file__)), 
    'static', 
    'groups.json'
)
data = json.load(open(json_url))

global GROUPS
GROUPS = data["groups"]
global TOKEN
TOKEN = "7027330124:AAGX1qYHaOvcW929LB9GNpfGil1qtrR_MVA"
global URL
URL = "0.0.0.0"

def main():
    application = ApplicationBuilder().token(TOKEN).build()
        
    start_handler = CommandHandler('start', start)
    application.add_handler(start_handler)

    application.run_polling()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.message.chat.id
    keyboard = [
        [InlineKeyboardButton("Open form", url=f"{URL}/{chat_id}")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "Hello hello! Fill the form to submit your legal help request pls",
        reply_markup=reply_markup
    )

class FlaskThread(threading.Thread):
    def run(self) -> None:
        app = Flask(__name__, static_url_path='/static')
        #mongo_client = MongoClient("mongo:27017")

        # TODO add real server address
        # URL = "0.0.0.0"
        
        @app.route('/<chat_id>', methods=['GET', 'POST'])
        def form(chat_id):
            if request.method == 'POST':
                user_fields = parse_user_fields(request.form, GROUPS)
                if user_fields["text"] != "":
                    message = user_fields['text']
                    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?chat_id={chat_id}&parse_mode=markdown&text={message}"
                    print(requests.get(url).json()) # this sends the message
                return render_template('form.html', chat_id=chat_id, thank_you_page=True, order_json=user_fields["order_json"], ensure_ascii=False)
            else:
                return render_template('form.html', chat_id=chat_id, groups_json=url_for('static', filename='groups.json'), order_json={"main":True})

        app.run(host="0.0.0.0", port=9091, threaded=True)

class TelegramThread(threading.Thread):
    def run(self) -> None:
        main()

if __name__ == "__main__":
    flask_thread = FlaskThread()
    flask_thread.daemon = True
    flask_thread.start()

    main()
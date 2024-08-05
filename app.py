from flask import Flask, render_template
import threading
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler

TOKEN = "7027330124:AAGX1qYHaOvcW929LB9GNpfGil1qtrR_MVA"

def main():
    application = ApplicationBuilder().token(TOKEN).build()
        
    start_handler = CommandHandler('start', start)
    application.add_handler(start_handler)

    application.run_polling()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.message.chat.id
    keyboard = [
        [InlineKeyboardButton("Open form", url=f"127.0.0.1:5000/{chat_id}")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "Hello hello! Fill the form to submit your legal help request pls",
        reply_markup=reply_markup
    )

class FlaskThread(threading.Thread):
    def run(self) -> None:
        app = Flask(__name__)
        
        @app.route('/<chat_id>')
        def form(chat_id):
            return render_template('form.html', chat_id=chat_id)
        
        @app.route("/submit/<chat_id>")
        def submit(chat_id):
            return "."
        
        app.run(threaded=True)
        
class TelegramThread(threading.Thread):
    def run(self) -> None:
        main()

if __name__ == "__main__":
    flask_thread = FlaskThread()
    flask_thread.daemon = True
    flask_thread.start()

    main()
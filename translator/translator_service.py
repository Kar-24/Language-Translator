from flask import Flask, request, jsonify
from googletrans import Translator,LANGUAGES
import json

app = Flask(__name__)
translator = Translator()

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    text = data.get('text')
    src_lang = data.get('src')
    dest_lang = data.get('dest')

    if not text or not src_lang or not dest_lang:
        return jsonify({'error': 'Missing parameters'}), 400

    try:
        translated = translator.translate(text, src=src_lang, dest=dest_lang)
        return jsonify({'translated_text': translated.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
print(json.dumps(LANGUAGES, indent=2))
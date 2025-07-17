import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [srcLang, setSrcLang] = useState('en');
  const [destLang, setDestLang] = useState('hi');
  const [translated, setTranslated] = useState('');

  const languageMap = {
    "af": "Afrikaans", "sq": "Albanian", "am": "Amharic", "ar": "Arabic", "hy": "Armenian", "az": "Azerbaijani",
    "eu": "Basque", "be": "Belarusian", "bn": "Bengali", "bs": "Bosnian", "bg": "Bulgarian", "ca": "Catalan",
    "ceb": "Cebuano", "ny": "Chichewa", "zh-cn": "Chinese (Simplified)", "zh-tw": "Chinese (Traditional)",
    "hr": "Croatian", "cs": "Czech", "da": "Danish", "nl": "Dutch", "en": "English", "eo": "Esperanto",
    "et": "Estonian", "tl": "Filipino", "fi": "Finnish", "fr": "French", "gl": "Galician", "ka": "Georgian",
    "de": "German", "el": "Greek", "gu": "Gujarati", "ht": "Haitian Creole", "ha": "Hausa", "haw": "Hawaiian",
    "iw": "Hebrew", "hi": "Hindi", "hmn": "Hmong", "hu": "Hungarian", "is": "Icelandic", "ig": "Igbo",
    "id": "Indonesian", "ga": "Irish", "it": "Italian", "ja": "Japanese", "jw": "Javanese", "kn": "Kannada",
    "kk": "Kazakh", "km": "Khmer", "ko": "Korean", "ku": "Kurdish (Kurmanji)", "ky": "Kyrgyz", "lo": "Lao",
    "la": "Latin", "lv": "Latvian", "lt": "Lithuanian", "lb": "Luxembourgish", "mk": "Macedonian", "mg": "Malagasy",
    "ms": "Malay", "ml": "Malayalam", "mt": "Maltese", "mi": "Maori", "mr": "Marathi", "mn": "Mongolian",
    "my": "Myanmar (Burmese)", "ne": "Nepali", "no": "Norwegian", "ps": "Pashto", "fa": "Persian", "pl": "Polish",
    "pt": "Portuguese", "pa": "Punjabi", "ro": "Romanian", "ru": "Russian", "sm": "Samoan", "gd": "Scots Gaelic",
    "sr": "Serbian", "st": "Sesotho", "sn": "Shona", "sd": "Sindhi", "si": "Sinhala", "sk": "Slovak",
    "sl": "Slovenian", "so": "Somali", "es": "Spanish", "su": "Sundanese", "sw": "Swahili", "sv": "Swedish",
    "tg": "Tajik", "ta": "Tamil", "te": "Telugu", "th": "Thai", "tr": "Turkish", "uk": "Ukrainian", "ur": "Urdu",
    "uz": "Uzbek", "vi": "Vietnamese", "cy": "Welsh", "xh": "Xhosa", "yi": "Yiddish", "yo": "Yoruba", "zu": "Zulu"
  };

  const translate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/translate', {
        text,
        src: srcLang,
        dest: destLang
      });
      setTranslated(res.data.translated_text);
    } catch (err) {
      alert('Translation failed: ' + err.message);
    }
  };

  return (
    <div
      className="App"
      style={{
        padding: '40px',
        maxWidth: '900px',
        margin: 'auto',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Language Translator
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        cols={60}
        placeholder="Type text to translate"
        style={{
          fontSize: '16px',
          padding: '15px',
          width: '100%',
          borderRadius: '8px',
          border: '1px solid #ccc',
          resize: 'vertical'
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '20px 0',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <label style={{ fontWeight: 'bold', marginRight: '10px' }}>From:</label>
          <select
            value={srcLang}
            onChange={(e) => setSrcLang(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              fontSize: '14px',
              border: '1px solid #aaa'
            }}
          >
            {Object.entries(languageMap).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', marginRight: '10px' }}>To:</label>
          <select
            value={destLang}
            onChange={(e) => setDestLang(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              fontSize: '14px',
              border: '1px solid #aaa'
            }}
          >
            {Object.entries(languageMap).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={translate}
        style={{
          padding: '12px 30px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'block',
          margin: 'auto'
        }}
      >
        Translate
      </button>

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#333' }}>Translated Text:</h3>
        <p
          style={{
            fontSize: '18px',
            backgroundColor: '#f9f9f9',
            padding: '12px',
            borderRadius: '8px',
            minHeight: '40px',
            border: '1px solid #ddd'
          }}
        >
          {translated}
        </p>
      </div>
    </div>
  );
}

export default App;

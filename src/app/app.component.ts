import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text = '';
  languages: any = [
    { name: 'Albanian', code: 'sq' },
    { name: 'Amharic', code: 'am' },
    { name: 'Arabic', code: 'ar' },
    { name: 'Armenian', code: 'hy' },
    { name: 'Azeerbaijani', code: 'az' },
    { name: 'Basque', code: 'eu' },
    { name: 'Belarusian', code: 'be' },
    { name: 'Bengali', code: 'bn' },
    { name: 'Bosnian', code: 'bs' },
    { name: 'Bulgarian', code: 'bg' },
    { name: 'Catalan', code: 'ca' },
    { name: 'Cebuano', code: 'ceb' },
    { name: 'Chinese (Simplified)', code: 'zh-CN' },
    { name: 'Chinese (Traditional)', code: 'zh-TW' },
    { name: 'Corsican', code: 'co' },
    { name: 'Croatian', code: 'hr' },
    { name: 'Czech', code: 'cs' },
    { name: 'Danish', code: 'da' },
    { name: 'Dutch', code: 'nl' },
    { name: 'English', code: 'en' },
    { name: 'Esperanto', code: 'eo' },
    { name: 'Estonian', code: 'et' },
    { name: 'Finnish', code: 'fi' },
    { name: 'French', code: 'fr' },
    { name: 'Frisian', code: 'fy' },
    { name: 'Galician', code: 'gl' },
    { name: 'Georgian', code: 'ka' },
    { name: 'German', code: 'de' },
    { name: 'Greek', code: 'el' },
    { name: 'Gujarati', code: 'gu' },
    { name: 'Haitian Creole', code: 'ht' },
    { name: 'Hausa', code: 'ha' },
    { name: 'Hawaiian', code: 'haw' },
    { name: 'Hebrew', code: 'iw' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Hmong', code: 'hmn' },
    { name: 'Hungarian', code: 'hu' },
    { name: 'Icelandic', code: 'is' },
    { name: 'Igbo', code: 'ig' },
    { name: 'Indonesian', code: 'id' },
    { name: 'Irish', code: 'ga' },
    { name: 'Italian', code: 'it' },
    { name: 'Japanese', code: 'ja' },
    { name: 'Javanese', code: 'jw' },
    { name: 'Kannada', code: 'kn' },
    { name: 'Kazakh', code: 'kk' },
    { name: 'Khmer', code: 'km' },
    { name: 'Korean', code: 'ko' },
    { name: 'Kurdish', code: 'ku' },
    { name: 'Kyrgyz', code: 'ky' },
    { name: 'Lao', code: 'lo' },
    { name: 'Latin', code: 'la' },
    { name: 'Latvian', code: 'lv' },
    { name: 'Lithuanian', code: 'lt' },
    { name: 'Luxembourgish', code: 'lb' },
    { name: 'Macedonian', code: 'mk' },
    { name: 'Malagasy', code: 'mg' },
    { name: 'Malay', code: 'ms' },
    { name: 'Malayalam', code: 'ml' },
    { name: 'Maori', code: 'mi' },
    { name: 'Marathi', code: 'mr' },
    { name: 'Mongolian', code: 'mn' },
    { name: 'Myanmar (Burmese)', code: 'my' },
    { name: 'Nepali', code: 'ne' },
    { name: 'Norwegian', code: 'no' },
    { name: 'Nyanja (Chichewa)', code: 'ny' },
    { name: 'Pashto', code: 'ps' },
    { name: 'Persian', code: 'fa' },
    { name: 'Polish', code: 'pl' },
    { name: 'Portuguese', code: 'pt' },
    { name: 'Punjabi', code: 'pa' },
    { name: 'Romanian', code: 'ro' },
    { name: 'Russian', code: 'ru' },
    { name: 'Samoan', code: 'sm' },
    { name: 'Scots Gaelic', code: 'gd' },
    { name: 'Serbian', code: 'sr' },
    { name: 'Sesotho', code: 'st' },
    { name: 'Shona', code: 'sn' },
    { name: 'Sindhi', code: 'sd' },
    { name: 'Sinhala (Sinhalese)', code: 'si' },
    { name: 'Slovak', code: 'sk' },
    { name: 'Slovenian', code: 'sl' },
    { name: 'Somali', code: 'so' },
    { name: 'Spanish', code: 'es' },
    { name: 'Sundanese', code: 'su' },
    { name: 'Swahili', code: 'sw' },
    { name: 'Swedish', code: 'sv' },
    { name: 'Tagalog (Filipino)', code: 'tl' },
    { name: 'Tajik', code: 'tg' },
    { name: 'Tamil', code: 'ta' },
    { name: 'Telugu', code: 'te' },
    { name: 'Thai', code: 'th' },
    { name: 'Turkish', code: 'tr' },
    { name: 'Ukrainian', code: 'uk' },
    { name: 'Urdu', code: 'ur' },
    { name: 'Uzbek', code: 'uz' },
    { name: 'Vietnamese', code: 'vi' },
    { name: 'Welsh', code: 'cy' },
    { name: 'Xhosa', code: 'xh' },
    { name: 'Yiddish', code: 'yi' },
    { name: 'Yoruba', code: 'yo' },
    { name: 'Zulu', code: 'zu' }
  ];
  sourceLanguage;
  destinationLanguage;
  languageCount = 0;
  history = [];
  status = {
    loading: false,
    steps: 0,
    finishedSteps: 0,
  };

  constructor(private http: HttpClient, config: NgbProgressbarConfig) {
    config.striped = true;
    config.animated = true;
    config.type = 'success';
  }

  translate() {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx';
    const source = this.sourceLanguage;
    const destination = this.destinationLanguage;
    const translationSteps = this.languageCount;
    const chain = [source];
    const languages = this.languages;
    const http = this.http;
    const original = this.text;

    this.status.loading = true;
    this.status.steps = translationSteps + 1;
    this.status.finishedSteps = 0;

    function loadTranslationStep(step, text) {
      let to;
      if (step === translationSteps) {
        to = destination;
      } else {
        to = languages[Math.floor(Math.random() * languages.length)].code;
      }
      const from = chain[chain.length - 1];
      chain.push(to);

      http.get(url + '&sl=' + from + '&tl=' + to + '&dt=t&q=' + text).subscribe((data: any) => {
        if (step === translationSteps) {
          this.history.unshift({
            text: original,
            sourceLanguage: source,
            destinationLanguage: destination,
            chain: chain,
            translation: data[0][0][0]
          });
          this.status.loading = false;
        } else {
          this.status.finishedSteps++;
          loadTranslationStep.call(this, step + 1, data[0][0][0]);
        }
      });
    }
    loadTranslationStep.call(this, 0, original);
  }

  printTranslationChain(chainRef) {
    const chain = chainRef.slice();
    const map = new Map(this.languages.map(el => [el.code, el]));
    let language: any = map.get(chain.shift());
    let string = language.name;
    chain.forEach((element) => {
      language = map.get(element);
      string += ' <i class="fa fa-arrow-circle-right" aria-hidden="true"></i> ' + language.name;
    });
    return string;
  }

  printTranslationSummary(chainRef) {
    const chain = chainRef.slice();
    const map = new Map(this.languages.map(el => [el.code, el]));
    let source, destination: any;
    source = map.get(chain[0]);
    destination = map.get(chain[chain.length - 1]);
    return source.name + ' <i class="fa fa-arrow-circle-right" aria-hidden="true"></i> ' + destination.name;
  }
}

import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgbProgressbarConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('news')
  private newsTpl: TemplateRef<any>;

  loginModalMode = 0;
  usernameFieldLogin = '';
  passwordFieldLogin = '';
  usernameFieldRegister = '';
  passwordFieldRegister = '';
  emailFieldRegister = '';
  loginStatus = 0;
  registerStatus = 0;
  text = '';
  translationWay = 'random';
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
  lastVisit = new Date(0);
  status = {
    loading: false,
    steps: 0,
    finishedSteps: 0,
  };
  changelog = [{
    title: 'Banana!',
    date: new Date(2017, 8, 7),
    description: 'You love bananas as much as we do? Then lets rate your translations with bananas from 1 to 5!',
  },
  {
    title: 'Local History',
    date: new Date(2017, 8, 6),
    description: 'Are you also tired of losing all your cool translations when reloading the page? These times are ' +
    'over now. A history is now saved to your browser and loaded every time you visit us again.',
  },
  {
    title: 'Loading indicator',
    date: new Date(2017, 8, 5),
    description: 'You never knew how long to wait until your translation finally finished. It looked like the page is ' +
    'just ignoring you instead of translating your stuff. Well, this has changed now! A fancy loading indicator tells ' +
    'you exactly how long you still have to wait now.',
  }];

  constructor(private http: HttpClient, private modalService: NgbModal, config: NgbProgressbarConfig) {
    config.striped = true;
    config.animated = true;
    config.type = 'success';
  }

  ngOnInit() {
    if (typeof(Storage) !== 'undefined') {
      this.lastVisit = new Date(localStorage.getItem('translator_last_visit'));
      if (this.changelog[0].date > this.lastVisit) {
        window.setTimeout(() => {
          this.modalService.open(this.newsTpl);
        }, 1000);
      }
      localStorage.setItem('translator_last_visit', new Date().toDateString());

      const history = JSON.parse(localStorage.getItem('translator_history'));
      if (history) {
        let finished = 0;
        for (let i = 0; i < history.length; i++) {
          if (typeof history[i].chain[0] === 'string') {
            history[i].chain[0] = ['de'];
          }
          if (++finished === history.length - 1) {
            localStorage.setItem('translator_history', JSON.stringify(history));
            this.history = history;
          }
        }
      }
    }
  }

  open(content) {
    this.modalService.open(content);
  }

  translate() {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx';
    const source = this.sourceLanguage;
    const destination = this.destinationLanguage;
    const translationSteps = this.languageCount;
    const languages = this.languages;
    const http = this.http;
    const original = this.text;
    const style = this.translationWay;

    this.status.loading = true;
    this.status.steps = translationSteps + 1;
    this.status.finishedSteps = 0;

    let fullText = original;
    let match = fullText.match(/([.?\n])\s*/);
    const textParts = [];
    const textSplit = [];
    while (match) {
      const part = fullText.substr(0, match.index).trim();
      if (part !== '') {
        textParts.push(part);
        textSplit.push(match[0]);
      }
      fullText = fullText.substr(match.index + match[0].length);
      match = fullText.match(/([.?\n])\s*/);
    }
    const part = fullText.trim();
    if (part !== '') {
      textParts.push(part);
      textSplit.push('');
    }
    this.status.steps *= textParts.length;
    const translation = new Array(textParts.length).fill('');
    let finished = 0;
    const chain = Array.from({length: textParts.length}, e => Array(1).fill(source));

    function loadTranslationStep(step, text, index) {
      let from = '';
      if (style === 'same') {
        from = chain[0][chain[0].length - 1];
      } else {
        from = chain[index][chain[index].length - 1];
      }

      let to;
      if (step === translationSteps) {
        to = destination;
        if (style === 'same') {
          chain[0].push(to);
        } else {
          chain[index].push(to);
        }
      } else {
        if (style === 'same' && chain[0][step]) {
          to = chain[0][step];
        } else {
          to = languages[Math.floor(Math.random() * languages.length)].code;
          if (style === 'same') {
            chain[0].push(to);
          } else {
            chain[index].push(to);
          }
        }
      }

      http.get(url + '&sl=' + from + '&tl=' + to + '&dt=t&q=' + text).subscribe((data: any) => {
        if (step === translationSteps) {
          translation[index] = data[0][0][0] + (textSplit[index] ? textSplit[index] : '');
          if (++finished == translation.length) {
            let shortText = translation.join('');
            if (shortText.length > 100) {
              //shortText = shortText.substr(0, 96) + ' ...';
            }
            let shortOriginal = original;
            if (shortOriginal.length > 100) {
              //shortOriginal = shortOriginal.substr(0, 96) + ' ...';
            }
            this.history.unshift({
              text: shortOriginal,
              fullText: original,
              sourceLanguage: source,
              destinationLanguage: destination,
              chain: chain,
              translation: shortText,
              fullTranslation: translation,
              time: new Date(),
              rating: 0,
            });
            if (typeof(Storage) !== 'undefined') {
              localStorage.setItem('translator_history', JSON.stringify(this.history));
            }
            this.status.loading = false;
          }
        } else {
          this.status.finishedSteps++;
          loadTranslationStep.call(this, step + 1, data[0][0][0], index);
        }
      });
    }
    for (let i=0; i < textParts.length; i++) {
      loadTranslationStep.call(this, 0, textParts[i], i);
    }
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

  updateRating() {
    window.setTimeout(() => {
      localStorage.setItem('translator_history', JSON.stringify(this.history));
    }, 500);
  }

  changeLanguages() {
    const temp = this.sourceLanguage;
    this.sourceLanguage = this.destinationLanguage;
    this.destinationLanguage = temp;
  }

  randomize() {
    this.sourceLanguage = this.languages[Math.floor(Math.random() * this.languages.length)].code;
    this.destinationLanguage = this.languages[Math.floor(Math.random() * this.languages.length)].code;
    this.languageCount = Math.floor(Math.random() * 50);
  }

  login() {
    this.http.post('/rest/1.0/user/login', {
      username: this.usernameFieldLogin,
      password: this.passwordFieldLogin,
    }).subscribe((data: any) => {
      this.loginStatus = 2;
    }, (err: HttpErrorResponse) => {
      this.loginStatus = 1;
    });
  }

  register() {
    this.http.post('/rest/1.0/user/register', {
      username: this.usernameFieldRegister,
      password: this.passwordFieldRegister,
      email: this.emailFieldRegister,
    }).subscribe((data: any) => {
      console.log(data);
      this.registerStatus = 2;
    }, (err: HttpErrorResponse) => {
      this.registerStatus = 1;
    });
  }

  onTranslationWayChange(way) {
    //this.translationWay = way;
  }

}

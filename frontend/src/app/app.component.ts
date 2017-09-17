import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgbProgressbarConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('news')
  private newsTpl: TemplateRef<any>;
  @ViewChild('shared')
  private sharedTpl: TemplateRef<any>;

  sharedTranslation: any = {};
  extended = false;
  loginModalMode = 0;
  usernameFieldLogin = '';
  passwordFieldLogin = '';
  usernameFieldRegister = '';
  passwordFieldRegister = '';
  emailFieldRegister = '';
  loginStatus = 0;
  userId: number;
  backendToken: HttpHeaders;
  shareStatus = 0;
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
  dashboard = [];
  lastVisit = new Date(0);
  status = {
    loading: false,
    steps: 0,
    finishedSteps: 0,
  };
  changelog = [
    {
      title: 'Spread the love!',
      date: new Date(2017, 8, 17),
      description: 'You want to share all your translations with the world? Then have fun with our new feature. You can ' +
      'now share all translations with our open dashboard. All you need to do is create an account and click on the ' +
      'little share button on every translation.',
    },
    {
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
    }
  ];
  translationToShare: any = {};

  adBanners = [
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=12&l=ur1&category=electronics&banner=1WY69X54P3YBP8EGFYR2&f=ifr&linkID=42f3c77f25bb6575a7490932d399dafa&t=laecherbartra-21&tracking_id=laecherbartra-21" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ez&f=ifr&linkID=598cd23dba5daf118d99b23a811b005c&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=generic&banner=1P75NP83WCBX5Y8N4A82&f=ifr&linkID=518f9354e2d1cf6fc14502fe477462ca&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=12&l=ur1&category=channels&banner=0ZBHZ163TXXTM669VQR2&f=ifr&linkID=b76ebf37a8daec4d43be43771d13918d&t=laecherbartra-21&tracking_id=laecherbartra-21" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=channels&banner=1XPQWPXDZG9N6WGNKD82&f=ifr&linkID=c81dd7365052b4c106dbc1206955d239&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=12&l=ur1&category=computer&banner=01HSHP56QWTDVE873082&f=ifr&linkID=69634f479170b2d2ac88fd3cd6fbca02&t=laecherbartra-21&tracking_id=laecherbartra-21" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=fire_tablets&banner=15PAFPZCMZPDXBAG5MG2&f=ifr&linkID=30c0391e58d171f21c0fdd9a2bbc50a9&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=fire_tv&banner=1S386RSFVXVMGNGN4182&f=ifr&linkID=bebc1fb46ce73f339094a2014613fb0c&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=firetv_stick&banner=11E209AEC664NMK9GA02&f=ifr&linkID=470ce1dd22b89fac9057d63aa0e7241e&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=launchpad&banner=15TT5ZRE5JQ139892202&f=ifr&linkID=8c4a2cb133d04ad4d8848447a6e85323&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=musicunlimited&banner=1YQ0RT3JXV556SF1DMG2&f=ifr&linkID=9a6ee09df67872542eaac685af41f2cb&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=musicunlimited&banner=13MCC0FVMG5ZDF0T69R2&f=ifr&linkID=4aad78c68887877cb243e5fc53096efe&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=musicunlimited&banner=0P1RD8CBZVJ1ZA40D1G2&f=ifr&linkID=d39ad538c9db584d19dbded9cee9aad4&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=musicunlimited&banner=1QMPC0WNT7HWYS34TN02&f=ifr&linkID=aea81b6b7f0090ce692f14180fcae05b&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=primemusic&banner=0YXY1KV7Y9SJXKE7DRG2&f=ifr&linkID=ab92b009e05754fcba2d665ea0d0acea&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
    '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=22&l=ur1&category=prime_student&banner=0SXVC3WXR1CJG3YZCBR2&f=ifr&linkID=099548ca192d9d0ae2f74b3bcc051dd6&t=laecherbartra-21&tracking_id=laecherbartra-21" width="250" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>',
  ];
  ownAdBanner;
  dashboardAdBanner;

  constructor(private http: HttpClient, private modalService: NgbModal, config: NgbProgressbarConfig, private sanitizer: DomSanitizer) {
    config.striped = true;
    config.animated = true;
    config.type = 'success';
  }

  ngOnInit() {
    const random = Math.floor(Math.random() * this.adBanners.length);
    this.ownAdBanner = this.sanitizer.bypassSecurityTrustHtml(this.adBanners[random]);
    if (random > 0) {
      this.dashboardAdBanner = this.sanitizer.bypassSecurityTrustHtml(this.adBanners[random - 1]);
    } else {
      this.dashboardAdBanner = this.sanitizer.bypassSecurityTrustHtml(this.adBanners[random + 1]);
    }

    let sharedTranslation = false;
    if (window.location.search) {
      sharedTranslation = true;
      const id = window.location.search.substr(13);
      window.setTimeout(() => {
        this.http.get('/rest/1.0/translation/' + id).subscribe((data: any) => {
          this.sharedTranslation = data;
        });
        this.modalService.open(this.sharedTpl);
      }, 500);
    }
    if (typeof(Storage) !== 'undefined') {
      this.lastVisit = new Date(localStorage.getItem('translator_last_visit'));
      if (!sharedTranslation && this.changelog[0].date > this.lastVisit) {
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
          if (++finished >= history.length - 1) {
            localStorage.setItem('translator_history', JSON.stringify(history));
            this.history = history;
          }
        }
      }

      const userData = JSON.parse(localStorage.getItem('translator_user'));
      if (userData) {
        this.loginStatus = 2;
        this.userId = userData.uid;
        this.backendToken = new HttpHeaders().set('Authorization', 'Bearer ' + userData.token);
      }
    }
    this.http.get('/rest/1.0/dashboard').subscribe((data: any) => {
      this.dashboard = data;
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  translate() {
    const url = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyBAEpue6EXR9ktgzypHLNF2oTxopzb3ueU&format=text';
    const source = this.sourceLanguage;
    const destination = this.destinationLanguage ? this.destinationLanguage : this.sourceLanguage;
    const translationSteps = this.languageCount > 5 ? 5 : this.languageCount;
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
          let random = Math.floor(Math.random() * languages.length);
          to = languages[random].code;
          if (to === from) {
            if (random > 0) {
              to = languages[--random].code;
            } else {
              to = languages[++random].code;
            }
          }
          if (style === 'same') {
            chain[0].push(to);
          } else {
            chain[index].push(to);
          }
        }
      }

      http.get(url + '&source=' + from + '&target=' + to + '&dt=t&q=' + text).subscribe((data: any) => {
        if (step === translationSteps) {
          translation[index] = data.data.translations[0].translatedText + (textSplit[index] ? textSplit[index] : '');
          if (++finished == translation.length) {
            let shortText = translation.join('');
            if (shortText.length > 100) {
              //shortText = shortText.substr(0, 96) + ' ...';
            }
            let shortOriginal = original;
            if (shortOriginal.length > 100) {
              //shortOriginal = shortOriginal.substr(0, 96) + ' ...';
            }
            const finalTranslation = {
              text: shortOriginal,
              fullText: original,
              sourceLanguage: source,
              destinationLanguage: destination,
              chain: chain,
              translation: shortText,
              fullTranslation: translation,
              time: new Date(),
              rating: 0,
              published: false,
            };
            if (this.userId) {
              this.http.post('/rest/1.0/user/' + this.userId + '/translation', finalTranslation, {
                headers: this.backendToken,
              }).subscribe((data: any) => {
                this.history.unshift(data);
                this.updateLocalStorage();
              }, (err: HttpErrorResponse) => {
                this.history.unshift(finalTranslation);
                this.updateLocalStorage();
              });
            } else {
              this.history.unshift(finalTranslation);
              this.updateLocalStorage();
            }
            this.status.loading = false;
          }
        } else {
          this.status.finishedSteps++;
          loadTranslationStep.call(this, step + 1, data.data.translations[0].translatedText, index);
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
      this.userId = data.uid;
      this.backendToken = new HttpHeaders().set('Authorization', 'Bearer ' + data.token);
      this.loginStatus = 2;
      localStorage.setItem('translator_user', JSON.stringify(data));
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

  toggleExtended() {
    this.extended = !this.extended;
  }

  shareTranslation(translation, popup) {
    this.shareStatus = 0;
    this.translationToShare = translation;
    this.open(popup);
  }

  shareToDashboard() {
    const translation = this.translationToShare;

    if (!translation.id) {
      translation.published = true;
      this.http.post('/rest/1.0/user/'+this.userId+'/translation', translation, {
        headers: this.backendToken,
      }).subscribe((data: any) => {
        this.shareStatus = 2;
        translation.id = data.id;
        this.updateLocalStorage();
      }, (err: HttpErrorResponse) => {
        this.shareStatus = 1;
      });
    } else {
      this.http.patch('/rest/1.0/user/'+this.userId+'/translation/'+translation.id, { published: true }, {
        headers: this.backendToken,
      }).subscribe((data: any) => {
        this.shareStatus = 2;
        translation.published = true;
        this.updateLocalStorage();
      }, (err: HttpErrorResponse) => {
        this.shareStatus = 1;
      });
    }
  }

  copyToClipboard() {
    const translation = this.translationToShare;
    var input = document.createElement('input');
    input.setAttribute('value', 'http://translator.xn--lcherbar-0za.de/share/' + translation.id);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input)
  }

  uploadTranslation() {
    const translation = this.translationToShare;

    this.http.post('/rest/1.0/nouser/translation', translation).subscribe((data: any) => {
      this.shareStatus = 2;
      translation.id = data.id;
      this.updateLocalStorage();
    }, (err: HttpErrorResponse) => {
    });
  }

  updateLocalStorage() {
    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('translator_history', JSON.stringify(this.history));
    }
  }

  openChangelog() {
    this.lastVisit = new Date(0);
    this.modalService.open(this.newsTpl);
  }
}

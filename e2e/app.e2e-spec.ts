import { TranslatorPage } from './app.po';

describe('translator App', () => {
  let page: TranslatorPage;

  beforeEach(() => {
    page = new TranslatorPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

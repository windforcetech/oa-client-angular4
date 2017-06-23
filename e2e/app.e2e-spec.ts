import { OaClientAngular4Page } from './app.po';

describe('oa-client-angular4 App', () => {
  let page: OaClientAngular4Page;

  beforeEach(() => {
    page = new OaClientAngular4Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

import Group from "../models/Group";
import User from "../models/User";
import Site from "../models/sitelists";
import mongoose from "mongoose";
import webdriver, { Browser } from "selenium-webdriver";
import { Builder, By, Key, until } from "selenium-webdriver";
import chrome, { Driver } from "selenium-webdriver/chrome";
import clipboardy from "clipboardy";

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};
export const getSitelist = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const query = Site.find();
  query instanceof mongoose.Query;
  const docs = await query;
  let keyList = [];
  let values = [];
  if (docs != false) {
    const keyValue = Object.keys(docs[0]._doc);
    for (let i = 1; i < keyValue.length - 1; i++) {
      keyList.push(keyValue[i]);
    }
    for (let j = 0; j < docs.length; j++) {
      const valuesObj = {};
      for (let i = 0; i < keyList.length; i++) {
        valuesObj[keyList[i]] = docs[j][keyList[i]];
      }
      values.push(valuesObj);
    }
  }
  return res.render("sitelist", { pageTitle: "sitelist", keyList, values, _id });
};

export const postSiteForm = async (req, res) => {
  const { siteUrl, siteName, owner } = req.body;
  await Site.create({
    owner: req.session.user._id,
    siteUrl,
    siteName: siteName,
  });
  res.redirect("/");
};

export const getAutoLogin = async (req, res) => {
  res.redirect("/");
};
export const postAutoLogin = async (req, res) => {
  const { getUrl } = req.body;
  const { setId, setPw } = User;
  const run = async () => {
    const service = new chrome.ServiceBuilder(process.env.CHROME_DRIVER_PATH).build();
    chrome.setDefaultService(service);

    const driver = await new webdriver.Builder().forBrowser("chrome").build();
    await driver.manage().setTimeouts({
      implicit: 10000,
      pageLoad: 45000,
      script: 45000,
    });
    await driver.manage().window().maximize();

    const autoLogin = async (lb, setId, setPw, id, pw) => {
      setId = "csdefrag";
      setPw = "captain1121!";
      await new Promise((r) => setTimeout(r, 1000));
      const loginBtn = await driver.findElement(By.css(lb));
      await loginBtn.click();
      const idInput = await driver.findElement(By.css(id));
      await new Promise((r) => setTimeout(r, 500));
      clipboardy.write(setId);
      await idInput.click();
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      const pwInput = await driver.findElement(By.css(pw));
      await new Promise((r) => setTimeout(r, 500));
      clipboardy.write(setPw);
      await pwInput.click();
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      await new Promise((r) => setTimeout(r, 500));
      await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
      await driver
        .switchTo()
        .alert()
        .then(function (alert) {
          alert.accept();
        })
        .catch(function (error) {});
    };
    const autoLoginIframe = async (lb, setId, setPw, id, pw) => {
      setId = "defrag_";
      setPw = "jogakmoum00";
      await driver.switchTo().frame(0);
      await new Promise((r) => setTimeout(r, 1000));
      const loginBtn = await driver.findElement(By.css(lb));
      await loginBtn.click();
      const idInput = await driver.findElement(By.css(id));
      await new Promise((r) => setTimeout(r, 500));
      clipboardy.write(setId);
      await idInput.click();
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      const pwInput = await driver.findElement(By.css(pw));
      await new Promise((r) => setTimeout(r, 500));
      clipboardy.write(setPw);
      await pwInput.click();
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      await new Promise((r) => setTimeout(r, 500));
      await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
      await driver
        .switchTo()
        .alert()
        .then(function (alert) {
          alert.accept();
        })
        .catch(function (error) {});
    };
    const autoLoginE = async (lb, setId, setPw, id, pw) => {
      setId = "csdefrag@defrag.kr";
      setPw = "captain1121!";
      await new Promise((r) => setTimeout(r, 500));
      const loginBtn = await driver.findElement(By.css(lb));
      await loginBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      const idInput = await driver.findElement(By.css(id));
      clipboardy.write(setId);
      await idInput.click();
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      await new Promise((r) => setTimeout(r, 500));
      const pwInput = await driver.findElement(By.css(pw));
      clipboardy.write(setPw);
      await pwInput.click();
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      await new Promise((r) => setTimeout(r, 500));
      await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
      await driver.actions().keyUp(Key.RETURN).keyDown(Key.RETURN).perform();
    };
    const naverAutoLogin2 = async (lb, nlb, setId, setPw, id, pw) => {
      setId = "defrag_";
      setPw = "jogakmoum00";
      const loginBtn = await driver.findElement(By.css(lb));
      await loginBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      const naverLoginBtn = await driver.findElement(By.css(nlb));
      await naverLoginBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      const handlePromise = driver.getAllWindowHandles();
      handlePromise.then(function (handles) {
        const popUpWindow = handles[1];
        driver.switchTo().window(popUpWindow);
      });
      await new Promise((r) => setTimeout(r, 500));
      const inputId = await driver.findElement(By.css(id));
      await inputId.click();
      await clipboardy.write(setId);
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      await new Promise((r) => setTimeout(r, 500));
      const inputPw = await driver.findElement(By.css(pw));
      await inputPw.click();
      await clipboardy.write(setPw);
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      await new Promise((r) => setTimeout(r, 500));
      await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
      await new Promise((r) => setTimeout(r, 3000));
      await driver.switchTo().alert().accept();
    };
    const naverAutoLogin = async (lb, nlb, setId, setPw, id, pw) => {
      setId = "defrag_";
      setPw = "jogakmoum00";
      const loginBtn = await driver.findElement(By.css(lb));
      await loginBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      const naverLoginBtn = await driver.findElement(By.css(nlb));
      await naverLoginBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      const inputId = await driver.findElement(By.css(id));
      await inputId.click();
      await clipboardy.write(setId);
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      await new Promise((r) => setTimeout(r, 500));
      const inputPw = await driver.findElement(By.css(pw));
      await inputPw.click();
      await clipboardy.write(setPw);
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      await new Promise((r) => setTimeout(r, 500));
      await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
      await new Promise((r) => setTimeout(r, 3000));
      await driver.switchTo().alert().accept();
    };
    const autoLoginI = async (menu, menu2, lb, setId, setPw, id, pw) => {
      let menuBtn = await driver.findElement(By.css(menu));
      await menuBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      menuBtn = await driver.findElement(By.css(menu2));
      await menuBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      autoLoginE(lb, setId, setPw, id, pw);
    };
    const autoLoginREVU = async (menu, lb, nlb, setId, setPw, id, pw) => {
      let menuBtn = await driver.findElement(By.css(menu));
      await menuBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      naverAutoLogin(lb, nlb, setId, setPw, id, pw);
    };
    const autoLoginCHVU = async (menu, lb, setId, setPw, id, pw) => {
      setId = "csdefrag";
      setPw = "captain1121!";
      const loginBtn = await driver.findElement(By.css(lb));
      await loginBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      let menuBtn = await driver.findElement(By.css(menu));
      await menuBtn.click();
      const idInput = await driver.findElement(By.css(id));
      await new Promise((r) => setTimeout(r, 500));
      clipboardy.write(setId);
      await idInput.click();
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      const pwInput = await driver.findElement(By.css(pw));
      await new Promise((r) => setTimeout(r, 500));
      clipboardy.write(setPw);
      await pwInput.click();
      await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
      await new Promise((r) => setTimeout(r, 500));
      await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
      await driver
        .switchTo()
        .alert()
        .then(function (alert) {
          alert.accept();
        })
        .catch(function (error) {});
    };
    await driver.get(getUrl);
    if (getUrl === "https://www.naver.com/") {
      autoLogin(`#account > a`, setId, setPw, `#id`, `#pw`);
    } else if (getUrl === "https://cometoplay.kr/") {
      autoLogin(
        `#wrap > div.top_menu > div > div.right_menu > a:nth-child(1)`,
        setId,
        setPw,
        `#mb_id`,
        `#mb_password`
      );
    } else if (getUrl === "http://chehumdan.com/") {
      naverAutoLogin(
        "#navbar2 > div.wrap-box.top-menu-box > div > ul.top-sub-btn > li:nth-child(1) > a",
        "#sns_login_btn_naver",
        setId,
        setPw,
        "#id",
        "#pw"
      );
      await driver.get(getURL);
    } else if (getUrl === "https://www.onesbyblog.co.kr/") {
      naverAutoLogin(
        "#header_contents > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > a > img",
        "#sns_login_btn_naver",
        setId,
        setPw,
        "#id",
        "#pw"
      );
    } else if (getUrl === "http://m-link.shop/") {
      autoLogin(
        "#top-navbar > ul.navbar-nav.ml-auto.mt-2.mt-lg-0 > li:nth-child(1) > a",
        setId,
        setPw,
        "#login_id",
        "#login_pw"
      );
    } else if (getUrl === "http://odiya.kr/") {
      autoLogin(
        "#wrap > div:nth-child(7) > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > a > img",
        setId,
        setPw,
        "#width_990 > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > form > table:nth-child(3) > tbody > tr > td:nth-child(3) > input[type=text]",
        "#width_990 > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > form > table:nth-child(4) > tbody > tr > td:nth-child(3) > input[type=password]"
      );
    } else if (getUrl === "https://cometoplay.kr/") {
      autoLogin(
        "#wrap > div.top_menu > div > div.right_menu > a:nth-child(1)",
        setId,
        setPw,
        "#mb_id",
        "#mb_password"
      );
    } else if (getUrl === "https://www.seoulouba.co.kr/html/main.asp") {
      autoLogin(
        "#j_tnb02 > ul > li:nth-child(4) > div > a",
        setId,
        setPw,
        "#member_id",
        "#member_pass"
      );
    } else if (getUrl === "https://reviewplace.co.kr/") {
      autoLogin(
        "#ui_head > div.ui_etc > ul > li:nth-child(1) > a",
        setId,
        setPw,
        "#login_id",
        "#login_pw"
      );
    } else if (getUrl === "http://reviewtong.co.kr/main.php") {
      naverAutoLogin(
        "#header > div.topUtil > ul > li:nth-child(1) > a",
        "#loginFrm > div.sns_login > button",
        setId,
        setPw,
        "#id",
        "#pw"
      );
    } else if (getUrl === "https://highblog.co.kr/") {
      autoLogin(
        "#headerWrap > div.utilArea.clear > div > div > div > a:nth-child(1)",
        setId,
        setPw,
        "#width_990 > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(1) > form > table:nth-child(3) > tbody > tr > td:nth-child(3) > input[type=text]",
        "#width_990 > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(1) > form > table:nth-child(4) > tbody > tr > td:nth-child(3) > input[type=password]"
      );
    } else if (getUrl === "https://dinnerqueen.net/") {
      naverAutoLogin(
        "body > header > div.dq-header__login.login-area > a.dq-header__login__btn",
        "body > section.re-qz-login > div.re-qz-login__form > form > button.re-qz-login__form__content__nv-form",
        setId,
        setPw,
        "#id",
        "#pw"
      );
    } else if (getUrl === "http://event.danawa.com/experience") {
      autoLogin(
        "#danawa_header > div.danawa_top_search > div > div.my_service2 > div.my_service_list3 > ul > li.my_page_service > a",
        setId,
        setPw,
        "#danawa-member-login-input-id",
        "#danawa-member-login-input-pwd"
      );
    } else if (getUrl === "https://www.pick-me.kr/") {
      autoLoginE(
        "#nav_mnu > ul > li:nth-child(4) > a",
        setId,
        setPw,
        "body > div.row > div > div > div.w50.left.login > input.form-control.input-lg.id",
        "body > div.row > div > div > div.w50.left.login > input.form-control.input-lg.password"
      );
    } else if (getUrl === "http://moable.kr/") {
      autoLogin(
        "#header > div.af_clear.header_top > div.f_r > a:nth-child(1)",
        setId,
        setPw,
        "#wrap > div.container.login_area > div > div > div:nth-child(1) > div > form > div.h_form > div:nth-child(1) > input[type=text]",
        "#wrap > div.container.login_area > div > div > div:nth-child(1) > div > form > div.h_form > div:nth-child(2) > input[type=password]"
      );
    } else if (getUrl === "http://mowm.best/html_file.php?file=all_campaign.html") {
      autoLogin(
        "#wrap > div:nth-child(2) > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > a",
        setId,
        setPw,
        "#width_990 > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(1) > form > table:nth-child(3) > tbody > tr > td:nth-child(3) > input[type=text]",
        "#width_990 > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(1) > form > table:nth-child(4) > tbody > tr > td:nth-child(3) > input[type=password]"
      );
    } else if (getUrl === "https://www.fineadple.com/") {
      autoLogin(
        "body > header > div > nav > div.gnb-login.fl > ul > li:nth-child(1) > div > a",
        "stella@defrag.kr",
        "captain1121",
        "#email",
        "#password"
      );
    } else if (getUrl === "http://www.witchad.kr/shop/list.php?ca_id=60") {
      naverAutoLogin(
        "#tnb > ul > li:nth-child(2) > a",
        "#sns_login > div > a.sns-icon.social_link.sns-naver",
        setId,
        setPw,
        "#id",
        "#pw"
      );
    } else if (getUrl === "https://mediance.co.kr/") {
      autoLoginI(
        "#content > div.container.clearfix > div > div > div.btn_wrap > a.influencer_button.button.button-xlarge.button-circle.button-dark.nott.ls0",
        "#nav_wrap > div:nth-child(1) > a",
        "#app > div:nth-child(1) > header > div > div > div.action__wrap.hide > button",
        setId,
        setPw,
        "#app > span > div > div.auth__contents > div:nth-child(1) > div.input-text > div > input[type=text]",
        "#app > span > div > div.auth__contents > div:nth-child(2) > div.input-text > div > input[type=password]"
      );
    } else if (getUrl === "https://pugshop.co.kr/") {
      autoLoginE(
        "#root > section > header > div.container.standard > div.header-container > div:nth-child(2) > button",
        setId,
        setPw,
        "#email",
        "#password"
      );
    } else if (getUrl === "https://www.revu.net/") {
      autoLoginREVU(
        "body > root > div > ng-transclude > ng-view > home > div.none-login-media > div > div.close-text.cursor-pointer > img",
        // "#preferredMedia-146",
        // "#preferredMedia-147",
        // "body > root > div > ng-transclude > ng-view > home > div.none-login-media > div > div.media-alert > button",
        "body > root > div > ng-transclude > ng-view > home > common-header > header.common-header.ng-scope > div > section.header-quick-menu > ul > li:nth-child(1) > a",
        "#login-connect > button",
        setId,
        setPw,
        "#id",
        "#pw"
      );
    } else if (getUrl === "https://www.chvu.co.kr/") {
      autoLoginCHVU(
        "#flogin > div > div > div > div.type_box > label:nth-child(4)",
        "body > div > header > div > div.header_box.pc > div.user_box > ul > li:nth-child(1) > a",
        setId,
        setPw,
        "#mem_userid",
        "#mem_password"
      );
    } else if (getUrl === "https://blog.naver.com/ajw4151") {
      autoLoginIframe("#gnb-area > ul > li.i1.login > a", "defrag_", "jogakmoum00", "#id", "#pw");
    } else if (getUrl === "https://echoblog.net/") {
      autoLoginE(
        "body > div.fix_header > div.mini-top-bar > div > div > div > a:nth-child(1)",
        setId,
        setPw,
        "#f_email",
        "#f_pwd"
      );
    } else if (getUrl === "http://modublog.co.kr/") {
      autoLogin(
        "#header_w > div.right_hd > div:nth-child(2) > span > a",
        "defrag_@naver.com",
        setPw,
        "#user_id",
        "#user_pw"
      );
    } else if (getUrl === "https://blog.naver.com/jyplove7942") {
      autoLoginIframe("#gnb-area > ul > li.i1.login > a", setId, setPw, "#id", "#pw");
    } else if (getUrl === "https://www.tble.kr/") {
      naverAutoLogin2(
        "#tble_top > div.com_line > ul > li:nth-child(2) > a",
        "#login_box > div:nth-child(6) > div > div > a > img",
        setId,
        setPw,
        "#id",
        "#pw"
      );
    } else if (getUrl === "https://cloudreview.co.kr/") {
      naverAutoLogin2(
        "#header > div > div.float-right.hide991 > ul > li:nth-child(1) > a",
        "#loginForm > div.login-left-section > div > div > div:nth-child(3) > a",
        setId,
        setPw,
        "#id",
        "#pw"
      );
    }
    // setTimeout(async () => {
    //   await driver.sleep();
    // }, 3000);
  };
  run();
  res.redirect("/");
};

export const deleteRow = async (req, res) => {
  const { getUrl } = req.body;
  const row = await Site.find({ siteUrl: req.body.getUrl }).remove();
  return res.redirect("/");
};
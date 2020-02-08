from bs4 import BeautifulSoup as bs
from selenium import webdriver
import chromedriver_binary


def find_trader_joe(zipcode):
    url = "https://hosted.where2getit.com/traderjoes/template01.ADA.html?form=locator_search&amp;addressline={}".format(zipcode)


    driver = webdriver.Chrome()
    r = driver.get("http://www.python.org")

    # session = dryscrape.Session()
    # session.visit(my_url)
    # response = session.body()
    soup = bs(r)
    # cookies = dict(BCPermissionLevel='PERSONAL')
    # page = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, cookies=cookies);
    # soup = bs(page.content, 'html.parser')
    # soup = bs(result, 'html.parser')
    print(soup)

    soup_two = soup.find_all(class_="poi")
    print(soup_two)


if __name__ == "__main__":
    find_trader_joe(98115)

    #w2gi_wrapper > div.box-wrapper > div.modal > a

from decimal import Decimal
from fuzzywuzzy import fuzz
import xlrd
import boto3
import json
import csv


def formatted_value(excel_sheet, row_index, col_index):
    value = excel_sheet.cell_value(row_index, col_index)
    return Decimal(str(value)) if value else 'null'


def make_item(product_name, product_code='null', green='null', blue='null', grey='null', carbon_footprint='null',
              land_use_footprint='null', price='null', alternatives=[]):
    return {
        'product_code': product_code,
        'product_name': product_name,
        'sustainability_metrics': {
            'water_footprint': {
                'green': green,
                'blue': blue,
                'grey': grey
            },
            'carbon_footprint': carbon_footprint,
            'land_use_footprint': land_use_footprint
        },
        'price': price,
        'alternatives': alternatives
    }


def get_excel_foods(foods, sheet_location, start_row_index, product_code_loc, descript_loc, loc_loc):
    workbook = xlrd.open_workbook(sheet_location)
    sheet = workbook.sheet_by_index(1)
    for row in range(start_row_index, sheet.nrows, 3):
        product_code = sheet.cell_value(row, product_code_loc)
        product_name = sheet.cell_value(row, descript_loc).lower().split(',')[0].replace('nes', '')
        green = formatted_value(sheet, row, loc_loc)
        blue = formatted_value(sheet, row + 1, loc_loc)
        grey = formatted_value(sheet, row + 2, loc_loc)
        item = make_item(product_name, product_code, green, blue, grey)
        append = True
        for bar in foods:
            if fuzz.ratio(item['product_name'].lower(), bar['product_name'].lower()) >= 85:
                append = False
                break
        if append:
            foods.append(item)
    return foods


def get_json_foods(foods):
    with open('../resources/foods.json', encoding='utf8') as foo:
        data = json.load(foo)
        for p in data:
            item = make_item(p['name'], alternatives=get_alternatives(p['name']))
            append = True
            for bar in foods:
                if fuzz.ratio(p['name'].lower(), bar['product_name'].lower()) >= 85:
                    append = False
                    bar['alternatives'] = get_alternatives(p['name'])
                    break
            if append:
                foods.append(item)
    return foods


def get_csv_foods(foods, file_location, is_land):
    with open(file_location, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for row in reader:
            if is_land:
                item = make_item(row[0].lower(), land_use_footprint=row[3])
            else:
                item = make_item(row[0].lower(), carbon_footprint=row[3])
            append = True
            for food in foods:
                if fuzz.ratio(row[0].lower(), food['product_name']) >= 85:
                    append = False
                    if is_land:
                        food['sustainability_metrics']['land_use_footprint'] = row[3]
                    else:
                        food['sustainability_metrics']['carbon_footprint'] = row[3]
                    break
            if append:
                foods.append(item)
    return foods


def get_alternatives(food_name):
    matching_foods = []
    with open('../resources/foods.json', encoding='utf8') as foods:
        data = json.load(foods)
        for p in data:
            if fuzz.ratio(p['name'].lower(), food_name) > 70:
                subgroup = p['food_subgroup']
                for food in data:
                    if food['food_subgroup'] == subgroup and food['name'].lower() != food_name:
                        matching_foods.append(food['name'])
    return matching_foods


if __name__ == '__main__':
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1',
                              endpoint_url="https://dynamodb.us-east-1.amazonaws.com")
    my_table = dynamodb.Table('shopLift')
    foods = []
    foods = get_excel_foods(foods, "../resources/cropProductWaterFootprint.xlsx", 6, 1, 3, 9)
    foods = get_excel_foods(foods, "../resources/animalProductWaterFootprint.xlsx", 4, 0, 2, 788)
    foods = get_json_foods(foods)
    foods = get_csv_foods(foods, '../resources/land-use-per-kg.csv', True)
    foods = get_csv_foods(foods, '../resources/ghg-per-protein.csv', False)
    for food in foods:
        print(food)
        try:
            my_table.put_item(
                Item=food
            )
        except:
            print('woohoo')

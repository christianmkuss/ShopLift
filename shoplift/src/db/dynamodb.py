import boto3
from flask import jsonify


class DynamoDB:

    def __init__(self):
        self.dynamodb = boto3.resource('dynamodb', region_name='us-east-1',
                                  endpoint_url="https://dynamodb.us-east-1.amazonaws.com")
        self.table = self.dynamodb.Table('shopLift')


    def getRow(self, productName):
        response = self.table.get_item(
            Key={'product_name': productName }
        )
        print(response)


if __name__ == "__main__":
    db = DynamoDB()
    db.getRow('tomatoes')

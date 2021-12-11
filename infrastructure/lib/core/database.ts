import * as cdk from '@aws-cdk/core';
import * as dynamoDB from '@aws-cdk/aws-dynamodb';

export class AppDatabase extends cdk.Construct {
    public readonly documentTable: dynamoDB.ITable;

    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        const documentsTable = new dynamoDB.Table(this, 'DocumentsTable', {
            billingMode: dynamoDB.BillingMode.PAY_PER_REQUEST,
            partitionKey: {
                name: 'PK',
                type: dynamoDB.AttributeType.STRING
            },
            sortKey: {
                name: 'SK',
                type: dynamoDB.AttributeType.STRING
            }
        })

        documentsTable.addGlobalSecondaryIndex({
            indexName: 'GSI1',
            partitionKey: {
                name: 'SK',
                type: dynamoDB.AttributeType.STRING,
            },
            sortKey: {
                name: 'PK',
                type: dynamoDB.AttributeType.STRING
            },
            projectionType: dynamoDB.ProjectionType.INCLUDE,
            nonKeyAttributes: [
                'DateUploaded',
                'Processed',
                'Thumbnail',
                'Uploader',
                'FileSize',
                'Name',
                'Owner'
            ]
        })

        this.documentTable = documentsTable;
    }
}
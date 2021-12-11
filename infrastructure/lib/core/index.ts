import * as cdk from '@aws-cdk/core';
import { AssetStorage } from './storage';
import { WebApp } from './webapp';
import { AppDatabase } from './database';

export class ApplicationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const storage = new AssetStorage(this, 'Storage');
    const database = new AppDatabase(this, 'Database');

    new WebApp(this, 'WebApp', {
      hostingBucket: storage.hostingBucket,
      baseDirectory: '../',
      relativeWebAppPath: 'webapp',
    });
  }
}

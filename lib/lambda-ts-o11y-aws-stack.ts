import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

export class LambdaTsO11YAwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const myFunction = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lib/src'),
      handler: 'index.handler',
    });

    const eventRule = new events.Rule(this, 'EventRule', {
      schedule: events.Schedule.expression('rate(1 hour)'),
    });
    eventRule.addTarget(new targets.LambdaFunction(myFunction));
  }
}

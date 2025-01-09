import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';


export class SbgBackendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // Create a DynamoDB table
    const table = new dynamodb.Table(this, 'SbgTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'sbg-table',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create a Lambda function
    const handler = new lambda.Function(this, 'SbgHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });
    //give permission to the lambda function to access the DynamoDB table
    table.grantReadWriteData(handler);

    //create the API gateway
    const api = new apigateway.RestApi(this, 'sbg-api', {
      restApiName: 'sbg-api',
      description: 'This is the API for the SBG assigment',
    });

    const todos = api.root.addResource('todos');
    todos.addMethod('GET', new apigateway.LambdaIntegration(handler));
    todos.addMethod('POST', new apigateway.LambdaIntegration(handler));
    todos.addMethod('DELETE', new apigateway.LambdaIntegration(handler));
    todos.addMethod('PUT', new apigateway.LambdaIntegration(handler));

    //output the API URL
    new cdk.CfnOutput(this, 'APIEndpoint', {
      value: api.url ?? 'Something went wrong with the deployment',
    });
  }
}

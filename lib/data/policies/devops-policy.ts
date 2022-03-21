/* eslint-disable no-template-curly-in-string */
import { InlinePolicy, Statement } from '../../types';
import * as shared from './shared-statements';

/**
 * DevOps Team Profile for all managed accounts.
 */

/**
 * Include shared Statement snippets.
 */
const includeStatements: Statement[] = [
    shared.denyCoreCloudFormationStacks,
    shared.denyCreateIamUsers,
    shared.denyRoute53Domains,
    shared.denySharedSecrets,
    shared.allowCdkDeploy,
    shared.allowCdkBucket,
    shared.allowManagePipelines,
    shared.allowManageRds,
    shared.allowManageCloudFormation,
    shared.denyCdkSharedDeploy,
];

/**
 * Statements for this policy.
 */
const policyStatements: Statement[] = [
    {
        Sid: 'AllowDevOpsResources',
        Effect: 'Allow',
        Action: [
            'codecommit:List*',
            'codecommit:Describe*',
            'apigateway:GET',
            'apigateway:POST',
            'ecs:RunTask',
            'ecs:StartTask',
            'ecs:StopTask',
            'ec2:StartInstances',
            'ec2:StopInstances',
            'states:UpdateStateMachine',
            'states:Start*',
            'states:StopExecution',
            'lambda:UpdateFunctionCode',
            'lambda:InvokeFunction',
            'lambda:UpdateFunctionConfiguration',
            'secretsmanager:PutSecretValue',
            'secretsmanager:UpdateSecret',
        ],
        Resource: '*',
    },
    {
        Sid: 'AllowCodeCommit',
        Effect: 'Allow',
        Action: [
            'codecommit:Get*',
            'codecommit:BatchDescribe*',
            'codecommit:BatchGet*',
            'codecommit:GetApprovalRuleTemplate',
            'codecommit:EvaluatePullRequestApprovalRules',
            'codecommit:CreateBranch',
            'codecommit:CreateCommit',
            'codecommit:CreatePullRequest',
            'codecommit:GitPull',
            'codecommit:CancelUploadArchive',
            'codecommit:GitPush',
            'codecommit:DeleteBranch',
        ],
        Resource: 'arn:aws:codecommit:ap-southeast-1:179548402788:*',
    },
    {
        Sid: 'AllowIntegTables',
        Effect: 'Allow',
        Action: [
            'dynamodb:BatchGetItem',
            'dynamodb:BatchWriteItem',
            'dynamodb:UpdateTimeToLive',
            'dynamodb:ConditionCheckItem',
            'dynamodb:PutItem',
            'dynamodb:DeleteItem',
            'dynamodb:GetItem',
            'dynamodb:Scan',
            'dynamodb:Query',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteTable',
        ],
        Resource: [
            'arn:aws:dynamodb:*:*:table/*/index/*',
            'arn:aws:dynamodb:*:*:table/Integ*',
        ],
    },
];

export const policy: InlinePolicy = {
    Version: '2012-10-17',
    Statement: [
        ...includeStatements,
        ...policyStatements,
    ],
};

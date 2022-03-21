/**
 * Statements that can be included in Inline Policies
 */

/* eslint-disable no-template-curly-in-string */
import { Statement } from '../../types';

/**
 * Basic read-only access for infra and dev teams.
 */
export const defaultAllowGetListDescribe: Statement = {
    Sid: 'DefaultListDescribeGetAccess',
    Effect: 'Allow',
    Action: [
        'iam:List*',
        'iam:GetAccountSummary',
        'iam:GetLoginProfile',
        'iam:GetRole',
        'iam:GetRolePolicy',
        'ec2:Describe*',
        'elasticloadbalancing:Describe*',
        'autoscaling:Describe*',
        'directconnect:Describe*',
        'route53:Get*',
        'route53:List*',
        'route53domains:List*',
        'route53resolver:List*',
        'route53resolver:Get*',
        'transfer:Describe*',
        'transfer:List*',
        'codedeploy:List*',
        'codedeploy:Get*',
        'codepipeline:List*',
        'codebuild:List*',
        'codebuild:Describe*',
        'codebuild:Get*',
        'codebuild:BatchGet*',
        'codestar:Verify*',
        'codestar:List*',
        'xray:Get*',
        'xray:List*',
        'xray:BatchGetTraces',
        'lambda:List*',
        'lambda:Get*',
        'dynamodb:Describe*',
        'dynamodb:List*',
        'cloudwatch:DescribeAlarms',
        'cloudwatch:GetMetricData',
        'cloudwatch:GetMetricStatistics',
        'cloudwatch:ListMetrics',
        'cloudformation:List*',
        'cloudformation:Describe*',
        'cloudformation:Detect*',
        'cloudformation:Get*',
        'cloudformation:ValidateTemplate',
        'sqs:Get*',
        'sqs:List*',
        'kms:ListKeys',
        'kms:ListAliases',
        'events:List*',
        'events:Describe*',
        'schemas:List*',
        'schemas:Describe*',
        'schemas:GetResourcePolicy',
        'sns:List*',
        'sns:GetSubscriptionAttributes',
        'sns:GetSMSAttributes',
        'wafv2:List*',
        'wafv2:Get*',
        'wafv2:Check*',
        'wafv2:Describe*',
        'waf:List*',
        'waf:Get*',
        'waf-regional:Get*',
        'waf-regional:List*',
        'cloudfront:List*',
        'acm:ListCertificates',
        'ssm:List*',
        'ecr:DescribeRepositories',
        'ecr:ListImages',
        'cloudtrail:DescribeTrails',
        's3:List*',
        's3:Get*',
        's3:Describe*',
        'ses:List*',
        'ecs:List*',
        'ecs:Describe*',
        'states:Describe*',
        'states:List*',
        'states:GetExecutionHistory',
        'codepipeline:ListPipelines',
        'codepipeline:GetThirdPartyJobDetails',
        'codepipeline:GetJobDetails',
        'codepipeline:ListActionTypes',
        'ssm:GetParameter',
        'sts:GetSessionToken',
        'sts:GetAccessKeyInfo',
        'sts:GetCallerIdentity',
        'sts:GetServiceBearerToken',
        'logs:List*',
        'logs:StartQuery',
        'logs:FilterLogEvents',
        'logs:Get*',
        'logs:Describe*',
        'logs:StopQuery',
        'logs:TestMetricFilter',
        'logs:Filter*',
        'secretsmanager:ListSecrets',
        'secretsmanager:Get*',
        'secretsmanager:Describe*',
    ],
    Resource: '*',
};

/**
 * Manage CloudFormation Stacks
 */
export const allowManageCloudFormation: Statement = {
    Sid: 'ManageCloudFormationStacks',
    Effect: 'Allow',
    Action: [
        'cloudformation:CreateChangeSet',
        'cloudformation:ExecuteChangeSet',
        'cloudformation:DeleteChangeSet',
        'cloudformation:DeleteStack',
        'ec2:DeleteNetworkInterface', // Required to cleanup after failed stack delete
    ],
    Resource: '*',
};

/**
 * Deny write access to core CloudFormation stacks
 */
export const denyCoreCloudFormationStacks: Statement = {
    Sid: 'DenyCloudFormationCoreStacks',
    Effect: 'Deny',
    Action: [
        'cloudformation:CreateChangeSet',
        'cloudformation:ExecuteChangeSet',
        'cloudformation:DeleteChangeSet',
        'cloudformation:DeleteStack',
    ],
    Resource: 'arn:aws:cloudformation:*:*:stack/*',
    Condition: {
        StringLike: {
            'aws:ResourceTag/stage': 'core',
        },
    },
};

/**
 * Deny write access to IAM Users and Groups
 */
export const denyCreateIamUsers: Statement = {
    Sid: 'DenyIamUsers',
    Effect: 'Deny',
    Action: [
        'iam:DeleteAccessKey',
        'iam:CreateGroup',
        'iam:AddUserToGroup',
        'iam:RemoveUserFromGroup',
        'iam:DeleteGroup',
        'iam:UpdateUser',
        'iam:UpdateAccessKey',
        'iam:DeleteUser',
        'iam:CreateUser',
        'iam:ChangePassword',
        'iam:CreateAccessKey',
    ],
    Resource: '*',
};

/**
 * Deny write access to Route53 Domains
 */
export const denyRoute53Domains: Statement = {
    Sid: 'DenyRoute53Domains',
    Effect: 'Deny',
    Action: [
        'route53domains:Transfer*',
        'route53domains:Disable*',
        'route53domains:RenewDomain',
        'route53domains:Update*',
        'route53domains:AcceptDomainTransferFromAnotherAwsAccount',
        'route53domains:ResendContactReachabilityEmail',
        'route53domains:Enable*',
        'route53domains:RejectDomainTransferFromAnotherAwsAccount',
        'route53domains:DeleteDomain',
        'route53domains:RegisterDomain',
        'route53domains:RetrieveDomainAuthCode',
        'route53domains:CancelDomainTransferToAnotherAwsAccount',
    ],
    Resource: '*',
};

/**
 * Deny access to Secrets in Shared Services Account
 */
export const denySharedSecrets: Statement = {
    Sid: 'DenySharedSecrets',
    Effect: 'Deny',
    Action: [
        'secretsmanager:Get*',
        'secretsmanager:Describe*',
        'secretsmanager:PutSecretValue',
        'secretsmanager:UpdateSecret',
    ],
    Resource: 'arn:aws:secretsmanager:*:995661580959:secret:*',
};

/**
 * Allow access to deploy via CDK.
 * If applied to the Shared account this will allow deployment
 * into all trusted accounts. If that is not wanted, then
 * also attach the denyCdkSharedDeploy statement.
 */
export const allowCdkDeploy: Statement = {
    Sid: 'AllowStsCdkDeploy',
    Effect: 'Allow',
    Action: [
        'sts:AssumeRole',
        'sts:GetFederationToken',
    ],
    Resource: [
        'arn:aws:iam::*:role/*deploy-role*',
        'arn:aws:iam::*:role/*file-publishing-role*',
        'arn:aws:iam::*:role/*image-publishing-role*',
        'arn:aws:iam::*:role/*lookup-role*',
    ],
};

/**
 * Deny access to deploy via CDK in shared account.
 * If applied to the Shared account this will also deny deployment
 * into other trusted accounts from a shared account profile.
 */
export const denyCdkSharedDeploy: Statement = {
    Sid: 'DenyStsCdkDeploy',
    Effect: 'Deny',
    Action: [
        'sts:AssumeRole',
        'sts:GetFederationToken',
    ],
    Resource: [
        'arn:aws:iam::995661580959:role/*deploy-role*',
        'arn:aws:iam::995661580959:role/*file-publishing-role*',
        'arn:aws:iam::995661580959:role/*image-publishing-role*',
        'arn:aws:iam::995661580959:role/*lookup-role*',
    ],
};

/**
 * Allow access to CDK Bucket for troubleshooting.
 */
export const allowCdkBucket: Statement = {
    Sid: 'AllowCdkStagingBucket',
    Effect: 'Allow',
    Action: [
        's3:*Object*',
        's3:GetBucketLocation',
    ],
    Resource: [
        'arn:aws:s3:::cdktoolkit-stagingbucket-*',
        'arn:aws:s3:::integ*',
    ],
};
/**
 * Manage Pipelines
 */
export const allowManagePipelines: Statement = {
    Sid: 'AllowCodePipelineManagement',
    Effect: 'Allow',
    Action: [
        'codepipeline:ListWebhooks',
        'codepipeline:ListTagsForResource',
        'codepipeline:ListPipelineExecutions',
        'codepipeline:StartPipelineExecution',
        'codepipeline:ListActionExecutions',
        'codepipeline:StopPipelineExecution',
        'codepipeline:GetPipeline',
        'codepipeline:ListTagsForResource',
        'codepipeline:GetPipelineState',
        'codepipeline:GetPipelineExecution',
        'codepipeline:PutApprovalResult',
        'codepipeline:EnableStageTransition',
        'codepipeline:RetryStageExecution',
        'codepipeline:DisableStageTransition',
    ],
    Resource: [
        'arn:aws:codepipeline:*:*:*/*/*',
        'arn:aws:codepipeline:*:*:*/*',
        'arn:aws:codepipeline:*:*:*',
        'arn:aws:codepipeline:*:*:webhook:*',
        'arn:aws:codepipeline:*:*:actiontype:*/*/*/*',
        '*',
    ],
};

/**
 * Manage RDS
 */
export const allowManageRds: Statement = {
    Sid: 'AllowRdsManagement',
    Effect: 'Allow',
    Action: [
        'rds:AddTagsToResource',
        'rds:StartDBCluster',
        'rds:StopDBCluster',
        'rds:StartDBInstanceAutomatedBackupsReplication',
        'rds:CopyDBSnapshot',
        'rds:DeleteDBSnapshot',
        'rds:StopDBInstance',
        'rds:StopDBInstanceAutomatedBackupsReplication',
        'rds:Describe*',
        'rds:StartDBInstance',
        'rds:ModifyDBSnapshot',
        'rds:List*',
        'rds:CreateDBSnapshot',
        'rds:RebootDBInstance',
        'rds:ModifyDBSnapshotAttribute',
        'rds:RemoveTagsFromResource',
        'rds:DeleteDBInstance',
        'rds:Download*',
    ],
    Resource: '*',
};

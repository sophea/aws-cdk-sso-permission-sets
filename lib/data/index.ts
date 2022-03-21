import { SetWithInlinePolicy, SetWithManagedPolicy } from '../types';

/**
 * Import all of the policy files here, then add the configuration below
 */
import { policy as devopsPolicy } from './policies/devops-policy';
import { policy as infraPolicy } from './policies/infra-policy';
import { policy as denyCoreResourcesPolicy } from './policies/deny-core-resources-policy';

/**
 * Configuration for each Permission Set.
 */
export const permisssionSets: (SetWithInlinePolicy | SetWithManagedPolicy)[] = [
    {
        // Team Profiles ====================================================
        name: 'DevOps_Team',
        description: 'Dev Team Profile for integration development',
        sessionDuration: 4,
        assignments: [
            {
                accounts: [
                    'prod',
                    'uat',
                    'dr',
                    'dev',
                    'shared',
                ],
                groups: [
                    'DevOps_Team',
                ],
                includeTestAccounts: true,
            },
        ],
        managedPolicies: [],
        inlinePolicy: devopsPolicy,
    },
    {
        name: 'Infra_Team',
        description: 'Infra Team Profile for integration development',
        sessionDuration: 4,
        assignments: [
            {
                accounts: [
                    'prod',
                    'uat',
                    'dr',
                    'dev',
                    'shared',
                ],
                groups: [
                    'Infra_Team',
                ],
                includeTestAccounts: true,
            },
        ],
        managedPolicies: [],
        inlinePolicy: infraPolicy,
    },

    // Read Only Profiles ========================================================
    {
        name: 'AWS_ReadOnly',
        description: 'AWS Managed ReadOnly profile',
        sessionDuration: 4,
        assignments: [
            {
                accounts: [
                    'prod',
                    'uat',
                    'dr',
                    'dev',
                ],
                groups: [
                    'DevOps_Team',
                    'Infra_Team',
                    'AWS_ReadOnly',
                ],
                includeTestAccounts: true,
            },
        ],
        managedPolicies: [
            'arn:aws:iam::aws:policy/job-function/ViewOnlyAccess',
        ],
    },
    {
        name: 'AWS_BillingReadOnly',
        description: 'AWS Managed Billing ReadOnly profile',
        sessionDuration: 1,
        assignments: [
            {
                accounts: [
                    'master',
                ],
                groups: [
                    'Billing_ReadOnly',
                ],
            },
        ],
        managedPolicies: [
            'arn:aws:iam::aws:policy/AWSBillingReadOnlyAccess',
        ],
    },

    // Admin Profiles ========================================================
    {
        name: 'AWS_BillingAdmin',
        description: 'AWS Managed Billing Admin profile',
        sessionDuration: 1,
        assignments: [
            {
                accounts: [
                    'master',
                ],
                groups: [
                    'Billing_Admins',
                ],
            },
        ],
        managedPolicies: [
            'arn:aws:iam::aws:policy/job-function/Billing',
        ],
    },
    {
        name: 'AWS_AdministratorAccess',
        description: 'AWS Managed Admin profile for Organisation Master',
        sessionDuration: 1,
        assignments: [
            {
                accounts: [
                    'master',
                ],
                groups: [
                    'Org_Admins',
                ],
            },
            {
                accounts: [
                    'prod',
                    'uat',
                    'dr',
                    'dev',
                    'shared',
                ],
                includeTestAccounts: true,
                groups: [
                    'Account_Admins',
                ],
            },
        ],
        managedPolicies: [
            'arn:aws:iam::aws:policy/AdministratorAccess',
        ],
    },

    // Test Account Profiles ============================================================
    {
        name: 'TestAccountAdmin',
        description: 'AWS Managed Admin profile',
        sessionDuration: 2,
        assignments: [
            // {
            //     accounts: [
            //         'testmi',
            //     ],
            //     groups: [
            //         'Admin_MI',
            //     ],
            // },
            // {
            //     accounts: [
            //         'testrr',
            //     ],
            //     groups: [
            //         'Admin_RR',
            //     ],
            // },
            // {
            //     accounts: [
            //         'testso',
            //     ],
            //     groups: [
            //         'Admin_SU',
            //     ],
            // },
            {
                accounts: [
                    'testsm',
                ],
                groups: [
                    'Admin_SM',
                ],
            },
            // {
            //     accounts: [
            //         'testks',
            //     ],
            //     groups: [
            //         'Admin_KS',
            //     ],
            // },
        ],
        managedPolicies: [
            'arn:aws:iam::aws:policy/AdministratorAccess',
        ],
        inlinePolicy: denyCoreResourcesPolicy,
    },
];
